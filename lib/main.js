'use strict';

import Logic from './classes/logic';

let $start = document.querySelector('#start');
let $app = document.querySelector('#app');

$start.addEventListener('click', e =>{
  let logic = new Logic({
    chorus: Math.ceil(Math.random() * 10)
  });

  $app.innerHTML = logic.generateOutput();
});


export default {};