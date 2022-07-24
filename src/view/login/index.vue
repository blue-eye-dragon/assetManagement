<template>
  <div id="userLayout">
    <div class="loginform">
      <h2 class="topTitle">慢病平台</h2>
      <el-form
        ref="loginForm"
        label-position="left"
        :model="loginForm"
        :rules="rules"
        @keyup.enter.native="submitForm"
      >
        <el-form-item prop="username"
        >
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
          >
            <i
              slot="suffix"
              class="el-input__icon el-icon-user"
            />
          </el-input>
        </el-form-item>
        <el-form-item prop="password"
        >
          <el-input
            v-model="loginForm.password"
            :type="lock === 'lock' ? 'password' : 'text'"
            placeholder="请输入密码"
          >
            <i
              slot="suffix"
              :class="'el-input__icon el-icon-' + lock"
            />
          </el-input>
        </el-form-item>
        <el-form-item prop="captcha">
         <div style="display:flex;justifyContent: space-between;">
          <el-input
            v-model="loginForm.captcha"
            placeholder="请输入验证码"
            style="width: 70%"
          />
          <div class="vPic">
            <img
              v-if="picPath"
              :src="picPath"
              height="30px"
              alt="请输入验证码"
              @click="loginVerify()"
            >
          </div>
         </div>
        </el-form-item>
        <div style="textAlign:center;width:100%;marginTop:30px  ">
          <el-button
            type="primary"
            style="width:50%"
            @click="submitForm"
          >登 录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import getPicPath from '@/util/getPicPath'
export default {
  name: 'login',
  data () {
    const checkUsername = (rule, value, callback) => {
      if (value.length < 5) {
        return callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const checkPassword = (rule, value, callback) => {
      if (value.length < 6) {
        return callback(new Error('请输入正确的密码'))
      } else {
        callback()
      }
    }
    const checkCaptcha = (rule, value, callback) => {
      if (value.length < 4) {
        return callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }
    return {
      lock: 'lock',
      picPath: '',
      loginForm: {
        username: '',
        password: '',
        picPath: '' 
      },
      rules: {
        username: [
          { validator: checkUsername, trigger: 'blur' },
        ],
        password: [
          { validator: checkPassword, trigger: 'blur' }
        ],
        captcha: [
          { validator: checkCaptcha, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.loginVerify()
  },
  methods: {
    submitForm () {
      this.$refs['loginForm'].validate((valid) => {
        if (valid && this.loginForm.username === 'admin123' && this.loginForm.password === '123456') {
          // alert('submit!');
          localStorage.setItem('userName',this.loginForm.username)
          this.$router.push('/workTable')
        } else {
          this.$message({
            type: 'error',
            message: '请正确填写登录信息',
            showClose: true
          })
          return false;
        }
      });
    },
    loginVerify () {
      let num = Math.ceil(Math.random() * 10)
      this.picPath = getPicPath(num)
    }
  },
}
</script>

<style lang="less" scoped>
#userLayout {
  width: 100%;
  height: 100vh;
  // background: linear-gradient(#9e0ffe, #f10130);
  background: url(../../assets/login1.jpg);
  background-size: cover;
  position: relative;
  .topTitle {
    text-align: center;
    line-height: 60px;
  }
  .loginform {
    position: absolute;
    top: 30vh;
    right: 16vw;
    width: 400px;
    background-color: rgba(255,255,255,0.7);
    padding: 20px 40px 40px 40px;
    border-radius: 10px;
    box-shadow: 2px 3px 7px rgba(0, 0, 0, 0.2);
  }
}
@media (max-width: 1200px) {
  #userLayout {
    width: 100%;
    height: 100vh;
    background: url(../../assets/login1.jpg);
    background-size: cover;
    position: relative;
    .topTitle {
      text-align: center;
      line-height: 60px;
    }
    .loginform {
      position: absolute;
      top: 30vh;
      right: 10vw;
      width: 80vw;
      background-color: #fff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 2px 3px 7px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>