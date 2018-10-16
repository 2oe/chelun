<template>
  <div class="box">
    <div class="showImg" @click='toImg(infoList.SerialID)'>
      <img :src="infoList.CoverPhoto">
      <span>{{infoList.pic_group_count}}张照片</span>
    </div>
    <div class="show_list">
      <div class="show_left">
        <h5 v-if="infoList.market_attribute">{{infoList.market_attribute.dealer_price}}</h5>
        <p v-if="infoList.market_attribute">指导价:{{infoList.market_attribute.official_refer_price}}</p>
      </div>
      <router-link to='/quotation'>询问底价</router-link>
    </div>
    <ul class="tabList">
      <li v-for="(item,index) in tabs" :class="{active:index == num}" @click="tab(item,index)" :key="index">{{item}}</li>
    </ul>
    <div class="tabCon">
      <div v-for='(itemCon,index) in tabCon' :key="index">
        <p class="title">{{index}}</p>
        <div class="tabCon_item" v-for='(value,key) in itemCon' :key="key">
          <h6>{{value.market_attribute.year}}款 {{value.car_name}}</h6>
          <p class="desc">{{value.horse_power}}马力{{value.gear_num}}档</p>
          <p class="show_price"><span>{{value.market_attribute.official_refer_price}}</span><span class='start_price'>{{value.market_attribute.dealer_price_min}}起</span></p>
          <p class="link">
            <a @click="toLink(value.car_id)">询问底价</a>
          </p>
        </div>
      </div>
    </div>
    <router-link to='/quotation' class="linkTo">
      <h6>询问底价</h6>
      <p>本地经销商为您报价</p>
    </router-link>
  </div>
</template>
<script>
  import {
    mapState,
    mapActions
  } from "vuex";
  export default {
    data() {
      return {
        num: 0,
        tabCon: {}
      }
    },
    computed: {
      ...mapState({
        infoList: state => state.detail.infoAndListById,
        tabs: state => state.detail.tabs,
        tabConAll: state => state.detail.tabConAll,
        tabList: state => state.detail.tabList,
        cityInfo: state => state.detail.cityInfo
      })
    },
    methods: {
      ...mapActions({
        InfoAndListById: "detail/InfoAndListById",
        getYear: 'detail/getYear',
        getCityInfo: 'detail/getCityInfo'
      }),
      // 跳转到车型详情
      toLink(car_id) {
        console.log(car_id)
        this.$router.push({
          name: 'Quotation',
          params: {
            carId: car_id,
            cityId: this.cityInfo.data.CityID
          }
        })
        localStorage.setItem('params', JSON.stringify({
          carId: car_id,
          cityId: this.cityInfo.data.CityID
        }))
      },
      // 跳转到图片页
      toImg(SerialID) {
        this.$router.push({
          name: 'img',
          params: {
            id: SerialID
          }
        });
      },
      tab(item, index) {
        this.num = index;
        if (item == '全部') {
          this.tabCon = this.tabConAll
        } else {
          this.getYear(item)
          this.tabCon = this.tabList
        }
      }
    },
    updated() {
      this.tabCon = Object.keys(this.tabCon).length ? this.tabCon : this.tabConAll;
    },
    mounted() {
      localStorage.setItem('SerialID', this.$route.query.SerialID);
      let id = localStorage.getItem('SerialID');
      this.InfoAndListById(id);
      this.getCityInfo();
    }
  }

</script>

<style scoped lang='scss'>
  .box {
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    font-size: .4rem;
    background: #f4f4f4;
    padding-bottom: 2rem;

    .back {
      position: fixed;
      top: .1rem;
      left: .1rem;
      background: #fff;
      font-size: .3rem;
      padding: .1rem .2rem;
      border-radius: .1rem;
      z-index: 999;
    }
  }

  .showImg {
    width: 100%;
    padding: .05rem;
    background: #fff;
    position: relative;
    height: 3.29rem;
    overflow: hidden;

    img {
      width: 100%;
      width: 100%;
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      position: absolute
    }

    span {
      position: absolute;
      bottom: .3rem;
      right: .3rem;
      color: #fff;
      padding: 1px .1rem;
      border-radius: .2rem;
      background: rgba(0, 0, 0, .6);
      font-size: .24rem;
    }
  }

  .show_list {
    display: flex;
    background: #fff;
    align-items: center;
    padding: .2rem;
    justify-content: space-between;
    border-bottom: .1rem solid #eee;

    a {
      background: #00afff;
      color: #fff;
      font-size: .3rem;
      padding: .15rem 1rem;
      border-radius: .1rem;
    }

    .show_left {
      font-size: .28rem;

      h5 {
        font-size: .4rem;
        color: red;
        font-weight: normal;
      }
    }
  }

  .tabList {
    display: flex;
    height: .8rem;
    align-items: center;
    padding: 0 .15rem;
    background: #fff;
    font-size: .35rem;

    li {
      padding: 0 .2rem;
      text-align: center;
      line-height: .8rem;
    }

    .active {
      color: #3aacff
    }
  }

  .tabCon {
    background: #fff;

    .title {
      padding: 0 .2rem;
      height: .5rem;
      line-height: .5rem;
      font-size: .26rem;
      color: #999;
      background: #f4f4f4
    }
  }

  .tabCon_item {
    padding: .2rem;
    border-bottom: .1rem solid #f4f4f4;

    .desc {
      font-size: .26rem;
      color: #999;
    }

    h6 {
      font-size: .3rem;
      line-height: 2.5;
      font-weight: normal;
    }
  }

  .show_price {
    width: 100%;
    text-align: right;
    font-size: .25rem;
    border-bottom: .01rem solid #eee;

    .start_price {
      margin-left: .2rem;
      font-size: .3rem;
      line-height: 2;
      color: red;
    }
  }

  .link {
    width: 100%;
    text-align: center;
    line-height: 2;

    a {
      display: block;
      margin-top: .1rem;
      width: 100%;
      height: 100%;
      color: #00afff;
      font-size: .32rem;
    }
  }

  .linkTo {
    height: 1rem;
    background: #3aacff;
    font-size: .28rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;

    h6 {
      font-size: .32rem;
      font-weight: normal;
    }
  }

</style>
