import crypto from 'crypto';

// Node.js docs states that at salt must be random and at least 16 bytes long
// https://nodejs.org/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback
const SALT_LENGTH = 32;
const KEY_LENGTH = 64;

// Node.js also recommends to .normalize given password strings because some Unicode characters
// can be represented in multiple ways
// https://nodejs.org/api/crypto.html#using-strings-as-inputs-to-cryptographic-apis

export function hashPassword(
  password: string
): Promise<{ salt: string; hash: string }> {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(SALT_LENGTH).toString('hex');
    crypto.scrypt(password.normalize(), salt, KEY_LENGTH, (err, result) => {
      if (!err) {
        resolve({
          salt,
          hash: result.toString('hex'),
        });
      } else {
        reject(err);
      }
    });
  });
}

export function comparePassword(
  hash: string,
  salt: string,
  password: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password.normalize(), salt, KEY_LENGTH, (err, result) => {
      if (!err) {
        resolve(crypto.timingSafeEqual(Buffer.from(hash, 'hex'), result));
      } else {
        reject(err);
      }
    });
  });
}
