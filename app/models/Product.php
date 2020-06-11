<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

    public function ratings()
    {
        return $this->hasMany('App\Models\Rating')->get();
    }


    public function getProductsWithRatings(){
    	$products =  $this->where('is_active', 1)->get();
		foreach ($products as &$product) 
		{
			$sum = 0; $i=0;
			foreach($product->ratings() as $rate)
			{
				$sum += $rate->rating; ++$i;
			}

			$product->rating = (!empty($i)) ? $sum/$i : 0;
		}

		return $products;
    }
}