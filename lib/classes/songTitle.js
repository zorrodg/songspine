'use strict';

import Base from './base';
import jsonp from 'jsonp-promise';

class SongTitle extends Base {
  constructor () {
    super();
    
    SongTitle.words = [];

    jsonp('http://sleepy-bastion-8674.herokuapp.com/',
      { param: 'callback' }
    ).promise.then(res => {
      SongTitle.setWord(res.word);
    });
  }

  static setWord (word) {
    this.words.push(word);
  }

  getWord () {
    return SongTitle.words;
  }
}

export default SongTitle;