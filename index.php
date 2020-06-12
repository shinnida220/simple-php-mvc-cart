<?php 

/**
 * Use the DS to separate the directories in other defines
 */

define('DS', DIRECTORY_SEPARATOR);
define('ROOT', dirname(__FILE__));

// echo ROOT; exit;


require_once ROOT . DS . 'app' .DS. 'init.php';

$app = new App();