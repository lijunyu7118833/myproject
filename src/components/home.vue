<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
      <el-menu-item index="/article">文章管理</el-menu-item>
      <el-submenu index="/article">
        <template slot="title">系统管理</template>
        <el-menu-item index="/user">用户</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>

      </el-submenu>

      <div style="float: right;">
        <el-popover
          placement="bottom"
          width="100"
          trigger="hover">
          <el-button @click="logout()">注销</el-button>
          <el-button slot="reference">用户</el-button>
        </el-popover>
      </div>


    </el-menu>

    <router-view></router-view>

  </div>
</template>
<script>

export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      sessionStorage.removeItem( "token")
      this.$router.push('/login')

    }
  }
}

</script>
