import {Crypt} from 'hybrid-crypto-js';
import {v4 as uuid} from 'uuid';
import {decode} from 'js-base64';
import Config from '../Config';
const {en_k1, en_k2} = Config;
const ENC_V = 'hybrid-crypto-js_0.2.4'; // enc_v = encrypted version

export const getEncryptedProps = props => {
  try {
    let entropy = 10;
    let crypt = new Crypt({entropy: entropy});

    let message = JSON.stringify(props);
    // decode key and merge
    let k1 = decode(en_k1);
    let k2 = decode(en_k2);
    let kToEnc = `-----BEGIN PUBLIC KEY-----\r\n${k1}${k2}\r\n-----END PUBLIC KEY-----\r\n`;

    if (kToEnc) {
      let encrypted = crypt.encrypt(kToEnc, message);
      encrypted = JSON.parse(encrypted);
      if (encrypted && encrypted.v == ENC_V) {
        delete encrypted.v;
        encrypted['v_rem'] = uuid();
      }
      encrypted = JSON.stringify(encrypted);
      return {fep: encrypted};
    } else {
      return props;
    }
  } catch (e) {
    return props;
  }
};
