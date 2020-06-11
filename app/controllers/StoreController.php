<?php

use App\Models\Product;
use App\Models\DeliveryMethod;
use App\Models\Order;

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

	public function completeOrder()
	{
		$data = $this->getData();
		$resp = ['status' => false, 'statusMessage' => 'Process fsailed. Please try again.'];
		
		if (isset($data['items']) && count($data['items']) > 0)
		{
			$total = 0;
			$deliveryMethod = DeliveryMethod::find($data['shipping']);
			foreach ($data['items'] as $item) 
			{
				$total += ($item['price']*$item['quantity']);
			}

			$total += $deliveryMethod->price_per_kg;

			$order = new Order([
				'order_no' => generateRef(16),
				'items' => json_encode($data['items']),
				'user' => $data['user'],
				'delivery_method_id' => $data['shipping'],
				'price' => $total,
				'balance_before' => $data['balance'],
				'balance_after' => ($data['balance']-$total )
			]);

			if ($order->save()){
				$resp = ['status' => true, 'statusMessage' => 'Order Successful.', 'order_url' => '/store/orderdetails/'.$order->order_no];
			}
			else{
				$resp['statusMessage'] = 'We could not process your order. Please try again.';
			}
		}

		echo json_encode($resp);
		exit;
	}

	public function orderdetails($order_no = null)
	{
		$order = null; $delivery = null;

		if (!empty($order_no))
		{
			$order = Order::where('order_no', $order_no)->first();
			if ($order)
			{
				$items = json_decode($order->items);
				$ids = [];
				foreach ($items as $item) {
					$ids[] = $item->id;
				}
				$order->products = (new Order())->products($ids);
			}

			$delivery = $order->delivery_method();
		}

		$this->view('store/orderdetails', compact('order', 'delivery'));
	}
}