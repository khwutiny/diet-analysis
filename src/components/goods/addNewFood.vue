<template>
  <div :showEnable="showEnable" class="msg">
    <div class="empty" @click="closedialog"></div>
    <ul class="dialog">
      <input class="title" v-model="newFood.name"/><br/>
      <input class="type" v-model="newFood.type"/>
      <li v-for="(item,index) in newFood.items" class="item" :key="index">
        <i class="icon-minus" @click="item_remove(item)">-</i>
        <input v-model="item.name" placeholder="输入所需材料的名称" type="text" maxlength="10"/>
        <i>:</i>
        <input v-model="item.number" type="number" maxlength="5" placeholder="输入所需材料的数量" class="number"/>
        <i>g</i>
      </li>
      <div class="icon-add" @click="addItem">+</div>
      <footer @click="saveNewFood">保存</footer>
    </ul>
</div>
</template>

<script>
import {AXIOS} from '../http-common'
export default {
  name: 'addNewFood',
  props: {
    showEnable: {
      type: Boolean
    }
  },
  data () {
    return {
      newFood: {
        name: '菜单名',
        type: '菜单类型',
        items: [
          {
            name: '素材1',
            number: 1
          }
        ]
      }
    }
  },
  methods: {
    addItem () {
      let item = {name: '素材', number: 1}
      this.newFood.items.push(item)
    },
    item_remove (item) {
      let _items = this.newFood.items
      if (_items.length > 1) {
        _items.splice(_items.indexOf(item), 1)
      }
    },
    saveNewFood () {
      AXIOS.post('api/addCook', this.newFood).then((res) => {
        if (res.data.code === 0) {
          alert('保存成功')
          this.closedialog()
        } else {
          alert('保存失败，请重试')
        }
      })
    },
    closedialog () {
      this.$emit('hidePanel')
    }
  }

}
</script>

<style scoped>
  .msg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.75);
    display: flex;
    justify-content: center;
    z-index: 200;
  }
  .empty{
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.1);
  }
  .dialog{
    margin-top:2.5rem;
    background: white;
    padding: 1rem;
    z-index:2;
  }
  .title{
    width: 35vw;
    font-size:1.3rem;
    padding: 5px;
    text-align: center;
    background:rgb(250, 255, 189);
  }
  .item {
    display: flex;
  }
 input{
    flex-grow: 1;
    flex-shrink: 0;
    width: 30vw;
    font-size:.8rem;
    line-height:1rem;
    color:black;
    background:rgb(250, 255, 189);
    border-radius: 5px;
    margin:8px 10px;
    padding: 8px;
  }
  .icon-minus{
    border-radius: 50%;
    width:1.25rem;
    height:1.25rem;
    border:2px solid black;
    font-size:1.75rem;
    line-height:0.75rem;
    text-align: center;
  }
  .item .number{
    text-align: right;
  }
  .item i{
    margin-top:14px;
  }
  .icon-add{
    font-size:2rem;
    float:right;
  }

  footer {
    position: fixed;
    bottom: 0;
    width: 17.38rem;
    text-align: center;
    font-size: 1.5rem;
    line-height: 2.5rem;
    color: #f5f0f1;
    background: #0a84ec;
    margin-left:-1rem;
  }
</style>
