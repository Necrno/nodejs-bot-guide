#Steam Errors

Because Steam has such amazing error handling, I'll talk about the many many types of errors you can get from Steam.

Here's a [full list](https://github.com/charredgrass/node-backpacktf/blob/2d9619b63ed88a6b9e1707ea87f50e1b9273c09b/values.js#L136) of error codes, some of which are deprecated, stolen from SteamKit (a .NET framework for Steam bots). For a short explanation of error codes not listed here, checkout [SteamErrors.com](http://steamerrors.com/).

 * 11 - `InvalidState` Happens with Trade Offers. This error will occur if you try to do something to an offer that has already been acted on. For instance, if you try to accept an already accepted offer, it should say "There was an error accepting this offer (11)" or something of the likes.
 * 28 - `AlreadyRedeemed`
