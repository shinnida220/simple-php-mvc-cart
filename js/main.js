"use strict";

// var getUrl = window.location;
// var baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];

function getBaseURL() 
{
  return location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/";
}

$(document).ready(function(){
  bootstrap();
});

function resetSystem()
{
  if (confirm('Are you sure?'))
  {
    localStorage.clear();
    window.location.href = getBaseURL();    
  }
}

function bootstrap()
{
  User.init();
  Cart.init();

  $('#cart-item-count,.cart-item-count').text(Cart.itemsCount());

  Cart.on('added', function(product) {
    $('#cart-item-count,.cart-item-count').text(Cart.itemsCount());
    alert("You've added " + product.item.label + " to cart.");
  });

  Cart.on('emptied', function() {
    $('#cart-item-count,.cart-item-count').text(0);
  });

  Cart.on('removed', function(product) {
    $('#cart-item-count,.cart-item-count').text(Cart.itemsCount());
  });

  $('.add-to-cart').click(function(){
    var productId = $(this).attr('rel');
    var product = getProduct(productId);
    Cart.addItem({
      id: product.id, price: product.price, quantity: 1, 
      label: product.name, image: getBaseURL()+"img/"+product.image_url
    });
  });

  if ($('#cart-area').length >0 )
  {
    $('#cart-area').html( displayCart() );
    enableDisableCartBtns();
  }
  else if($('#checkout-area').length >0)
  {
    $('#checkout-area').html( displayCheckout() );
  }

  $('#user-balance').html(Cart.currency+''+User.getBalance());
}

function enableDisableCartBtns(){
  if ($('#cart-area').length >0 )
  {
    var cartItems = Cart.getAllItems();
    if (cartItems.length > 0)
    {
      $('#btn-empty-cart,#btn-update-cart').attr('disabled', false);
      $('#btn-empty-cart').click(function()
        {
          if (confirm('Are you sure you want to proceed?'))
          {
            Cart.empty();
            $('#cart-area').html( displayCart() );
          }
      });

      $('#btn-update-cart').click(function()
        {
          updateCartItems();
          $('#cart-area').html( displayCart() );
          $('#cart-item-count,.cart-item-count').text(Cart.itemsCount());
      });
    }
  }
}

function updateCartItems()
{
  var is = $('input[type=number]');
  is.each(function(){
    var r = $(this).attr('rel');
    var item = Cart.getItem(Math.abs(r));
    if (undefined != item)
    {
      item.quantity = Math.abs($(this).val());
      Cart.updateItemInCart(item);
    }
  });
}


function displayCart()
{
  var cartItems = Cart.getAllItems();
  var html = '';
  var headerHtml = 
    '  <tr>' +
        '<th scope="col">#</th>' +
        '<th scope="col">Item</th>' +
        '<th scope="col">Quantity</th>' +
        '<th scope="col">Price</th>' +
        '<th scope="col">Sub-Total</th>' +
    '  </tr>';
  var emptyHtml = 
    '  <tr>' +
        '<th scope="col" colspan="5" align="center"> <div class="text-center">Your cart is empty.</div> </th>' +
    '  </tr>';

  var numberOfItems = cartItems.length;
  var rowHtml = '';

  if (numberOfItems > 0)
  {
    for(var i = 0; i<= numberOfItems-1; i++)
    {
      rowHtml += getRowHtml(cartItems[i], i, true);
    }

    rowHtml += 
      '<tr>' + 
        '<th scope="row"></th>' + 
        '<td>&nbsp;</td>' +
        '<td width="10%"align="right">Total</td>' + 
        '<td>'+ Cart.displayPrice(Cart.subTotal()) +'</td>' + 
        '<td> </td>' + 
      '</tr>'; 
  }
  else
  {
    rowHtml = emptyHtml;
  }

  html = 
    '<table class="table table-striped">' +
      '<thead>' +
        '<tr>' +
          '<th scope="col">#</th>' +
          '<th scope="col">Item</th>' +
          '<th scope="col">Quantity</th>' +
          '<th scope="col">Price</th>' +
          '<th scope="col">Sub-Total</th>' +
        '</tr>' +
      '</thead>' +
      '<tbody>' + rowHtml + '</tbody>' +
    '</table>';

  return html; 
}

function getProduct(id)
{
  for (var i=0; i<= products.length-1; i++)
  {
    if (products[i].id == id)
    {
      return products[i];
    }
  }
}

function getRowHtml(item, index, showInputBox)
{
  var html = 
    '<tr>' + 
      '<td scope="row" valign="top">' + (index+1) + '</td>' +
      '<td>' + 
        '<img src="'+ item.image +'" class="img-fluid" style="max-width:80px;"> <br>' +
        '<b>'+item.label +'</b>'+ 
      '</td>' +
      '<td width="10%">' + 
        (
          (showInputBox === true) ? 
          '<input type="number" width="50" name="qty" value="'+item.quantity +'" min="0" rel="'+ item.id+'" class="form-control form-control-sm" />' :
          item.quantity
        )
        +
      '</td>' + 
      '<td>' + Cart.currency + '' + item.price + '</td>' +
      '<td>' + Cart.displayPrice(item.price * item.quantity) + '</td>' +
    '</tr>';
  return html;
}

