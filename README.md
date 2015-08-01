twit-promise
============

A wrapper for the [Twit](/ttezel/twit) module that its get/post methods return the native promise

## Usage

As the Twit callback returns multiple values we use the `then` function to make things easier:

```javascript
var Twit = require('twit-promise');

var T = new Twit({
    consumer_key:         '...'
  , consumer_secret:      '...'
  , access_token:         '...'
  , access_token_secret:  '...'
})

//  tweet 'hello world!'

T.post('statuses/update', { status: 'hello world!' })
.then( function(result) {
  console.log(result.data);
  console.log(result.response.statusCode);
});
```

## API

Same as Twit but the Get and Post methods now have versions that return promises. The full Twit API is still available so streaming etc. will work as normal.

###`get(path, [params])`

Returns a promise instead of using a callback. As Twit returns two params the fulfilled value will be an array of [data, response], see example above of using the `then`.

### `post(paths, [params])`

Same usage as `get`.
