<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
  html{
    font-size: 50px;
  }
  @media screen and(min-width: 320px)and(max-width: 359px){
    html{
      font-size: 12.8px;
    }
  }
  @media screen and(min-width: 360px)and(max-width: 374px){
    html{
      font-size: 14.4px;
    }
  }
  @media screen and(min-width: 375px)and(max-width: 385px){
    html{
      font-size: 20px;
    }
  }
  @media screen and(min-width: 386px)and(max-width: 392px) {
    html {
      font-size: 30px;
    }
  }
  @media screen and(min-width: 393px)and(max-width: 400px){
    html{
      font-size: 30px;
    }
  }
  @media screen and(min-width: 401px)and(max-width: 414px){
    html{
      font-size: 30px;
    }
  }
  @media screen and(min-width: 750px)and(max-width: 799px){
    html{
      font-size: 30.72px;
    }
  }
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  @import "https://unpkg.com/reset-css@3.0.0/reset.css";
</style>
