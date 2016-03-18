# Charred's node.js Guide to Steam Bots

[![Codacy Badge](https://api.codacy.com/project/badge/grade/61493e5f37b245a4acb9e72a05a01cf3)](https://www.codacy.com/app/charredgrass/nodejs-bot-guide)
[![Liscence](https://img.shields.io/badge/license-GPLv3-blue.svg)](https://github.com/charredgrass/nodejs-bot-guide/blob/master/LICENSE "GNUv3 Software Liscence")

Hello! If you're reading this guide, you're probably interested in making your own bot for Steam. Luckily, I'm here to help! This guide will teach you some basic node.js, how the Steam API works, and how we can use that for bots.

##Who Am I?

Hi, I'm [Charred](http://steamcommunity.com/id/charredGrass/)! I'm a 17-year-old student / bot developer. I've written stuff from Bitcoin for Keys bots to Steam chat bots for group chats. My language of choice for this is of course node.js, and I've learned through [Codecademy](http://codecademy.com) and just experimenting on my own. I've built my entire Steam inventory, and then some, just by selling my code. That's over $1250 worth of code, and it's still growing!

##Preface

My intention in creating this guide is to spread the knowledge of bot making and make it easier for everyone to have a bot. Some people are paying pretty big sums of money just for a CS:GO storage bot - I want to show you how simple it is to make your own. At the time I am writing this, I don't know how much I'll be able to contribute to the guide, and I will hopefully get to share everything I know about this.

##Other Stuff You Need

 * [node.js](http://nodejs.org/), of course! Download and install the appropriate version for your computer.
 * These npm packages - [steamcommmunity](https://github.com/DoctorMcKay/node-steamcommunity), [steam-user](https://github.com/DoctorMcKay/node-steam-user), and [steam-tradeoffer-manager](https://github.com/DoctorMcKay/node-steam-tradeoffer-manager). I'll teach you how to set these up later in the guide.
 * an extra Steam account. I opted to create an extra Steam account for my bots, and I purchased CS:GO on it to remove its limited status. I'd reccomend doing this too (a $5 or more game must be purchased in order to get an API key and invite friends), however, in a pinch your main Steam account will do.
 * [Steam Desktop Authenticator](http://github.com/Jessecar96/SteamDesktopAuthenticator) if you plan to use the bot for trading and need to confirm offers.
 * A phone capable of receiving SMS texts if you plan on using the bot for trading.
 * Patience. Making a bot is time-consuming, testing it is even more time-consuming. Take your time, and don't expect to make a CSGO Jackpot clone in 15 minutes. 

##Installation

Alright, let's dive into how to set all this fun stuff up! I'll divide it up into OSes.

####Windows

#####1. Download and install [node.js](https://nodejs.org/). Version shouldn't matter. I use 4.3.1.
#####2. Installing node.js will also install npm, a package manager for node. This will make installing the packages super easy. To install the packages we need for the bot, type `npm install packagename` into command prompt. To start, we need `steamcommunity` and `steam-tradeoffer-manager`, written by [DoctorMcKay](http://github.com/DoctorMcKay). Open up command prompt (Start Menu -> cmd), navigate to where you want it installed (I did it in C://Users/Maxwell just because that's where my cmd starts, I recommend doing it in your login's main directory too.) Type `npm install steamcommunity`, wait for it to finish, and then do `npm install steam-tradeoffer-manager`
    * Alternatively, instead of figuring out exactly where you want to install, add the `-g` flag to the installation, so `npm install -g steamcommunity` will install steamcommunity globally on your computer.
#####3. That's all. You're done. It should look like this when the module has installed:

![Like this](http://i.imgur.com/J3r6Lv5.png "A correctly installed module.")

####Macintosh

#####1. Download the Mac OS X Installer (.pkg) from https://nodejs.org/en/download/
#####2. Open the installer - you might have to restart your computer when you finish
#####3. Install the required modules

```
$ npm install -g steamcommunity
$ npm install -g steam-tradeoffer-manager
```

####Linux

#####1. Install node.js using npm

```
$ sudo yum install npm
$ sudo apt-get install npm

$ sudo npm install -g n

$ sudo n stable
```

#####2. Install the required modules
```
$ npm install -g steamcommunity
$ npm install -g steam-tradeoffer-manager
```

##Intro

####What is node.js?

You may have heard of *JavaScript*, a web development language to run scripts in browser. From the node.js website, node is "a JavaScript runtime built on Chrome's V8 JavaScript engine". We can use node.js to make web apis, manage a server, or manage bots like we'll learn here. 

##Setting it up

At this point you should have installed node.js and installed the modules. Now I'll walk you through setting up a Steam account to work with it.

In order to do chat, all you need is to disable auth codes (via email, phone, etc.) and enter your user/pass into the bot.

In order to trade, you need mobile auth enabled in order to avoid trade holds. And in order to automate the generation of auth codes and auto-confirming, we need two values known as *shared secret* and *identity secret*. These are generated by the Steam mobile app when mobile auth is activated. As far as I know, there are two methods to get these values:

* http://forums.backpack.tf/index.php?/topic/45995-guide-how-to-get-your-shared-secret-from-ios-device-steam-mobile/

and

* [Steam Desktop Auth](http://github.com/Jessecar96/SteamDesktopAuthenticator) aka SDA.

I won't explain the first one, simply because I don't know how it works. If you already have authentication set up on an iOS device and want to use that account for the bot it should be easy. However, if you own an Android device or haven't set up authentication on the bot account yet, SDA is preferable. (An alternative for Android is also [this](https://www.reddit.com/r/SteamBot/comments/3w5zwb/info_get_your_2fa_codes_from_android_no_root/))

####Setting up the Authenticator with SDA

1. Install and run SDA.
2. Connect your Steam account and follow all the basic steps.
3. Disable encryption by going to Setup Encryption and leaving your new encryption key blank.
4. Go to the maFiles folder where you installed SDA. It should have a file called `76561198058896751.maFile`, replacing `76561198058896751` with the Steam64 ID of the account you're setting up mobile auth on.
5. Open this file up in a text editor. If you're new to using a text editor other than Notepad I recommend Notepad++.
6. Find where it says `shared_secret` and `identity_secret` in the file. It will say something such as `"shared_secret": "mOdR6e5ij19v2xTpDjQMfK04Hvo="` in one location and something similar with `identity_secret` in another. These are the values of shared and identity secret. Save them. They will not change unless you remove authentication from this account.

##Finishing Up

At this point in the guide you should have your bot accounts's username and password. Hopefully you've bought a $5 or more game on the account, so it isn't stuck at level 0 and looks super sketchy. (I personally like to buy CS:GO during a Steam Sale and level my bots to level 10 for the text box.) If you plan to make a trade bot, you should also have the shared and identity secret for your account.

[Next Chapter - Basic Login Bot](./Chapter 1 - Basic Logging-in Bot/README.md)
