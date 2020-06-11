<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;

class Order extends Model
{
	protected $fillable = [
        'order_no', 'user', 'items', 'delivery_method_id', 'price', 'balance_before', 'balance_after'
    ];

    /**
     * Define BelongsTo Relation on Payment -> User..
     * Get the user that owns the phone.
     */
    public function delivery_method()
    {
        return $this->belongsTo('App\Models\DeliveryMethod')->first();
    }

    public function products($ids = [])
    {
        $products = Product::whereIn('id', $ids)->get();
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