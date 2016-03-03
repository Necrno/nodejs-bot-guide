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

The `require` part tells node to use the npm module steamcommunity, and the `var SteamCommunity = ` part stores the module in a variable named SteamCommunity. The next line is:

```js
var steam = new SteamCommunity();
```

which creates a SteamCommunity object from the module. It basically allows us to use the functions of the steamcommunity module and storing that object in the `steam` variable. **You don't need to know how this works right now**, I will explain this more in depth later.

####Objects

```js
var logOnOptions = {
  'accountName': "CharredBot04",
  'password': "myPasswordGoesHere"
};
```

This creates a variable called `logOnOptions`, and stores our username and password in it. Obviously, we should replace "CharredBot04" with your account's username (the name you log in with, not display name) and "myPasswordGoesHere" with your account password (no, that's not my real password). I will explain Objects more in depth later on and what we can store in them: all we need to know is that logOnOptions has the `accountName` and `password` attributes (called *keys*).

