"use strict";

var User = {};

// User initialization...
User.init = function() 
{
  	var user = localStorage.getItem('user-info');
	if (user) 
	{
    	User.info = JSON.parse(user);
	} 
	else 
	{
    	User.info = User.create();
    	User.save();
  	}

  	User.callbacks = {};
  	return User;
};

// Save a user detsils save method ... makes use of the localStorage object
User.save = function() 
{
	localStorage.setItem('user-info', JSON.stringify(User.info));
  	return User;
};

// Delete a user details method ... 
User.delete = function() 
{
	User.info = {};
  	User.save();
  	return User;
};

// Create a random user a user details
User.create = function() 
{
	var info = {};
	info.orders = [];
	info.balance = 100;
	info.id = makeuuid(36);
	return info;
};

// Add a successful order
User.saveOrder = function(items) 
{
	var order = {}, sum = 0;
	order.items = [];
	order.initial_balance = User.info.balance;
	
	for (var i=0; i<=items.length-1; i++)
	{
		sum += item[i].price * item[i].quantity;
		order.items.push(items[i]);
	}

	order.after_balance = User.info.balance - sum;

	User.setBalance(order.after_balance);
	User.save();
};


User.setBalance = function(balance)
{
	User.info.balance = balance;
	User.save();
	return User;
}

User.getBalance = function()
{
	return User.info.balance;
}

// Event handler..
User.on = function(eventName, callback) 
{
  if (!User.callbacks[eventName]) 
  {
    User.callbacks[eventName] = [];
  }
  User.callbacks[eventName].push(callback);
  return User;
};

// Triger an event..
User.trigger = function(eventName, args)
{
  if (User.callbacks[eventName]) 
  {
    for (var i = 0; i<User.callbacks[eventName].length; i++) 
    {
      User.callbacks[eventName][i](args||{});
    }
  }
  return User;
};

// generate a random id for a random user.
function makeuuid(length) {
   	var result           = '';
   	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-';
   	var charactersLength = characters.length;
   	for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   	}
   	return result;
}

