<?php

use App\Models\Product;
use App\Models\DeliveryMethod;

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
		$products = (new Product)->getProductsWithRatings();
		$deliveryMethods = json_encode( (new DeliveryMethod())->all());
		$this->view('store/checkout', ['products' => $products, 'deliveryMethods' => $deliveryMethods]);
	}

	public function completeOrder(){

	}

	public function orderdetails()
	{

	}
}