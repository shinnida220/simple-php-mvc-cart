"use strict";

var Cart = {};
Cart.currency = '&#36;';
Cart.items = [];

// Cart initialization...
Cart.init = function() 
{
  var items = localStorage.getItem('cart-items');
	if (items) 
	{
    Cart.items = JSON.parse(items);
	} 
	else 
	{
    Cart.items = [];
  }

  Cart.callbacks = {};
  return Cart;
};


// Cart save method ... makes use of the localStorage object
Cart.save = function() 
{
	localStorage.setItem('cart-items', JSON.stringify(Cart.items));
  Cart.trigger('saved');
  return Cart;
};

// Cart empty method..
Cart.empty = function() 
{
  Cart.items = [];
  Cart.trigger('emptied');
  Cart.save();
  return Cart;
};

// Adds item to the cart
Cart.addItem = function(item) {
  if (!item.quantity) item.quantity = 1;
  var index = Cart.indexOfItem(item.id);
  if (index === null) 
  {
    Cart.items.push(item);
  }
  else 
  {
    Cart.items[index].quantity += item.quantity;
  }
  Cart.removeEmptyLines();
  if (item.quantity > 0) 
  {
    Cart.trigger('added', {item: item});
  }
  else
  {
    Cart.trigger('removed', {item: item});
  }
  Cart.save();
  return Cart;
};

// Add To a specific item from the cart..
Cart.updateItemInCart = function(item) 
{

  var index = Cart.indexOfItem(item.id);
  if (index === null) 
  {
    return Cart;
  }
  else 
  {
    Cart.items[index].quantity = item.quantity;
  }

  Cart.removeEmptyLines();
  Cart.save();
  return Cart;
};

// Remove empty items from the cart..
Cart.removeEmptyLines = function() 
{
  var newItems = [];
  for (var i = 0; i<Cart.items.length; i++)
  {
    if (Cart.items[i].quantity>0) newItems.push(Cart.items[i]);
  }
  Cart.items = newItems;
  return Cart;
};


// Remove a specific item from the cart..
Cart.decreaseItemFromCart = function(itemId) 
{

  var index = Cart.indexOfItem(item.id);
  if (index === null) 
  {
    return Cart;
  }
  else 
  {
    Cart.items[index].quantity -= item.quantity;
  }

  Cart.removeEmptyLines();
  Cart.save();
  return Cart;
};

// Remove a specific item from the cart..
Cart.removeItem = function(itemId) 
{
  var newItems = [];
  for (var i = 0; i<Cart.items.length; i++)
  {
    if (Cart.items[i].id != itemId) 
    { 
      newItems.push(Cart.items[i]);
    }
  }
  Cart.items = newItems;
  Cart.save();
  return Cart;
};

// Find the index if an item in the cart
Cart.indexOfItem = function(id) 
{
  for (var i = 0; i<Cart.items.length; i++) 
  {
    if (Cart.items[i].id === id) return i;
  }
  return null;
};

// Sum up all items in the cart
Cart.itemsCount = function()
{
  var cnt = 0;
  for (var i = 0; i < Cart.items.length; i++)
  {
    cnt += Cart.items[i].quantity;
  }
  return cnt;
};

Cart.displayPrice = function(price) 
{
  if (price===0)
  { 
    return 'Free';
  }

  var decimals = 2;
  return Cart.currency + price.toFixed(decimals);
};

Cart.individualItemPrice = function(index) {
  return Math.abs(Cart.items[index].price * Cart.items[index].quantity);
};

Cart.subTotal = function()
{
  var sum = 0;
  for (var i = 0; i<Cart.items.length; i++) 
  {
    sum += Math.abs(Cart.individualItemPrice(i));
  }
  return sum;
};


Cart.getAllItems = function() 
{
  return Cart.items;
};

Cart.getItem = function(id) 
{
  var index = Cart.indexOfItem(id);
  if (null != index && undefined != index)
  {
    return Cart.items[index];
  }
  return null;
};

// Event handler..
Cart.on = function(eventName, callback) 
{
  if (!Cart.callbacks[eventName]) 
  {
    Cart.callbacks[eventName] = [];
  }
  Cart.callbacks[eventName].push(callback);
  return Cart;
};


// Triger an event..
Cart.trigger = function(eventName, args)
{
  if (Cart.callbacks[eventName]) 
  {
    for (var i = 0; i<Cart.callbacks[eventName].length; i++) 
    {
      Cart.callbacks[eventName][i](args||{});
    }
  }
  return Cart;
};