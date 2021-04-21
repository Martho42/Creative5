<template>
<div id="app">
  <div class="small-gap"></div>
  <div class="small-gap"></div>
  <router-link class='page-item' to="/">
    <img class='page-item logo' src="/logo.png">
  </router-link>
  <div class="small-gap"></div>
  <div class="small-gap"></div>
  <router-view />
    <em>
    <hr>
  </em>
  <footer class="page-item">
    <a class="github footer-item" href="https://github.com/Martho42/Creative5">Github</a>
    <div class='footer-item'>Hours spent: 1</div>
  </footer>
  <em>
    <hr>
  </em>
</div>
</template>


<script>
export default {
  name: 'App',
}
</script>


<style>
* {
  box-sizing: border-box;
}

a { }

.footer-item{
  margin-left: 20px;
  margin-right: 20px;
}

.page-item {
  display: flex;
  justify-content: center;
  align-content: center;
}

.small-gap {
  height: 25px;
}

.micro-gap {
  height: 10px;
}

body {
  background-color: rgb(255, 239, 228);
}

.page-item {
  display: flex;
  justify-content: center;
  align-content: center;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-content: center;
}

.grid {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  width: 350px;
}

.input-item {
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
  margin: 2px;
  width: 300px;
}


.post-item {
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
  margin: 2px;
}

.avatar {
  width: 75px;
  height: 75px;
  border-style: solid;
  border-width: 1px;
}

.logo {
  width: 350px;
}

</style>
