'use strict';

import Base from './base';
import fetch from 'node-fetch';

console.warn('fetch', fetch); // LOG
class SongTitle extends Base {
  getWord () {
    return fetch('http://randomword.setgetgo.com:80/get.php', {
      method: 'OPTIONS'
    })
      .then(res => {
        debugger;
      });
  }
}

export default SongTitle;