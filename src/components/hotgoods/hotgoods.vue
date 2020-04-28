<template>
  <div class="hotbody">
    <div class="words">
      热门商品
    </div>
    <div class="hotgoodslist">
      <div
        class="hotgoods"
        :class="{'firstimg':index===0,'secondimg':index===1}"
        v-for="(item,index) in hotgoods"
        :key="index"
      >
        <div>
          <img :src="item.picUrl">
          <div class="name">{{item.productName}}</div>
          <div class="desc">{{item.subTitle}}</div>
          <div class="price">
            <div class="money">￥{{item.salePrice}}.00</div>
            <div class="btn">
              <div class="twobtn">
                <div class="look">查看详情</div>
                <div
                  class="join"
                  @click="join(item.productId)"
                >加入购物车</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotgoods: []
    };
  },
  components: {},
  methods: {
    // 加入购物车
    join(e) {
      console.log(e);
      this.$api
        .joincart({ productId: e })
        .then(res => {
          console.log(res);
          this.$Message.info(res.msg);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.$api
      .getdata()
      .then(res => {
        this.hotgoods = res.data[2].panelContents;
        // this.scorlllist = res.data[1].panelContents;
        console.log(res);
        console.log(this.hotgoods, "hotgoods");
        // console.log(this.scorlllist, "scorlllist");
      })
      .catch(err => {
        console.log(err);
      });
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.words {
  background: #e3e3e3;
  width: 100%;
  font-size: 18px;
  padding: 20px;
  border-bottom: 1px solid #d4d4d4;
  margin-top: 30px;
}
.hotbody {
  max-width: 1200px;
  margin: 0 auto;
}
.firstimg {
  &:hover {
    position: relative;
    bottom: 1px;
    height: 415px;
    box-shadow: 5px 5px 20px #888888;
  }
}
.secondimg {
  &:hover {
    position: relative;
    bottom: 1px;
    height: 415px;
    box-shadow: -5px 5px 20px #888888;
  }
}
.hotgoodslist {
  display: flex;
  align-items: center;

  .hotgoods {
    width: 50%;
    text-align: center;
    background: white;
    &:hover {
      .money {
        display: none;
      }
      .btn {
        display: block;
      }
    }
    .money {
      display: block;
    }
    .btn {
      display: none;
      .twobtn {
        display: flex;
        justify-content: center;
      }
      .look {
        margin-right: 10px;
        background: #d2d2d2;
        padding: 0 10px;
        line-height: 27px;
        height: 27px;
        font-size: 12px;
        border: 1px solid #b2b2b2;
        color: black;
        border-radius: 5px;
        &:hover {
          cursor: pointer;
          background: #c2c2c2;
        }
      }
      .join {
        margin-right: 10px;
        background: #1a94e6;
        padding: 0 10px;
        line-height: 27px;
        height: 27px;
        border-radius: 5px;
        font-size: 12px;
        border: 1px solid #b2b2b2;
        color: white;
        &:hover {
          cursor: pointer;
          background: #188ad7;
        }
      }
    }
    img {
      width: 206px;
      height: 206px;
      margin: 50px 20px 10px 20px;
    }
    .name {
      margin-bottom: 5px;
      font-size: 16px;
    }
    .desc {
      color: #c2c2c2;
      font-size: 12px;
      margin-bottom: 20px;
    }
    .price {
      font-weight: bold;
      color: red;
      font-size: 18px;
      padding-bottom: 50px;
    }
  }
}
</style>