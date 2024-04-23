import {
    scrypt as originalScrypt,
    randomBytes,
    timingSafeEqual,
  } from "node:crypto";
  import { promisify } from "node:util";
  
  // scrypt's asynchronicity is based on callbacks. We use Node.js' promisify
  // utility to convert it to promise-based asynchronicity.
  const scrypt = promisify(originalScrypt);
  
  /**
   * Hashes a password using scrypt.
   * @param {string} password
   * @returns {Promise<string>}
   */
  export function hashPassword(password) {
    const salt = randomBytes(16);
    return scrypt(password, salt, 64).then(
      (hash) => `${hash.toString("hex")}.${salt.toString("hex")}`,
    );
  }
  
  /**
   * Verifies a password against a hash.
   * @param {string} password
   * @param {string} hash
   * @returns {Promise<boolean>}
   */
  export function verifyPassword(password, hash) {
    const [hashValue, salt] = hash.split(".");
    const hashBuffer = Buffer.from(hashValue, "hex");
    const saltBuffer = Buffer.from(salt, "hex");
    return scrypt(password, saltBuffer, 64).then((testHash) =>
      timingSafeEqual(hashBuffer, testHash),
    );
  }