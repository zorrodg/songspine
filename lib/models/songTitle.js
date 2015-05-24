'use strict';

import jsonp from 'jsonp-promise';
import qs from 'qs';
import _ from 'lodash';

export function getWord(options) {

  const params = {
    action: 'query',
    generator: 'random',
    format: 'json',
    prop: 'extracts',
    explaintext: '',
    grnnamespace: 0
  }

  options = Object.assign({ 
    lang: 'en', 
    num: Math.ceil(Math.random() * 5) 
  }, options);

  return jsonp(
    'http://' + options.lang + '.wikipedia.org/w/api.php?' + qs.stringify(params),
    { param: 'callback' }
  ).promise
   .then(res => res.query.pages)
   .then(res => {
    let items = Object.keys(res);

    return res[items[0]].extract;
   })
   .then(extract => {
    return extract.replace(/[,.()"';:=\-\u2013\u005e\u00ab\u00bb\u00b0/\[\]]/gi, '')
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
            'external',
            'references',
            'referencias',
            'externos',
            'commons'
          ],
          word = wordsArr[i].toLowerCase();

      if (!!~bannedWords.indexOf(word)) {
        continue;
      }

      if (options.num < 3 && word.length > 3) {
        words.push(word);
        counter++;
      } else if (options.num >= 3) {
        let mod = options.num - 1 === counter ? true : (counter % 2 === 0);

        if ((word.length > 3) === mod) {
          words.push(word);
          counter++;
        }
      }
    }

    return words.map(word => _.capitalize(word)).join(' ');


   });
}