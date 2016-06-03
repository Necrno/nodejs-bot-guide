#Steam Errors

Because Steam has such amazing error handling, I'll talk about the many many types of errors you can get from Steam.

Here's a [full list](https://github.com/charredgrass/node-backpacktf/blob/2d9619b63ed88a6b9e1707ea87f50e1b9273c09b/values.js#L136) of error codes, some of which are deprecated, stolen from SteamKit (a .NET framework for Steam bots). For a short explanation of error codes not listed here, checkout [SteamErrors.com](http://steamerrors.com/).

##Trade Offer Errors

 * 11 - `InvalidState` This error will occur if you try to do something to an offer that is "Invalid" For instance, if you try to accept an already accepted offer, it should say "There was an error accepting this offer (11)" or something of the likes. Or it could just be a corrupted offer by Steam that usually just needs to be cancelled and recreated.
 * 28 - `AlreadyRedeemed` Another error when acting on an invalid trade offer. If you try to accept/decline a trade offer that you've already accepted or declined, you should get this error.
 
##General Errors

This is a list of errors you may run into with `steamcommunity` or just in general.

* **Access Denied** A common `steamcommunity` error. Happens when Steam is down sometimes. More importantly, if you do not have access to an API key (for instance if your account is [limited](https://support.steampowered.com/kb_article.php?ref=3330-IAGK-7663)) this error will *always* occur when doing something requiring an API key.
