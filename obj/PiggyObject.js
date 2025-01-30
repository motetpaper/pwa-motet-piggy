// PiggyObject.js
// (prototype)
// job    : transforms Chinese text into annotated JSON or HTML
// git    : https://github.com/motetpaper/pwa-motet-piggy
// lic    : MIT
//

import hp from './hp.json' with { type: 'json' };
import tmiso from './tmiso.json' with { type: 'json' };
import tf from './tf.json' with { type: 'json' };


import { ChineseUnits } from './ChineseUnits.js';
import { ChineseDigits } from './ChineseDigits.js';
import { ChineseAbacus } from './ChineseAbacus.js';
import { ChineseNumber } from './ChineseNumber.js';

export class PiggyObject {

  constructor() { }

  #input = null;
  #output = null;

  #json = null;
  #html = null;

  // sets the input text, then returns this object
  setInput(str) {
    this.#input = str;
    return this;
  }

  asJSON(){
    return this.#json;
  }

  asHTML(){
    return this.#html;
  }

  build() {

    if(!this.#input) {
      return this;
    }

    // the number of boxes per row
    // this may be changed for mobile devices?
    const cols_per_row = 8;

    // the number of rows per page
    // this may be changed for mobile devices?
    const rows_per_page = 4;

    // regular expressions
    const re_punct = /\p{P}/gu
    const re_hanzi = /\p{Script=Han}/u
    const re_spaces = /[^\S\n]{2,}/g
    const re_yyyymmdd = /\d{4}年\d{1,2}月\d{1,2}日/g
    const re_cmonth = /((\d{1,2})月)/g
    const re_cdate = /((\d{1,2})日)/g
    const re_cyear = /((\d{4})年)/g
    const re_dotrate = /((\d{1,3}(\.\d{1,3})?)%)/g
    const re_percent = /((\d{1,3})%)/g
    const re_nums = /(\d+)/g
    const re_bignums = /(\d+(,\d+)?)/g

    const digits = '〇一二三四五六七八九'.split('');

    let s = this.#input.trim();
    s = s.replace(/\s+/g, '').trim();
    s = s.replace(/,/g, '').trim();

    // ChineseNumber object
    // used as a facility on standby
    const cn = new ChineseNumber(0);

    // calendar month in chinese
    s = s.replace(re_cmonth, (...args) => {
      return args[1].replace(args[2],
          cn.setValue(+args[2]).asChinese());
    });

    // calendar date in chinese
    s = s.replace(re_cdate, (...args) => {
      return args[1].replace(args[2],
          cn.setValue(+args[2]).asChinese());
    });

    // calendar year in chinese
    s = s.replace(re_cyear, (...args) => {
      return args[1].replace(args[2], args[2].split('')
        .map((d)=>digits[d]).join(''));
    });

    // percentage
    s = s.replace(re_percent, (...args) => {
      const whole = cn.setValue(+args[2]).asChinese();
      return `百分之${whole}`;
    });

    // interest rate in chinese
    s = s.replace(re_dotrate, (...args) => {
      const nums = args[2].split('.');
      const whole = cn.setValue(nums[0]).asChinese();
      const fraction = cn.setValue(nums[1]).asChinese();
      return `百分之${whole}点${fraction}`;
    });

    // whole numbers in chinese
    s = s.replace(re_nums, (...args) => {
      return cn.setValue(args[0]).asChinese();
    });

    // everything in parantheses
    s = s.replace(/(（\w+）)/g, (...args) => {
      console.log('wp-removed: ', args[1]);
      return '';
    });

    // everthing else
    s = s.replace(/(\w+)/g, (...args) => {
      console.log('w-removed: ', args[1]);
      return '';
    });

    // data stream split here
    // t - the hanzi stream
    // s - the pinyin stream
    // both must be equal in length
    const t = s.trim();

    // replace hanzi with pinyin
    for (let h in hp) {
      s = s.replace((new RegExp(h,'g')), ` ${hp[h]} `)
    }

    // replace with tone marks
    for (let x in tmiso) {
      s = s.replace((new RegExp(x,'g')), `${tmiso[x]}`)
    }

    // removes tone five from pinyin
    for (let f in tf) {
      s = s.replace((new RegExp(f,'g')), `${tf[f]}`)
    }

    // finishing area
    // replace punctuation and squeezing empty spaces
    s = s.replace(re_punct, ' zzz1 ');
    s = s.replace(re_spaces, ' ').trim();

    const tarr = t.split('');
    const sarr = s.split(' ');

    // critical test area
    // critical test area
    // critical test area

    console.log('box counts');
    console.log('input: ',tarr.length);
    console.log('output: ',sarr.length);

    console.assert(tarr.length === sarr.length, 'tarr and sarr should be equal');
    if(tarr.length !== sarr.length)
      throw console.error('array length mismatch');


    // critical test area ends


    const arr = [];

    sarr.forEach((a,i)=>{
      arr.push({h: tarr[i], p: sarr[i]});
    });

    // wedges to fill out the tables
    const lastrow = arr.length % cols_per_row;
    const more = cols_per_row - lastrow;
//    console.log('wedges needed: ', !!more)
//    console.log('last row needs %s more cols', more);

    // completes the last row with wedge columns
    const wedge = { h: '々', p: 'www0' }
    for(let m = 0; m < more; m++) {
      arr.push(wedge);
    }

    this.#json = JSON.stringify(arr,null,2);

    const frame = [];
    for(let j = 0; j < arr.length; j+=cols_per_row) {
      const rowdata = arr
        .slice(j, j+cols_per_row)
        .map(x=>this.#box(x))
        .join('</td><td>');
      const brk = !(frame.length % rows_per_page) ? 'class="breakhere"' : '';
      const table = `<table ${brk}><tr><td>${rowdata}</td></tr></table>`;
      frame.push(table);
    }

    this.#html = frame.join('\n');
    return this;
  }

  #boxtype(str) {
    switch(str) {
      case 'zzz1':
        return 'piggy punct';
      case 'www0':
        return 'piggy wedge';
      default:
        return 'piggy';
        break;
    }
  }

  #box(obj) {
    const boxtype = this.#boxtype(obj.p);
    return `
      <table class="${boxtype}">
        <tr><td class="p">${obj.p}</td></tr>
        <tr><td class="h">${obj.h}</td></tr>
      </table>
      `;
  }
}
