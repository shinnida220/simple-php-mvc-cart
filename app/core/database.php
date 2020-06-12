<?php

use Illuminate\Database\Capsule\Manager as Capsule;

$capsule = new Capsule;

$capsule->addConnection([
    'driver'    => 'mysql',
    'host'      => 'localhost',
    'database'  => 'abchost',
    'username'  => 'root',
    'password'  => '', 
    'charset'   => 'utf8',
    'collation' => 'utf8_unicode_ci',
    'prefix'    => '',
]);

// $capsule->addConnection([
//     'driver'    => 'mysql',
//     'host'      => 'mysql.hit.ng',
//     'database'  => 'nuelibk',
//     'username'  => 'simplemvc',
//     'password'  => 'SimpleMVC123$',
//     'charset'   => 'utf8',
//     'collation' => 'utf8_unicode_ci',
//     'prefix'    => '',
// ]);

// Setup the Eloquent ORM... (optional; unless you've used setEventDispatcher())
$capsule->bootEloquent();