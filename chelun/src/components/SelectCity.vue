<template>
  <div class="city_mark">
    <div class="province">
      <div class="local">
        <p>自动定位</p>
        <p>北京</p>
      </div>
      <div class="list">
        <p>省市</p>
        <ul>
          <li v-for="(item,index) in cityList" :key="index" :data-id='item.CityID' @click="selectCtiy">{{item.CityName}}</li>
        </ul>
      </div>
    </div>
    <div class="city" v-show="isShowCityList">
      <ul id="cityList" @click="tabBox">
        <li v-for="(item,index) in proCity" :data-id='item.CityID' :key="index" @click="tabItem(item.CityName,$event)">{{item.CityName}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
    mapState,
    mapActions
  } from "vuex";
  export default {
    data(){
      return {
        isShowCityList: false
      }
    },
    props:{
      cityList:{
        type: Array,
        default: []
      }
    },
    computed: {
      ...mapState({
        proCity: state=>state.dealer.proCity
      })
    },
    methods:{
       ...mapActions({
        getProCity: 'dealer/getProCity'
      }),
      selectCtiy(e){
        this.getProCity(e.target.dataset.id);
        this.isShowCityList = !this.isShowCityList;
      },
      tabBox(e){
        if(e.target.nodeName == 'UL'){
          this.isShowCityList = false
        }
      },
      tabItem(name,e){
        this.$parent.city = name
        this.$parent.showCity = false
        this.isShowCityList = false
      }
    },
    mounted(){
    }
  }
</script>

<style scoped lang='scss'>
.city_mark{
    background: #fff;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    .province{
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      overflow-y: scroll;
      p:first-child {
          height: .4rem;
          line-height: .4rem;
          font-size: .24rem;
          padding-left: .2rem;
          background: #f4f4f4;
      }
      p:nth-child(2) {
        padding-left: .4rem;
        font-size: .28rem;
        height: .8rem;
        line-height: .8rem;
        background: #fff;
      }
    }
    .city{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 101;
      background: rgba(0,0,0,.6);
    }
}
.province{
  .province p {
    height: .4rem;
    line-height: .4rem;
    font-size: .24rem;
    padding-left: .2rem;
    background: #f4f4f4;
  }
  ul{
    li{
      padding-left: .3rem;
      font-size: .28rem;
      height: .8rem;
      line-height: .8rem;
      border-bottom: 1px solid #eee;
      box-sizing: border-box;
      margin-left: .1rem;
      position: relative;
    }
  }
}
.city{
  ul{
    // transform: translate3d(30%,0,0);
    // height: 100%;
    // overflow-y: scroll;
    // -webkit-overflow-scrolling: touch;
    // background: #fff;
    // -webkit-transform: translate3d(100%,0,0);
    // transform: translate3d(100%,0,0);
    // transition: -webkit-transform .2s ease;
    // transition: transform .2s ease;
    // transition: transform .2s ease,-webkit-transform .2s ease;
  }
  #cityList{
    width: 70%;
    background: #fff;
    position: absolute;
    right: 0;
    height: 100%;
    overflow-y: scroll;
    li{
      padding-left: .3rem;
      font-size: .28rem;
      height: .8rem;
      line-height: .8rem;
      border-bottom: 1px solid #eee;
      box-sizing: border-box;
      margin-left: .1rem;
    }
  }
  .active{
  }
}
</style>