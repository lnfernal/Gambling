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
    app.prototype.$script = (src) => {
      const script = document.createElement('script');
      script.setAttribute('src', src);
      document.head.appendChild(script);
    };
    app.prototype.$money = (count, currency = 'usd') => {
      count = String(count / 1000);
      if (count.search('\\.') === -1) {
        return `${count},00`;
      } else if (count.search('\\.') === count.length - 2) {
        return `${count}0`.replace('\.', ',');
      }
      return count.replace('\.', ',');
    };
    app.prototype.$animNumber = (object, name, to, ms = 500) => {
      if (object.animNumberInterval) clearInterval(object.animNumberInterval);
      let progress = 0;
      const start = object[name];
      const difference = to - object[name];
      object.animNumberInterval = setInterval(() => {
        progress += 10;
        object[name] = Math.round((start + difference * (Easing.easeOutQuart(progress / ms))) / 10) * 10;
        if (progress >= ms) {
          clearInterval(object.animNumberInterval);
          delete object.animNumberInterval;
          object[name] = to;
        }
      }, 10);
    }
  },
};
