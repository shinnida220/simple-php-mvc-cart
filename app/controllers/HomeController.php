<?php

class HomeController extends Controller
{
	public function index($param1 = "")
	{
		$userModel = $this->loadModel('User');
		$userModel->name = $param1;

		$this->view('home/index', ['name' => $param1]);
	}
}