<template>
  <div class="allgoods">
    <top />
    <div class="allgoodslist">
      <div class="sort">
        <div
          class="comprehensive"
          @click="comprehensive"
        >综合排序</div>
        <div
          class="high"
          @click="high"
        >价格从高到低</div>
        <div
          class="low"
          @click="low"
        >价格从低到高</div>
        <div class="inputprice">
          <div>
            <Input
              v-model="lowprice"
              placeholder="价格"
              style="width: 80px"
            /> - <Input
              v-model="highprice"
              placeholder="价格"
              style="width: 80px"
            />
          </div>
          <div class="btn"><Button
              type="primary"
              @click="chooseprice"
            >确定</Button></div>
        </div>
      </div>
      <div class="hotgoodslist">
        <div
          class="hotgoods"
          v-for="(item,index) in allgoods"
          :key="index"
        >
          <div>
            <img :src="item.productImageBig">
            <div class="name">{{item.productName}}</div>
            <div class="desc">{{item.subTitle}}</div>
            <div class="price">
              <div class="money">￥{{item.salePrice}}.00</div>
              <div class="btn">
                <div class="twobtn">
                  <div class="look">查看详情</div>
                  <div class="join" @click="join(item.productId)">加入购物车</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pages">
        <Page
          @on-page-size-change="pages"
          @on-change="pageindex"
          :total="total"
          show-total
          show-sizer
          show-elevator
        />
      </div>
    </div>
    <indexbottom />
  </div>
</template>

<script>
export default {
  data() {
    return {
      allgoods: [],
      lowprice: "",
      highprice: "",
      sort: "",
      total: 0,
      page: 1,
      size: 20
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
    },
    // 综合排序
    comprehensive() {
      console.log("综合排序");
      this.$api
        .allGoods({
          page: this.page,
          size: this.size
        })
        .then(res => {
          console.log(res);
          this.allgoods = res.data;
          console.log(this.allgoods);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 价格从高到低
    high() {
      // console.log(this.lowprice);
      // console.log(this.highprice);
      // let priceGt = this.lowprice;
      // let priceLte = this.highprice;
      this.sort = -1;
      console.log("价格从高到低");
      this.$api
        .allGoods({
          page: this.page,
          size: this.size,
          sort: this.sort,
          priceGt: this.lowprice,
          priceLte: this.highprice
        })
        .then(res => {
          console.log(res);
          this.allgoods = res.data;
          console.log(this.allgoods);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 价格从低到高
    low() {
      console.log(this.lowprice);
      console.log(this.highprice);
      this.sort = 1;
      console.log("价格从低到高");
      this.$api
        .allGoods({
          page: this.page,
          size: this.size,
          sort: this.sort,
          priceGt: this.lowprice,
          priceLte: this.highprice
        })
        .then(res => {
          console.log(res);
          this.allgoods = res.data;
          console.log(this.allgoods);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 选择价格区间
    chooseprice() {
      console.log(this.lowprice);
      console.log(this.highprice);
      this.$api
        .allGoods({
          page: this.page,
          size: this.size,
          priceGt: this.lowprice,
          priceLte: this.highprice
        })
        .then(res => {
          console.log(res);
          this.allgoods = res.data;
          console.log(this.allgoods);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 改变页码
    pageindex(e) {
      console.log(e);
      this.page = e;
      this.$api
        .allGoods({
          page: this.page,
          size: this.size,
          priceGt: this.lowprice,
          priceLte: this.highprice
        })
        .then(res => {
          console.log(res);
          this.allgoods = res.data;
          console.log(this.allgoods);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 改变条数
    pages(e) {
      console.log(e);
      this.size = e;
      this.$api
        .allGoods({
          page: this.page,
          size: this.size,
          priceGt: this.lowprice,
          priceLte: this.highprice
        })
        .then(res => {
          console.log(res);
          this.allgoods = res.data;
          console.log(this.allgoods);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.$api
      .allGoods({
        page: this.page,
        size: this.size
      })
      .then(res => {
        console.log(res);
        this.total = res.total;
        this.allgoods = res.data;
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
.allgoods {
  width: 100%;
  min-width: 300px;
  background: #f2f2f2 !important;
}
.allgoodslist {
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 30px;
}
.sort {
  display: flex;
  align-items: center;
  padding: 20px;
  .comprehensive {
    color: #188ad7;
    margin-right: 20px;
    &:hover {
      cursor: pointer;
    }
  }
  .high {
    margin-right: 20px;
    &:hover {
      color: #188ad7;
      cursor: pointer;
    }
  }
  .low {
    margin-right: 20px;
    &:hover {
      color: #188ad7;
      cursor: pointer;
    }
  }
  .inputprice {
    display: flex;
    align-items: center;
    .btn {
      margin-left: 20px;
    }
  }
}
.hotgoodslist {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .hotgoods {
    width: 25%;
    text-align: center;
    background: white;
    height: 434px;
    border-right: 1px solid #f2f2f2;
    border-bottom: 1px solid #f2f2f2;
    &:hover {
      position: relative;
      bottom: 1px;
      box-shadow: 0 0 20px #c2c2c2;
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
.pages{
  width: 500px;
  margin: 30px auto;
}
</style>