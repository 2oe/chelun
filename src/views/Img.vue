<template>
  <div class="wrap" ref="wrap">
    <div class="checkColor">
      <p @click="checkColorType">
        <!-- 颜色选择 -->
        <span>{{color}}</span>
      </p>
      <p @click="checkCarType">
        <!-- 车款选择 -->
        <span><em>{{desType}}</em></span>
      </p>
    </div>
    <!-- 图片列表 -->
    <div class="con">
      <ul class="img-default" v-for="(item,index) in imgs" :key="index">
        <li v-for="(item1,index1) in item.List" :key="index1" :index='index1' :data-id="item.Id+'_'+index+'_'+item.Count">
          <img v-lazy="`${item1.Url.replace('{0}', item1.LowSize)}`" @click="showSwiper1(index1,item.Id)" />
          <div class="pos" v-if='index1<1' @click="showRightImg(item.Id)">
            <p>{{item.Name}}</p>
            <p>{{item.Count}}张</p>
          </div>
        </li>
      </ul>
    </div>
    <!-- 点击图片6张 -->
    <div class="box" v-show='isShowImg' @scroll="scroll" ref="box">
      <section ref="section">
        <img v-for="(item, index) in imgList" :key="index" v-lazy="`${item.Url.replace('{0}', item.LowSize)}`" @click='showSwiper(index)' />
      </section>
    </div>
    <!-- swiper -->
    <section class="swiper" v-show="imgList.length && isShowSwiper" @click="swiperClick">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(item, index) in imgList" :key="index">
          <img :src="`${item.Url.replace('{0}', item.HighSize)}`" class="swiper-lazy" />
          <div class="swiper-lazy-preloader"></div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <p>共{{current}}/{{imgList.length}}张</p>
    </section>
  </div>
</template>

<script>
  import "swiper/dist/css/swiper.css";
  // import {debounce} from '@/utils/utils.js';
  import {
    swiper,
    swiperSlide
  } from "vue-awesome-swiper";
  import {
    mapState,
    mapActions
  } from "vuex";
  import {
    lazyLoad
  } from "@/utils/lazyLoad";
  export default {
    data() {
      return {
        isShowImg: false,
        isShowSwiper: false,
        current: 1,
        page: 1,
        color: '颜色',
        desType: '车款'
      };
    },
    computed: {
      ...mapState({
        imgList: state => state.img.imgList,
        isFetching: state => state.img.isFetching,
        Page: state => state.img.Page,
        imgs: state => state.img.imgs
      }),
      swiper() {
        return this.$refs.mySwiper.swiper;
      },
      swiperOption() {
        let that = this;
        return {
          lazy: {
            // loadPrevNext: true,
          },
          on: {
            slideChange: function () {
              that.current = this.activeIndex + 1;
              if (this.activeIndex > (that.Page - 1) * 30 - 5) {
                that.getImgList({
                  SerialID: localStorage.getItem("SerialID"),
                  ImageID: localStorage.getItem("ImageID"),
                  flag: true
                });
                this.page++;
              }
            }
          }
        };
      }
    },
    components: {
      swiper,
      swiperSlide
    },
    methods: {
      ...mapActions({
        getImgList: "img/getCategoryImgList",
        getImgs: "img/getImgs"
      }),
      showSwiper(id, imgID) {
        this.isShowSwiper = true;
        // localStorage.setItem("ImageID", imgID);
        this.swiper.slideTo(id, 1000, false);
      },
      showSwiper1(id, imgID) {
        this.isShowSwiper = true;
        localStorage.setItem('ImageID', imgID);
        this.$store.state.img.Page = 1;
        this.$store.state.img.imgList = [];
        this.getImgList({
          SerialID: localStorage.getItem("SerialID"),
          ImageID: localStorage.getItem("ImageID"),
          flag: false
        });
        this.swiper.slideTo(id, 1000, false);
      },
      // 监听列表滚动
      scroll(e) {
        let scrollTop = this.$refs.box.scrollTop;
        let height = this.$refs.section.getBoundingClientRect().height;
        if (scrollTop > height - window.innerHeight - 20 && !this.isFetching) {
          // 执行加载下一页的逻辑
          this.getImgList({
            SerialID: localStorage.getItem("SerialID"),
            ImageID: localStorage.getItem("ImageID"),
            flag: true
          });
        }
      },
      showRightImg(imgID) {
        localStorage.setItem("ImageID", imgID);
        let id = localStorage.getItem("ImageID");
        this.isShowImg = true;
        this.getImgList({
          SerialID: localStorage.getItem("SerialID"),
          ImageID: id,
          flag: false
        });
      },
      checkColorType() {
        this.$router.push({
          path: "/colortype"
        });
      },
      checkCarType() {
        this.$router.push({
          path: "/cartype"
        });
      },
      // swiper点击
      swiperClick(e) {
        if (e.target == e.currentTarget) {
          this.isShowSwiper = false;
        }
      }
    },
    mounted() {
      let serialId = localStorage.getItem("SerialID");
      let colorID = this.$route.params.colorID;
      let carID = this.$route.params.carID;
      let name = sessionStorage.getItem('colorName');
      if(sessionStorage.getItem('des')){
        this.desType = sessionStorage.getItem('des');
      }else{
        this.desType = '车款';
      }
      if(name){
        this.color = name;
      }else{
        this.color = '颜色';
      }
      let obj = [];
      if (serialId) {
        obj.push(serialId, colorID, carID)
        this.getImgs(obj);
      } else {
        localStorage.setItem("SerialID", this.$route.params.id);
      }
      // 去抖动
      // let func = debounce(this.scroll, 100);
      // this.$refs.wrap.addEventListener('scroll', func);
    }
  };

