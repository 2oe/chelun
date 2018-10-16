<template>
  <div id="app">
    <router-view></router-view>
     <Loading/>
  </div>
</template>

<script>
import Loading from '@/components/Loading';
export default {
  name: "app",
  data() {
    return {
    };
  },
  components:{
    Loading
  }
};
</script>

<style lang='scss'>
@keyframes scale{
  0%{
      transform: scale(1.2);
  }
  100%{
      transform: scale(1);
  }
}
.alert{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.4);
  display: flex;
  align-items: center;
  justify-content: center;
  div{
      width: 70%;
      text-align: center;
      background: #fff;
      border-radius: .2rem;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      animation: scale .3s ease;
  }
  h3{
      font-size: .4rem;
      padding: .4rem 0 .2rem;
  }
  p{
      font-size: .38rem;
      padding-bottom: .3rem;
  }
  button{
      width: 100%;
      border-top: 1px solid #ccc;
      font-size: .4rem;
      color: #4D9EFD;
      padding: .2rem 0;
      border: none;
  }
}
*{
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
  text-decoration: none;
}
html,body,#app{
  width: 100%;
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>
