// Maxwell Chow, 03 Mar 2016
// login_complex.js
// An example script to log in to Steam - complex version.

var SteamCommunity = require("steamcommunity");

var logOnOptions = {
  "accountName": "CharredBot04",
  "password": "myPasswordGoesHere"
};

//logs in via browser
new SteamCommunity().login(logOnOptions, (err, sessionID, cookies, steamguard) => {
	if (err) {
		console.log("There was an error logging in! Error details: " + err.message);
		process.exit(1); //terminates program
	} else {
		console.log("Successfully logged in as " + logOnOptions.accountName);
	}
});