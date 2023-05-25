const B = BigInt;
const W = console.warn;

const biSQRT = (base, root) => {
  if (typeof base !== 'bigint' || typeof root !== 'bigint') throw new Error("Arguments must be bigints.");

  let s = base + 1n;
  let k1 = root - 1n;
  let u = base;
  while (u < s) {
    s = u;
    u = ((u * k1) + base / (u ** k1)) / root;
  }
  return s;
};

const base = async (n, f, t) => {
  if (!n || (n + '').trim().length === 0) {
    return '0';
  }
  return ((b10) => {
    /* bigInt -> char */
    let to = (n1, c) => {
      n1 = B(n1);
      var l = B(c.length);
      let z = 0n;
      var r = '';
      while (n1 > z) {
        r = c[n1 % l] + r;
        n1 = B(n1 / l);
      }

      return r;
    };

    /* char -> bigInt */
    let from = (s, c) => {
      var r = 0n;
      let cc = B(s.length);
      let bs = B(c.length);
      s = typeof s === 'string' ? s.split("") : s;
      return (cc === 1) ? c.indexOf(s[0]) : s.reduce((a, p) => {
        a = (typeof a === 'string') ? (B(c.indexOf(a)) * (bs ** B(--cc))) : a;
        let k = B(c.indexOf(p));
        let r = k * ((cc === 1) ? 1n : bs ** B(--cc));
        return a + r;
      });
    };

    f = f === 10 ? b10 : f;
    t = t === 10 ? b10 : t;

    if (f.length !== 10 && t.length !== 10) {
      return to(from(n, f), t);
    }

    if (f.length === 10 && t.length === 10) {
      return n;
    }

    if (f.length === 10) {
      return to(n, t);
    }

    var r = from(n, f);

    return (r >= Number.MAX_SAFE_INTEGER) ? r : Number(r);
  })('0123456789');
};

export { biSQRT, base };