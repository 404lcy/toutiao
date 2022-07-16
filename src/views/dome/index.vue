<template>
  <div>
    <h1>dome</h1>
    <hr>
    <h1>{{count}}</h1>
    <h1>{{userinfor.name}}</h1>
    <hr>
    <van-field type='number' v-model.number="num"></van-field>
    <button @click="count1">count++</button>
    <button @click="namer">changName</button>
    <button @click="count2">changCount</button>
  </div>

</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      num:0
    }
  },
computed:{
...mapState(['count','userinfor'])
},
  methods: {
    count1(){
      this.$store.commit("changCount")
    },
    namer(){
      this.$store.commit('changName')
    },
    count2(){
      this.$store.commit('changCount2',this.num)
    }
  },

}
</script>

<style>

</style>
