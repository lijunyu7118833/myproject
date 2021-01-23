<template>
  <div>
    <el-form :inline="true" :model="search" class="demo-form-inline">
      <el-form-item l>
        <el-input v-model="search.body" placeholder="请输入搜索关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" circle @click=" find()()"></el-button>
      </el-form-item>
      <el-button-group style="float: right;">
        <el-button @click="add()">新增</el-button>
        <el-button @click="dellete()">删除</el-button>
      </el-button-group>

    </el-form>


    <el-table
      :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
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
        label="作者"
        width="80">
      </el-table-column>
      <el-table-column
        prop="create_date"
        label="日期"
        width="80">
      </el-table-column>
      <el-table-column
        prop="tag"
        label="标签"
        width="100">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.tag">{{ item }}</el-tag>

        </template>
      </el-table-column>
      <el-table-column
        prop="like_count"
        label="喜欢数量"
        width="100">
        <template slot-scope="scope">
          <el-badge :value=scope.row.like_count class="item">
            <el-button size="small" >喜欢</el-button>
          </el-badge>
        </template>
      </el-table-column>
      <el-table-column
        prop="like"
        label="点赞"
        width="100">
        <template slot-scope="scope">
          <el-badge :value=scope.row.likes class="item">
            <el-button size="small" @click="like(scope.row)">喜欢</el-button>
          </el-badge>
        </template>
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
    <el-pagination background
                   layout="prev, pager, next, sizes, total, jumper"
                   :page-sizes="[5, 10, 15, 20]"
                   :page-size="pagesize"
                   :total="tableData.length"
                   @current-change="handleCurrentChange"
                   @size-change="handleSizeChange"
    >
    </el-pagination>
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
          <el-input v-model="article.author" placeholder="请输入作者"></el-input>
        </el-form-item>
     <el-form-item label="标签:" prop="tag">
  <el-select
    v-model="article.tag"
    multiple
    filterable
    allow-create
    default-first-option
    placeholder="请选择文章标签">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
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
      options: [{
        value: 'HTML',
        label: 'HTML'
      }, {
        value: 'CSS',
        label: 'CSS'
      }, {
        value: 'JavaScript',
        label: 'JavaScript'
      }],
      search: {
        body: '',
        user_id: 0

      },
      sellect: [],
      tableData: [],
      dialogVisible: false,
      dialogVisibleEdit: false,
      pagesize: 10,
      currpage: 1,

      article: {
        title: '',
        content: '',
        author: '',
        create_date: '',
        tag: ''
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

      },
      likeButton: true,

    }
  },
  methods: {
    like(article) {
      if (this.likeButton === true) {
        article.likes = 1
        this.likeButton = false;
      } else {
        article.likes = 0
        this.likeButton = true;
      }
      article["user_id"] = JSON.parse(sessionStorage.getItem("user")).user_Id

      this.$api.article.like(article).then((res) => {
        if (res.data.errMsg === "修改like成功") {
          this.$message({
            message: '修改like成功',
            type: 'success'
          });
          this.find()
        } else {
          this.$message.error('修改like失败');
        }
      })


    },
    // doSearch() {
    //   this.$api.article.find(this.search).then((res) => {
    //     if (res.data.errMsg === "查询成功") {
    //       this.$message({
    //         message: '查询成功',
    //         type: 'success'
    //       });
    //       this.tableData = res.data.data
    //
    //     } else {
    //       this.$message.error('查询失败');
    //
    //
    //     }
    //
    //   })
    //
    // },
    find() {
      this.search.user_id = JSON.parse(sessionStorage.getItem("user")).user_Id
      this.$api.article.find(this.search).then((res) => {
        if (res.data.errMsg === "查询成功") {
          this.$message({
            message: '查询成功',
            type: 'success'
          });
          let list = res.data.data
          for (var i in list) {
            if (list[i].tag !== null) {
              list[i].tag = list[i].tag.split(" ")
            }
          }
          this.tableData = list
        } else {
          this.$message.error('查询成功');


        }
      })
    },
    add() {
      this.dialogVisible = true
    },
    handleCurrentChange(cpage) {
      this.currpage = cpage;
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
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
    doEdit() {
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
      this.article = article


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
    handleSelectionChange(val) {
      this.sellect = val

    }
  },


  mounted() {

    this.find()

  },
}
</script>
