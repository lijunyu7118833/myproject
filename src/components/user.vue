<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="user_name"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码"
        width="480">
      </el-table-column>


    </el-table>


  </div>
</template>
<script>

export default {
  data() {
    return {
      tableData: []

    }
  },
  mounted() {
    this.find()
  },
  methods: {
    find() {
      this.$api.login.find().then((res) => {
          if (res.data.errMsg === "查询成功") {
            this.$message({
              message: '查询成功',
              type: 'success'
            });
            this.tableData = res.data.data
          } else {
            this.$message.error('查询失败');
          }
        }
      )


    }
  }
}
</script>
