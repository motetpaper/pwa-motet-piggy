// ChineseUnits.js
// job    : provides easy access to chinese-pinyin units
// git    : https://github.com/motetpaper/pwa-motet-piggy
// lic    : MIT
//

export class ChineseUnits {

  static chinese = '兆负两亿万千百十'.split('');
  static pinyin = 'zhào,fù,liǎng,yì,wàn,qiān,bǎi,shí'.split(',');

  static trillion = {
    chinese: ChineseUnits.chinese[0],
    pinyin: ChineseUnits.pinyin[0]
  }

  static negative = {
    chinese: ChineseUnits.chinese[1],
    pinyin: ChineseUnits.pinyin[1]
  }

  static pair = {
    chinese: ChineseUnits.chinese[2],
    pinyin: ChineseUnits.pinyin[2]
  }

  static hundredMillion = {
    chinese: ChineseUnits.chinese[3],
    pinyin: ChineseUnits.pinyin[3]
  }

  static tenThousand = {
    chinese: ChineseUnits.chinese[4],
    pinyin: ChineseUnits.pinyin[4]
  }

  static thousand = {
    chinese: ChineseUnits.chinese[5],
    pinyin: ChineseUnits.pinyin[5]
  }

  static hundred = {
    chinese: ChineseUnits.chinese[6],
    pinyin: ChineseUnits.pinyin[6]
  }

  static ten = {
    chinese: ChineseUnits.chinese[7],
    pinyin: ChineseUnits.pinyin[7]
  }
}
