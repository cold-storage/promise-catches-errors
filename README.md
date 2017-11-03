# Promise Catches Errors

TLDR; Always use promises if you care about errors.

You may say, "Just write correct code, and you won't have to worry about
it." And I suppose that's true, but in the heat of the battle, code isn't
always correct. It's the errors that are thrown that alert you to that fact.

I was happily coding away when I realized an error was being eaten.

```js
throw new Error('two ERROR');
```

My original code was like `index.js`. Some bad code was throwing an error
in the same situation as the forced `two ERROR` above. But, the error was being
eaten.

Turns out the same error in the same spot doesn't get eaten when calling
`readFile` in the `one` function. It only gets eaten when calling
`gmaps.geocode`. I tried some other async methods and the error wasn't eaten
with them either.

I don't know why matters which async method is called prior to an error.
The error should not be eaten either way.

**Here's how you call the code**

```
./index.js < some.csv
./promise.js < some.csv
./await.js < some.csv
```

## index.js

`index.js` is where we see the problem. Even though the rest of the code in
`index.js` is correct, the `two ERROR` is eaten when calling `gmaps.geocode`
in the `one` function.

It's not eaten if you call `readFile` in the one function.

## promise.js

Here we turn both functions in the `one` method into promises. If you do
that, the error is not eaten for either. That's good.

## await.js

This is a different version of the promise style using the new `async` and
`await` functionality. There's not much difference between `promise.js` and
`await.js` except that the `one` function actually has the promise resolved
by time you get to the `console.error('JUNK', junk);` line.