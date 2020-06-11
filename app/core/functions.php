<?php

function debug($object)
{
    // https://stackoverflow.com/a/16111687/380138
    $array = json_decode(json_encode($object, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES), true);
    
    // https://stackoverflow.com/a/1252559/380138
    $bt = debug_backtrace();
    $caller = array_shift($bt);

    if (!empty($caller) && isset($caller['line']) && isset($caller['file'])) {
        print("<b>{$caller['file']}:{$caller['line']}</b>");
    }

    print("<pre>". print_r($array, true) ."</pre>");
}

function generateRef($length = 16) 
{
    $lChars = range('a','z');
    $uChars = range('A', 'Z');
    $numbers = range(0,9);
    $chars = implode('', array_merge($lChars, $numbers,$uChars));
    $len = strlen($chars);
    $str = "";
    $rem = $length - strlen($str);
    for ($i=1; $i<=$rem; $i++){
        $str .=  $chars[mt_rand(0,$len-1)];
    }

    return $str;
}