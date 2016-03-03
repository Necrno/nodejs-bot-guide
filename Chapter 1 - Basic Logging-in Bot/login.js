var SteamCommunity = require('steamcommunity');
var steam = new SteamCommunity();

var logOnOptions = {
  'accountName': "CharredBot04",
  'password': "myPasswordGoesHere"
};

//logs in via browser
steam.login(logOnOptions, function(err, sessionID, cookies, steamguard) {
	if (err) {
		console.log("There was an error logging in! Error details: " + err.message);
		process.exit(1); //terminates program
	} else {
		console.log("Successfully logged in as " + accountName);
		steam.chatLogon();
	}
});