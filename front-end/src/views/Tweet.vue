<template>
<div>
  <CommentList/>
</div>
</template>

<script>
import CommentList from "../components/CommentList.vue"
export default {
  name: 'Tweet',
  components: {
    CommentList
  },
  data() {
    return {
      searchText: '',
    }
  },
  computed: {
    tweet() {
      return this.$root.$data.tweets[this.$route.params.id];
    }
  },
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.search {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
}

form {
  display: table;
  width: 100%;
}

i {
  display: table-cell;
  padding-left: 10px;
  width: 1px;
}

input {
  display: table-cell;
  font-size: 20px;
  border: none !important;
  box-shadow: none !important;
  width: 100%;
  height: 40px;
}
</style>