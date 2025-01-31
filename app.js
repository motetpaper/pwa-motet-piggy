// app.js
// (prototype)
// job    : handles app actions
// git    : https://github.com/motetpaper/pwa-motet-piggy
// lic    : MIT
//

import vocab1 from './two.json' with {type: 'json'}
import vocab2 from './one.json' with {type: 'json'}

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
  vocabs.innerHTML = addVocab();
}


function addVocab() {
  const s = inputs.value;
  const options = { granularity: 'word' };
  const segm = new Intl.Segmenter('zh', options);
  const segments = segm.segment(s);
  const map = Array.from(segments);
  console.log('two-words-vocab');
  const words = map
    .filter((a)=>a.segment.length<3)
    .filter((a)=>a.segment.match(/\W/))
    .filter((a)=>!!a.isWordLike)
    .map((a)=>a.segment);

  const vocab = [].concat(vocab1,vocab2);

// use this to add vocab to piggy
//  const words = ['美国','一代','美','代']; // from segmenter
  const vocablist = vocab
    .filter(((v)=>words.indexOf(v.s) > -1))
    .map((v)=>`
      <p class="vocab">
        <span class="h">${v.s}</span><br/>
        <span class="d">${v.d}</span>
      </p>`)
    .join('\n');

  return vocablist;
}


function clean() {
  inputs.value = '';
  outputs.value = '. . . ';
}
