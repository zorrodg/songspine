'use strict';

import Base from './classes/base';
import { getWord } from './models/songTitle';

let $start = document.querySelector('#start'),
    $app = document.querySelector('#app');

$start.addEventListener('click', e => {
  let $frgmnt = document.createDocumentFragment(),
      logic = new Base(
        ['chorus', 'bridge', 'phrase', 'intro', 'outro', 'solo']
      );

  e.stopPropagation();

  getWord().then(title => {
    let t = document.createElement('h3');
    t.innerHTML = `<small>Song Title:</small> ${title}`;
    $frgmnt.appendChild(t);

    for (let desc of logic.generateOutput()) {
      let li = document.createElement('li');
      li.textContent = desc;
      $frgmnt.appendChild(li);
    }

    $app.innerHTML = '';
    $app.appendChild($frgmnt);


  });
});


export default {};