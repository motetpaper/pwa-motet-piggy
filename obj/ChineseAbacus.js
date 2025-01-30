// ChineseAbacus.js
// job    : counts place values with modern syntatic sugar
// job    : gives an excuse to use the variable name 'abba'
// git    : https://github.com/motetpaper/pwa-motet-piggy
// lic    : MIT
//

export class ChineseAbacus {

  constructor(num) {
    this.#value = num;
    this.#count();
  }

  #value = 0;

  #hundredMillions = 0;
  #tenThousands = 0;
  #thousands = 0;
  #hundreds = 0;
  #tens = 0;
  #ones = 0;

  #reset() {
    this.#hundredMillions = 0;
    this.#tenThousands = 0;
    this.#thousands = 0;
    this.#hundreds = 0;
    this.#tens = 0;
    this.#ones = 0;
  }

  #count() {
    this.#reset();
    let remaining = this.#value;

    while (remaining >= 100000000) {
        remaining = remaining - 100000000;
        this.#hundredMillions++;
    }

    while (remaining >= 10000) {
        remaining = remaining - 10000;
        this.#tenThousands++;
    }

    while (remaining >= 1000) {
        remaining = remaining - 1000;
        this.#thousands++;
    }

    while (remaining >= 100) {
        remaining = remaining - 100;
        this.#hundreds++;
    }

    while (remaining >= 10) {
        remaining = remaining - 10;
        this.#tens++;
    }

    this.#ones = remaining;
  }

  // returns a (boolean) bit array of places values
  asBitArray() {
    return [
      !!this.#hundredMillions,
      !!this.#tenThousands,
      !!this.#thousands,
      !!this.#hundreds,
      !!this.#tens,
      !!this.#ones
    ];
  }

  // returns a (boolean) bit string of places values
  asBitString() {
    return this.asBitArray()
      .map((b)=>+b).join('');
  }

  asJSON() {
    return {
        value: this.#value,
        hundredMillions: this.#hundredMillions,
        tenThousands: this.#tenThousands,
        thousands: this.#thousands,
        hundreds: this.#hundreds,
        tens: this.#tens,
        ones: this.#ones
    };
  }

  toString() {
    return JSON.stringify(this.asJSON());
  }
}
