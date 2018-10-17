<template>
<div class="mark">
    <div class="alert"  v-show="isShow?'false':'true'">
      <h6>{{msg}}</h6>
      <button @click="Show">确定</button>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
      }
    },
    props:{
      msg: {
        type:String,
        default: ''
      },
      isShow: {
        type:Boolean
      }
    },
    methods:{
      Show(){
        this.$parent.isShow = !this.$parent.isShow;
        
      }
    }
  }
</script>

<style scoped lang='scss'>
.mark{
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.25);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
 
}
.alert{
  width: 70%;
  height: 2rem;
  background: #fff;
  border-radius: .1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  h6{
    font-size: .3rem;
    font-weight: normal;
  }
}
.alert button{
  padding: .1rem .4rem;
  border-radius: .2rem;
  border: none;
}
</style>