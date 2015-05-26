'use strict';

import jsonp from 'jsonp-promise';
import qs from 'qs';
import _ from 'lodash';

export default {
  get: getWord
};

function getWord(options) {

  const params = {
    action:       'query',
    generator:    'random',
    format:       'json',
    prop:         'extracts',
    explaintext:  '',
    grnnamespace: 0
  };

  let pageID;

  options = Object.assign({
    lang: 'en',
    num:  Math.ceil(Math.random() * 5)
  }, options);

  return jsonp(
    'http://' + options.lang + '.wikipedia.org/w/api.php?' + qs.stringify(params),
    { param: 'callback' }
  ).promise
   .then(res => res.query.pages)
   .then(res => {
    let items = Object.keys(res);

    pageID = items[0];
    return res[pageID].extract;
   })
   .then(extract => {
    return extract.replace(/[,.()"';:=\-\u201c\u2013\u005e\u00ab\u00bb\u00b0/\[\]]/gi, ' ')
                  .replace(/\s+/gi, ' ')
                  .replace(/\d{5}/g, '')
                  .split(' ');
   })
   .then(wordsArr => {
    let counter = 0,
        words = [];

    while (counter < options.num) {
      let i = Math.floor(Math.random() * wordsArr.length),
          bannedWords = [
            'extern',
            'referenc',
            'common',
            'link'
          ],
          bannedMatch,
          word = wordsArr[i].toLowerCase();

      for (let banned of bannedWords) {
        let regex = new RegExp(banned, 'gi');
        if (~word.search(regex)) {
          bannedMatch = true;
          break;
        }
      }

      if (bannedMatch) {
        continue;
      }

      if (options.num < 3 && word.length > 3) {
        words.push(word);
        counter++;
      } else if (options.num >= 3 && !~words.indexOf(word)) {
        let mod = options.num - 1 === counter ? true : (counter % 2 === 0);

        if ((word.length > 3) === mod) {
          words.push(word);
          counter++;
        }
      }
    }

    return {
      wiki:  `http://${options.lang}.wikipedia.org/?curid=${pageID}`,
      words: words.map(word => _.capitalize(word)).join(' ')
    };
   });
}
