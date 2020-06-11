<?php 

// namespace App\Controllers;

class Controller 
{

	protected function loadModel($modelName)
	{
		require ROOT.DS.'app'.DS.'models'.DS.$modelName.'.php';
		return new $modelName();
	}


	protected function view($view, $data = [])
	{
		extract($data);
		require_once ROOT.DS.'app'.DS.'views'.DS.$view.'.php';
	}


	// Method to check request
	public function requestMethodIs($requestType)
	{
		if (!empty($requestType))
		{
			if (is_array($requestType))
			{
				return in_array($_SERVER['REQUEST_METHOD'], $requestType);
			}
			else{
				return $_SERVER['REQUEST_METHOD'] == $requestType;
			}
		}
		return false;
	}

	public function getData()
	{
		if ($this->requestMethodIs('POST'))
		{	
			$data = $_POST;
			if(!empty($_FILES))
			{
				$data['uploadedFiles'] = $_FILES;
			}
			return $data;
		}
		else{
			return $_GET;
		}
	}
}