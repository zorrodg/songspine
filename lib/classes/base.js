'use strict';

import plural from 'plural';
import _ from 'lodash';

class Base{
  constructor (elements) {
    if (_.isArray(elements)) {
      let values = _.range(0, elements.length);

      elements = _.zipObject(elements, _.map(values, value => Math.floor(Math.random() * 5)));
    }

    this.elements = elements || {};
  }

  getElements () {
    return this.elements;
  }

  generateOutput () {
    let compose = [];

    for (let i of Object.keys(this.elements)) {
      let num = Number.parseInt(this.elements[i]),
          name = num > 1 ? plural(i) : i;

      if (num > 0) {
        compose.push(`${this.elements[i]} ${name}.`);
      }

    }

    return compose;
  }
}

export default Base;