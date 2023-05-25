import "./.common.js"

export default class Params {
  static #req = 0;

  constructor(req) {
    Params.#req = req;
  }


  static p(k, kf) {
    try {
      if (!Params.req) {
        return Params.cli(k, kf);
      }

      return Params.get(k, kf);
    } catch (error) {

    }
  }

  static get(k, kf) {
    if (!Params.#req) return false;

    if ((Params.#req.params.indexOf(k) >= 0) || (Params.#req.param.has(k))) return Params.#req.params[k];

    if ((Params.#req.params.indexOf(kf) >= 0) || (Params.#req.params.has(kf))) return Params.#req.params[kf];
  }

  static cli(k, kf) {
    if (Params.#req || !process || !process.has('argv')) {
      return false;
    }

    let p = process.argv.join(' ');
    var r = new RegExp("\\\ \\\-(" + k + (typeof kf === 'string' ? "|\\\-" + kf : '') + ")(?<v>\\\s*\\\"[^\\\"]+\\\"|\\\s*\\\'[^\\\']+\\\'|\\\s*[^\\\-\\\"\\\']+)?");
    let x = p.match(r);


    if (!x || !Array.isArray(x)) return false;

    if ((typeof x.has('groups')) && (x.groups['v']) && (x.groups.v + '').trim().length > 0) return (() => {
      let rr = " " + x.groups.v;
      r = /(^\s*\"|\"\s*$|^\s*\'|\'\s*$)/ig;

      let f1 = 1;
      while (f1 || rr.match(r)) {
        f1 = false;
        rr = rr.trim().replace(r, '');
      }

      return rr;
    })();

    return true;
  }
}