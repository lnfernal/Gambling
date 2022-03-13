import axios from 'axios';

const API = {
  install(app) {
    // eslint-disable-next-line
    app.prototype.$api = async (query, method, isLocal = true) => {
      try {
        const response = await axios[method](isLocal ? `${app.prototype.$config.api}${query}` : query);
        return response.data;
      } catch (e) {
        console.log(e);
        return false;
      }
    };
  },
};

export default API;
