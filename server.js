
// example server

var express = require('express')
  , app = express();

var setupTwitterStream = require('./index')

var params = {
  track: 'javascript'
}

var twitterCreds = require('./creds.json')

setupTwitterStream(app, '/stream', params, twitterCreds)

app.listen(3030, function() {
  console.log('Listening on port 3030...')
})