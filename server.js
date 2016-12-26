/* Setting things up. */

var path = require('path'),
    Twit = require('twit'),
    config = {      
      twitter: {
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.ACCESS_TOKEN,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
      }
    },
    T = new Twit(config.twitter);

console.log(config.twitter);

function capitalize(s) {
  return s.replace(/(?:^|\s)\S/g, function(str) { return str.toUpperCase(); });
}

// katie: 128738898
// nicole: 810339430313631744, 242308086

var stream = T.stream('statuses/filter', { follow: '242308086' });
console.log(stream);
stream.on('tweet', function (tweet) {
  console.log('THIS IS A TWEET', tweet.text);
  var latestTweet = tweet.text;
  // strip out @mentions so as not to annoy people
  latestTweet = latestTweet.replace(/\B@[a-z0-9_-]+/gi, '');
  // strip out links to articles?
  var capitalizedTweet = capitalize(latestTweet);
  console.log(capitalizedTweet);
  T.post('statuses/update', { status: capitalizedTweet }, function(err, data, response) {
    if (err) {
      console.log(err);
    }
  });
});

/**********************************************************************************************/
/* The code below takes care of serving the index.html file, no need to change anything here. */

var express = require('express');
var app = express();
app.use(express.static('public'));
listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
