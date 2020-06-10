<?php

use App\Models\Product;

class StoreController extends Controller
{
	public function index()
	{
		$products = (new Product)->getProductsWithRatings();
		$this->view('store/index', ['products' => $products]);
	}


	public function cart()
	{
		$products = (new Product)->getProductsWithRatings();
		$this->view('store/cart', ['products' => $products]);
	}


	public function checkout()
	{

	}

	public function orderdetails()
	{

	}
}