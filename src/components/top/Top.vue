<template>
  <div>
    <div class="top">
      <div class="topcontent">
        <div class="topimg">
          <img src="../../assets/images/topimg.png">
        </div>
        <div class="topright">
          <div class="input">
            <Input
              v-model="value"
              icon="ios-search"
              @on-click="search"
              placeholder="请输入商品信息"
              style="width: 300px;"
            />
          </div>
          <div class="allgoods">全部商品</div>
          <div class="send">捐赠</div>
          <div class="icon">
            <Icon
              type="ios-person"
              size="20"
              color="d9d9d9"
              @click="login"
            />
          </div>
          <div>
            <Icon
              type="ios-cart"
              size="20"
              color="d9d9d9"
              @click="shoppingcart"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="toptitle">
      <div class="bannerbody">
        <div class="chooselist">
          <div
            v-for="(item,index) in list"
            :key="index"
          >
            <div
              @click="chooseitem(item,index)"
              :class="number===index?'font':''"
            >{{item}}</div>
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
      value: "",
      number: 0,
      list: ["首页", "全部", "品牌周边", "捐赠名单", "后台管理系统"]
    };
  },
  components: {},
  methods: {
    search() {
      console.log(this.value);
    },
    login() {
      this.$router.push("/login");
    },
    shoppingcart() {
      this.$router.push("/shoppingcart");
    },
    chooseitem(e, index) {
      console.log(index, "index");
      this.number = index;
      console.log(this.number);
      console.log(e);
      if (e === "首页") {
        this.$router.push("/");
      } else if (e === "全部") {
        this.$router.push("/allgoods");
      } else if (e === "品牌周边") {
        this.$router.push("/around");
      }
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.top {
  width: 100%;
  background: black;
}
.topcontent {
  max-width: 1220px;
  margin: 0 auto;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .input {
    border: 0 !important;
    margin-right: 20px;
  }
}
.ivu-input {
  //  border-radius: 10px;
  //  height: 35px;
  input {
    height: 100%;
  }
}
.topright {
  display: flex;
  align-items: center;
  color: #d9d9d9;
}
.topimg {
  width: 45px;
  height: 45px;
  img {
    width: 100%;
    height: 100%;
  }
}
.allgoods {
  margin-right: 30px;
  padding: 0 25px;
  &:hover {
    color: white;
    cursor: pointer;
  }
}
.send {
  margin-right: 50px;
  padding: 0 25px;
  &:hover {
    color: white;
    cursor: pointer;
  }
}
.icon {
  margin-right: 30px;
}
.ivu-icon {
  &:hover {
    color: white;
  }
}
.bannerbody {
  max-width: 1200px;
  margin: 0 auto;
}
.toptitle {
  background: white;
}
.chooselist {
  display: flex;
  align-items: center;
  div {
    padding: 10px;
    &:hover {
      color: #5079d9;
      cursor: pointer;
    }
  }
}
.font {
  font-weight: bold;
  font-size: 15px;
}
</style>