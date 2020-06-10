<?php 

/**
 * Use the DS to separate the directories in other defines
 */

define('DS', DIRECTORY_SEPARATOR);
define('ROOT', dirname(dirname(__FILE__)));


require_once ROOT . DS . 'app' .DS. 'init.php';

$app = new App();

// debug(DS);
// debug(ROOT);

// require_once(ROOT . DS . 'framework' .DS. 'core' . DS . 'bootstrap.php');
