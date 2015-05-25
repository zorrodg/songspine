'use strict';

import Song from './classes/song';
import plural from 'plural';

let $start = document.querySelector('#start');

$start.addEventListener('click', e => {
  let song = new Song({
        title: '',
        structure: ['chorus', 'bridge', 'phrase', 'intro', 'outro', 'solo']
      });

  e.stopPropagation();

  song.getInfo().then(song => {
    let $app = document.querySelector('#app'),
        template, structure = '';
    console.debug('song', song);

    for (let item of Object.keys(song.structure)) {
      let num = song.structure[item],
          desc = song.structure[item] > 1 ? plural(item) : item;

      if (num > 0) {
        structure += `<li>${num} ${desc}</li>`;
      }
    }

    template = 
`<article class="song pure-g">
  <div class="pure-u-1 pure-u-md-1-2">
    <div>
      <h3 class="song-title"><small>Song Title:</small> ${song.title}</h3>
      <figure class="song-image"><img src="${song.image}"></figure>
    </div>
  </div>
  <div class="song-contents pure-u-1 pure-u-md-1-2">
    <div>
      <h4>Song contents</h4>
      <ul class="song-structure">${structure}</ul>
      <p class="song-references">
        Words from the title were extracted from <a href="${song.meta.wiki}" target="_blank">this wikipedia article</a>
      </p>
    </div>
  </div>
</article>`;

    $app.innerHTML = template;

  });
});

export default {};