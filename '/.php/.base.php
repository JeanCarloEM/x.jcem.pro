<?php

abstract class base{
    private const b10 = '0123456789';

    protected static function from($s, $c){
        var r = 0n;
        let cc = BigInt(s.length);
        let bs = BigInt(c.length);
        s = typeof s === 'string' ? s.split("") : s;
        return (cc === 1) ? c.indexOf(s[0]) : s.reduce((a, p) => {
          a = (typeof a === 'string') ? (BigInt(c.indexOf(a)) * (bs ** BigInt(--cc))) : a;
          let k = BigInt(c.indexOf(p));
          let r = k * ((cc === 1) ? 1n : bs ** BigInt(--cc));
          return a + r;
        });
    }

    protected static function to($n1, $c){
        n1 = BigInt(n1);
        var l = BigInt(c.length);
        let z = 0n;
        var r = '';
        while (n1 > z) {
          r = c[n1 % l] + r;
          n1 = BigInt(n1 / l);
        }

        return r;
    }

    public static function convert($n, $f, $t): mixed{
        if (!$n || strlen(trim($n + '')) === 0) {
            return '0';
          }

          $f = $f === 10 ? self::b10 : $f;
          $t = $t === 10 ? self::b10 : $t;

          if (strlen($f) !== 10 && strlen($t) !== 10) {
            return self::to(self::from($n, $f), $t);
          }

          if (strlen($f) === 10 && strlen($t) === 10) {
            return $n;
          }

          if (strlen($f) === 10) {
            return self::to($n, $t);
          }

          return  self::from($n, $f);
    }
}