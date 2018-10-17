<template>
  <div class="box">
    <header>
      <p>可向多个商家咨询最低价，商家及时回复</p>
      <img src="@/assets/icon_help.png" alt="">
    </header>
    <div class="content" ref='content'>
      <div>
        <div class="info" v-if="dealer.details" @click='selectCarType(dealer.details.car_id)'>
          <img :src="dealer.details.serial.Picture" alt="">
          <div>
            <p>{{dealer.details.serial.AliasName}}</p>
            <p>{{year?year:dealer.details.market_attribute.year}}款 {{name?name:dealer.details.car_name}}</p>
          </div>
        </div>
        <div class="write_info">
          <p class="person_info">个人信息</p>
          <div class="opea_info">
            <p>
              <span>姓名</span>
              <input type="text" placeholder="输入你的真实中文姓名" maxlength="4" ref="name">
            </p>
            <p>
              <span>手机</span>
              <input type="tel" placeholder="输入你的真实手机号码" maxlength="11" ref="tel">
            </p>
            <p>
              <span>城市</span>
              <span ref="city" @click="selectCity">{{city}}</span>
            </p>
          </div>
          <div class="quotation">
            <button @click="Quotation">询最低价</button>
          </div>
        </div>
        <div class="dealer_info">
          <p class="person_info">选择报价经销商</p>
          <ul v-for="(item,index) in dealer.list" :key="index">
            <li :class="index<3?'active':''" @click="selectTab(index)" ref="li">
              <p>
                <span>{{item.dealerShortName}}</span>
                <span>{{item.promotePrice}}万</span>
              </p>
              <p>{{item.address}}</p>
              <span>售{{item.saleRange}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="pos" v-show="showBottom">
      <button @click="Quotation">询问底价</button>
    </div>
    <!-- <Alert :msg='msg' v-show="isShow" :isShow='isShow'></Alert> -->
    <SelectCity :cityList='cityList' v-show='showCity'></SelectCity>
  </div>
</template>

<script>
  import {
    mapState,
    mapActions
  } from "vuex";
  import Alert from '@/components/Alert.js';
  import SelectCity from '@/components/SelectCity';
  export default {
    name: 'Quotation',
    data() {
      return {
        isShow: false,
        // msg: '',
        year: '',
        name: '',
        showBottom: false,
        showCity: false,
        city: '北京'
      }
    },
    components: {
      // Alert,
      SelectCity
    },
    computed: {
      ...mapState({
        dealer: state => state.dealer.dealer,
        cityList: state => state.dealer.cityList
      })
    },
    methods: {
      ...mapActions({
        dealerList: 'dealer/dealerList',
        getCityList: 'dealer/getCityList'
      }),
      selectCarType(id) {
        this.$router.push({
          path: '/type',
          query: {
            curId: id
          }
        })
      },
      selectCity() {
        this.showCity = !this.showCity;
      },
      showALert() {
        this.isShow = true
      },
      selectTab(index) {
        if (this.$refs.li[index].className) {
          this.$refs.li[index].className = ''
        } else {
          this.$refs.li[index].className = 'active'
        }
      },
      Quotation() {
        let names = /^[\u4E00-\u9FA5]+$/;
        let tels = /^1[3,5,7,8]{1}\d{9}$/;
        if (this.$refs.name.value.trim() && names.test(this.$refs.name.value)) {
          if (this.$refs.tel.value.trim() && tels.test(this.$refs.tel.value)) {
            if (this.$refs.city.innerHTML) {
              Alert('dev.chelun.com', '询价成功', () => {
                console.log('点击了确定按钮');
              })
            }
          } else {
            Alert('dev.chelun.com', '请输入正确的手机号', () => {
              console.log('点击了确定按钮');
            })
          }
        } else {
          Alert('dev.chelun.com', '请输入正确的名字', () => {
            console.log('点击了确定按钮');
          })
        }
        this.isShow = true
      }
    },
    mounted() {
      if (!this.year.length) {
        this.year = this.$route.params.year
      }
      if (!this.name.length) {
        this.name = this.$route.params.name
      }
      let params = this.$route.params.length ? this.$route.params : JSON.parse(localStorage.getItem('params'));
      this.dealerList(params)
      this.$refs.content.addEventListener('scroll', (e) => {
        if (this.$refs.content.scrollTop > document.documentElement.clientHeight / 2) {
          this.showBottom = true
        } else {
          this.showBottom = false
        }
      })
      this.getCityList()
    }
  }

</script>

<style scoped lang='scss'>
  .box {
    width: 100%;
    height: 100%;
    font-size: .25rem;
    display: flex;
    flex-direction: column;

    header {
      height: .6rem;
      line-height: .6rem;
      width: 100%;
      background: #79cd92;
      text-align: center;
      z-index: 99;
      flex-shrink: 0;

      p {
        color: #fff;
        font-size: .3rem;
        display: inline-block;
      }

      img {
        width: .3rem;
        margin-left: .1rem;
        vertical-align: -9%;
      }
    }

    .content {
      flex: 1;
      width: 100%;
      height: auto;
      background: #f4f4f4;
      overflow-y: scroll;

      >div {
        padding-bottom: 1.4rem;
        box-sizing: border-box;
      }

      .info {
        background: #fff;
        padding: .32rem .18rem .24rem;
        position: relative;
        height: 2rem;
        box-sizing: border-box;
        display: flex;

        >div {
          margin-left: .2rem;
          width: 4.3rem;

          p:first-child {
            font-size: .36rem;
            line-height: 1;
          }

          p:nth-child(2) {
            margin-top: .26rem;
            font-size: .32rem;
            line-height: 1.2;
            color: #333;
          }
        }

        img {
          width: 2.3rem;
          height: 1.41rem;
          border: 1px solid #eee;
          box-sizing: border-box;
          border-radius: 5px;
        }

        &:before {
          content: "";
          display: inline-block;
          padding-top: .16rem;
          padding-right: .16rem;
          border-top: 2px solid #ccc;
          border-right: 2px solid #ccc;
          transform: rotate(45deg);
          position: absolute;
          right: .26rem;
          top: .9rem;
        }
      }

    }
  }

  button {
    background: #00afff;
    color: #fff;
    font-size: .3rem;
    padding: .15rem .3rem;
    border-radius: .1rem;
    border: none;
  }

  .person_info {
    padding: 0 .2rem;
    height: .5rem;
    line-height: .5rem;
    font-size: .24rem;
    color: #666;
    background: #eee;
  }

  .write_info {
    .opea_info {
      background: #fff;
      padding: 0 .2rem;

      p {
        font-size: .32rem;
        height: .88rem;
        line-height: .88rem;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        color: #000;
        display: flex;

        span:nth-child(2) {
          display: inline-block;
          width: 88%;
          color: #555;
          text-align: right;
          box-sizing: border-box;

          &:after {
            content: "";
            display: inline-block;
            padding-top: .16rem;
            padding-right: .16rem;
            border-top: 1px solid silver;
            border-right: 1px solid silver;
            -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
          }
        }

        input {
          font-size: .32rem;
          padding-right: .2rem;
          width: 88%;
          text-align: right;
          box-sizing: border-box;
          color: #555;
          border: none;
          outline: none;
          -webkit-appearance: none;
        }
      }
    }
  }

  .quotation {
    background: #fff;
    text-align: center;
    padding-top: .3rem;
    padding-bottom: .28rem;

    button {
      font-size: .32rem;
      color: #fff;
      width: 80%;
      background: #3aacff;
      height: .7rem;
      border-radius: .1rem;
    }
  }

  .dealer_info {
    ul {
      background: #fff;
      padding: 0 .18rem;

      li {
        position: relative;
        padding: .26rem 0 .26rem .54rem;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        height: 1.65rem;

        &:before {
          content: "";
          display: inline-block;
          width: .32rem;
          height: .32rem;
          border-radius: 50%;
          border: 2px solid #ccc;
          box-sizing: border-box;
          position: absolute;
          left: .05rem;
          top: 50%;
          -webkit-transform: translate3d(0, -50%, 0);
          transform: translate3d(0, -50%, 0);
        }

        p:nth-child(2) {
          margin-top: .1rem;
          font-size: .24rem;
          color: #a2a2a2;

          span:first-child {
            display: inline-block;
            max-width: 4.6rem;
          }

          span:nth-child(2) {
            float: right;
          }
        }

        p:first-child {
          font-size: .3rem;

          span:last-child {
            font-size: .24rem;
            float: right;
            color: red;
          }
        }
      }

      li.active {
        &:before {
          background: #3aacff;
          border: none;
        }

        &:after {
          content: "";
          display: inline-block;
          padding-top: .17rem;
          padding-right: .1rem;
          border: 2px solid #fff;
          -webkit-transform: rotate(40deg) translate3d(0, -50%, 0);
          transform: rotate(40deg) translate3d(0, -50%, 0);
          position: absolute;
          left: .07rem;
          border-left: none;
          border-top: none;
          top: 47%;
          z-index: 99;
        }
      }
    }
  }

  .pos {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1rem;
    display: flex;
    align-items: center;
    z-index: 999;

    button {
      width: 100%;
      height: 1rem;
      background: #3aacff;
      text-align: center;
      font-size: .34rem;
      color: #fff;
    }
  }

</style>
