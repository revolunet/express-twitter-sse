# express-twitter-sse

Fetch a single realtime stream from [twitter stream API](https://dev.twitter.com/streaming/public) and forward it to many clients using [SSE (Server Sent Events)](https://developer.mozilla.org/fr/docs/Server-sent_events).

Twitter API only allows a single simultaneous stream per oauth token, so you need one token per instance if you want to fetch multiple streams from twitter.


## Example usage

> add the streaming route to your express app

```js

var express = require('express')
var app = express()
var setupTwitterStream = require('express-twitter-sse')

var creds = {
  "consumer_key":         "afZJlXJ876FDvp2sBW899qZUk",
  "consumer_secret":      "saBm4CDAMcug93knIq987dcrBjSf06trsAJAPpwAEZfffjj",
  "access_token":         "0989865-BcMdZXKXaxmcIrbxbyuvN1POMsGVfMiJ0czvzr",
  "access_token_secret":  "i009FEFff4NH48QnODq7USyvrqyC987fffRw1lKT2ih06de"
}

var params = {
  track: 'javascript'
}

setupTwitterStream(app, '/stream', params, creds)

app.listen(3030, function() {
  console.log('Listening on port 3030...')
})

```

> On the client, just connect to the SSE stream

```js

var source = new EventSource('/stream');
source.onmessage = function (event) {
  console.log(event);
};

```