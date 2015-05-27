'use strict';

import Song from './classes/song';
import plural from 'plural';
import Spinner from 'spin';
import Sortable from 'sortable';

let $start = document.querySelector('#start');

$start.addEventListener('click', e => {
  let $app = document.querySelector('#app'),
      song = new Song({
        title:     '',
        structure: ['chorus', 'bridge', 'phrase', 'intro', 'outro', 'solo']
      });

  e.stopPropagation();

  $app.style.height = ($app.clientHeight < 300 ? 300 : $app.clientHeight) + 'px';

  new Spinner({
    corners:   0,
    direction: 1,
    length:    0,
    lines:     11,
    radius:    41,
    rotate:    0,
    scale:     1.5,
    speed:     1.8,
    trail:     68,
    width:     7
  }).spin($app);

  song.getInfo().then(info => {
    let template,
        structure = '',
        songOrder = '';

    for (let item of Object.keys(info.structure)) {
      let num = info.structure[item],
          desc = info.structure[item] > 1 ? plural(item) : item;

      if (num > 0) {
        structure += `<li>${num} ${desc}</li>`;
      }
    }

    for (let item of song.getOrder()) {
      songOrder += `<li class="song-order-item">${item}</li>`;
    }

    template =
`<article class="song pure-g">
  <div class="pure-u-1 pure-u-md-1-2">
    <div>
      <h3 class="song-title"><small>Song Title:</small> ${info.title}</h3>
      <figure class="song-image"><img src="${info.image}"></figure>
    </div>
  </div>
  <div class="song-contents pure-u-1 pure-u-md-1-2">
    <div>
      <h4>Song contents</h4>
      <ul class="song-structure">${structure}</ul>
      <p class="song-references">
        Words from the title were extracted from <a href="${info.meta.wiki}" target="_blank">this wikipedia article</a>
      </p>
    </div>
  </div>
  <div class="pure-u-1">
    <h4 class="song-order-title">Song order (Modify order by dragging elements around)</h4>
    <ul class="song-order">${songOrder}</ul>
  </div>
</article>`;

    $app.innerHTML = template;
    $app.style.height = '';

    setSortable(document.querySelector('.song-order'));


  });
});

function setSortable(el) {
  let sort = new Sortable(el);
  // TODO: Change this
  console.warn('sort', sort); // LOG
}

export default {};
