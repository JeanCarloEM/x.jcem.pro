<?php

const $opt1 = [
  "url::",
  "code:"
];

const $opt0 = \array_reduce($opt1, function($a, $c){
  $a = is_array($a) ? $a : ($a[0] . );
});

function _p($k){
  if ((\isset($_REQUEST))&&\isset($_SERVER)){
    if (\isset($_REQUEST[$k])){
      return $k
    }
  }else{
    return getopt($opt0, $opt0);
  }

  return null;
}

$url = _p('url');