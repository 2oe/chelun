<template>
  <div class="car_type">
    <p @click="allType('全部车款')">全部车款</p>
    <div>
      <ul class="tabList">
        <li v-for="(item,index) in tabs" :class="{active:index == num}" @click="tab(item,index)" :key="index">{{item}}</li>
      </ul>
      <div class="tabCon">
        <div v-for='(itemCon,index) in tabCon' :key="index">
          <p class="title">{{index}}</p>
          <div class="tabCon_item" v-for='(value,key) in itemCon' :key="key" @click="checkTab(value.market_attribute.year,value.car_name,value.car_id)">
            <li>
              <p>
                <span>{{value.market_attribute.year}}款 {{value.car_name}}</span>
                <span>{{value.market_attribute.dealer_price_min}}起</span>
              </p>
              <p class="desc">
                <span>{{value.horse_power}}马力{{value.gear_num}}档</span>
                <span>{{value.market_attribute.official_refer_price}}</span>
              </p>
            </li>
          </div>
        </div>
      </div>
    </div>
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
        tabCon: {},
        year: '2018'
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
      checkTab(year, name, id) {
        let des = year + '款  ' + name;
        sessionStorage.setItem('carID', id);
        this.$router.push({
          name: 'img',
          params: {
            des: des
          }
        })
      },
      allType(type) {
        this.$router.push({
          name: 'img',
          params: {
            des: type
          }
        })
      },
      toLink(car_id) {
        console.log(car_id)
        // this.$router.push({name:'Quotation',params:{carId:car_id,cityId:this.cityInfo.data.CityID}})
        localStorage.setItem('params', JSON.stringify({
          carId: car_id,
          cityId: this.cityInfo.data.CityID
        }))
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
      let id = localStorage.getItem('SerialID')
      this.InfoAndListById(id);
      this.getCityInfo();
      this.tabCon = this.tabConAll
    }
  }

</script>

<style scoped lang='scss'>
  .car_type {
    font-size: .4rem;
    height: 100%;
    background: #eee;

    >div {
      border-top: .1rem solid #eee;
    }

    >p {
      margin: .15rem 0;
      font-size: .34rem;
      color: #00afff;
      background: #fff;
      text-align: center;
      line-height: .8rem;
      height: .8rem;
    }
  }

  .tabList {
    line-height: .76rem;
    height: .76rem;
    background: #fff;
    overflow-x: scroll;
    display: flex;
    align-items: center;
    padding: 0 .15rem;
    font-size: .3rem;

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
      font-size: .24rem;
      color: #666;
      background: #eee;
    }
  }

  .tabCon_item {
    border-bottom: .01rem solid #f4f4f4;

    li {
      margin: 0 .2rem;
      padding: .28rem .06rem;
      box-sizing: border-box;
      height: 1.25rem;
      line-height: 1;

      p {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      p:first-child {
        font-size: .3rem;

        span:nth-child(1) {
          width: 5rem;
          display: inline-block;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          color: #000;
        }

        span:nth-child(2) {
          color: red;
          font-size: .26rem;
        }
      }

      p:nth-child(2) {
        padding-top: .16rem;
        font-size: .24rem;

        span:first-child {
          color: #b3b3b3;
        }

        span:nth-child(2) {
          color: #818181;
        }
      }
    }

  }

</style>
