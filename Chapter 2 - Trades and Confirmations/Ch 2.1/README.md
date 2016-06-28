#Chapter 2.1 - The Donation Bot

Time to learn something quite useful - a donation bot. It will check its trade offers, and if any of them will give items to the bot without the bot losing any items, it will accept it.

Let's check out [trade.js](./trade.js) in this directory. It's almost exactly the same as the one in the previous chapter, except it will no longer accept *any* offer.

```js
if (toGive.length == 0 || offer.partner.getSteamID64() === "76561198058896751") {
  offer.accept(function(err) {
    if (err) {
      console.log("Error accepting offer: " + err.message);
    } else {
      console.log("Successfully accepted an offer.");
    }
  });
}
```

This is the part that replaces the `offer.accept` from the last chapter. To understand the code and DoctorMcKay's modules better, let's talk about how this works in more detail. When the bot sees a trade offer, it will emit the `newOffer` event and call our `processTrade` function and passes the trade offer as an object as an argument. This object contains several arrays, variables, and functions, for example, it has an `accept` method that we call to accept the trade.

One of these arrays is `itemsToGive`, which I've renamed to simply `toGive` (I usually do this because I prefer typing `toGive` to `offer.itemsToGive` over and over again). We use this to see if the bot is giving up any items in the trade. If the array is empty, and therefore `toGive.length` is equal to 0, then we can accept the donation.

I've also added an admin feature to this - that's what the `offer.partner` thing is. This basically retrieves the Steam64 ID of the person sending the offer. If it's `"76561198058896751"` it will always accept, regardless of the trade. ("76561198058896751" is me, you can change that obviously.)
