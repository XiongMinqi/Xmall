<template>
  <div>
    <top />
    <div class="shoppingcart">
      <div class="title">购物清单</div>
      <div v-if="shoppinglist.length>0">
        <div class="toptitle">
          <div>商品信息</div>
          <div class="topright">
            <div>单价</div>
            <div>数量</div>
            <div>小计</div>
            <div>操作</div>
          </div>
        </div>
        <div class="goodslist">
          <div
            class="shopgoodslist"
            v-for="(item,index) in shoppinglist"
            :key="index"
          >
            <div class="goodsleft">
              <div
                class="icon"
                @click="chooseicon(item)"
              >
                <div v-if="item.check===true">
                  <Icon
                    size="20"
                    type="ios-checkmark-circle"
                  />
                </div>
                <div v-else>
                  <Icon
                    size="20"
                    type="ios-radio-button-off"
                  />
                </div>
              </div>
              <div><img :src="item.productImageBig"></div>
              <div>{{item.productName}}</div>
            </div>
            <div class="goodsright">
              <div>￥{{item.salePrice}}</div>
              <div class="addicon">
                <div>
                  <Icon
                    @click="subtraction(item,index)"
                    size="20"
                    type="ios-remove-circle-outline"
                  />
                </div>
                <div>{{item.count}}</div>
                <div>
                  <Icon
                    @click="addtion(item,index)"
                    size="20"
                    type="ios-add-circle-outline"
                  />
                </div>
              </div>
              <div>￥{{price[index]}}</div>
              <div>
                <Icon
                  @click="del(item)"
                  size="20"
                  type="ios-close-circle-outline"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="totle">
          <div
            class="totleleft"
            @click="chooseall"
          >
            <div v-if="icon===true">
              <Icon
                size="20"
                type="ios-checkmark-circle"
              />
            </div>
            <div v-else>
              <Icon
                size="20"
                type="ios-radio-button-off"
              />
            </div>
            <div class="choosewords">全选</div>
          </div>
          <div class="totleright">
            <div>
              <div>已选择 <span>{{choosed.length}}</span> 件商品</div>
              <div>共{{shoppinglist.length}}件商品</div>
            </div>
            <div>
              <div>|</div>
              <div>|</div>
            </div>
            <div>
              <div>应付总额:<span>￥{{prices}}</span></div>
              <div>应付总额不含运费</div>
            </div>
            <div><Button
                size="large"
                type="primary"
                @click="settlement"
              >现在结算</Button></div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="else"
      >
        <div class="cartimg"><img src="http://xmall.exrick.cn/static/images/cart-empty_@2x.png"></div>
        <div class="empty">您的购物车空空如也</div>
        <div
          class="nowchoose"
          @click="nowchoose"
        >现在选购</div>
      </div>
    </div>
    <indexbottom />
  </div>
</template>

<script>
export default {
  data() {
    return {
      shoppinglist: [],
      number: -1,
      price: [],
      check: false,
      icon: false,
      prices: 0,
      choosed: [],
      totleprice: 0
    };
  },
  components: {},
  methods: {
    // 全选
    chooseall() {
      this.icon = !this.icon;
      if (this.icon === true) {
        this.choosed = this.shoppinglist;
        this.shoppinglist.map(item => {
          item.check = true;
          this.prices = this.prices + item.count * item.salePrice;
        });
      } else {
        this.prices = 0;
        this.choosed = [];
        this.shoppinglist.map(item => {
          item.check = false;
        });
      }
    },
    chooseicon(e) {
      e.check = !e.check;
      this.choosed = [];
      this.prices = 0;
      this.shoppinglist.map(item => {
        if (item.check === true) {
          this.choosed.push(e);
          this.prices = this.prices + item.count * item.salePrice;
        }
      });
      if (this.choosed.length === this.shoppinglist.length) {
        this.icon = true;
      }
      if (e.check === false) {
        this.icon = false;
      }
    },
    nowchoose() {
      this.$router.push("/allgoods");
    },
    settlement() {
      console.log(this.choosed);
      this.$router.push("/settlement");
      this.$store.state.goodslist = this.choosed;
    },
    subtraction(e, index) {
      console.log(e, index);
      let count = e.count - 1;
      if (count >= 1) {
        count = count;
      } else {
        this.$Message.info("最低数量为1，若要删除该商品，请点击删除按钮");
        count = 1;
      }
      this.$api
        .editnumber({ productId: e._id, count: count })
        .then(res => {
          console.log(res);
          this.price[index] = count * e.salePrice;
          this.getshoppingcart();
        })
        .catch(err => {
          console.log(err);
        });
    },
    addtion(e, index) {
      console.log(e, index);
      let count = e.count + 1;
      this.$api
        .editnumber({ productId: e._id, count: count })
        .then(res => {
          console.log(res);
          this.price[index] = count * e.salePrice;
          this.getshoppingcart();
        })
        .catch(err => {
          console.log(err);
        });
    },
    del(e) {
      console.log(e);
      this.$api
        .deleteshaoppingcart({ productId: e._id })
        .then(res => {
          console.log(res);
          this.$Message.info(res.msg);
          this.getshoppingcart();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getshoppingcart() {
      this.$api
        .checkcart()
        .then(res => {
          console.log(res);
          this.shoppinglist = res.data;
          this.shoppinglist.map(item => {
            this.$set(item, "check", false);
            this.totleprice = item.count * item.salePrice;
            this.price.push(this.totleprice);
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getshoppingcart();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.shoppingcart {
  max-width: 1200px;
  margin: 50px auto;
  border: 1px solid #d2d2d2;
  border-radius: 15px;
}
.title {
  padding: 20px;
  width: 100%;
  border-bottom: 1px solid #d2d2d2;
}
.else {
  background: white;
  text-align: center;
  padding-top: 50px;
  padding-bottom: 50px;
  .cartimg {
    margin: 0 auto;
    width: 275px;
    height: 300px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .empty {
    height: 80px;
    line-height: 80px;
  }
  .nowchoose {
    width: 100px;
    margin: 0 auto;
    border-radius: 10px;
    border: 1px solid #c2c2c2;
    padding: 10px 20px;
    background: #e2e2e2;
    &:hover {
      background: #d2d2d2;
      cursor: pointer;
    }
  }
}
.toptitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  .topright {
    display: flex;
    align-items: center;
    text-align: center;
    div {
      width: 150px;
      padding-left: 10px;
    }
  }
}
.goodslist {
  background: white;
  border-bottom: 1px solid #c2c2c2;
}
.shopgoodslist {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}
.goodsleft {
  display: flex;
  align-items: center;
  .icon {
    padding-right: 10px;
  }
  img {
    width: 80px;
    height: 80px;
    border: 1px solid #e2e2e2;
    margin-right: 10px;
  }
}
.goodsright {
  display: flex;
  align-items: center;
  text-align: center;
  div {
    width: 150px;
    padding-left: 10px;
  }
}
.addicon {
  display: flex;
  align-items: center;
  justify-content: center;
}
.totle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: white;
  border-radius: 0 0 15px 15px;
  .totleleft {
    display: flex;
    align-items: center;
    &:hover {
      cursor: pointer;
    }
    .choosewords {
      padding-left: 10px;
    }
  }
  .totleright {
    display: flex;
    align-items: center;
    div {
      padding-left: 20px;
    }
  }
}
span {
  color: red;
  font-weight: bold;
  font-size: 20px;
  padding: 0 5px;
}
</style>