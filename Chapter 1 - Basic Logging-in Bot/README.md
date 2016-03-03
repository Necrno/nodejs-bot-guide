# Chapter 1 - Logging In

Alright, time to get started learning some node.js with Steam. The first lesson here will be logging into Steam with the bot using DoctorMcKay's node-steamcommunity.

You can go to the `login.js` file in this directory to get the code I'll use for this lesson, I'll also put it here.

```js
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
```

Let's break it down step by step!

####Modules

node.js comes with npm, a package manager for node. This allows us to use the packages we installed earlier. To use the `steamcommunity` module we installed, we do the first line:

```js
var SteamCommunity = require('steamcommunity');
```