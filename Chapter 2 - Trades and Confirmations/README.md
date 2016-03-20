#Chapter 2 - Trades and Confirmations

Now that we've logged in successfully with `steamcommunity`, it's time to start doing trades. This chapter will aim to cover trade processing (accepting trade offers, etc.) and confirmations (trade, market listings, or anything that shows up in the mobile app's confirmations tab). Confirmations are made very easy thanks to DrMcKay, so we'll start with that.

##Confirmations

Check out [confirm.js](./confirm.js), located in this directory.

```js
var SteamCommunity = require('steamcommunity');
var steam = new SteamCommunity();

var logOnOptions = {
  'accountName': "CharredBot04",
  'password': "myPasswordGoesHere",
  'twoFactorCode': SteamTotp.generateAuthCode("cnOgv/KdpLoP6Nbh0GMkXkPXALQ="); //this line and the comma before it can be removed if you don't have mobile auth enabled, but I'm assuming you do if you plan to trade
};

var identitySecret = ""; //get this in the intro!

//logs in via browser
steam.login(logOnOptions, function(err, sessionID, cookies, steamguard) {
	if (err) {
		console.log("There was an error logging in! Error details: " + err.message);
		process.exit(1); //terminates program
	} else {
		console.log("Successfully logged in as " + logOnOptions.accountName);
		steam.chatLogon();
	}
	steam.startConfirmationChecker(10000, identitySecret);
});
```

Looks pretty similar to the login script we looked at in Chapter 1, doesn't it? Let's point out the key differences:

```js
var identitySecret = "";
```

Here we should just replace the empty string (that's what the `""` is called) with the IdentitySecret value you should have gotten in the intro. For instance, I replace the `""` with `"0VdouZcF+CpFDGdIUPFzgP5bLuY="`. This line is just storing the IdentitySecret as a variable so we can use it later.

```js
steam.startConfirmationChecker(10000, identitySecret);
```

This is the good stuff. `steamcommunity` has a built in confirmations checker, this line activates it. The first parameter (the `10000`) denotes how often the script will check confirmations, in this case, it's every 10000 ms (10 seconds). Our `identitySecret` variable is also given to it, which tells the module to act on the confirmations using our IdentitySecert - that is, it will accept any confirmation it sees. 

**Warning** Doing this will accept any confirmations on the given account while the script is logged on. Use at your own risk.

Well, that's it for confirmations - simple, isn't it? Now moving on to the more complex part - trades.

##Trade Handling

Let's take a look at [trade.js](./trade.js), an extension of the confirmations script.

```js
var SteamCommunity = require('steamcommunity');
var steam = new SteamCommunity();
var TradeOfferManager = require('steam-tradeoffer-manager');
var manager = new TradeOfferManager({
  "domain": "charredgrass.github.io", //for api key uses
  "language": "en",
  "pollInterval": 30000
});

var logOnOptions = {
	'accountName': "CharredBot04",
	'password': "myPasswordGoesHere",
	'twoFactorCode': SteamTotp.generateAuthCode("cnOgv/KdpLoP6Nbh0GMkXkPXALQ="); //this line and the comma before it can be removed if you don't have mobile auth enabled, but I'm assuming you do if you plan to trade
};

var identitySecret = "";

//logs in via browser
steam.login(logOnOptions, function(err, sessionID, cookies, steamguard) {
	if (err) {
		console.log("There was an error logging in! Error details: " + err.message);
		process.exit(1); //terminates program
	} else {
		console.log("Successfully logged in as " + logOnOptions.accountName);
		steam.chatLogon();
		manager.setCookies(cookies, function(err) {
			if (err) {
				console.log(err);
				process.exit(1);
			}
		});
	}
	steam.startConfirmationChecker(10000, identitySecret); //Auto-confirmation enabled!
});

manager.on('newOffer', processTrade);

function processTrade(offer) {
	console.log("New trade from " + offer.partner);
	offer.accept(function(err) {
		if (err) {
			console.log("Error accepting offer: " + err.message);
		} else {
			console.log("Successfully accepted an offer.");
		}
	});
}
```

That's quite a bit of new stuff. 

At the top, this was added:

```js
var TradeOfferManager = require('steam-tradeoffer-manager');
var manager = new TradeOfferManager({
  "domain": "charredgrass.github.io", //for api key uses
  "language": "en",
  "pollInterval": 30000
});
```

The `require` bit tells the computer to use the steam-tradeoffer-manager module, and the part below that creates the trade manager (which we are holding in a variable named `manager`). You can see that it requires a little info. `domain` can be any web domain, I use my free github domain but it doesn't actually matter, this is just needed to get the API key from Steam. `language` is set to English, you obviously speak English if you're reading this guide. `pollInterval` tells the manager to check every this many milliseconds - in this case 30000 ms (= 30 seconds). 

In the login section, we see that this has been added:

```js
manager.setCookies(cookies, function(err) {
	if (err) {
		console.log(err);
		process.exit(1);
	}
});
```

This gives any needed cookies to the trade manager.

Now for the part that handles the trades using the manager!

```js
manager.on('newOffer', processTrade);

function processTrade(offer) {
	console.log("New trade from " + offer.partner);
	offer.accept(function(err) {
		if (err) {
			console.log("Error accepting offer: " + err.message);
		} else {
			console.log("Successfully accepted an offer.");
		}
	});
}
```

The first line is something new. What's `manager.on` mean? It's an *event*. The trade offer manager will emit an event when it sees a new trade, and this line tells the machine that when this event is emitted (specifically called the `newOffer` event), node should run `processTrade`, passing any data received from the emitted event into the function.

`processTrade` is a function (I'll probably sometimes slip and call it a method, since I'm used to Java). It's a bit of code that will be run whenever we tell it to. In this case, it's when we receive a new trade offer. The `offer` part is the info that is passed from the manager about the offer. When the function is called, it will do some stuff with the offer it is given by the manager. More info about the offer passed to us can be found in the steam-tradeoffer-manager documentation.

```js
console.log("New trade from " + offer.partner);
offer.accept(function(err) {
	if (err) {
		console.log("Error accepting offer: " + err.message);
	} else {
		console.log("Successfully accepted an offer.");
	}
});
```

The first line, (the `console.log` statement) prints to the console that we've received a new trade, from `offer.partner`. Unfortunately, offer.partner gives us a SteamID object, which is then translated to a Steam2 Rendered ID, which isn't very useful. Fortunately, we can make it say something more useful, such as the partner's Steam64 ID. Unfortunately, I'm going to show you how to do that later (or maybe, you can look at the SteamID documentation and try it yourself!)

The next part is `offer.accept`. This tells the trade manager to, well, accept the offer. This means that when trade.js is being run, it will accept **any** trade it is given (and confirm it!) so be careful when running this script and don't leave it running on an account with valuables in it. The part inside of accept is just error handling - if it encounters an error when accepting the trade, it will say so, otherwise it will tell you in console that it was a success.

##So what now?

Well, now you've hopefully gotten to a point where you can run something that accepts any trades. You could run this on an alternate account, make your main its only friend, set the account's inventory to friendsonly so only you can send it trade offers, and boom, storage bot! Since any offers will be accepted, it should be a fast way to transfer items you want to keep in storage (case investments, crappy 3 cent skins) into your alt.

 