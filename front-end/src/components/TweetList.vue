<template>
<div class="wrapper">
  <div>

    <h3 class='page-item'>Discussions</h3>

    <div class="small-gap"></div>
    <div class='wrapper'>
      <form class='grid' v-on:submit.prevent="addTweet">
        <input class='input-item' v-model="addedName" placeholder="Username">
        <input class='input-item' v-model="addedPicture" placeholder="Image url (optional)">
        <textarea class='input-item' v-model="addedComment" placeholder="Write something"></textarea>
        <button class='input-item btn btn-warning' type="submit">Post</button>
      </form>
    </div>

    <div class='small-gap'></div>

    <div class='wrapper'>
      <div class='grid'>
        <div v-for="tweet in tweets.slice().reverse()" :key="tweet.id">
          <h3 class='post-item'>{{tweet.username}}</h3>
          <div class='post-item'>
            <img class='avatar post-item' :src="tweet.picture">
          </div>
          <div class='micro-gap'></div>
          <div class='post-item' v-if="tweet.owned">
            <button class='post-item' v-on:click="del(tweet)">Delete</button> 
            <button class='post-item' v-if="tweet.editing" v-on:click="edit(tweet)">Done</button>
            <button class='post-item' v-else v-on:click="edit(tweet)">Edit</button>
          </div>
          <p class='post-item' v-if="!tweet.editing">{{tweet.text}}</p>
          <textarea class='input-item' v-else v-model="tweet.text"></textarea>

          <router-link class='post-item' :to="'/tweet/' + tweet._id">
            <h5 class='post-item'>Reply</h5>
          </router-link>
          <hr>
        </div>
      </div>
    </div>

  </div>


</div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
export default {
  name: 'TweetList',
  data() {
    return {
      addedName: '',
      addedComment: '',
      addedPicture: '',
      tweets: []
    }
  },
  created() {
    this.getTweets();
  },
  methods: {

    async del(tweet) {
      try {
        await axios.delete(`/api/tweets/${tweet._id}`);
        this.getTweets();
      } catch (error) {
        //console.log(error);
      }
    },

    async edit(tweet) {
      if (tweet.editing) {
        try {
          await axios.put(`/api/tweets/${tweet._id}`, {
            username: tweet.username,
            picture: tweet.picture,
            text: tweet.text,
          });
          this.getTweets();
          tweet.editing = false;
        } catch (error) {
          //console.log(error);
        }
      }
      else
        tweet.editing = true;
    },

    async addTweet() {
      try {
        let picture = "/avatar.png";
        if (this.addedPicture)
          picture = this.addedPicture; 
        await axios.post("/api/tweets", {
          username: this.addedName,
          text: this.addedComment,
          picture: picture,
        });
        await this.getTweets();
      } catch (error) {
        //console.log(error);
      }
    },

    async getTweets() {
      try {
        const response = await axios.get("/api/tweets");
        this.tweets = response.data;
        for (var i = 0; i < this.tweets.length; i++) {
          this.tweets[i].owned = true;
          Vue.set(this.tweets[i], 'editing', false);
        }
        this.addedName = '';
        this.addedComment = '';
        this.addedPicture = '';
      } catch (error) {
        //console.log(error);
      }
    },

  },
}
</script>

<style scoped>

</style>