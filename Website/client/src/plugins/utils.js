/* eslint-disable */

export default {
  install(app) {
    app.prototype.$script = (src) => {
      const script = document.createElement('script');
      script.setAttribute('src', src);
      document.head.appendChild(script);
    };
  },
};
