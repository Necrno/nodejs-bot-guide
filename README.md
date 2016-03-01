# Charred's node.js Guide to Steam Bots

Hello! If you're reading this guide, you're probably interested in making your own bot for Steam. Luckily, I'm here to help! This guide will teach you some basic node.js, how the Steam API works, and how we can use that for bots.

##Who Am I?

Hi, I'm [Charred](http://steamcommunity.com/id/charredGrass/)! I'm a 17-year-old student / bot developer. I've written stuff from [Bitcoin for Keys bots](http://steamcommunity.com/id/keysforbtc) to Steam chat bots for group chats. My language of choice for this is of course node.js, and I've learned through [Codecademy](codecademy.com) and just experimenting on my own. I've built my entire Steam inventory, and then some, just by selling my code. That's over $1250 worth of code, and it's still growing!

##Preface

My intention in creating this guide is to spread the knowledge of bot making and make it easier for everyone to have a bot. Some people are paying pretty big sums of money just for a CS:GO storage bot - I want to show you how simple it is to make your own. At the time I am writing this, I don't know how much I'll be able to contribute to the guide, and I will hopefully get to share everything I know about this.

##Other Stuff You Need

 * [node.js](http://nodejs.org/), of course! Download and install the appropriate version for your computer.
 * These npm packages - [steamcommmunity](https://github.com/DoctorMcKay/node-steamcommunity), [steam-user](https://github.com/DoctorMcKay/node-steam-user), and [steam-tradeoffer-manager](https://github.com/DoctorMcKay/node-steam-tradeoffer-manager). I'll teach you how to set these up later in the guide.
 * an extra Steam account. I opted to create an extra Steam account for my bots, and I purchased CS:GO on it to remove its limited status. I'd reccomend doing this too (a $5 or more game must be purchased in order to get an API key and invite friends), however, in a pinch your main Steam account will do.
 * [Steam Desktop Authenticator](github.com/Jessecar96/SteamDesktopAuthenticator) if you plan to use the bot for trading and need to confirm offers.
 * Patience. Making a bot is time-consuming, testing it is even more time-consuming. Take your time, and don't expect to make a CSGO Jackpot clone in 15 minutes. 

##Installation

Alright, let's dive into how to set all this fun stuff up! I'll divide it up into OSes.

####Windows

1. Download and install [node.js](https://nodejs.org/). Version shouldn't matter. I use 4.3.1.
2. Installing node.js will also install npm, a package manager for node. This will make installing the packages super easy. To install the packages we need for the bot, type `npm install packagename` into command prompt. To start, we need `steamcommunity` and `steam-tradeoffer-manager`, written by [DoctorMcKay](http://github.com/DoctorMcKay). Open up command prompt (Start Menu -> cmd), navigate to where you want it installed (I did it in C://Users/Maxwell just because that's where my cmd starts, I recommend doing it in your login's main directory too.) Type `npm install steamcommunity`, wait for it to finish, and then do `npm install steam-tradeoffer-manager`
    * Alternatively, instead of figuring out exactly where you want to install, add the `-g` flag to the installation, so `npm install -g steamcommunity` will install steamcommunity globally on your computer.
3. That's all. You're done. It should look like this when the module has installed:

![Like this](http://i.imgur.com/J3r6Lv5.png "A correctly installed module.")

####Linux

Disclaimer: I don't know Linux very well. My experience is limited just to Ubuntu on my VPS.

1. My VPS came with node.js preinstalled (DigitalOcean one-click apps), so I don't know how to correctly do that. Try this: https://bitnami.com/stack/nodejs/installer
2. 

```
$ npm install -g steamcommunity
$ npm install -g steam-tradeoffer-manager
```

####Macintosh

I don't know how to use Macs well enough, sorry :P I'll learn and update the guide later.

##Intro