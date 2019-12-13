<template>
  <div class="housekeeping">
    <h1>{{$route.name}}</h1>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 家政banner -->
      <el-tab-pane label="家政banner" name="first">
        <!-- 添加 -->
        <el-button @click="showAdd()" class="manage_button">添加</el-button>
        <!-- 添加 -->
        <el-dialog title="添加banner" :visible.sync="dialogFormVisible">
          <el-form :model="form1" :rules="rules1">
            <!-- 图片 -->
            <el-form-item label="图片" :label-width="formLabelWidth" prop="img">
              <el-input v-model="form1.img" autocomplete="off" placeholder="请输入图片地址"></el-input>
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
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="del(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="人员管理" name="second">
        <!-- 人员管理 -->
        <el-button @click="showAdd1()" class="manage_button">添加</el-button>
        <!-- 选择框 -->
        <el-select v-model="value" style="width:60%;display:block;margin:0 auto;">
          <el-option @click.native="changeHouseId()" label="全部" :value="0"></el-option>
          <el-option
            v-for="item in options"
            :key="item"
            :label="item"
            :value="item"
            @click.native="changeHouseId(item)"
          ></el-option>
        </el-select>
        <!-- 页面显示 -->
        <el-table :data="house_data" height="250" border style="width: 90%;margin:20px auto">
          <el-table-column label="序号" type="index" :index="indexMethod" width="80"></el-table-column>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="tel" label="电话"></el-table-column>
          <el-table-column prop="price" label="价格"></el-table-column>
          <el-table-column prop="age" label="年龄"></el-table-column>
          <el-table-column prop="edu" label="学历"></el-table-column>
          <el-table-column prop="type" label="服务类型"></el-table-column>
          <el-table-column label="操作" width="200px">
            <template slot-scope="scope">
              <el-button size="mini" @click="findHouse(scope.row)">查看</el-button>
              <el-button size="mini" type="danger" @click="del1(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 查看添加 -->
        <el-dialog title="人员管理" :visible.sync="dialogFormVisible2">
          <el-form :model="form2">
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-input v-model="form2.name" autocomplete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label="年龄" :label-width="formLabelWidth">
              <el-input v-model="form2.age" autocomplete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
              <el-input v-model="form2.tel" autocomplete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label="资格认证" :label-width="formLabelWidth">
              <el-checkbox-group v-model="form2.qualification">
                <el-checkbox v-for="i in qualification" :key="i" :label="i"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="服务项目" :label-width="formLabelWidth">
              <el-checkbox-group v-model="form2.type">
                <el-checkbox v-for="i in options" :key="i" :label="i" :value="i.type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="学历" :label-width="formLabelWidth">
              <el-select v-model="form2.edu" placeholder="请选择" style="width: 100%">
                <el-option
                  v-for="item in school"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工作年限" :label-width="formLabelWidth" type="number">
              <el-input v-model="form2.year" autocomplete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label="级别" :label-width="formLabelWidth" type="number">
              <el-input v-model="form2.vNum" autocomplete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label="价格" :label-width="formLabelWidth" type="number">
              <el-input v-model="form2.price" autocomplete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label="城市" :label-width="formLabelWidth">
              <el-input v-model="form2.city" autocomplete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label="经验" :label-width="formLabelWidth">
              <el-input v-model="form2.experience" autocomplete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label="点赞数量" :label-width="formLabelWidth">
              <el-input v-model="form2.likeNum" autocomplete="off" clearable type="number"></el-input>
            </el-form-item>
            <el-form-item label="关注人数" :label-width="formLabelWidth">
              <el-input v-model="form2.readNum" autocomplete="off" clearable type="number"></el-input>
            </el-form-item>
            <el-form-item label="距离" :label-width="formLabelWidth">
              <el-input v-model="form2.len" autocomplete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label="自我评价" :label-width="formLabelWidth">
              <el-input v-model="form2.info" autocomplete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label="免冠照片" :label-width="formLabelWidth">
              <el-input v-model="form2.img" autocomplete="off" clearable></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            <el-button type="primary" v-if="npno==''" @click="addhouse">添 加</el-button>
            <el-button type="primary" v-else @click="update">修 改</el-button>
          </div>
        </el-dialog>
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
    var imgNo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入图片地址"));
      }
    };
    return {
      rules1: { img: [{ validator: imgNo, trigger: "blur" }] },
      form1: {
        img: ""
      },
      form2: {
        age: "",
        city: "",
        edu: "",
        experience: "",
        id: "",
        img: "",
        info: "",
        len: "",
        likeNum: "",
        name: "",
        price: "",
        qualification: [],
        readNum: "",
        tel: "",
        type: [],
        vNum: "",
        year: ""
      },
      banner_data: [],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      formLabelWidth: "120px",
      //评论
      house_data: [],
      activeName: "first",
      options: [],
      value: 0,
      qualification: [],
      npno: "",
      school: [
        {
          value: "小学",
          label: "小学"
        },
        {
          value: "初中",
          label: "初中"
        },
        {
          value: "高中",
          label: "高中"
        },
        {
          value: "本科",
          label: "本科"
        },
        {
          value: "研究生",
          label: "研究生"
        },
        {
          value: "博士生",
          label: "博士生"
        }
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
    //添加打开
    showAdd() {
      this.dialogFormVisible = true;
      this.form1 = {};
    },
    //添加
    addBanner() {
      this.$axios({
        url: API.addHomeBanner,
        method: "get",
        params: this.form1
      }).then(res => {
        // console.log(res);
        if (res.data.code == 0) {
          this.$axios({
            url: API.homeBanner,
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
            url: API.delHomeBanner,
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
              url: API.homeBanner,
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
    },

    // 人员管理
    //添加查看
    showAdd1() {
      this.dialogFormVisible2 = true;
      this.npno = false;
      this.form2 = {
        age: "",
        city: "",
        edu: "",
        experience: "",
        id: "",
        img: "",
        info: "",
        len: "",
        likeNum: "",
        name: "",
        price: "",
        qualification: [],
        readNum: "",
        tel: "",
        type: [],
        vNum: "",
        year: ""
      };
    },
    //添加
    addhouse() {
      this.$axios({
        url: API.addHomeWorker,
        method: "get",
        params: this.form2
      }).then(res => {
        // console.log(res);
        // console.log(this.form2);
        if (res.data.code == 0) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.dialogFormVisible2 = false;
          this.$axios({
            url: API.findHomeWorker,
            method: "get"
          }).then(res => {
            this.house_data = res.data.data;
          });
        } else {
          this.$message({
            message: res.data.info,
            type: "warning"
          });
        }
      });
    },
    //查看
    findHouse(row) {
      this.dialogFormVisible2 = true;
      this.npno = true;
      this.$axios({
        url: API.findHomeWorker,
        method: "get",
        params: {
          id: row.id
        }
      }).then(res => {
        // console.log(res);
        this.form2 = res.data.data[0];
        // console.log(this.options);
        // console.log(this.qualification);
        if (this.form2.qualification.includes("[")) {
          this.form2.qualification = JSON.parse(this.form2.qualification);
        } else {
          this.form2.qualification = this.form2.qualification.split(",");
        }
        if (this.form2.type.includes("[")) {
          this.form2.type = JSON.parse(this.form2.type);
        } else {
          this.form2.type = this.form2.type.split(",");
        }
      });
    },
    //修改
    update() {
      this.$axios({
        url: API.updateHomeWorker,
        method: "get",
        params: this.form2
      }).then(res => {
        // console.log(res);
        this.$message({
          message: res.data.info,
          type: "success"
        });
        this.value = 0;
        this.dialogFormVisible2 = false;
        this.$axios({
          url: API.findHomeWorker,
          method: "get"
        }).then(res => {
          // console.log(res);
          // console.log(res.data.data);
          this.house_data = res.data.data;
        });
      });
    },
    //删除
    del1(index, row) {
      this.$confirm("此操作将删除该账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            url: API.delHomeWorker,
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
            this.value = 0;
            // console.log(res);
            this.$axios({
              url: API.findHomeWorker,
              method: "get"
            }).then(res => {
              this.house_data = res.data.data;
            });
          });
        })
        .catch(() => {});
    },
    //切换
    handleClick(tab, event) {
      // console.log(tab, event);
      if (this.activeName == "first") {
        this.$axios({
          url: API.getHomeType,
          method: "get",
          params: {}
        }).then(res => {
          // console.log(res);
          this.house_data = res.data.type;
        });
      }
      if (this.activeName == "second") {
        this.$axios({
          url: API.getHomeType,
          method: "get",
          params: {}
        }).then(res => {
          // console.log(res);
          this.options = res.data.type;
          // console.log(this.options);
        });
      }
    },
    //单条渲染
    changeHouseId(item) {
      // console.log(item);
      this.$axios({
        url: API.findHomeWorker,
        method: "get",
        params: {
          type: item
        }
      }).then(res => {
        // console.log(res.data.data);
        this.house_data = res.data.data;
      });
    }
  },
  created() {},
  mounted() {
    this.$axios({
      url: API.homeBanner,
      method: "get"
    }).then(res => {
      // console.log(res);
      this.banner_data = res.data.data;
    });
    this.$axios({
      url: API.findHomeWorker,
      method: "get"
    }).then(res => {
      // console.log(res);
      this.house_data = res.data.data;
    });
    this.$axios({
      url: API.getQualification,
      method: "get"
    }).then(res => {
      this.qualification = res.data.qualification;
      // console.log(this.qualification);
    });
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../stylus/index.styl';

.housekeeping {
  height: 100vh;
  padding: 10px;
  box-sizing: border-box;
}

.housekeeping_button {
  margin: 20px;
}

.housekeeping_button:hover {
  background: $exit;
  color: $orange;
  border: 1px solid $exit;
}
</style>