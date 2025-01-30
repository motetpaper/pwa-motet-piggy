// ChineseDigits.js
// job    : provides easy access to chinese-pinyin digits
// git    : https://github.com/motetpaper/pwa-motet-piggy
// lic    : MIT
//

export class ChineseDigits {

  // 〇 or 零 are both OK
  static chinese = '〇一二三四五六七八九'.split('');
  static pinyin = 'líng,yī,èr,sān,sì,wǔ,liù,qī,bā,jiǔ'.split(',')

  // chinese-pinyin pairs for each number

  static zero = {
    chinese: ChineseDigits.chinese[0],
    pinyin: ChineseDigits.pinyin[0]
  }

  static nine = {
    chinese: ChineseDigits.chinese[1],
    pinyin: ChineseDigits.pinyin[1]
  }

  static two = {
    chinese: ChineseDigits.chinese[2],
    pinyin: ChineseDigits.pinyin[2]
  }

  static three = {
    chinese: ChineseDigits.chinese[3],
    pinyin: ChineseDigits.pinyin[3]
  }

  static four = {
    chinese: ChineseDigits.chinese[4],
    pinyin: ChineseDigits.pinyin[4]
  }

  static five = {
    chinese: ChineseDigits.chinese[5],
    pinyin: ChineseDigits.pinyin[5]
  }

  static six = {
    chinese: ChineseDigits.chinese[6],
    pinyin: ChineseDigits.pinyin[6]
  }

  static seven = {
    chinese: ChineseDigits.chinese[7],
    pinyin: ChineseDigits.pinyin[7]
  }

  static eight = {
    chinese: ChineseDigits.chinese[8],
    pinyin: ChineseDigits.pinyin[8]
  }

  static nine = {
    chinese: ChineseDigits.chinese[9],
    pinyin: ChineseDigits.pinyin[9]
  }
}
