<template>
<div>
  <header v-text="$t('m.choosing_lang')"></header>
  <section>
    <div class="row-line"><p @click="setLanguage('zh-CN')" :class="this.$i18n.locale === 'zh-CN'?'active':''" class="circle"></p><p class="text">中文</p></div>
    <div class="row-line"><p @click="setLanguage('en-US')" :class="this.$i18n.locale === 'en-US'?'active':''" class="circle"></p><p class="text">English</p></div>
  </section>
  <footer @click="saveLanguage" v-text="$t('m.confirm')"></footer>
</div>
</template>

<script>
import {fetch, save} from '../components/store'

export default {
  name: 'foodLanguage',
  data () {
    return (
      {
        language: fetch('food_language')
      }
    )
  },
  methods: {
    setLanguage (language) {
      this.$i18n.locale = language
    },
    saveLanguage () {
      localStorage.setItem('food_lang', this.$i18n.locale)
      this.$router.push('goods')
    }
  },
  computed: {
    isChinese: function () {
      return this.language.length === 0 || this.language === 'Chinese'
    }
  }
}

</script>

<style scoped>
  header{
    width:100%;
    position: fixed;
    top:0;
    color:#f5f0f1;
    background:#8e8b8b;
    text-align:center;
    line-height: 2rem;
  }
  section{
    margin-top:3rem;
    padding:0 1rem;
  }
  .row-line{
    display: flex;
    width:100vw;
    margin:.5rem 0
  }
  .active{
    background-color:red;
  }
  .circle{
    flex:0 0 1rem;
    margin-top:.5rem;
    height:1rem;
    border-radius:1rem;
    border:1px solid black;
    line-height:2rem;
  }
  .text{
    line-height:2rem;
    margin-left:.5rem;
  }
  footer{
    position:fixed;
    bottom:0;
    width:100%;
    text-align:center;
    line-height: 2rem;
    color: #f5f0f1;
    background: #0a84ec;
  }
</style>
