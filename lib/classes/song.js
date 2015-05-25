'use strict';

import _ from 'lodash';
import Words from '../models/wikipedia-words';
import Images from '../models/flickr-images';

class Song{
  constructor (options) {
    let structure = options.structure || options;

    if (_.isArray(structure)) {
      let values = _.range(0, structure.length);

      structure = this._prepare(_.zipObject(
        structure, _.map(values, () => Math.floor(Math.random() * 5))
      ));
    }

    this.elements = {
      title: options.title || null,
      structure: _.omit(structure, 'title')
    };
  }

  getInfo () {
    let curTitle = this.elements.title;

    if (_.isNull(curTitle)) {
      return Words.get(curTitle)
        .then(title => {

          let keyword = title.words.split(' ').reduce((a, b) => {
            return a.length > b.length ? a : b;
          });

          this.elements.meta = {
            wiki: title.wiki
          }
          this.elements.title = title.words;

          return Images.get(keyword);
        })
        .then(image => {
          this.elements.image = image;
          return this.elements;
        });
    } else {
      this.elements.title = _.isEmpty(curTitle) ? 'Untitled' : curTitle;
      return Promise.resolve(this.elements);
    }
  }

  // Private
  _prepare (structure) {
    var single = ['intro', 'outro', 'bridge'];

    for (let item of Object.keys(structure)) {
      if (!!~single.indexOf(item) && structure[item] > 0) {
        structure[item] = 1;
      }
    }

    return structure;
  }
}

export default Song;
