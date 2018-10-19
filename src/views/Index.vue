<template>
  <div class="wrap_box">
    <div class="wrap_item">
      <!-- 首页数据 -->
      <div class="wrap">
        <div class="list_item" v-for="(item, index) in list" :key="index">
          <h6 :ref="'a'+index">{{item.title}}</h6>
          <div class="list_padding">
            <p v-for="(item1, index1) in item.list" :key="index1" :data-id='item1.MasterID' @click="addActive(index,index1,$event)"
              ref="p">
              <img v-lazy="`${item1.CoverPhoto.replace('{0}', item1.LowSize)}`" alt="">
              <span>{{item1.Name}}</span>
            </p>
          </div>
        </div>
      </div>
      <!-- 字母切换 -->
      <div class="pos" v-show="!active">
        <span>#</span>
        <span v-for="(item, index) in list" :key="index" @touchmove='touchMove' @touchstart='touchStart(index,$event)'>{{item.title}}</span>
      </div>
    </div>
    <!-- 侧边栏数据 -->
    <div id="carType" :class="active?'active':''">
      <div class="carType_List" v-for="(item,index) in makeList" :key="index">
        <h5>{{item.GroupName}}</h5>
        <div class="carType_item">
          <router-link v-for="(item1,index1) in item.GroupList" :to="{path:'/detail',query:{SerialID:item1.SerialID,id:index1}}"
            :key="index1" class="carType_box">
            <img v-lazy="`${item1.Picture.replace('{0}', item1.LowSize)}`" alt="">
            <p>
              <span class="title">{{item1.AliasName}}</span>
              <span class="price">{{item1.DealerPrice}}</span>
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import Loading from "@/components/Loading.vue";
  /**
   * 封装的懒加载
   * 1. import {lazyLoad} from '@/utils/lazyLoad';
   * 2. mounted(){lazyLoad('.car-list');}
   * 3. 把图片的:src换成:data-src
   */
  import {
    mapState,
    mapActions
  } from "vuex";
  import BScroll from "better-scroll";
  export default {
    data() {
      return {
        active: false
      };
    },
    computed: {
      ...mapState({
        list: state => state.index.list,
        makeList: state => state.index.makeList
      })
    },
    methods: {
      ...mapActions({
        BrandList: "index/BrandList",
        MakeList: "index/MakeList"
      }),
      addActive(index, index1, e) {
        _hmt.push(['_trackEvent','汽车报价','tap','品牌点击']);
        this.MakeList(e.target.dataset.id*1);
        if (e.target.dataset.id*1) {
          this.active = true;
        }
      },
      showMark() {
        var startx, starty;
        //获得角度
        function getAngle(angx, angy) {
          return (Math.atan2(angy, angx) * 180) / Math.PI;
        }

        //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
        function getDirection(startx, starty, endx, endy) {
          var angx = endx - startx;
          var angy = endy - starty;
          var result = 0;

          //如果滑动距离太短
          if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
            return result;
          }

          var angle = getAngle(angx, angy);
          if (angle >= -135 && angle <= -45) {
            result = 1;
          } else if (angle > 45 && angle < 135) {
            result = 2;
          } else if (
            (angle >= 135 && angle <= 180) ||
            (angle >= -180 && angle < -135)
          ) {
            result = 3;
          } else if (angle >= -45 && angle <= 45) {
            result = 4;
          }

          return result;
        }
        //手指接触屏幕
        document.addEventListener(
          "touchstart",
          function (e) {
            startx = e.touches[0].pageX;
            starty = e.touches[0].pageY;
          },
          false
        );
        //手指离开屏幕
        let that = this;
        document.addEventListener(
          "touchend",
          function (e) {
            var endx, endy;
            endx = e.changedTouches[0].pageX;
            endy = e.changedTouches[0].pageY;
            var direction = getDirection(startx, starty, endx, endy);
            switch (direction) {
              case 3:
                that.active = true;
                break;
              case 4:
                that.active = false;
                break;
              default:
            }
          },
          false
        );
      },
      touchStart(id, e) {
        this.id = id;
        this.start = this.id + e.changedTouches[0].clientY;
        this.scroll.scrollToElement(this.$refs["a" + id][0]);
      },
      touchMove(e) {
        let newID =
          this.id +
          parseInt(
            (e.changedTouches[0].clientY - this.start) / e.target.clientHeight
          );
        if (newID < 0) {
          newID = 0;
        } else if (newID > 20) {
          newID = 20;
        }
        this.scroll.scrollToElement(this.$refs["a" + newID][0]);
      }
    },
    updated() {
      // console.log(this.makeList);
      // this.isLoading = false;
    },
    mounted() {
      this.scroll = new BScroll(".wrap_item", {
        click: true
      });
      this.BrandList();
      this.MakeList();
      this.showMark();
    }
  };

</script>

<style scoped>
  .wrap_box {
    width: 100%;
    height: 100%;
  }

  .wrap {
    width: 100%;
    font-size: 0.12rem;
  }

  .wrap_item {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .list_padding {
    padding: 0 0.3rem;
  }

  .pos {
    height: 100%;
    position: fixed;
    right: 0.05rem;
    top: 18%;
    border-radius: 0.5rem;
    transition: all 0.3s ease;
  }

  .pos span {
    display: block;
    height: 0.4rem;
    width: 0.4rem;
    text-align: center;
    line-height: 0.4rem;
    font-size: 0.2rem;
  }

  h5,
  h6 {
    width: 100%;
    height: 0.4rem;
    line-height: 0.4rem;
    background: #eee;
    padding: 0 0.2rem;
    font-size: 0.24rem;
  }

  h5 {
    height: 0.5rem;
  }

  .list_padding p,
  .carType_item .carType_box {
    padding: 0 0.1rem;
    width: 100%;
    height: 1rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    font-size: 0.2rem;
  }

  .carType_item .carType_box {
    height: 1.5rem;
  }

  .list_padding p img {
    height: 0.8rem;
    margin-right: 10px;
  }

  .carType_item .carType_box img {
    height: 1rem;
    margin: 0 0.15rem;
  }

  .carType_box p {
    display: flex;
    flex-direction: column;
  }

  .carType_box p span {
    line-height: 1.5;
  }

  .carType_box p .title {
    font-size: 0.32rem;
  }

  .carType_box p .price {
    color: red;
    font-size: 0.26rem;
  }

  #carType.active {
    transition: all 0.3s ease;
    width: 70% !important;
    background: #fff;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
  }

  #carType {
    transition: all 0.3s ease;
    width: 0;
    position: fixed;
    top: 0;
    right: 0;
  }

  .carType_List {
    overflow: hidden;
    overflow-y: scroll;
  }

</style>
