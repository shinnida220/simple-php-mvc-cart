"use strict";

$(document).ready(function(){
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
    var getUrl = window.location;
    var baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
    Cart.addItem({
      id: product.id, price: product.price, quantity: 1, 
      label: product.name, image: baseUrl+"/img/"+product.image_url
    });
  });

  if ($('#cart-area').length >0 )
  {
    $('#cart-area').html( displayCart() );
    enableDisableCartBtns();
  }

  $('#user-balance').html(Cart.currency+''+User.getBalance());
});


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
      rowHtml += getRowHtml(cartItems[i], i);
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

function getRowHtml(item, index)
{
  var html = 
    '<tr>' + 
      '<td scope="row" valign="top">' + (index+1) + '</td>' +
      '<td>' + 
        '<img src="'+ item.image +'" class="img-fluid" style="max-width:80px;"> <br>' +
        '<b>'+item.label +'</b>'+ 
      '</td>' +
      '<td width="10%">' + 
        '<input type="number" width="50" name="qty" value="'+item.quantity +'" min="0" rel="'+ item.id+'" class="form-control form-control-sm" />' +
      '</td>' + 
      '<td>' + Cart.currency + '' + item.price + '</td>' +
      '<td>' + Cart.displayPrice(item.price * item.quantity) + '</td>' +
    '</tr>';
  return html;
}
