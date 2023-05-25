import Params from "./.params.js";
import crypto from 'crypto';
import fs from 'fs';

export default class make {
  #params;

  constructor(req) {
    this.#params = new Params(req);
    let u = this.url();

    if (!u) {
      return;
    }

    let h = crypto.createHash('sha512').update(u).digest('hex').toLowerCase();
    let p = h.match(/.{2}/g);
    let f = p.pop();
    p = "../db/hash/" + p.join('/');

    fs.mkdirSync(p, { recursive: true });
    f = p + '/' + f + '.json';

    fs.writeFile(f, JSON.stringify([h]), { flag: 'w+' }, function (e) {
      console.log("HASH: " + h + "\n");
    });
  }

  url() {
    let u = Params.p('u', 'url');

    if (!u) {
      return false;
    }

    let r = /\s*[\/\?\#]+\s*$/ig;
    let f1 = 1;
    while (f1 || u.match(r)) {
      f1 = 0;
      u = u.trim().replace(r, '');
    }

    return u.trim();
  }
}