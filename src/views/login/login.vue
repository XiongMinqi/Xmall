<template>
  <div class="body">
    <div class="login">
      <div class="bgimg">
        <img src="http://122.51.45.129:9999/static/images/smartisan_4ada7fecea.png">
      </div>
      <div class="words">
        使用 XMall 账号 登录官网
      </div>
      <div class="username">
        <Input
          v-model="username"
          clearable
          size="large"
          placeholder="账号"
        />
      </div>
      <div class="password">
        <Input
          type="password"
          clearable
          v-model="password"
          size="large"
          placeholder="密码"
        />
      </div>
      <div class="checkbox">
        <div @click="keepchoose">
          <Checkbox v-model="keep">记住密码</Checkbox>
        </div>
        <div class="checkright">
          <div @click="register">注册 XMall 账号</div>
          <div>|</div>
          <div> 忘记密码 ?</div>
        </div>
      </div>
      <div class="loading">
        <div>
          <div
            id="vaptchaContainer"
            style="width: 300px;height: 36px;"
          >
            <div class="vaptcha-init-main">
              <div class="vaptcha-init-loading">
                <a
                  href="/"
                  target="_blank"
                >
                  <img src="https://r.vaptcha.com/public/img/vaptcha-loading.gif" />
                </a>
                <span class="vaptcha-text">Vaptcha启动中...</span>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div>
        <div class="btn">
          <div v-if="flag===true">
            <Button
              size="large"
              disabled
              long
            >登录</Button>
          </div>
          <div v-else>
            <Button
              @click="login"
              size="large"
              type="primary"
              long
            >登录</Button>
          </div>
        </div>
        <div class="btn backbtn">
          <Button
            size="large"
            long
            @click="back"
          >返回</Button>
        </div>
      </div>
      <div class="loginbottom">
        <div>其他账号登录：</div>
        <div><img
            src="http://122.51.45.129:9999/static/images/other-login.png"
            alt=""
          ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      userinfo: {},
      usermsg: {},
      flag: true,
      token: "",
      keep: false,
      result: true
    };
  },
  components: {},
  methods: {
    // 登录
    login() {
      console.log(this.username);
      console.log(this.password);
      this.userinfo = {
        username: this.username,
        password: this.password
      };
      if (this.result === true) {
        localStorage.setItem("userinfo", JSON.stringify(this.userinfo));
      }
      this.usermsg = JSON.parse(localStorage.getItem("userinfo"));
      console.log(this.usermsg, "usermsg");
      this.$api
        .login({ username: this.username, password: this.password })
        .then(res => {
          console.log(res);
          this.$Message.info(res.msg);
          localStorage.setItem("token", res.data.token);
          this.token = localStorage.getItem("token");
          console.log(this.token, "token");
          this.back()
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 注册
    register() {
      console.log(123453186132);
      this.$router.push("/register");
    },
    // 返回
    back(){
      window.history.go(-1); 
    },
    // 是否保存账号密码到本地
    keepchoose() {
      this.result = !this.keep;
      console.log(this.result);
    }
  },
  mounted() {
    this.usermsg = JSON.parse(localStorage.getItem("userinfo"));
    this.username = this.usermsg.username;
    this.password = this.usermsg.password;
  },
  watch: {
    username() {
      this.username = this.username;
      if (this.username !== "" && this.password !== "") {
        this.flag = false;
      } else {
        this.flag = true;
      }
    },
    password() {
      this.password = this.password;
      if (this.username !== "" && this.password !== "") {
        this.flag = false;
      } else {
        this.flag = true;
      }
    }
  },
  computed: {},
  updated() {
    let that=this
    vaptcha({
      vid: "5e12ff524c6b8b41680b9111", // 验证单元id
      type: "click", // 显示类型 点击式
      scene: 0, // 场景值 默认0
      container: "#vaptchaContainer", // 容器，可为Element 或者 selector
      offline_server: "http://localhost:8080/" //离线模式服务端地址
      //可选参数
      //lang: 'zh-CN', // 语言 默认zh-CN,可选值zh-CN,en,zh-TW
      //https: true, // 使用https 默认 true
      //style: 'dark' //按钮样式 默认dark，可选值 dark,light
      //color: '#57ABFF' //按钮颜色 默认值#57ABFF
    }).then(function(vaptchaObj) {
      that.vaptchaObj = vaptchaObj; //将VAPTCHA验证实例保存到局部变量中
      that.vaptchaObj.render(); // 调用验证实例 vpObj 的 render 方法加载验证按钮
      //获取token的方式一：
      //vaptchaObj.renderTokenInput('.login-form')//以form的方式提交数据时，使用此函数向表单添加token值
      //获取token的方式二：
      // that.vaptchaObj.listen("pass", function() {
      //   // 验证成功进行后续操作
      //   var data = {
      //     //表单数据
      //     token: vaptchaObj.getToken()
      //   };
      //   $.post("login", data, function(r) {
      //     if (r.code !== 200) {
      //       console.log("登录失败");
      //       vaptchaObj.reset(); //重置验证码
      //     }
      //   });
      // });
      //关闭验证弹窗时触发
      that.vaptchaObj.listen("close", function() {
        //验证弹窗关闭触发
      });
    });
  }
};
</script>

<style scoped lang='scss'>
.body {
  width: 100%;
  height: 100%;
  position: absolute;
  background: #f2f2f2;
}
.login {
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -30%);
  background: white;
  width: 450px;
}
.bgimg {
  margin: 20px auto;
  width: 140px;
  height: 140px;
}
.words {
  text-align: center;
  font-size: 20px;
  padding-bottom: 20px;
}
.username {
  margin: 10px 30px;
}
.password {
  margin: 10px 30px;
}
.checkbox {
  padding: 0 30px 30px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .checkright {
    display: flex;
    align-items: center;
    color: #5079d9;
    div {
      padding-left: 10px;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
.btn {
  margin: 10px 40px;
}
.backbtn {
  padding-bottom: 20px !important;
  border-bottom: 1px solid #c2c2c2;
}
.loading {
  width: 350px;
  margin: 0 auto;
}
.loginbottom {
  padding: 10px 30px 30px 30px;
  display: flex;
  align-items: center;
  color: #999;
  img {
    margin-top: 10px;
    margin-left: 10px;
    width: 72px;
    height: 15px;
  }
}
.vaptcha-init-main {
  display: table;
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
}
​ .vaptcha-init-loading {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
​ .vaptcha-init-loading > a {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: none;
}
​ .vaptcha-init-loading > a img {
  vertical-align: middle;
}
​ .vaptcha-init-loading .vaptcha-text {
  font-family: sans-serif;
  font-size: 12px;
  color: #cccccc;
  vertical-align: middle;
}
</style>