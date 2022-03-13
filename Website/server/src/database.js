import MySQL from 'mysql';

import Config from './Config';

const Pool = MySQL.createPool(Config.MySQL);

const query = async (sql, arg = []) => {
  return new Promise(resolve => {
    Pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        resolve(false);
      } else {
        connection.query(sql, arg, (err, result) => {
          if (err) {
            console.log(err);
            resolve(false);
          } else resolve(result);
        });
        connection.release();
      }
    });
  });
}

module.exports = {
  query: query,
}