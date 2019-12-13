<template>
  <div class="banner">
    <h1>{{$route.name}}</h1>
    <el-button @click="showAdd()" class="manage_button">添加</el-button>
    <!-- 添加 -->
    <el-dialog title="添加banner" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" :model="form">
        <!-- 图片 -->
        <el-form-item label="图片" :label-width="formLabelWidth" prop="img">
          <el-input v-model="form.img" autocomplete="off" placeholder="请输入图片地址"></el-input>
        </el-form-item>
        <!-- 描述 -->
        <el-form-item label="描述" :label-width="formLabelWidth" prop="des">
          <el-input v-model="form.des" autocomplete="off" placeholder="请输入描述内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addBanner()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 页面显示 -->
    <el-table :data="banner_data" height="250" border style="width: 80%;margin:0 auto">
      <el-table-column label="序号" type="index" :index="indexMethod" width="100"></el-table-column>
      <el-table-column prop="img" label="图片">
        <template slot-scope="scope">
          <img width="100px" height="100px" :src="scope.row.img" alt />
        </template>
      </el-table-column>
      <el-table-column prop="des" label="描述"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="del(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import API from "../common/API";
import qs from "qs";
export default {
  components: {},
  props: [],
  data() {
    var imgNo = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入图片地址"));
      }
    };
    var desNo = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入描述"));
      }
    };
    return {
      banner_data: [],
      form: {
        img: "",
        des: ""
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
      rules: {
        img: [{ validator: imgNo, trigger: "blur" }],
        des: [{ validator: desNo, trigger: "blur" }]
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    //添加打开
    showAdd() {
      this.dialogFormVisible = true;
      this.from = {};
    },
    //添加
    addBanner() {
      // console.log(this.form);
      this.$axios({
        url: API.addBanner,
        method: "get",
        params: this.form
      }).then(res => {
        // console.log(res);
        if (res.data.code == 0) {
          this.$axios({
            url: API.banner,
            method: "get",
            params: {}
          }).then(res => {
            this.$message({
              message: res.data.info,
              type: "success"
            });
            this.banner_data = res.data.data;
          });
          this.dialogFormVisible = false;
        } else {
          this.$message({
            message: res.data.info,
            type: "warning"
          });
        }
      });
    },
    //删除
    del(index, row) {
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(res => {
          this.$axios({
            url: API.delBanner,
            method: "get",
            params: {
              id: row.id
            }
          }).then(res => {
            this.$message({
              message: res.data.info,
              type: "success"
            });
            // console.log(res);
            this.$axios({
              url: API.banner,
              method: "get",
              params: {}
            }).then(res => {
              this.banner_data = res.data.data;
            });
          });
        })
        .catch(() => {});
    },
    //序号
    indexMethod(index) {
      return index + 1;
    }
  },
  created() {},
  mounted() {
    this.$axios({
      url: API.banner,
      method: "get",
      params: {}
    }).then(res => {
      // console.log(res);
      // console.log(res.data.data);
      this.banner_data = res.data.data;
    });
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../stylus/index.styl';

.banner {
  height: 100vh;
  padding: 10px;
  box-sizing: border-box;
}

.banner_button {
  margin: 20px;
}

.banner_button:hover {
  background: $exit;
  color: $orange;
  border: 1px solid $exit;
}
</style>