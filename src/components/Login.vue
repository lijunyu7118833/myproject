<template>
  <div>
    <el-dialog
      title="注册"
      :visible.sync="dialogVisible"
      width="30%">
      <span>
  <el-form ref="user" :model="user" label-width="70px" label-position="left" :rules="rules2">
        <el-form-item label="用户名:" prop="name">
          <el-input v-model="user.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="user.password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doRegister('user')">确 定</el-button>
  </span>
    </el-dialog>

    <div id='login'>
      <el-form ref="login" :model="login" label-width="70px" label-position="left" :rules="rules">
        <el-form-item label="用户名:" prop="name">
          <el-input v-model="login.name" placeholder="请输入用户名" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="login.password" placeholder="请输入密码" show-password clearable></el-input>
        </el-form-item>
        <el-button-group style="width:100%">
          <el-button type="primary" @click="doLogin('login')" :loading=loading style="width:50%">登录</el-button>
          <el-button type="primary" @click="register()" style="width:50%">注册</el-button>
        </el-button-group>


      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      loading: false,
      login: {
        name: '',
        password: ''
      },
      user: {
        name: '',
        password: ''
      },
      rules2: {
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],


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
    doRegister(user) {
      this.$refs[user].validate((valid) => {
        if (valid) {
          this.$api.login.doRegister(this.user).then((res) => {
            if (res.data.errMsg === "注册成功") {
              this.$message({
                message: '注册成功',
                type: 'success'
              });
              this.dialogVisible = false

            } else {
              this.$message.error(res.data.errMsg);

            }

          })


        }
      })

    },
    register() {
      this.dialogVisible = true
    },
    doLogin(login) {
      this.$refs[login].validate((valid) => {
        if (valid) {

          /*   let userInfo = {
               name: this.login.name,
               password: this.login.password
             }*/
          this.loading = true
          let userInfo = this.login
          this.$api.login.doLogin(userInfo).then((res) => {
            if (res.data.errMsg === "登陆成功") {
              this.$message({
                message: '登陆成功',
                type: 'success'
              });
              this.loading = false
              sessionStorage.setItem("token",res.data.token)
              sessionStorage.setItem("user",JSON.stringify(res.data.data))

              this.$router.push('/')


            } else {
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
