<template>
  <div>
    文章
    <el-button-group style="float: right;">

      <el-button @click="add()">新增</el-button>
      <el-button @click="dellete()">删除</el-button>
    </el-button-group>

    <el-table
      :data="tableData"
      style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>

      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容"
        width="180">
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="新增"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>
  <el-form ref="article" :model="article" label-width="70px" label-position="left" :rules="rules">
        <el-form-item label="标题:" prop="title">
          <el-input v-model="article.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="正文:" prop="content">
          <el-input v-model="article.content" placeholder="请输入正文"></el-input>
        </el-form-item>
    <el-form-item label="作者:" prop="author">
          <el-input v-model="article.author" placeholder="请输入正文"></el-input>
        </el-form-item>
      </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doAdd()">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="修改"
      :visible.sync="dialogVisibleEdit"
      width="30%"
    >
      <span>
  <el-form ref="article" :model="article" label-width="70px" label-position="left" :rules="rules">
        <el-form-item label="标题:" prop="title">
          <el-input v-model="article.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="正文:" prop="content">
          <el-input v-model="article.content" placeholder="请输入正文"></el-input>
        </el-form-item>
    <el-form-item label="作者:" prop="author">
          <el-input v-model="article.author" placeholder="请输入正文"></el-input>
        </el-form-item>
      </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibleEdit = false">取 消</el-button>
    <el-button type="primary" @click="doEdit()">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>

export default {
  data() {
    return {
      sellect:[],
      tableData: [],
      dialogVisible: false,
      dialogVisibleEdit:false,
      article: {
        title: '',
        content: '',
        author: ''
      },
      rules: {
        title: [
          {required: true, message: '请输入标题', trigger: 'blur'},
        ],
        content: [
          {required: true, message: '请输入正文', trigger: 'blur'}
        ],
        author: [
          {required: true, message: '请输入作者', trigger: 'blur'}
        ],

      }

    }
  },
  methods: {
    find() {
      this.$api.article.find().then((res) => {
        if (res.data.errMsg === "查询成功") {
          this.$message({
            message: '查询成功',
            type: 'success'
          });
          this.tableData = res.data.data

        } else {
          this.$message.error('查询成功');


        }
      })
    },
    add() {
      this.dialogVisible = true
    },
    dellete() {
      this.$api.article.dellete(this.sellect).then((res) => {
        if (res.data.errMsg === "删除成功") {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.find()
        } else {
          this.$message.error('删除失败');

        }

      })
    },
    doEdit(){
      this.$api.article.edit(this.article).then((res) => {
        if (res.data.errMsg === "修改成功") {
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.find()
        } else {
          this.$message.error('修改失败');

        }

      })

      this.dialogVisibleEdit = false
    },
    edit(article) {
      this.dialogVisibleEdit = true
       this.article =article


    },
    doAdd() {
      this.$api.article.add(this.article).then((res) => {
        if (res.data.errMsg === "新增成功") {
          this.$message({
            message: '新增成功',
            type: 'success'
          });
          this.find()
        } else {
          this.$message.error('新增失败');

        }

      })

      this.dialogVisible = false

    },
    handleSelectionChange(val){
this.sellect=val

    }
  },


  mounted() {

    this.find()

  },
}
</script>
