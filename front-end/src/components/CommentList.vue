<template>
<div class="wrapper" v-if="this.tweet">
  <div>

    <div class='wrapper'>
      <div class='grid'>
        <div>
          <h3 class='post-item'>{{this.tweet.username}}</h3>
          <div class='post-item'>
            <img class='avatar post-item' :src="this.tweet.picture">
          </div>
          <div class='micro-gap'></div>
          <p class='post-item'>{{this.tweet.text}}</p>
          <hr>
        </div>
      </div>
    </div>

    <h3 class='page-item'>Comments</h3>

    <div class="small-gap"></div>
    <div class='wrapper'>
      <form class='grid' v-on:submit.prevent="addComment">
        <input class='input-item' v-model="addedName" placeholder="Username">
        <input class='input-item' v-model="addedPicture" placeholder="Image url (optional)">
        <textarea class='input-item' v-model="addedComment" placeholder="Write something"></textarea>
        <button class='input-item btn btn-warning' type="submit">Add Comment</button>
      </form>
    </div>

    <div class='small-gap'></div>

    <div class='wrapper' v-if="this.comments">
      <div class='grid'>
        <div v-for="comment in this.comments.slice().reverse()" :key="comment._id">
          <h3 class='post-item'>{{comment.username}}</h3>
          <div class='post-item'>
            <img class='avatar post-item' :src="comment.picture">
          </div>
          <div class='micro-gap'></div>
          <div class='post-item' v-if="comment.owned">
            <button class='post-item' v-on:click="del(comment)">Delete</button> 
            <button class='post-item' v-if="comment.editing" v-on:click="edit(comment)">Done</button>
            <button class='post-item' v-else v-on:click="edit(comment)">Edit</button>
          </div>
          <p class='post-item' v-if="!comment.editing">{{comment.text}}</p>
          <textarea class='input-item' v-else v-model="comment.text"></textarea>

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
  name: 'CommentList',
  data() {
    return {
      addedName: '',
      addedComment: '',
      addedPicture: '',
      comments: [],
      tweet: null
    }
  },
  created() {
    this.getTweet();
    this.getComments();
  },
  methods: {

    async del(comment) {
      try {
        await axios.delete(`/api/tweets/${this.tweet._id}/comments/${comment._id}`);
        this.getComments();
      } catch (error) {
        //console.log(error);
      }
    },

    async edit(comment) {
      if (comment.editing) {
        try {
          await axios.put(`/api/tweets/${this.tweet._id}/comments/${comment._id}`, {
            username: comment.username,
            picture: comment.picture,
            text: comment.text,
          });
          this.getComments();
          comment.editing = false;
        } catch (error) {
          //console.log(error);
        }
      }
      else
        comment.editing = true;
    },

    async getTweet() {
      try {
        const response = await axios.get(`/api/tweets/${this.$route.params.id}`);
        this.tweet = response.data;
      } catch (error) {
        //console.log(error);
      }
    },

    async getComments() {
      try {
        const response = await axios.get(`/api/tweets/${this.$route.params.id}/comments`);
        this.comments = response.data;
        for (var i = 0; i < this.comments.length; i++) {
          this.comments[i].owned = true;
          Vue.set(this.comments[i], 'editing', false);
        }
        this.addedName = '';
        this.addedComment = '';
        this.addedPicture = '';
      } catch (error) {
        //console.log(error);
      }
    },

    async addComment() {
      try {
        let picture = "/avatar.png";
        if (this.addedPicture)
          picture = this.addedPicture; 
        await axios.post(`/api/tweets/${this.$route.params.id}/comments`, {
          username: this.addedName,
          text: this.addedComment,
          picture: picture,
        });
        await this.getComments();
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