/* eslint-disable */

const Easing = {
  linear: t => t,
  easeInQuad: t => t*t,
  easeOutQuad: t => t*(2-t),
  easeInOutQuad: t => t<.5 ? 2*t*t : -1+(4-2*t)*t,
  easeInCubic: t => t*t*t,
  easeOutCubic: t => (--t)*t*t+1,
  easeInOutCubic: t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1,
  easeInQuart: t => t*t*t*t,
  easeOutQuart: t => 1-(--t)*t*t*t,
  easeInOutQuart: t => t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t,
  easeInQuint: t => t*t*t*t*t,
  easeOutQuint: t => 1+(--t)*t*t*t*t,
  easeInOutQuint: t => t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t,
};

export default {
  install(app) {
    app.prototype.$easing = Easing;
    app.prototype.$script = (src) => {
      const script = document.createElement('script');
      script.setAttribute('src', src);
      document.head.appendChild(script);
    };
    app.prototype.$now = () => {
      if (app.prototype.$connection.serverTimeOffset) return Date.now() - app.prototype.$connection.serverTimeOffset;
      return Date.now();
    };
    app.prototype.$money = (count, currency = 'usd') => {
      count = String(count / 1000);
      let changedMoney = count;
      if (count.search('\\.') === -1) {
        changedMoney = `${count}.00`;
      } else if (count.search('\\.') === count.length - 2) {
        changedMoney = `${count}0`.replace('\.', '.');
      } else {
        changedMoney = count.replace('\.', '.');
      }
      changedMoney = changedMoney.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      if (currency === 'usd') {
        return `<i class="fas fa-dollar-sign"></i>${changedMoney}`;
      }
    };
    app.prototype.$animNumber = (object, name, to, ms = 800, round = 10) => {
      if (object.animNumberInterval) clearInterval(object.animNumberInterval);
      let progress = 0;
      const start = object[name];
      const difference = to - object[name];
      object.animNumberInterval = setInterval(() => {
        progress += 10;
        object[name] = Math.round((start + difference * (Easing.easeOutQuart(progress / ms))) / round) * round;
        if (progress >= ms) {
          clearInterval(object.animNumberInterval);
          delete object.animNumberInterval;
          object[name] = to;
        }
      }, 10);
    };
    // app.prototype.$level = (exp) => {
    //   // base / (base + incrementBy)
    //   return Math.floor((exp + 1000) / 11000);
    // };
    // app.prototype.$exp = (level) => {
    //   // base: 10000; incrementBy: 1000;
    //   // a: base + incrementBy
    //   // b: -incrementBy
    //   return Math.max(0, 11000 * level - 1000);
    // };

    // https://www.symbolab.com/solver/function-inverse-calculator
    app.prototype.$level = (exp) => Math.floor((Math.sqrt(90250000 + 2000 * exp) - 9500) / 1000);

    // exp(level) = pow(level)*(growBy/2) - level * (growBy / 2) + level * default
    app.prototype.$exp = (level) => level * level * 500 - level * (500 - 10000);

    app.prototype.$getLevelProgress = (exp) => {
      const EXP = app.prototype.$exp;
      const LEVEL = app.prototype.$level;
      const restExp = exp - EXP(LEVEL(exp));
      const expToNextLevel = EXP(LEVEL(exp) + 1) - EXP(LEVEL(exp));
      return Math.floor(restExp / expToNextLevel * 10000) / 10000;
    }
  },
};
