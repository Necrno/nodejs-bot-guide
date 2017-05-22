# Intermission - Data Types

Now we've gotten to the point where I want to talk to you about some data types.

This chapter is optional, but it should increase your understanding of node.js.

---

## Dynamic Typing

JavaScript has something called *dynamic typing*. According to [MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Data_structures):

>JavaScript is a loosely typed or a dynamic language. That means you don't have to declare the type of a variable ahead of time. The type will get determined automatically while the program is being processed.

This is similar to languages such as Python. In JavaScript you can freely assign something of any type to the same variable. For instance:

```js
var x = "some words asdfasdfasdf";
x = 3;
```

See how we can put a String in `x`, but then change it to a Number? This wouldn't be possible in languages without dynamic typing, for instance, in Java:

```Java
String x = "some words asdfasdfasdf";
x = 3;
```

This throws a `TypeError` in Java and will not compile, because x is defined as a String and *must* be a String.

---

## Primitive Data types

If you've taken a class in another language before, you have probably heard this term. It refers to non-Object types such as Strings or Numbers. In JavaScript ES6 (which is what we'll be working with) the primitive data types are `Boolean`, `Null`, `Undefined`, `Number`, `String`, and `Symbol`.

A `Boolean` is a true or false value. Examples of when we use Boolean values are if statements. To use a Boolean value, simply use `true` or `false`. Statements such as `1 + 1 === 2` also evaluates to a Boolean (in this case, `true`).

`Null` only has one value - `null`. It is often used when trying to access an object that isn't there. For example, if a Trade Offer was cancelled, and I was storing that in a variable, I might set that variable to `null`.

`Undefined` also has one value, `undefined`. It represents a variable that hasn't been assigned yet. For instance if we type `var x;` and don't assign a value to `x`, it is `undefined` by default.

`Number` is exactly what you'd expect, it's a number. Unlike languages such as Python or Java, JavaScript only has one default number type. We can put floats (numbers with decimal places such as `3.14159`) or integers (whole numbers such as `1`) in it. It can even hold the number `Infinity` (which is super cool but probably irrelevant for us).

A `String` is a string of characters that represents text. For instance ``"dfhhahuhucf aflhshalhclhshf hkjfdahskhfjl"`` is a `String`. JavaScript String literals are written with `"double quotes"` or `"single quotes"`.

A `Symbol` is something we need not worry about. If you really want to know what it is, you can check [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) article out.

---

## Objects

You may have heard me say `Object` a lot but have no idea what I mean. MDN describes Objects better than I can:

> In JavaScript, objects can be seen as a collection of properties.

A basic example of creating an object:

```js
var x = {
    a: "foo",
    b: 7,
    c: true,
    d: "bar"
}
```

This creates an `Object` that we store in the variable `x`.  We can access its properties like so: `x.a` will evaluate to `"foo"`, `x.b` to `7`, etc.

This isn't the full capability of the `Object` type, it's just JSON which is a very easy and lightweight notation for an object.

---

## Arrays

Actually, technically, an Array is an `Object`. That's not stopping me, I'm still talking about it.

JavaScript Arrays are most similar to Python lists. You can add and remove stuff from it, altering its length, unlike Java Arrays where the length is immutable. The basic syntax for creating an Array is square brackets (`[]`). Here's an exmaple:

```js
var x = [1,2,3,4,5]; //creates an array with the numbers 1 through 5
var y = ["asdf","foo","bar"]; //creates an array with the elements "asdf", "foo", "bar"
```

Pretty simple. We can access specific elements of the array using the index (a number signifying an element's position in an array, starting at 0). For instance, `y[0]` will evaluate to `"asdf"`, `y[1]` to `"foo"`, etc. If we try to access something out of the range of the array (for instance, `y[400]`) we get `undefined`.

Arrays have many built in properties and functions - for instance you can use `.length` to get the length of the Array or `.push()` to add a new element to the Array. For more info, see [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

---

## functions

Functions are pretty important. They're essentially pieces of code that you can save in a variable. Here's an example of a functions

```js
function saySomething(text) {
  console.log("You wanted me to say: " + text);
}
```

This defines a function called `saySomething`. When we call `saySomething` like so: `saySomething("Hello")`, it will run the code in the function, setting the variable `text` to `"Hello"`.

As we've seen in the programs for the bots, functions can get more complicated. Let's look at this code excerpt from Chapter 1:

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

You may notice that we are calling the function `steam.login`, but one of the parameters we are passing it is another function! This is called a *callback*. Inside the guts of the `steam.login` function, after it has logged in (either successfully or not), it is programmed to call whatever function we gave it, passing a few parameters that represent exactly what happened (was there an error? etc.)

You also should notice that we never assigned a variable to this function. We could have done this:

```js
function afterLogin (err, sessionID, cookies, steamguard) {
  //whatever we had in the function
}
steam.login(logOnOptions, afterLogin);
```

and that would have the same effect. Giving this function without a name is called an *anonymous function*.

A few notes on functions:

* The names in the parameter list do not matter, you are just defining what the variables inside the function will be. We could replace `err` in the function above with `ASDFAEASDFA` and as long as we replaced every occurance of `err` in said function to `ASDFAEASDFA` it would be exactly the same.
* You may see `(a,b,c) => { ... }` as ES6 shorthand for `function (a,b,c) { ... }`.
