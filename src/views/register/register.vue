<template>
  <div class="body">
    <div class="register">
      <div class="words">注册 XMall 账号</div>
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
      <div class="password">
        <Input
          type="password"
          clearable
          v-model="repassword"
          size="large"
          placeholder="重复密码"
        />
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
      <div class="agreelist">
        <Checkbox v-model="agree">
          我已阅读并同意遵守 <span>法律声明</span> 和 <span>隐私条款</span>
        </Checkbox>
      </div>
      <div class="btn">
        <div v-if="flag===true">
          <Button
            size="large"
            disabled
            long
          >注册</Button>
        </div>
        <div v-else>
          <Button
            @click="register"
            size="large"
            type="primary"
            long
          >注册</Button>
        </div>
      </div>
      <div class="login">如果您已拥有 XMall 账号，则可在此 <span @click="login">登陆</span></div>
    </div>
  </div>
</template>
<script src="https://v.vaptcha.com/v3.js"></script>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      repassword: "",
      agree: false,
      flag: true,
      result: false,
      userinfo:{},
      vaptchaObj:{}
    };
  },
  components: {},
  methods: {
    register() {
      this.userinfo = {
        username: this.username,
        password: this.password
      };
      this.$api
        .register({ username: this.username, password: this.password })
        .then(res => {
          console.log(res);
          localStorage.setItem("userinfo", JSON.stringify(this.userinfo));
          this.$Message.info(res.msg);
          this.$router.push("/login");
        })
        .catch(err => {
          console.log(err);
        });
    },
    login() {
      this.$router.push("/login");
    }
  },

  mounted() {},
  watch: {
    username() {
      this.username = this.username;
      if (
        this.username !== "" &&
        this.password !== "" &&
        this.repassword !== "" &&
        this.result === true
      ) {
        this.flag = false;
      } else {
        this.flag = true;
      }
    },
    password() {
      this.password = this.password;
      if (
        this.username !== "" &&
        this.password !== "" &&
        this.repassword !== "" &&
        this.result === true
      ) {
        this.flag = false;
      } else {
        this.flag = true;
      }
    },
    repassword() {
      this.repassword = this.repassword;
      if (
        this.username !== "" &&
        this.password !== "" &&
        this.repassword !== "" &&
        this.result === true
      ) {
        this.flag = false;
      } else {
        this.flag = true;
      }
    },
    agree() {
      this.result = this.agree;
      console.log(this.result);
      if (
        this.username !== "" &&
        this.password !== "" &&
        this.repassword !== "" &&
        this.result === true
      ) {
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
.register {
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -30%);
  background: white;
  width: 450px;
}
.words {
  text-align: center;
  padding: 20px;
  border-bottom: 1px solid #c2c2c2;
}
.username {
  margin: 30px 30px 10px 30px;
}
.password {
  margin: 10px 30px;
}
.loading {
  width: 350px;
  margin: 0 auto;
}
.agreelist {
  padding: 10px 30px;
  span {
    color: #5079d9;
  }
}
.btn {
  margin: 10px 40px;
  padding-bottom: 30px;
  border-bottom: 1px solid #c2c2c2;
}
.login {
  text-align: center;
  padding-bottom: 50px;
  span {
    color: #5079d9;
    &:hover {
      cursor: pointer;
    }
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