<template>
  <div>
    <div id='login'>
      <el-form ref="login" :model="login" label-width="70px" label-position="left" :rules="rules">
        <el-form-item label="用户名:" prop="name">
          <el-input v-model="login.name" placeholder="请输入用户名" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password" >
          <el-input v-model="login.password" placeholder="请输入密码"  show-password clearable></el-input>
        </el-form-item>
        <el-button type="primary" @click="doLogin('login')" style="width:100%">登录</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      login: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],

      }

    }
  },
  methods: {
    doLogin(login) {
      this.$refs[login].validate((valid) => {
        if (valid) {

       /*   let userInfo = {
            name: this.login.name,
            password: this.login.password
          }*/
           let userInfo =this.login
          this.$api.login.doLogin(userInfo).then((res) => {
            if(res.data.errMsg==="登陆成功"){
              this.$message({
                message: '登陆成功',
                type: 'success'
              });
              this.$router.push('/')


            }else{
              this.$message.error('登陆失败');


            }
          })
        } else {
          return false;
        }
      })
    }
  }
}
</script>
<style scoped>
#login {
  text-align: center; /*让div内部文字居中*/
  background-color: #fff;
  border-radius: 20px;
  width: 270px;
  height: 350px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
