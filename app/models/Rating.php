<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
	//
    protected $table = 'ratings';

    protected $fillable = [
        'user_id', 'product_id', 'rating', 'is_active'
    ];


}