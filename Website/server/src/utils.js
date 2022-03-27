import sha256 from 'js-sha256';

const Utils = {};

Utils.random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const secretChars = '1234567890QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm,.<>/?;:\'"\\|-=_+*!@#$%^&()`~[]{}';
Utils.generateSecret = (length = 64) => {
  let secret = '';
  for (let i = 0; i < length; i += 1) {
    secret += secretChars[Utils.random(0, secretChars.length - 1)];
  }
  return secret;
}
Utils.makeHash = (secret, number) => {
  return sha256(secret + number);
}

export default Utils;