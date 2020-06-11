<!DOCTYPE html>
<html>
<head>
	<title>Mini eCommerce Shop</title>
	<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

	<link rel="stylesheet" href="/css/main.css">
</head>
<body>
	<?php require_once ROOT.DS.'app'.DS.'views'.DS.'elements'.DS.'header.php'; ?>

	<section class="our-publication pt-100 pb-70">
	    <div class="container">
	        <div class="section-header">
	            <i class="fa fa-book text-primary"></i>
	            <h2>eCommerce Store</h2>
	            <p>Welcome to our store. Please add products to cart and checkout when you are done.</p>
	        </div>

	        <div class="row">
	        	<div class="mx-auto col-md-8 mb-4">
				    <h4 class="d-flex justify-content-between align-items-center mb-3">
				        <span class="text-muted">Order No #<?= $order->order_no; ?> </span>
				        <span class="">Bal:  
				        	<span title="Your balance before and after this order">
				        		<?= '$'.round($order->balance_before,2) .' / $'. round($order->balance_after,2)?></span>
				        </span>
				    </h4>
				    
				    <div class="mb-4">
					    <table class="table table-striped">
					        <thead>
					            <tr>
					                <th scope="col">#</th>
					                <th scope="col">Item</th>
					                <th scope="col">Quantity</th>
					                <th scope="col">Price</th>
					                <th scope="col">Sub-Total</th>
					            </tr>
					        </thead>
					        <tbody>
					        	<?php
					        		foreach (json_decode($order->items) as $i => $item) {
					        	?>
					            <tr>
					                <td scope="row" valign="top">
					                	<?= ($i+1); ?>
					                </td>
					                <td>
					                	<img src="<?= $item->image; ?>" class="img-fluid" style="max-width:80px;"> <br>
					                	<b><?= $item->label; ?></b>
					                </td>
					                <td width="10%">
					                	<?= $item->quantity; ?>
					                </td>
					                <td>
					                	$<?= $item->price; ?>
					                </td>
					                <td>$<?= $item->price*$item->quantity; ?></td>
					            </tr>
					        	<?php } ?>
					            
					            <tr>
					                <th scope="row"></th>
					                <td>Shipping Cost</td>
					                <td colspan="3">
					                    <?= $delivery['name'] . 
					                    ' ('. (
					                    	(abs($delivery['price_per_kg']) > 0) ? 
					                    		('$'.$delivery['price_per_kg']) : 'FREE'
					                    ). ')'; 
					                    ?>
					                   	&nbsp;
					                </td>
					            </tr>
					            <tr>
					                <th scope="row"></th>
					                <td>&nbsp;</td>
					                <td width="10%">Total</td>
					                <td id="total-price-holder"><?= '$'.round($order->price,2); ?></td>
					                <td> </td>
					            </tr>
					        </tbody>
					    </table>
					</div>
    			</div>
	        </div>
	    </div>
	</section>

	<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="/js/user.js"></script>
	<script type="text/javascript" src="/js/cart.js"></script>
	<script type="text/javascript" src="/js/main.js"></script>

</body>
</html>