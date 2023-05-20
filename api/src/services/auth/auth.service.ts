import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const TOKEN_SECRET = process.env.TOKEN_SECRET ?? '';
if (!TOKEN_SECRET) {
  console.error(`Environment variable 'TOKEN_SECRET' must be defined`);
  process.exit(1);
}

// Node.js docs states that at salt must be random and at least 16 bytes long
// https://nodejs.org/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback
const SALT_LENGTH = 32;
const KEY_LENGTH = 64;
const TOKEN_EXPIRATION = '1h';

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

export function generateToken(id: string, username: string) {
  return jwt.sign(
    {
      id,
    },
    TOKEN_SECRET,
    {
      expiresIn: TOKEN_EXPIRATION,
      issuer: 'server',
      subject: username,
      audience: 'user',
    }
  );
}

export interface JWTPayload {
  iss: string;
  sub: string;
  aud: string;
  iat: number;
  exp: number;
  id: string;
}

export function validateToken(token: string) {
  return jwt.verify(token, TOKEN_SECRET) as JWTPayload;
}
