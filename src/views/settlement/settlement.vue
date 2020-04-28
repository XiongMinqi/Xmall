<template>
  <div>
    <top />
    <div class="settlement">
      <div>
        <div class="addresslist">
          <div class="title">收货信息</div>
          <div class="totleaddress">
            <div
              class="singleaddress"
              :class="item.isDefault===true?'back':''"
              v-for="(item,index) in addresslist"
              :key="index"
            >
              <div class="name">收货人: {{item.username}}</div>
              <div class="address">收货地址: {{item.address}}</div>
              <div class="phone">手机号码: {{item.phone}}</div>
              <div class="choosebtn">
                <div class="btn">
                  <div @click="editaddress(item)">修改</div>
                  <div @click="deleteaddress(item)">删除</div>
                </div>
              </div>
            </div>
            <div
              class="addnew"
              @click="addaddress"
            >
              <div class="icon">
                <Icon
                  size="30"
                  type="md-add-circle"
                />
              </div>
              <div>使用新地址</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="shoppingcart">
          <div class="title">购物清单</div>
          <div>
            <div class="toptitle">
              <div>商品信息</div>
              <div class="topright">
                <div>单价</div>
                <div>数量</div>
                <div>小计</div>
              </div>
            </div>
            <div class="goodslist">
              <div
                class="shopgoodslist"
                v-for="(item,index) in goodslist"
                :key="index"
              >
                <div class="goodsleft">
                  <div><img :src="item.productImageBig"></div>
                  <div>{{item.productName}}</div>
                </div>
                <div class="goodsright">
                  <div>￥{{item.salePrice}}</div>
                  <div class="addicon">

                    <div>{{item.count}}</div>

                  </div>
                  <div>￥{{price[index]}}</div>

                </div>
              </div>
            </div>
            <div class="totle">
              <div class="totleright">
                <div>
                  应付金额:<span>￥{{totleprice}}</span>
                </div>
                <div><Button
                    size="large"
                    type="primary"
                    @click="submit"
                  >提交订单</Button></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        v-model="modal"
        title="新增收货地址"
        @on-ok="ok"
      >
        <div class="username"><Input
            size="large"
            long
            v-model="username"
            placeholder="收货人姓名"
          /></div>
        <div class="phonenumber"><Input
            size="large"
            long
            v-model="phonenumber"
            placeholder="收货人电话"
          /></div>
        <div><Input
            size="large"
            long
            v-model="detailaddress"
            placeholder="收货人地址"
          /></div>
        <div class="defalut">
          <Checkbox v-model="defalut">设为默认</Checkbox>
        </div>
      </Modal>
    </div>
    <indexbottom />
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodslist: [],
      price: [],
      totleprice: 0,
      addresslist: [],
      modal: false,
      username: "",
      phonenumber: "",
      detailaddress: "",
      defalut: false
    };
  },
  components: {},
  methods: {
    submit() {},
    editaddress(e){
      console.log(e);
      this.modal = true;
      this.username = e.username;
      this.phonenumber = e.phone;
      this.detailaddress = e.address;
      this.defalut = e.isDefault;
    },
    deleteaddress(){},
    addaddress() {
      this.modal = true;
    },
    ok() {
      console.log(this.defalut);
      this.$api
        .addAddress({
          username: this.username,
          phone: this.phonenumber,
          address: this.detailaddress,
          isDefault: this.defalut
        })
        .then(res => {
          console.log(res);
          this.getaddress();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getaddress() {
      this.$api
        .getaddress()
        .then(res => {
          console.log(res);
          this.addresslist = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getaddress();
    this.goodslist = this.$store.state.goodslist;
    console.log(this.goodslist);
    this.goodslist.map(item => {
      this.totleprice = this.totleprice + item.salePrice * item.count;
      this.price.push(item.salePrice * item.count);
    });
    console.log(this.price);
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.settlement {
  max-width: 1200px;
  margin: 0 auto;
}
.shoppingcart {
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
  justify-content: flex-end;
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
.addresslist {
  border: 1px solid #c2c2c2;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 15px;
  // padding-bottom: 20px;
  .totleaddress {
    background: white;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border-radius: 0 0 15px 15px;
    .back {
      background: white !important;
      &:hover {
        background: white !important;
      }
    }
    .singleaddress {
      position: relative;
      width: 22.5%;
      height: 158px;
      border: 1px solid #6a8fe5;
      margin: 30px 15px;
      background: #f9f9f9;
      .choosebtn {
        display: none;
      }
      .btn {
        position: absolute;
        bottom: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        text-align: center;
        div {
          width: 50%;
          height: 30px;
          line-height: 30px;
          background: white;
          border: 1px solid #e2e2e2;
          &:hover {
            background: #f2f2f2;
          }
        }
      }
      &:hover {
        background: #f2f2f2;
        .choosebtn {
          display: block;
        }
      }
    }
  }
}
.addnew {
  padding: 4.5% 7.5%;
  height: 158px;
  text-align: center;
  margin: 30px 15px;
  background: #f9f9f9;
  border: 1px solid #c2c2c2;
  &:hover {
    background: #f2f2f2;
  }
  .icon {
    margin: 0 auto;
  }
}
.username {
  padding-bottom: 10px;
}
.phonenumber {
  padding-bottom: 10px;
}
.defalut {
  padding-top: 20px;
}
.name {
  padding: 20px 10px 0 20px;
}
.phone {
  padding: 0 20px;
}
.address {
  padding: 0 20px;
  display: -webkit-box;
  word-break: break-all;
  -webkit-box-orient: vertical; /*子元素排列 vertical（竖排）*/
  -webkit-line-clamp: 1; /*设置显示的多少行。*/
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>