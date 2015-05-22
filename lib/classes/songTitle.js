'use strict';

import Base from './base';
import jsonp from 'jsonp';

class SongTitle extends Base {
  constructor () {
    super();
    
    this.words = [];

    jsonp(
      'http://sleepy-bastion-8674.herokuapp.com/',
      {
        name: 'window.__songTitleWord'
      }
    );
  }

  static setWord (word) {
    debugger;
    this.words.push(word);
  }

  getWord () {
    debugger;
    return this.words;
  }
}

window.__songTitleWord = function (res) {
  SongTitle.setWord(res.word);
}

export default SongTitle;