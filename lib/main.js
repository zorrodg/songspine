'use strict';

import Base from './classes/base';
import SongTitle from './classes/songTitle';

let $start = document.querySelector('#start'),
    $app = document.querySelector('#app');

$start.addEventListener('click', e => {
  e.stopPropagation();

  let logic = new Base({
    choruses: Math.ceil(Math.random() * 4),
    bridges: Math.ceil(Math.random() * 2)
  });

  let songName = new SongTitle();

  console.log(songName.getWord());

  $app.innerHTML = logic.generateOutput();
});


export default {};