function getShippingRow()
{
  var html = '';
  if (undefined != deliveryMethods)
  {
    if (deliveryMethods.length > 0)
    {
      html += 
        '<tr>' +
          '<th scope="row"></th>' +
          '<td>Shipping Cost</td>' +
          '<td colspan="3">' ;

      for (var i=0; i<=deliveryMethods.length-1; i++)
      {
        html += 
          '<div class="form-check form-check-inline">' + 
            '<input class="form-check-input deliveryMethods" onclick="handleShipping('+deliveryMethods[i].id+')" type="radio" name="deliveryMethod" rel="'+deliveryMethods[i].id+'" value="' + deliveryMethods[i].id +'">' +
            '<label class="form-check-label">' + deliveryMethods[i].name + ' ('+ ((Math.abs(deliveryMethods[i].price_per_kg) <= 0) ? 'FREE' : (Cart.currency+''+deliveryMethods[i].price_per_kg)) + ') </label>' +
          '</div> &nbsp;';
      }

      html += 
          '</td>' +
        '</tr>';
    }
  }

  return html;
}


function displayCheckout()
{
  var cartItems = Cart.getAllItems();
  var html = '';
  var headerHtml = 
    '  <tr>' +
        '<th scope="col">#</th>' +
        '<th scope="col">Item</th>' +
        '<th scope="col">Quantity</th>' +
        '<th scope="col">Price</th>' +
        '<th scope="col">Sub-Total</th>' +
    '  </tr>';
  var emptyHtml = 
    '  <tr>' +
        '<th scope="col" colspan="5" align="center"> <div class="text-center">Your cart is empty.</div> </th>' +
    '  </tr>';

  var numberOfItems = cartItems.length;
  var rowHtml = '';

  if (numberOfItems > 0)
  {
    for(var i = 0; i<= numberOfItems-1; i++)
    {
      rowHtml += getRowHtml(cartItems[i], i, false);
    }

    // then lets show shipping info
    rowHtml += getShippingRow();

    rowHtml += 
      '<tr>' + 
        '<th scope="row"></th>' + 
        '<td>&nbsp;</td>' +
        '<td width="10%"align="right">Total</td>' + 
        '<td id="total-price-holder">'+ Cart.displayPrice(Cart.subTotal()) +'</td>' + 
        '<td> </td>' + 
      '</tr>'; 
  }
  else
  {
    rowHtml = emptyHtml;
  }

  html = 
    '<table class="table table-striped">' +
      '<thead>' +
        '<tr>' +
          '<th scope="col">#</th>' +
          '<th scope="col">Item</th>' +
          '<th scope="col">Quantity</th>' +
          '<th scope="col">Price</th>' +
          '<th scope="col">Sub-Total</th>' +
        '</tr>' +
      '</thead>' +
      '<tbody>' + rowHtml + '</tbody>' +
    '</table>';

  return html; 
}

// Method that adds the shiiping cost to 
function handleShipping(dm){
  // Check the shipping buttons
  // if free, leave price as is, if not add up to the total cost..
  if (undefined != dm)
  {
    if (Math.abs(dm) > 0)
    {
      var shipping = getShippingMethod(dm);
      var total = Cart.subTotal() + Math.abs(shipping.price_per_kg);
      $('#total-price-holder').html(Cart.displayPrice(total));
    }
  }
  
}

// Method to get selected deliveryMethod object..
function getShippingMethod(dm)
{
  var shipping = {};

  for (var i=0; i<= deliveryMethods.length-1; i++)
  {
    if (deliveryMethods[i].id == dm)
    {
      shipping = deliveryMethods[i];
      break;
    }
  }
  return shipping;
}


function processOrder(){
  // Show a modal, then submit via ajax
  var proceed = true, errorMessage = ""; 

  // 1st check that we have items in the cart.
  var items = Cart.getAllItems();
  if (items.length < 1)
  {
    proceed = false; 
    errorMessage = "There is no item in your cart. Please add items to cart to proceed.";
  }
  else 
  {
    if ( $('.deliveryMethods').is(':checked') !== true )
    {
      proceed = false; 
      errorMessage = "Please choose a shipping option.";
    }
  }

  // Get shipping method and sum up total...
  var dm = $("input[type=radio]:checked").val();
  var shipping = getShippingMethod(dm);
  var total = Math.abs(Cart.subTotal()) + Math.abs(shipping.price_per_kg);

  if (proceed !== true)
  {
    alert(errorMessage);
    return false;
  }
  else if(total > User.getBalance())
  {
    alert('You do not have enough balance');
    return false;
  }
  else
  {
    if (confirm('Are you sure you want to proceed?'))
    {
      // Show the loading screen so the user doesn't tamper the UI
      setTimeout(function()
      {
        $('#staticBackdrop').modal('show');
      }, 100);
      

      // Let's prepare the post data
      var url = getBaseURL()+'/index.php/store/completeOrder';
      var payload = { items: items, user: User.info.id, shipping: shipping.id, balance: User.getBalance() };
      console.log(payload);
      var req = $.post( url, payload );

      // Handle actual response
      req.done(function( data ) 
      {
        setTimeout(function()
        {
          $('#staticBackdrop').modal('hide');
        }, 2000);

        console.log(data);
        data = JSON.parse(data);
        console.log(data);

        if (undefined != data.status)
        {
          if (data.status == true)
          {
            // Save the order aginst this user...
            User.saveOrder({
              items: items,
              shipping: shipping.price_per_kg
            });

            // Clear the cart.
            Cart.empty();

            // Redirect the order details page..
            window.location.href = data.order_url;
          }
          else
          {
            alert(data.statusMessage);
          }
        }
        else
        {
          alert('An error has occured while processing your order. Please try again.');
        }
      });
    }
    else
    {
      return false;
    }
  }
}





