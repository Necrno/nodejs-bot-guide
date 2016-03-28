var SteamCommunity = require("steamcommunity");
var SteamTotp = require("steam-totp");
var steam = new SteamCommunity();

var logOnOptions = {
  "accountName": "CharredBot04",
  "password": "myPasswordGoesHere",
  "twoFactorCode": SteamTotp.generateAuthCode("cnOgv/KdpLoP6Nbh0GMkXkPXALQ=") //this line and the comma before it can be removed if you don't have mobile auth enabled, but I'm assuming you do if you plan to trade
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

