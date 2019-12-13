<template>
  <div class="repair">
    <h1>{{$route.name}}</h1>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="维修" name="first">
        <!-- 维修 -->
        <el-button @click="showAdd()" class="repair_button">添加</el-button>
        <!-- 查看添加 -->
        <el-dialog title="添加|查看维修" :visible.sync="dialogFormVisible">
          <el-form :model="form" :rules="rules">
            <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
              <el-input v-model="form.name" autocomplete="off" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="评分" :label-width="formLabelWidth" prop="score">
              <el-input
                type="number"
                min="0"
                max="5"
                v-model="form.score"
                autocomplete="off"
                placeholder="0-5之间"
              ></el-input>
            </el-form-item>
            <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
              <el-input v-model="form.type" autocomplete="off" placeholder="维修类型"></el-input>
            </el-form-item>
            <el-form-item label="点赞数量" :label-width="formLabelWidth" prop="likeNum">
              <el-input
                type="number"
                min="0"
                v-model="form.likeNum"
                autocomplete="off"
                placeholder="点赞数量"
              ></el-input>
            </el-form-item>
            <el-form-item label="关注人数" :label-width="formLabelWidth" prop="readNum">
              <el-input
                type="number"
                min="0"
                v-model="form.readNum"
                autocomplete="off"
                placeholder="关注人数"
              ></el-input>
            </el-form-item>
            <el-form-item label="商家地址" :label-width="formLabelWidth" prop="address">
              <el-input v-model="form.address" autocomplete="off" placeholder="商家地址"></el-input>
            </el-form-item>
            <el-form-item label="距离" :label-width="formLabelWidth" prop="len">
              <el-input v-model="form.len" autocomplete="off" placeholder="eg:4.2km"></el-input>
            </el-form-item>
            <el-form-item label="商家信息" :label-width="formLabelWidth" prop="info">
              <el-input v-model="form.info" autocomplete="off" placeholder="商家信息"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth" prop="tel">
              <el-input v-model="form.tel" autocomplete="off" placeholder="eg:400-100-1000"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="updateRepair()" v-if="isShow">修改</el-button>
            <el-button type="primary" @click="addRepair" v-else>确 定</el-button>
          </div>
        </el-dialog>
        <!-- 页面显示 -->
        <el-table :data="repair_data" height="250" border style="width: 70%;margin:0 auto">
          <el-table-column label="序号" type="index" :index="indexMethod" width="100"></el-table-column>
          <el-table-column prop="name" label="维修名称"></el-table-column>
          <el-table-column prop="tel" label="电话"></el-table-column>
          <el-table-column prop="type" label="类型"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="findRepair(scope.row)">查看</el-button>
              <el-button size="mini" type="danger" @click="del(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="维修评论" name="second">
        <!-- 维修评论 -->
        <!-- 选择框 -->
        <el-select v-model="value" placeholder="请选择" style="width:80%;display:block;margin:0 auto;">
          <el-option @click.native="changeRepairId()" label="全部" :value="0"></el-option>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.name"
            :value="item.id"
            @click.native="changeRepairId(item.id)"
          ></el-option>
        </el-select>
        <!-- 页面显示 -->
        <el-table :data="comment_data" height="250" border style="width: 70%;margin:20px auto">
          <el-table-column label="序号" type="index" :index="indexMethod" width="100"></el-table-column>
          <el-table-column prop="name" label="用户名称"></el-table-column>
          <el-table-column prop="content" label="评论内容"></el-table-column>
          <el-table-column prop="time" label="时间">
            <template slot-scope="scope">{{scope.row.time|timeFilter}}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="del1(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import API from "../common/API";
