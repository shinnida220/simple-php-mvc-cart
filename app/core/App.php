<?php

// namespace App\Core;

class App 
{
	protected $controller = 'StoreController';
	protected $action = 'index';
	protected $params = [];

	public function __construct()
	{
		$url = $this->parseUrl();

		# If we have a valid controller requested..
		if (isset($url[0]) && !empty($url[0]) && strtoupper($url[0]) != 'CONTROLLLER' && file_exists(ROOT.DS.'app'.DS.'controllers'.DS. ucfirst($url[0]).'Controller.php'))
		{
			$this->controller = ucfirst($url[0]).'Controller';
			unset($url[0]);
		}

		require_once ROOT.DS.'app'.DS.'controllers'.DS.$this->controller.'.php';
		$this->controller = new $this->controller;

		# If we have a valid action requested within the controller...
		if (isset($url[1]) && !empty($url[1])) 
		{
			if (method_exists($this->controller, $url[1]) )
			{
				$this->action = $url[1];
			}
			else
			{
				die('<h1>404! Page Not Found</h1>');
				// exit;
			}
			unset($url[1]);
		}


		# Lets set the other params..
		$this->params = !empty($url) ? array_values($url) : [];

		# Finally dispatch this request..
		call_user_func_array([$this->controller, $this->action], $this->params);
	}


	/**
	* This method passes the url to give us the $controller, $action & $params..
	* Very simple just for this simple MVC purpose
	*/
	public function parseUrl()
	{
		if (isset($_SERVER['REQUEST_URI']))
		{
			$url = str_replace("/index.php", "", $_SERVER['REQUEST_URI']);
			return explode('/', filter_var( trim($url, '/'), FILTER_SANITIZE_URL) );
		}
	}
}