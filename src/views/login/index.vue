<template>
  <div class="login-container">
    <div id="login" class="login-layer"></div>
    <div class="bottom"></div>
    <div class="login-box df-center" :class="{ success: loginSuccess,init:loginInit}">
      <img class="pz" src="~@/assets/pz.png">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form flex-one"
        auto-complete="on"
        label-position="left"
      >
        <div class="title-container">
          <img
            class="logo-icon"
            src="~@/assets/logo/logo.png"
            alt=""
          />
          <h3 class="title text-primary">{{ loginTitle }}</h3>
          <!-- <h5 class="subTitle text-primary">{{ subTitle }}</h5> -->
        </div>

        <el-form-item prop="userName">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="userName"
            v-model="loginForm.userName"
            placeholder="请输入用户名"
            name="userName"
            type="text"
            tabindex="1"
            auto-complete="on"
            class="flex-one"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
            class="flex-one"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          class="login-button"
          @click.native.prevent="handleLogin"
        >
          登录
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
// /* eslint-disable */
import config from './config/default'
import { mapActions } from 'vuex'
import appConfig from '@/config'
import { Encrypt } from '@/utils/encryption'
// require('particles.js')
export default {
  name: 'Login',
  data () {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位数!'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        userName: '',
        password: ''
      },
      animateTimeout: null,
      loginTitle: appConfig.title,
      subTitle: appConfig.subTitle,
      isSaveStore: false,
      loginRules: {
        userName: [
          { required: true, trigger: 'blur', message: '请输入用户名!' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码!' },
          { validator: validatePassword }
        ]
      },
      loginSuccess: false,
      loginInit: false,
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  mounted () {
    /* eslint-disable */
    // particlesJS("login", config);
    this.animateTimeout = setTimeout(()=>{
      this.loginInit =true
    },100)
  },
  beforeDestroy() {
    // 销毁 particlesJS
    // thanks https://github.com/d2-projects/d2-admin/issues/65
    // ref https://github.com/VincentGarreau/particles.js/issues/63
    // if (pJSDom && pJSDom.length > 0) {
    //   pJSDom[0].pJS.fn.vendors.destroypJS();
    //   pJSDom = [];
    // }
    this.animateTimeout = null
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions(["Login"]),
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          const form = this.handleForm(this.loginForm);
          this.Login(form)
            .then(() => {
              this.loginSuccess = true;
              this.animateTimeout=setTimeout(() => {
                this.$router.push({ path: "/" });
              }, 300);
              this.loading = false;
            })
            .catch(() => {
              this.loginSuccess = false;
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
    handleForm() {
      const form = JSON.parse(JSON.stringify(this.loginForm));
      const { password } = form;
      if (!password) {
        return form;
      }
      const str = JSON.stringify({ passWord: password });
      const timestamp = Date.now() + "";
      form.password = Encrypt(str, timestamp);
      form.timestamp = timestamp;
      return form;
    }
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/GanQianZhao/vue-element-admin/pull/927 */

@import "~styles/variables";
$bg: #283443;
$light_gray: #666;
$cursor: #666;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  display: flex;
  flex-direction: column;
  .bottom{
    height:25%;
    background:#fff;
  }
  .el-input {
    display: inline-block;
    height: rem(47px);
    width: 85%;
    input {
      background: #DEE9FC;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: rem(12px) rem(5px) rem(12px) rem(15px);
      color: $light_gray;
      font-size: rem(16px) !important;
      height: rem(47px);
      caret-color: $cursor;

      &:-webkit-autofill {
        color: #666;
        -webkit-text-fill-color: $cursor !important;
        border: 0 !important;
      }
    }
  }
  .login-button {
    width: 100%;
    margin: rem(20px) 0 rem(20px);
  }
  .el-form-item {
    background: #fff;
    border-radius: 5px;
    color: #454545;
    box-shadow: 0 0 3px 1px darken(#DEE9FC,10%);
    .el-form-item__content {
      display: flex;
      align-items: center;
      line-height: inherit;
    }
    .el-form-item__error {
      padding-left: rem(60px);
    }
  }
}
</style>

<style lang="scss" scoped>
.logo-icon {
  display: block;
  margin: 0 auto;
  width: 25%;
  height: auto;
  margin-bottom: 10px;
}
@import "~styles/variables";
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-layer {
  position: relative;
  width: 100%;
  flex:1;
  // background-color: darken($theme-primary, 35%);
  background-color:#fff;
  background-image: url("~@/assets/login-bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}
.login-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  .login-box {
    box-shadow: 0 0 8px 1px #337ef1;
    .pz{
      width: rem(270px);
    margin-right:rem(50px);
    }
    padding: rem(40px) rem(60px);
    background: #fff;
    position: absolute;
    border-radius: rem(10px);

    top:50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.4s;
    max-width: 100%;
    transform: translate(-50%, -50%) rotate3d(0, 1, 1, 180deg);
    &.init {
      transform: translate(-50%, -50%) rotate3d(0, 1, 1, 0deg);
    }
    &.success {
      transform: translate(-50%, -50%) rotate3d(0, 1, 1, 180deg);
    }
  }
  .login-form {
    position: relative;
    width: rem(320px);
    overflow: inherit;
    background: #fff;
    border-radius: rem(20px);
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 0 15px 0 15px;
    // margin-right:10px;
    color: $dark_gray;
    vertical-align: middle;
    // width: 30px;
    display: inline-block;
    box-sizing: border-box;
  }

  .title-container {
    position: relative;

    .title {
      font-size: rem(24px);
      color: #409eff;
      margin: 0px auto rem(20px) auto;
      text-align: center
    }
    .subTitle {
      font-size: rem(14px);
      color: #409eff;
      margin: 0px auto rem(30px) auto;
      text-align: center;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 0;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
    line-height: rem(47px);
  }
}
</style>
