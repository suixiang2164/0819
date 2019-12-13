<template>
  <div class="manage">
    <h1>{{$route.name}}</h1>
    <el-button @click="showAdd()" class="manage_button">添加</el-button>
    <!-- 查看添加 -->
    <el-dialog title="添加|修改管理员" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="form.name" :disabled="isDisble" autocomplete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" aria-placeholder>
          <el-input
            class="input"
            v-model="form.pass1"
            :disabled="isDisble"
            show-password
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth" v-if="isShow==''">
          <el-input
            class="input"
            v-model="form.pass2"
            :disabled="isDisble"
            show-password
            autocomplete="off"
            placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.des" autocomplete="off" placeholder="请输入描述内容"></el-input>
        </el-form-item>
        <el-form-item label="时间" :label-width="formLabelWidth">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.time" autocomplete="off"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addManage" v-if="isShow==''">确 定</el-button>
        <el-button type="primary" @click="updateManage()" v-else>修改</el-button>
      </div>
    </el-dialog>
    <!-- 页面显示 -->
    <el-table :data="manages_data" height="250" border style="width: 70%;margin:0 auto">
      <el-table-column label="序号" type="index" :index="indexMethod" width="100"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="des" label="属性"></el-table-column>
      <el-table-column prop="time" label="时间">
        <template slot-scope="scope">{{scope.row.time|timeFilter}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="findManage(scope.row)">查看</el-button>
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
    return {
      manages_data: [],
      form: {
        name: "",
        pass1: "",
        pass2: "",
        des: "",
        time: ""
      },
      dialogFormVisible: false,
      formLabelWidth: "70px",
      visible: false,
      isShow: "",
      isDisble: true
    };
  },
  watch: {},
  computed: {},
  methods: {
    //查看
    findManage(row) {
      this.dialogFormVisible = true;
      this.isDisble = true;
      this.isShow = row.id;
      this.$axios({
        url: API.findManage,
        method: "post",
        data: {
          id: row.id
        }
      }).then(res => {
        // console.log(res);
        this.form = res.data.data[0];
        this.form.pass1 = res.data.data[0].pass;
        // console.log(this.form.pass1);
        this.form.time = new Date(Number(res.data.data[0].time));
        // console.log(this.form.time);
      });
    },
    //添加打开
    showAdd() {
      this.dialogFormVisible = true;
      this.isDisble = false;
      this.isShow = "";
      this.form = {
        time: ""
      };
    },
    //添加
    addManage() {
      if (this.form.pass1 == this.form.pass2) {
        if (this.form.time != "") {
          this.$axios({
            url: API.addManage,
            method: "post",
            data: {
              name: this.form.name,
              pass: this.form.pass1,
              des: this.form.des,
              time: this.form.time.getTime()
            }
          }).then(res => {
            // console.log(res);
            if (res.data.code == 0) {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.dialogFormVisible = false;
              this.$axios({
                url: API.findManage,
                method: "post",
                data: {}
              }).then(res => {
                this.manages_data = res.data.data;
              });
            } else {
              this.$message({
                message: res.data.info,
                type: "warning"
              });
            }
          });
        } else {
          this.$message({
            message: "请选择日期",
            type: "warning"
          });
        }
      } else {
        this.$message({
          message: "两次输入密码不一致",
          type: "warning"
        });
      }
    },
    //修改
    updateManage() {
      this.$axios({
        url: API.updateManage,
        method: "post",
        data: {
          id: this.form.id,
          des: this.form.des,
          time: this.form.time.getTime()
        }
      }).then(res => {
        this.$message({
          message: res.data.info,
          type: "success"
        });

        // console.log(res);
        this.$axios({
          url: API.findManage,
          method: "post",
          data: {}
        }).then(res => {
          // console.log(res);
          // console.log(res.data.data);
          this.manages_data = res.data.data;
          this.dialogFormVisible = false;
        });
      });
    },
    //序号
    indexMethod(index) {
      return index + 1;
    },
    //删除
    del(index, row) {
      this.$confirm("此操作将删除该账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            url: API.delManage,
            method: "post",
            data: {
              id: row.id
            }
          }).then(res => {
            this.$message({
              message: res.data.info,
              type: "success"
            });

            // console.log(res);
            this.$axios({
              url: API.findManage,
              method: "post",
              data: {}
            }).then(res => {
              this.manages_data = res.data.data;
            });
          });
        })
        .catch(() => {});
    }
  },
  created() {},
  mounted() {
    this.$axios({
      url: API.findManage,
      method: "post",
      data: {}
    }).then(res => {
      // console.log(res);
      // console.log(res.data.data);
      this.manages_data = res.data.data;
    });
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../stylus/index.styl';

.manage {
  height: 100vh;
  padding: 10px;
  box-sizing: border-box;
}

.manage_button {
  margin: 20px;
}

.manage_button:hover {
  background: $exit;
  color: $orange;
  border: 1px solid $exit;
}
</style>