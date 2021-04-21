const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

// connect to the database
mongoose.connect('mongodb://localhost:27017/robo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create a scheme for tweets
const tweetSchema = new mongoose.Schema({
  username: String,
  picture: String,
  text: String
});


// Schema for comments
const commentSchema = new mongoose.Schema({
  tweet: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tweet'
  },
  username: String,
  picture: String,
  text: String
})

// Create a model for tweets
const Tweet = mongoose.model('Tweet', tweetSchema);

// Create a tweet
app.post('/api/tweets', async (req, res) => {
  const tweet = new Tweet({
    username: req.body.username,
    picture: req.body.picture,
    text: req.body.text
  });
  try {
    await tweet.save();
    res.send(tweet);
  } catch (error) {
    //console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all tweets
app.get('/api/tweets', async (req, res) => {
  try {
    let tweets = await Tweet.find();
    res.send(tweets);
  } catch (error) {
    //console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/tweets/:tweetID', async (req, res) => {
  try {
    let tweet = await Tweet.findOne({_id:req.params.tweetID});
    if (!tweet) {
        res.send(404);
        return;
    }
    res.send(tweet);
  } catch (error) {
    //console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/tweets/:tweetID', async (req, res) => {
    try {
        let tweet = await Tweet.findOne({_id:req.params.tweetID});
        if (!tweet) {
            res.send(404);
            return;
        }
        tweet.username = req.body.username;
        tweet.picture = req.body.picture;
        tweet.text = req.body.text;
        await tweet.save();
        res.send(tweet);
    } catch (error) {
        //console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/tweets/:tweetID', async (req, res) => {
    try {
        let tweet = await Tweet.findOne({_id:req.params.tweetID});
        if (!tweet) {
            res.send(404);
            return;
        }
        await Comment.deleteMany({tweet:tweet});
        await tweet.delete();
        res.sendStatus(200);
    } catch (error) {
        //console.log(error);
        res.sendStatus(500);
    }
});



const Comment = mongoose.model('Comment',commentSchema);

app.post('/api/tweets/:tweetID/comments', async (req, res) => {
    try {
        let tweet = await Tweet.findOne({_id: req.params.tweetID});
        if (!tweet) {
            res.send(404);
            return;
        }
        let comment = new Comment({
            tweet: tweet,
            text: req.body.text,
            username: req.body.username,
            picture: req.body.picture,
        });
        await comment.save();
        res.send(comment);
    } catch (error) {
        //console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/tweets/:tweetID/comments', async (req, res) => {
    try {
        let tweet = await Tweet.findOne({_id: req.params.tweetID});
        if (!tweet) {
            res.send(404);
            return;
        }
        let comments = await Comment.find({tweet:tweet});
        res.send(comments);
    } catch (error) {
        //console.log(error);
        res.sendStatus(500);
    }
});


app.put('/api/tweets/:tweetID/comments/:commentID', async (req, res) => {
    try {
        let comment = await Comment.findOne({_id:req.params.commentID, tweet: req.params.tweetID});
        if (!comment) {
            res.send(404);
            return;
        }
        comment.text = req.body.text;
        comment.username = req.body.username;
        comment.picture = req.body.picture;
        await comment.save();
        res.send(comment);
    } catch (error) {
        //console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/tweets/:tweetID/comments/:commentID', async (req, res) => {
    try {
        let comment = await Comment.findOne({_id:req.params.commentID, tweet: req.params.tweetID});
        if (!comment) {
            res.send(404);
            return;
        }
        await comment.delete();
        res.sendStatus(200);
    } catch (error) {
        //console.log(error);
        res.sendStatus(500);
    }
});

app.listen(3003);