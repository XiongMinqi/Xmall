<template>
  <div class="indexbottom">
    <div class="content">
      <div class="left">
        <div>
          <div class="title">订单服务</div>
          <div class="list">
            <div>购买指南</div>
            <div>支付方式</div>
            <div>送货政策</div>
          </div>
        </div>
        <div>
          <div class="title">服务支持</div>
          <div class="list">
            <div>官方开源</div>
            <div>项目前端</div>
            <div>项目后端</div>
          </div>
        </div>
        <div>
          <div class="title">自助服务</div>
          <div class="list">
            <div>个人博客</div>
            <div>个人简介</div>
            <div>个人视频</div>
          </div>
        </div>
        <div>
          <div class="title">其他项目</div>
          <div class="list">
            <div>XPay支付系统</div>
            <div>数据共享</div>
            <div>待开发...</div>
          </div>
        </div>
        <div>
          <div class="title">友情链接</div>
          <div class="list">
            <div>宇cccc</div>
            <div>Smartisan</div>
            <div>Vue</div>
          </div>
        </div>
        <div>
          <div class="title">关注我吧</div>
          <div class="list">
            <div>腾讯 QQ</div>
            <div>新浪微博</div>
            <div>官方邮箱</div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="number">1012139570</div>
        <div class="time">周一至周日 10:00-23:00（限Starrer或捐赠人联系）</div>
        <div class="btn"><span>寻求帮助</span></div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottomfirst">
        <div>Copyright ©2017, exrick.cn Co., Ltd. All Rights Reserved.本网站设计内容大部分属锤子科技</div>
        <div>|</div>
        <div class="point">法律声明</div>
        <div>|</div>
        <div class="point">隐私条款</div>
        <div>|</div>
        <div class="point">开发者中心</div>
      </div>
      <div class="bottomsecond">
        <div>蜀ICP备16030308号-1</div>
        <div>蜀ICP证16030308号</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.indexbottom {
  background: white;
  min-height: 300px;
}
.content {
  padding-top: 100px;
  max-width: 1200px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e2e2e2;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.left {
  width: 60%;
  display: flex;
  justify-content: space-between;

  .title {
    // font-size: 16px;
    margin-bottom: 10px;
  }
  .list {
    color: #a2a2a2;
    div {
      margin-bottom: 5px;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
.right {
  width: 20%;
  text-align: right;
  .number {
    font-size: 30px;
    &:hover {
      cursor: pointer;
    }
  }
  .time {
    font-size: 10px;
    color: #c2c2c2;
    margin-top: 10px;
    margin-bottom: 15px;
  }
  .btn {
    span {
      padding: 7px 20px;
      border-radius: 5px;
      color: cornflowerblue;
      border: 1px solid #c2c2c2;
      &:hover {
        cursor: pointer;
        background: #f2f2f2;
      }
    }
  }
}
.bottom {
  padding-top: 20px;
  max-width: 1200px;
  margin: 0 auto;
  .bottomfirst {
    display: flex;;
    align-items: center;
    div{
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
  .bottomsecond {
    display: flex;
    align-items: center;
    margin-right: 20px;
    color: #c2c2c2;
    padding-bottom: 50px;
  }
}
.point{
  color: #5079d9;
  &:hover{
    cursor: pointer;
    
  }
}
</style>