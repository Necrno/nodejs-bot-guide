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
		console.log("Successfully logged in as " + logOnOptions.accountName);
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

####Logging In

```js
steam.login(logOnOptions, function(err, sessionID, cookies, steamguard) {
	if (err) {
		console.log("There was an error logging in! Error details: " + err.message);
		process.exit(1); //terminates program
	} else {
		console.log("Successfully logged in as " + logOnOptions.accountName);
		steam.chatLogon();
	}
});
```

Now this is the code that actually does stuff. `login` is a method specific to `steamcommunity`, so we call it off the `steam` variable we made earlier by using `steam.login`. The stuff in parentheses after login are called *parameters*, we give this to the function login to tell it what to do. By passing it the logOnOptions object we created earlier, we tell SteamCommunity what user and password to log in with. The next parameter given to login is called a *callback function*. By giving this to login, we are telling our program that after it has attempted to login to Steam, it will run the code here. Let's take a closer look at that code.

```js
function(err, sessionID, cookies, steamguard) {
	if (err) {
		console.log("There was an error logging in! Error details: " + err.message);
		process.exit(1); //terminates program
	} else {
		console.log("Successfully logged in as " + logOnOptions.accountName);
		steam.chatLogon();
	}
}
```

So this is saying that once we have logged into steam (or alternatively, tried and failed), we will get back some data which is passed into the callback function. We name them *err*, *sessionID*, *cookies*, and *steamguard*. According to the [documentation for this method](http://github.com/DoctorMcKay/node-steamcommunity/wiki/SteamCommunity#logindetails-callback), in order, the data passed gives you:

 * an error, if it occured
 * our session ID
 * browser cookies
 * steamguard data

 which corresponds to the *err*, *sessionID*, *cookies*, and *steamguard* things we had in the function header. So if we need to access the sessionID, we simply access the variable `sessionID`. Note that the names are arbitrary - we could have changed the name `sessionID` to `fooBar` and when logging in, the session id data would be assigned to that variable assuming it's in the same order in the function header.

 Let's take at the actual code inside the function now. The first line is:

 ```js
 if (err) {
 ```

 which checks if an error occured. If there was an error encountered logging in, we will have something in this variable and the if statement will run, otherwise `err` will be *undefined* (also known as *null): which means it has no value assigned to it. So if there's an error we will run this (the code in the if statement):

 ```js
console.log("There was an error logging in! Error details: " + err.message);
process.exit(1); //terminates program
```

As you might have been able to tell, this piece of code prints the error details to console and then terminates the program (there's nothing we can do if we didn't log in.) Let's now look at what happens if we *don't* have an error. 

```js
console.log("Successfully logged in as " + logOnOptions.accountName);
steam.chatLogon();
```

This is also very simple - it prints to console that we successfully logged in, and logs into chat.

####Running the code

Now that we understand the code, we can now run it. Replace my username and password with yours. Let's run the code now! It's kind of OS specific to run it, so let's break it down again by OS.

#####Windows

Navigate to wherever you saved the `login.js` file in this directory in command prompt. Find the path to that. For instance, I have it saved in `C:\Users\Maxwell\Desktop\Code Tutorial\node-js-bot-guide\Chapter 1 - Basic Logging-in Bot\`. `cd` to this path by typing this in command prompt:

```
cd "C:\Users\Maxwell\Desktop\Code Tutorial\node-js-bot-guide\Chapter 1 - Basic Logging-in Bot\"
```

Obviously replacing my path to the file with yours. Now, to run the file, you simply type `node login.js` into command prompt, telling node to run the file named login.js.

#####Macintosh

I still don't know about this - if someone could add to this I'd be grateful.

#####Linux

Navigate to wherever you saved the `login.js` file in this directory in terminal. Find the path to that. For instance, I have it saved in `/home/Maxwell/Code Tutorial`. `cd` to this path by typing this in terminal:

```
cd "/home/Maxwell/Code Tutorial"
```

Obviously replacing my path to the file with yours. Now, to run the file, you simply type `node login.js` into terminal, telling node to run the file named login.js.

####Errors

You're bound to face errors, and if you've properly set up Steam Mobile Authentication in the previous chapter, you *should* hit an error! Let's run through all the stuff that could go wrong!


#####Cannot find module: steamcommunity

If you get this error, you installed your modules wrong, go back to the previous chapter and install it properly.

#####There was an error logging in! Error details: SteamGuard

This error or the SteamGuardMobile version of this means steamguard was set up, and we can't log in without the auth code from the mobile authenticator!! Woohoo! It worked! This error is good, we'll talk about how to generate an auth code from shared secret in the next chapter!


