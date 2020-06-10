<!DOCTYPE html>
<html>
<head>
	<title>Mini eCommerce Shop</title>
	<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

	<link rel="stylesheet" href="/css/main.css">
</head>
<body>
	<nav class="navbar navbar-expand-md navbar-light" style="background-color: #e3f2fd;">
	    <div class="container">
	        <a class="navbar-brand" href="/">Mini eCommerce Shop</a>
	        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
	            <span class="navbar-toggler-icon"></span>
	        </button>

	        <div class="collapse navbar-collapse justify-content-end" id="navbarsExampleDefault">
	            <ul class="navbar-nav m-auto">
	                <li class="nav-item m-auto">
	                    <a class="nav-link" href="/">Home</a>
	                </li>
	                <li class="nav-item">
	                    <a class="nav-link" href="/shop/cart">Cart</a>
	                </li>
	                <li class="nav-item">
	                    <a class="nav-link" href="/shop/checkout">Checkout</a>
	                </li>
	            </ul>

	            <form class="form-inline my-2 my-lg-0">
	                <a class="btn btn-primary btn-sm ml-3" href="/shop/cart">
	                    <i class="fa fa-shopping-cart"></i> Cart
	                    <span class="badge badge-light" id="cart-item-count">0</span>
	                </a>
	            </form>
	        </div>
	    </div>
	</nav>

	<section class="our-publication pt-100 pb-70">
	    <div class="container">
	        <div class="section-header">
	            <i class="fa fa-book text-primary"></i>
	            <h2>eCommerce Store</h2>
	            <p>Welcome to our store. Please add products to cart and checkout when you are done.</p>
	        </div>
	        
	        <div class="row">
	        	<?php foreach ($products as $product) { ?>
	            <div class="col-sm-6 col-lg-3"> 
	                <div class="single-publication">
	                    <figure>
	                        <a href="#">
	                            <img src="img/<?= $product->image_url; ?>" class="img-fluid" alt="Product Image">
	                        </a>

	                        <ul>
	                            <li><a href="#" title="Add to Favorite"><i class="fa fa-heart"></i></a></li>
	                            <li><a href="#" title="Add to Compare"><i class="fa fa-refresh"></i></a></li>
	                            <li><a href="#" title="Quick View"><i class="fa fa-search"></i></a></li>
	                        </ul>
	                    </figure>

	                    <div class="publication-content">
	                        <h3><a href="#"><?= $product->name; ?></a></h3>
	                        <ul>
	                        <?php 
	                        	$x = 0;
	                        	for($x =1; $x <= $product->rating; $x++) {
							        echo '<li><i class="fa fa-star"></i></li>';
							    }
							    if (strpos( $product->rating,'.')) {
							        echo '<li><i class="fa fa-star-half-o"></i></li>';
							        $x++;
							    }
							    while ($x<=5) {
							        echo '<li><i class="fa fa-star-o"></i></li>';
							        $x++;
							    }
							?>
	                        </ul>
	                        <h4 class="price">$<?= round($product->price,2); ?></h4>
	                    </div>

	                    <div class="add-to-cart" rel="<?= $product->id; ?>">
	                        <a href="#" class="default-btn">Add to Cart</a>
	                    </div>
	                </div>
	            </div>
	            <?php } ?>
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