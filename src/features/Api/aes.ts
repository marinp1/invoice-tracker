import pbkdf2 from 'pbkdf2';
import aesjs from 'aes-js';

class Crypto {
  key_256: Buffer | null;

  constructor() {
    this.key_256 = null;
  }

  // TODO: hash password!
  initialise(password: string, salt: string = 'nosalt') {
    this.key_256 = pbkdf2.pbkdf2Sync(password, salt, 1, 256 / 8, 'sha512');
  }

  encrypt = (content: string): string => {
    if (!this.key_256) {
      throw new Error('Key not set!');
    }
    const asBytes = aesjs.utils.utf8.toBytes(content);
    const aesCtr = new aesjs.ModeOfOperation.ctr(this.key_256);
    const encryptedBytes = aesCtr.encrypt(asBytes);
    const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    return encryptedHex;
  };

  decrypt = (content: string): string => {
    if (!this.key_256) {
      throw new Error('Key not set!');
    }
    const encryptedBytes = aesjs.utils.hex.toBytes(content);
    const aesCtr = new aesjs.ModeOfOperation.ctr(this.key_256);
    const decryptedBytes = aesCtr.decrypt(encryptedBytes);
    const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    return decryptedText;
  };
}

const cryptoModule = new Crypto();

export default cryptoModule;
