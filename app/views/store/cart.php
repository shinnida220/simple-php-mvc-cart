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
				        <span class="text-muted">Your cart</span>
				        <span class="">Balance: <span id="user-balance"></span></span>
				    </h4>
				    
				    <div class="mb-4" id="cart-area"></div>

					<div class="text-center">
						<a href="/" class="btn btn-primary">Continue Shopping</a> 
						&nbsp;
						<button type="button" class="btn btn-danger" id="btn-empty-cart" disabled="disabled">Empty Cart</button>
						&nbsp;
						<button type="button" class="btn btn-info" id="btn-update-cart" disabled="disabled">Update Cart</button>
						&nbsp;
						<a href="/index.php/shop/checkout" class="btn btn-success">Checkout</a>
					</div>
    			</div>
	        </div>
	    </div>
	</section>

	<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="/js/user.js"></script>
	<script type="text/javascript" src="/js/cart.js"></script>
	<script type="text/javascript">
		var products = <?= json_encode($products); ?>;
	</script>
	<script type="text/javascript" src="/js/main.js"></script>
</body>
</html>