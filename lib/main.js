'use strict';

import Song from './classes/song';
import plural from 'plural';

let $start = document.querySelector('#start');

$start.addEventListener('click', e => {
  let song = new Song({
        title:     '',
        structure: ['chorus', 'bridge', 'phrase', 'intro', 'outro', 'solo']
      });

  e.stopPropagation();

  song.getInfo().then(info => {
    let $app = document.querySelector('#app'),
        template,
        structure = '',
        songOrder = '';

    console.debug('info', info);

    for (let item of Object.keys(info.structure)) {
      let num = info.structure[item],
          desc = info.structure[item] > 1 ? plural(item) : item;

      if (num > 0) {
        structure += `<li>${num} ${desc}</li>`;
      }
    }

    for (let item of song.getOrder()) {
      songOrder += `<li>${item}</li>`;
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
    <h4>Song order</h4>
    <ul class="song-order">${songOrder}</ul>
  </div>
</article>`;

    $app.innerHTML = template;

  });
});

export default {};
