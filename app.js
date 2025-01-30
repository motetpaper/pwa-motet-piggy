// app.js
// (prototype)
// job    : handles app actions
// git    : https://github.com/motetpaper/pwa-motet-piggy
// lic    : MIT
//

import { PiggyObject } from './obj/PiggyObject.js';

const inputs = document.querySelector('#inputs');
const outputs = document.querySelector('#outputs');
const btns = document.querySelectorAll('button');

inputs.onkeyup = go;
inputs.onblur = go;

document.body.onload = go;

btns.forEach((b) => {
  b.addEventListener('click', (evt) => {
    switch(evt.target.id) {
      case 'convert':
        go();
        break;
      case 'clear':
        clean()
        break;
      case 'export-json':
        console.log('exports to json');
        break;
      case 'export-html':
        console.log('exports to html');
        break;
      default:
        // nothing
        break;
    }
  });
});

function go() {
  const str = inputs.value;
  const piggy = new PiggyObject();
  piggy.setInput(str).build();
  outputs.innerHTML = piggy.asHTML();
}


function clean() {
  inputs.value = '';
  outputs.value = '. . . ';
}
