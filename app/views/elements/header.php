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
                    <a class="nav-link" href="/index.php/shop/cart">Cart</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/index.php/shop/checkout">Checkout</a>
                </li>
            </ul>

            <div class="my-2 my-lg-0">
                <a class="btn btn-primary btn-sm ml-3" href="/index.php/shop/cart">
                    <i class="fa fa-shopping-cart"></i> Cart
                    <span class="badge badge-light" id="cart-item-count">0</span>
                </a>
                <a class="btn btn-danger btn-sm ml-3" href="#" onclick="resetSystem();">
                    <i class="fa fa-refresh"></i> Reset System
                </a>
            </div>
        </div>
    </div>
</nav>