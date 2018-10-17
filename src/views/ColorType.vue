<template>
  <div class="color">
    <p @click="ToImgAll('全部颜色')">全部颜色</p>
    <div>
      <p class="c_type">
        <!-- 日期选择 -->
        <span v-for="(item,index) in keys" :key="index" :class="num == index?'active':''" @click="addClass(index)">{{item}}</span>
      </p>
      <!-- 颜色列表 -->
      <ul>
        <li v-for="(item,index) in list" :key="index" @click="ToImg(item.Name,item.ColorId)">
          <span :style="`background:${item.Value}`"></span>
          {{item.Name}}
        </li>
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
    data() {
      return {
        num: 0
      }
    },
    computed: {
      ...mapState({
        // 总数据
        colorList: state => state.color.colorList,
        active: state => state.color.active
      }),
      // 2017 2018 1019
      keys() {
        return Object.keys(this.colorList).sort((a, b) => {
          return b - a
        })
      },
      // list数据
      list() {
        // colorList:{2017:[],2016:[]} 
        // keys 2017 2016
        // num  index
        return this.colorList[this.keys[this.num]]
      }
    },
    methods: {
      ...mapActions({
        getColorList: 'color/getColorList'
      }),
      addClass(index) {
        // 点击2017 赋值给num
        this.num = index
      },
      ToImg(name, id) {
        sessionStorage.setItem('colorName',name);
        // sessionStorage.setItem('colorID', id);
        this.$router.replace({
          name: 'img',
          params: {
            name: sessionStorage.getItem('colorName'),
            colorID:id
          }
        })
      },
      ToImgAll(name) {
        sessionStorage.setItem('colorName',name);
        this.$router.push({
          name: 'img',
          params: {
            name: sessionStorage.getItem('colorName')
          }
        })
      }
    },
    mounted() {
      this.getColorList(localStorage.getItem("SerialID"))
    }
  }

</script>

<style scoped lang='scss'>
  .color {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 101;
    background: #f4f4f4;
    -webkit-animation: c .2s ease forwards;
    animation: c .2s ease forwards;

    >p {
      margin: .15rem 0;
      font-size: .34rem;
      color: #00afff;
      background: #fff;
      text-align: center;
      line-height: .8rem;
      height: .8rem;
    }

    .c_type {
      margin-top: .15rem;
      padding-left: .2rem;
      font-size: .3rem;
      line-height: .76rem;
      height: .76rem;
      background: #fff;
      overflow-x: scroll;
      display: flex;
      -webkit-overflow-scrolling: touch;

      span {
        padding-right: .42rem;

        &.active {
          color: #00afff;
        }
      }
    }

    ul {
      margin-top: .15rem;
      padding: 0 .2rem;
      overflow: hidden;
      background: #fff;

      li {
        float: left;
        width: 3.45rem;
        font-size: .32rem;
        line-height: .68rem;
        border: 1px solid #3aacff;
        box-sizing: border-box;
        margin: .2rem 0;
        border-radius: .05rem;

        span {
          display: inline-block;
          width: .4rem;
          height: .4rem;
          margin-left: .2rem;
          vertical-align: -12%;
          background: #fe9210;
          box-sizing: border-box;
          border: 1px solid #818181;
        }
      }

      li:nth-child(odd) {
        margin-right: .2rem;
      }
    }
  }

</style>
