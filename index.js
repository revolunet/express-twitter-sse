var sse = require('./sse')
var Twit = require('twit')

const twitterTimeout = 60 * 1000

function setupTwitterStream(app, path, params, creds) {  

  var T = new Twit(Object.assign({}, creds, {
    timeout_ms: twitterTimeout
  }))

  var stream = T.stream('statuses/filter', params)

  stream.on('connected', () => {
    console.log('stream connected 1')  
   // stream.start()
  })

  stream.on('disconnected', msg => {
    console.log('stream disconnected 1', msg)  
    stream.start()
  })


  app.use(sse)

  app.get(path, function(req, res) {

    res.sseSetup()

    stream.on('tweet', tweet => {
      res.sseSend(tweet)
    })

    req.on('close', () => console.log('req close'))
    req.on('error', () => console.log('req error'))
    res.on('close', () => console.log('res close'))
    res.on('error', () => console.log('res error'))

  })
}

module.exports = setupTwitterStream