</script>

<style lang="scss" scoped>
  .wrap {
    height: 100%;
    background: #f4f4f4;
    display: flex;
    flex-direction: column;

    .box {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      background: #fff;
      z-index: 99;
      overflow: scroll;

      section {
        background: #f4f4f4;
        text-align: center;
        -webkit-overflow-scrolling: touch;
        width: 100%;

        span,
        img {
          width: 2.36rem;
          height: 1.64rem;
          margin-bottom: 0.1rem;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          margin: 0 0.05rem;
        }
      }
    }

    .con {
      flex: 1;
      margin-top: 0.5rem;
      overflow: hidden;
      overflow-y: scroll;
      border-top: 0.45rem solid #eee;
    }
  }

  .checkColor {
    position: fixed;
    background: #fff;
    top: 0;
    flex-shrink: 0;
    width: 100%;
    height: 0.8rem;
    -webkit-box-align: center;
    align-items: center;
    box-sizing: border-box;
    z-index: 99;
    display: flex;

    p {
      flex: 1;
      text-align: center;
      box-sizing: border-box;
      color: #454545;
      display: inline-block;

      span {
        max-width: 2.6rem;
        display: inline-block;
        vertical-align: middle;
        line-height: 1.25;
        font-size: 0.28rem;

        em {
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          display: -webkit-box;
          overflow: hidden;
          -webkit-box-orient: vertical;
          font-style: normal;
        }
      }

      &:after {
        content: "";
        display: inline-block;
        padding-top: 0.16rem;
        padding-right: 0.16rem;
        border-top: 2px solid #ccc;
        border-right: 2px solid #ccc;
        -webkit-transform: rotate(135deg);
        transform: rotate(135deg);
        margin-left: 0.2rem;
        vertical-align: 18%;
      }
    }

    p:nth-child(2) {
      border-left: 1px solid #ececec;
    }
  }

  .img-default {
    width: 100%;
    background: #fff;
    -webkit-overflow-scrolling: touch;
    border-bottom: 0.1rem solid #f4f4f4;
    display: flex;
    flex-wrap: wrap;

    li {
      position: relative;
      width: 32%;
      height: 2.46rem;
      padding: 0;
      margin: 0.05rem;
      overflow: hidden;

      .pos {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        background: rgba(56, 90, 130, 0.5);

        p {
          color: #fff;
          display: block;
        }

        p:nth-child(1) {
          font-size: 0.28rem;
          margin-top: 0.8rem;
        }

        p:nth-child(2) {
          font-size: 0.26rem;
        }
      }

      img {
        // width: 100%;
        height: 100%;
      }
    }
  }

  .swiper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;

    .swiper-container {
      background: #fff;
      width: 100%;
      height: 5rem;
    }

    .swiper-slide img {
      width: 100%;
      height: 100%;
    }

    p {
      position: absolute;
      bottom: 0.6rem;
      color: #fff;
      font-size: 0.4rem;
    }
  }
</style>
