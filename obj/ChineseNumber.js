// ChineseNumber.js
// job    : converts Chinese numbers contextually
// git    : https://github.com/motetpaper/pwa-motet-piggy
// lic    : MIT
//

import { ChineseAbacus } from './ChineseAbacus.js'
import { ChineseDigits } from './ChineseDigits.js'
import { ChineseUnits } from './ChineseUnits.js'

export class ChineseNumber {

    constructor(num) {
      this.setValue(num);
      this.#count();
    }

    #value = 0;
    #chinese = null;
    #pinyin = null;
    #abba = null;

    #isNegative = false;

    get() {
      return this.#value;
    }

    setValue(num) {
      this.#value = +num;
      this.#count();
      return this;
    }

    asChinese() {
      return this.#chinese;
    }

    asPinyin() {
      return this.#pinyin;
    }

    toString() {
        return JSON.stringify(this);
    }

    toJSON() {
      return {
          value: this.#value,
          isNegative: this.#isNegative,
          chinese: this.#chinese,
          pinyin: this.#pinyin
      };
    }

    #count() {
      this.#isNegative = !!(this.#value < 0);
      this.#abba = new ChineseAbacus(this.#value);
      switch (Math.abs(this.#value)) {
          case 0:
              this.#chinese = ChineseDigits.zero.chinese;
              this.#pinyin = ChineseDigits.zero.pinyin;
              break;
          case 250:
              this.#chinese = ChineseUnits.pair.chinese
                + ChineseUnits.hundred.chinese
                + ChineseDigits.five.chinese;
              this.#pinyin = ChineseUnits.pair.pinyin
                + ChineseUnits.hundred.pinyin
                + ChineseDigits.five.pinyin;
              break;
          default:
              const abba = this.#abba;
              const places = this.#abba.asJSON();
              const wan = places.tenThousands;
              const qian = places.thousands;
              const bai = places.hundreds;
              const shi = places.tens;
              const num = places.ones;
              let strWan = '';
              let strQian = '';
              let strBai = '';
              let strShi = '';
              let strNum = '';
              let unitWan = '';
              let unitQian = '';
              let unitBai = '';
              let unitShi = '';
              // no unitNum
              if (wan > 0) {
                  const wancn = new ChineseNumber(wan);
                  strWan = wancn.asChinese();
                  unitWan = ' ' + ChineseUnits.tenThousand.chinese;
              }
              if (qian > 0) {
                  strQian = '' + ChineseDigits.chinese[qian];
                  unitQian = ' ' + ChineseUnits.thousand.chinese;
              }
              if (bai > 0) {
                  strBai = ' ' + ChineseDigits.chinese[bai];
                  unitBai = ' ' + ChineseUnits.hundred.chinese;
              }
              if (shi > 0) {
                  strShi = ' ' + ChineseDigits.chinese[shi];
                  unitShi = ' ' + ChineseUnits.ten.chinese;
              }
              if (num > 0) {
                  strNum = '' + ChineseDigits.chinese[num];
              }
              switch (abba.asBitString().substr(-5)) {
                  // case #32
                  case '11111':
                      // no action required
                      break;
                  // case #31
                  case '11110':
                      strNum = '';
                      unitShi = '';
                      break;
                  // case #30
                  case '11101':
                      strShi = '';
                      unitShi = ChineseDigits.zero.chinese;
                      break;
                  // case #29
                  case '11100':
                      strShi = '';
                      strNum = '';
                      unitShi = '';
                      break;
                  // case #28
                  // case #27
                  case '11011':
                  case '11010':
                      strBai = '';
                      unitBai = ChineseDigits.zero.chinese;
                      break;
                  // case #26
                  case '11001':
                      strBai = '';
                      strShi = '';
                      unitBai = ChineseDigits.zero.chinese;
                      unitShi = '';
                      break;
                  // case #25
                  case '11000':
                      strBai = '';
                      strShi = '';
                      strNum = '';
                      unitBai = '';
                      unitShi = '';
                      break;
                  // case #24
                  case '10111':
                      strQian = '';
                      unitQian = ChineseDigits.zero.chinese;
                      break;
                  // case #23
                  case '10110':
                      strQian = '';
                      strNum = '';
                      unitQian = ChineseDigits.zero.chinese;
                      unitShi = '';
                      break;
                  // case #22
                  case '10101':
                      strQian = '';
                      strShi = '';
                      unitQian = ChineseDigits.zero.chinese;
                      unitShi = ChineseDigits.zero.chinese;
                      break;
                  // case #21
                  case '10100':
                      strQian = '';
                      strShi = '';
                      strNum = '';
                      unitQian = ChineseDigits.zero.chinese;
                      unitShi = '';
                      break;
                  // case #20
                  // case #19
                  case '10011':
                  case '10010':
                      strQian = '';
                      strBai = '';
                      unitQian = ChineseDigits.zero.chinese;
                      unitBai = '';
                      break;
                  // case #17
                  case '10000':
                      strQian = '';
                      strBai = '';
                      strShi = '';
                      strNum = '';
                      unitQian = '';
                      unitBai = '';
                      unitShi = '';
                      break;
                  // case #16
                  case '01111':
                      // no action required
                      break;
                  // case #15
                  case '1110':
                      strNum = '';
                      unitShi = '';
                      break;
                  // case #14
                  case '01101':
                      strShi = '';
                      unitShi = ChineseDigits.zero.chinese;
                      break;
                  // case #13
                  case '01100':
                      strShi = '';
                      strNum = '';
                      unitBai = '';
                      unitShi = '';
                      break;
                  // case #12
                  case '01011':
                      strBai = '';
                      unitBai = ChineseDigits.zero.chinese;
                      break;
                  // case #11
                  case '01010':
                      strBai = '';
                      strNum = '';
                      unitBai = ChineseDigits.zero.chinese;
                      break;
                  // double donuts - 1001, 3006, ...
                  // case #10
                  case '01001':
                      strBai = '';
                      strShi = '';
                      unitBai = ChineseDigits.zero.chinese;
                      unitShi = '';
                      break;
                  // triple donuts - 1000, 2000, ...
                  // case #9
                  case '01000':
                      strBai = '';
                      strShi = '';
                      strNum = '';
                      unitBai = '';
                      unitShi = '';
                      break;
                  // case #8
                  case '00111':
                      // no action required
                      break;
                  // 120, 130, ...
                  // case #7
                  case '00110':
                      strNum = '';
                      unitShi = '';
                      break;
                  // single donuts - 101, 203, ...
                  // case #6
                  case '00101':
                      strShi = '';
                      unitShi = ChineseDigits.zero.chinese;
                      break;
                  // case #5
                  case '00100':
                      strShi = '';
                      strNum = '';
                      unitShi = '';
                      break;
                  default:
                      // do nothing
                      break;
              }
              // if input number is less than 20
              // case #4
              // case #3
              if (this.#value < 20) {
                  strShi = '';
              }
              // combine all parts
              this.#chinese = strWan + unitWan
                  + strQian + unitQian
                  + strBai + unitBai
                  + strShi + unitShi + strNum;
              break;
      }
      // finishing
      if (this.#isNegative) {
          this.#chinese = ChineseUnits.negative.chinese + this.#chinese;
          this.#pinyin = ChineseUnits.negative.pinyin + this.#pinyin;
      }
      this.#pinyin = this.#chinese;

      let re = null;

      for (let d in ChineseDigits.chinese) {
          re = new RegExp(ChineseDigits.chinese[d], 'g');
          this.#pinyin = this.#pinyin
              .replace(re, ' ' + ChineseDigits.pinyin[d]);
      }

      for (let u in ChineseUnits.chinese) {
          re = new RegExp(ChineseUnits.chinese[u], 'g');
          this.#pinyin = this.#pinyin
              .replace(re, ' ' + ChineseUnits.pinyin[u]);
      }

      this.#chinese = this.#chinese.replace(/\s/g, '').trim();
      this.#pinyin = this.#pinyin.replace(/[^\S\n]{2,}/g, ' ').trim();
  }
}
