<template>
  <div class="water">
    <h1>{{$route.name}}</h1>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="水站" name="first">
        <!-- 水站 -->
        <el-button @click="showAdd()" class="water_button">添加</el-button>
        <!-- 查看添加 -->
        <el-dialog title="添加|查看水站" :visible.sync="dialogFormVisible">
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
            <el-form-item label="月销售量" :label-width="formLabelWidth" prop="count">
              <el-input
                type="number"
                min="0"
                v-model="form.count"
                autocomplete="off"
                placeholder="月销售量"
              ></el-input>
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
            <el-form-item label="浏览量" :label-width="formLabelWidth" prop="readNum">
              <el-input
                type="number"
                min="0"
                v-model="form.readNum"
                autocomplete="off"
                placeholder="浏览量"
              ></el-input>
            </el-form-item>
            <el-form-item label="商家地址" :label-width="formLabelWidth" prop="address">
              <el-input v-model="form.address" autocomplete="off" placeholder="商家地址"></el-input>
            </el-form-item>
            <el-form-item label="距离" :label-width="formLabelWidth" prop="len">
              <el-input v-model="form.len" autocomplete="off" placeholder="eg:4.2km"></el-input>
            </el-form-item>
            <el-form-item label="商家信息" :label-width="formLabelWidth" prop="des">
              <el-input v-model="form.des" autocomplete="off" placeholder="商家信息"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth" prop="tel">
              <el-input v-model="form.tel" autocomplete="off" placeholder="eg:400-100-1000"></el-input>
            </el-form-item>
            <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
              <el-input v-model="form.price" autocomplete="off" placeholder="eg:58元/桶"></el-input>
            </el-form-item>
            <el-form-item label="图片" :label-width="formLabelWidth" prop="img">
              <el-input v-model="form.img" autocomplete="off" placeholder="请输入图片地址"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="updateWater()" v-if="isShow">修改</el-button>
            <el-button type="primary" @click="addWater" v-else>确 定</el-button>
          </div>
        </el-dialog>
        <!-- 页面显示 -->
        <el-table :data="water_data" height="250" border style="width: 70%;margin:20px auto">
          <el-table-column label="序号" type="index" :index="indexMethod" width="100"></el-table-column>
          <el-table-column prop="name" label="水站名称"></el-table-column>
          <el-table-column prop="tel" label="电话"></el-table-column>
          <el-table-column prop="price" label="价格"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="findWater(scope.row)">查看</el-button>
              <el-button size="mini" type="danger" @click="del(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- 水站评论 -->
      <el-tab-pane label="水站评论" name="second">
        <!-- 选择框 -->
        <el-select v-model="value" style="width:60%;display:block;margin:0 auto;">
          <el-option @click.native="changeWaterId()" label="全部" :value="0"></el-option>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.name"
            :value="item.id"
            @click.native="changeWaterId(item.id)"
          ></el-option>
        </el-select>
        <!-- 页面显示 -->
        <el-table :data="comment_data" height="250" border style="width: 70%;margin:0 auto">
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
    var countNo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入月销售量"));
      }
    };
    var desNo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入描述"));
      }
    };
    var imgNo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入图片"));
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
    var priceNo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入价格"));
      }
    };
    var readNumNo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入浏览量"));
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
        count: [{ validator: countNo, trigger: "blur" }],
        des: [{ validator: desNo, trigger: "blur" }],
        img: [{ validator: imgNo, trigger: "blur" }],
        len: [{ validator: lenNo, trigger: "blur" }],
        likeNum: [{ validator: likeNumNo, trigger: "blur" }],
        name: [{ validator: nameNo, trigger: "blur" }],
        price: [{ validator: priceNo, trigger: "blur" }],
        readNum: [{ validator: readNumNo, trigger: "blur" }],
        score: [{ validator: scoreNo, trigger: "blur" }],
        tel: [{ validator: telNo, trigger: "blur" }]
      },
      water_data: [],
      form: {
        id: "",
        address: "",
        count: "",
        des: "",
        img: "",
        len: "",
        likeNum: "",
        name: "",
        price: "",
        readNum: "",
        score: "",
        tel: ""
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
    findWater(row) {
      this.dialogFormVisible = true;
      this.isShow = row.id;
      this.$axios({
        url: API.findWater,
        method: "get",
        params: {
          id: row.id
        }
      }).then(res => {
        // console.log(res);
        this.form = res.data.data[0];
      });
    },
    //查看添加
    showAdd() {
      this.dialogFormVisible = true;
      this.form = {};
    },
    //修改
    updateWater() {
      this.$axios({
        url: API.updateWater,
        method: "get",
        params: {
          id: this.form.id,
          address: this.form.address,
          count: this.form.count,
          des: this.form.des,
          img: this.form.img,
          len: this.form.len,
          likeNum: this.form.likeNum,
          name: this.form.name,
          price: this.form.price,
          readNum: this.form.readNum,
          score: this.form.score,
          tel: this.form.tel
        }
      }).then(res => {
        // console.log(res);
        // console.log(this.form.id);
        this.$message({
          message: res.data.info,
          type: "success"
        });
        this.$axios({
          url: API.findWater,
          method: "get"
        }).then(res => {
          //   // console.log(res);
          this.water_data = res.data.data;
          this.dialogFormVisible = false;
        });
      });
    },
    //添加
    addWater() {
      this.$axios({
        url: API.addWater,
        method: "get",
        params: {
          address: this.form.address,
          count: this.form.count,
          des: this.form.des,
          img: this.form.img,
          len: this.form.len,
          likeNum: this.form.likeNum,
          name: this.form.name,
          price: this.form.price,
          readNum: this.form.readNum,
          score: this.form.score,
          tel: this.form.tel
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
            url: API.findWater,
            method: "get",
            params: {}
          }).then(res => {
            // console.log(res);
            this.water_data = res.data.data;
          });
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
            url: API.delWater,
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
              url: API.findWater,
              method: "get",
              params: {}
            }).then(res => {
              this.water_data = res.data.data;
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
    //切换
    handleClick(tab, event) {
      // console.log(tab, event);
      if (this.activeName == "first") {
        this.$axios({
          url: API.findWater,
          method: "get",
          params: {}
        }).then(res => {
          // console.log(res);
          this.water_data = res.data.data;
        });
      }
      if (this.activeName == "second") {
        this.$axios({
          url: API.findWater,
          method: "get",
          params: {}
        }).then(res => {
          // console.log(res);
          this.options = res.data.data;
          // console.log(this.options);
        });
      }
    },
    // 单条渲染
    changeWaterId(id) {
      this.$axios({
        url: API.findComment,
        method: "get",
        params: {
          waterId: id
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
            url: API.delComment,
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
              url: API.findComment,
              method: "get",
              params: {}
            }).then(res => {
              this.comment_data = res.data.data;
            });
          });
        })
        .catch(() => {});
    }
  },
  created() {},
  mounted() {
    this.$axios({
      url: API.findWater,
      method: "get",
      params: {}
    }).then(res => {
      // console.log(res);
      this.water_data = res.data.data;
    });
    //评论
    this.$axios({
      url: API.findComment,
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

.water {
  height: 100vh;
  padding: 10px;
  box-sizing: border-box;
}

.water_button {
  margin: 20px;
}

.water_button:hover {
  background: $exit;
  color: $orange;
  border: 1px solid $exit;
}
</style>