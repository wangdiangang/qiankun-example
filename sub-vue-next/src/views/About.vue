<!--
 * @Author: 五道杠
-->
<!--
 * @Author: 五道杠
-->
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>
      <button @click="changeState">修改state</button>
    </div>
    <ul>
      <li v-for="i in 200" :key="i">哈哈哈哈{{i}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  methods:{
    changeState(){
      console.log(123);
    }
  }
}
</script>