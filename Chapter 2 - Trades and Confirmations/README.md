#Chapter 2 - Trades and Confirmations

Now that we've logged in successfully with `steamcommunity`, it's time to start doing trades. This chapter will aim to cover trade processing (accepting trade offers, etc.) and confirmations (trade, market listings, or anything that shows up in the mobile app's confirmations tab). Confirmations are made very easy thanks to DrMcKay, so we'll start with that.

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