import qs from "qs";
export default {
  components: {},
  props: [],
  data() {
    var addressNo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入地址"));
      }
    };
    var typeNo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入类型"));
      }
    };
    var lenNo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入距离"));
      }
    };
    var likeNumNo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入点赞量"));
      }
    };
    var nameNo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入名字"));
      }
    };
    var infoNo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入信息"));
      }
    };
    var readNumNo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入关注人数"));
      }
    };
    var scoreNo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入评分"));
      }
    };
    var telNo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入电话"));
      }
    };
    return {
      rules: {
        address: [{ validator: addressNo, trigger: "blur" }],
        type: [{ validator: typeNo, trigger: "blur" }],
        len: [{ validator: lenNo, trigger: "blur" }],
        likeNum: [{ validator: likeNumNo, trigger: "blur" }],
        name: [{ validator: nameNo, trigger: "blur" }],
        info: [{ validator: infoNo, trigger: "blur" }],
        readNum: [{ validator: readNumNo, trigger: "blur" }],
        score: [{ validator: scoreNo, trigger: "blur" }],
        tel: [{ validator: telNo, trigger: "blur" }]
      },
      repair_data: [],
      form: {
        address: "",
        id: "",
        info: "",
        len: "",
        likeNum: "",
        name: "",
        readNum: "",
        score: "",
        tel: "",
        type: ""
      },
      dialogFormVisible: false,
      formLabelWidth: "70px",
      visible: false,
      isShow: "",
      //评论
      activeName: "first",
      options: [],
      value: 0,
      comment_data: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    //查看
    findRepair(row) {
      this.dialogFormVisible = true;
      this.isShow = row.id;
      this.$axios({
        url: API.findRepair,
        method: "get",
        params: {
          id: row.id
        }
      }).then(res => {
        // console.log(res);
        this.form = res.data.data[0];
      });
    },
    //添加查看
    showAdd() {
      this.dialogFormVisible = true;
      this.form = {};
    },
    //添加
    addRepair() {
      this.$axios({
        url: API.addRepair,
        method: "get",
        params: {
          address: this.form.address,
          id: this.form.id,
          info: this.form.info,
          len: this.form.len,
          likeNum: this.form.likeNum,
          name: this.form.name,
          readNum: this.form.readNum,
          score: this.form.score,
          tel: this.form.tel,
          type: this.form.type
        }
      }).then(res => {
        // console.log(res);
        if (res.data.code == 0) {
          this.$message({
            message: res.data.info,
            type: "success"
          });
          this.dialogFormVisible = false;
          this.$axios({
            url: API.findRepair,
            method: "get",
            params: {}
          }).then(res => {
            // console.log(res);
            this.repair_data = res.data.data;
          });
        } else {
          this.$message({
            message: res.data.info,
            type: "warning"
          });
        }
      });
    },
    //修改
    updateRepair() {
      this.$axios({
        url: API.updateRepair,
        method: "get",
        params: {
          address: this.form.address,
          id: this.form.id,
          info: this.form.info,
          len: this.form.len,
          likeNum: this.form.likeNum,
          name: this.form.name,
          readNum: this.form.readNum,
          score: this.form.score,
          tel: this.form.tel,
          type: this.form.type
        }
      }).then(res => {
        // console.log(res);
        // console.log(this.form.id);
        this.$message({
          message: res.data.info,
          type: "success"
        });
        this.$axios({
          url: API.findRepair,
          method: "get"
        }).then(res => {
          // console.log(res);
          this.repair_data = res.data.data;
          this.dialogFormVisible = false;
        });
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
            url: API.delRepair,
            method: "get",
            params: {
              id: row.id
            }
          }).then(res => {
            // console.log(res);
            this.$message({
              message: res.data.info,
              type: "success"
            });
            this.$axios({
              url: API.findRepair,
              method: "get",
              params: {}
            }).then(res => {
              this.repair_data = res.data.data;
            });
          });
        })
        .catch(() => {});
    },
    //序号
    indexMethod(index) {
      return index + 1;
    },
    //评分等点击
    handleChange(value) {
      // console.log(value);
    },
    //逐条渲染
    changeRepairId(id) {
      this.$axios({
        url: API.findRepairComment,
        method: "get",
        params: {
          repairId: id
        }
      }).then(res => {
        // console.log(res);
        this.comment_data = res.data.data;
      });
    },
    //评论删除
    del1(index, row) {
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(res => {
          this.$axios({
            url: API.delRepairComment,
            method: "get",
            params: {
              id: row.id
            }
          }).then(res => {
            // console.log(res);
            this.$message({
              message: res.data.info,
              type: "success"
            });
            this.$axios({
              url: API.findRepairComment,
              method: "get",
              params: {}
            }).then(res => {
              this.comment_data = res.data.data;
            });
          });
        })
        .catch(() => {});
    },
    //切换
    handleClick(tab, event) {
      if (this.activeName == "first") {
        this.$axios({
          url: API.findRepair,
          method: "get",
          params: {}
        }).then(res => {
          // console.log(res);
          this.repair_data = res.data.data;
        });
      }
      if (this.activeName == "second") {
        this.$axios({
          url: API.findRepair,
          method: "get",
          params: {}
        }).then(res => {
          // console.log(res);
          this.options = res.data.data;
          // console.log(this.options);
        });
      }
    }
  },
  created() {},
  mounted() {
    this.$axios({
      url: API.findRepair,
      method: "get",
      params: {}
    }).then(res => {
      // console.log(res);
      this.repair_data = res.data.data;
    });
    //评论
    this.$axios({
      url: API.findRepairComment,
      method: "get",
      params: {}
    }).then(res => {
      // console.log(res);
      this.comment_data = res.data.data;
    });
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../stylus/index.styl';

.repair {
  height: 100vh;
  padding: 10px;
  box-sizing: border-box;
}

.repair_button {
  margin: 20px;
}

.repair_button:hover {
  background: $exit;
  color: $orange;
  border: 1px solid $exit;
}
</style>