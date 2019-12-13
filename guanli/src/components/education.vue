<template>
  <div class="education">
    <h1>{{$route.name}}</h1>
    <!-- 添加界面 -->
    <!-- first -->
    <el-dialog title="添加banner" :visible.sync="dialogFormVisible1">
      <el-form :model="form1" :rules="rules1">
        <!-- 图片 -->
        <el-form-item label="图片" :label-width="formLabelWidth" prop="img">
          <el-input v-model="form1.img" autocomplete="off" placeholder="请输入图片地址"></el-input>
        </el-form-item>
        <!-- 描述 -->
        <el-form-item label="描述" :label-width="formLabelWidth" prop="des">
          <el-input v-model="form1.des" autocomplete="off" placeholder="请输入描述内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="addEducation1()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- secend -->
    <el-dialog title="添加banner" :visible.sync="dialogFormVisible2">
      <el-form :model="form2" :rules="rules2">
        <!-- 图片 -->
        <el-form-item label="图片" :label-width="formLabelWidth" prop="img">
          <el-input v-model="form2.img" autocomplete="off" placeholder="请输入图片地址"></el-input>
        </el-form-item>
        <!-- 描述 -->
        <el-form-item label="描述" :label-width="formLabelWidth" prop="type">
          <el-input v-model="form2.type" autocomplete="off" placeholder="请输入描述内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="addEducation2()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- third -->
    <el-dialog title="添加banner" :visible.sync="dialogFormVisible3">
      <el-form :model="form3" :rules="rules3">
        <!-- 图片1 -->
        <el-form-item label="图片" :label-width="formLabelWidth" prop="img">
          <el-input v-model="form3.img" autocomplete="off" placeholder="请输入图片地址"></el-input>
        </el-form-item>
        <!-- 描述 -->
        <el-form-item label="报名人数" :label-width="formLabelWidth" prop="num">
          <el-input v-model="form3.num" autocomplete="off" placeholder="请输人数"></el-input>
        </el-form-item>
        <!-- 图片2 -->
        <el-form-item label="授课机构" :label-width="formLabelWidth" prop="teacherImg">
          <el-input v-model="form3.teacherImg" autocomplete="off" placeholder="请输入授课机构"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="addEducation3()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 页面显示 -->
    <template>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- first -->
        <el-tab-pane label="家教banner" name="first" checked>
          <el-button @click="showAdd1()" class="manage_button">添加</el-button>
          <el-table :data="eucation_data1" height="250" border style="width: 80%;margin:0 auto">
            <el-table-column label="序号" type="index" :index="indexMethod" width="100"></el-table-column>
            <el-table-column prop="img" label="图片">
              <template slot-scope="scope">
                <img width="100px" height="100px" :src="scope.row.img" alt />
              </template>
            </el-table-column>
            <el-table-column prop="des" label="描述"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="del1(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- secend -->
        <el-tab-pane label="家教类型" name="secend" checked>
          <el-button @click="showAdd2()" class="manage_button">添加</el-button>
          <el-table :data="eucation_data2" height="250" border style="width: 80%;margin:0 auto">
            <el-table-column label="序号" type="index" :index="indexMethod" width="100"></el-table-column>
            <el-table-column prop="img" label="图片">
              <template slot-scope="scope">
                <img width="100px" height="100px" :src="scope.row.img" alt />
              </template>
            </el-table-column>
            <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="del2(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- third -->
        <el-tab-pane label="家教类型" name="third" checked>
          <el-button @click="showAdd3()" class="manage_button">添加</el-button>
          <el-table :data="eucation_data3" height="250" border style="width: 80%;margin:0 auto">
            <el-table-column label="序号" type="index" :index="indexMethod" width="100"></el-table-column>
            <el-table-column prop="img" label="图片">
              <template slot-scope="scope">
                <img width="100px" height="100px" :src="scope.row.img" alt />
              </template>
            </el-table-column>
            <el-table-column prop="num" label="报名人数"></el-table-column>
            <el-table-column prop="teacherImg" label="授课机构">
              <template slot-scope="scope">
                <img width="100px" height="100px" :src="scope.row.img" alt />
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="del3(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>
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
    var desNo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入描述"));
      }
    };
    var numNo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入人数"));
      }
    };
    var typeNo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入人数"));
      }
    };
    var teacherImgNo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入机构"));
      }
    };
    return {
      rules1: {
        img: [{ validator: imgNo, trigger: "blur" }],
        des: [{ validator: desNo, trigger: "blur" }]
      },
      rules2: {
        img: [{ validator: imgNo, trigger: "blur" }],
        type: [{ validator: typeNo, trigger: "blur" }]
      },
      rules3: {
        img: [{ validator: imgNo, trigger: "blur" }],
        num: [{ validator: numNo, trigger: "blur" }],
        teacherImg: [{ validator: teacherImgNo, trigger: "blur" }]
      },
      activeName: "first",
      eucation_data1: [],
      eucation_data2: [],
      eucation_data3: [],
      form1: {
        img: "",
        des: ""
      },
      form2: {
        img: "",
        type: ""
      },
      form3: {
        img: "",
        num: "",
        teacherImg: ""
      },
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      formLabelWidth: "120px"
    };
  },
  watch: {},
  computed: {},
  methods: {
    //家教banner
    //1添加打开
    showAdd1() {
      this.dialogFormVisible1 = true;
      this.from1 = {};
    },
    //1添加
    addEducation1() {
      // console.log(this.form);
      this.$axios({
        url: API.addTeacherBanner,
        method: "get",
        params: this.form1
      }).then(res => {
        // console.log(res);
        if (res.data.code == 0) {
          this.$axios({
            url: API.teacherBanner,
            method: "get",
            params: {}
          }).then(res => {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.eucation_data1 = res.data.data;
          });
          this.dialogFormVisible1 = false;
        } else {
          this.$message({
            message: res.data.info,
            type: "warning"
          });
        }
      });
    },
    //1删除
    del1(index, row) {
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(res => {
          this.$axios({
            url: API.delTeacherBanner,
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
              url: API.teacherBanner,
              method: "get",
              params: {}
            }).then(res => {
              this.eucation_data1 = res.data.data;
            });
          });
        })
        .catch(() => {});
    },
    //2添加打开
    showAdd2() {
      this.dialogFormVisible2 = true;
      this.from2 = {};
    },
    //2添加
    addEducation2() {
      // console.log(this.form2);
      this.$axios({
        url: API.addTeacherType,
        method: "get",
        params: this.form2
      }).then(res => {
        // console.log(this.form2);
        if (res.data.code == 0) {
          this.$axios({
            url: API.teacherType,
            method: "get",
            params: {}
          }).then(res => {
            this.$message({
              message: res.data.info,
              type: "success"
            });

            this.eucation_data2 = res.data.data;
          });
          this.dialogFormVisible2 = false;
        } else {
          this.$message({
            message: res.data.info,
            type: "warning"
          });
        }
      });
    },
    //2删除
    del2(index, row) {
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(res => {
          this.$axios({
            url: API.delTeacherType,
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
              url: API.teacherType,
              method: "get",
              params: {}
            }).then(res => {
              this.eucation_data2 = res.data.data;
            });
          });
        })
        .catch(() => {});
    }, //3添加打开
    showAdd3() {
      this.dialogFormVisible3 = true;
      this.from3 = {};
    },
    //3添加
    addEducation3() {
      // console.log(this.form3);
      this.$axios({
        url: API.addTeacherTop,
        method: "get",
        params: this.form3
      }).then(res => {
        // console.log(this.form3);
        if (res.data.code == 0) {
          this.$axios({
            url: API.teacherTop,
            method: "get",
            params: {}
          }).then(res => {
            this.$message({
              message: res.data.info,
              type: "success"
            });

            this.eucation_data3 = res.data.data;
          });
          this.dialogFormVisible3 = false;
        } else {
          this.$message({
            message: res.data.info,
            type: "warning"
          });
        }
      });
    },
    //3删除
    del3(index, row) {
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(res => {
          this.$axios({
            url: API.delTeacherTop,
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
              url: API.teacherTop,
              method: "get",
              params: {}
            }).then(res => {
              this.eucation_data3 = res.data.data;
            });
          });
        })
        .catch(() => {});
    },
    //序号
    indexMethod(index) {
      return index + 1;
    },
    //切换
    handleClick(tab, event) {
      // console.log(tab, event);
    }
  },
  created() {},
  mounted() {
    //获取1
    this.$axios({
      url: API.teacherBanner,
      method: "get",
      params: {}
    }).then(res => {
      // console.log(res);
      this.eucation_data1 = res.data.data;
    });
    //获取2
    this.$axios({
      url: API.teacherType,
      method: "get",
      params: {}
    }).then(res => {
      // console.log(res);
      this.eucation_data2 = res.data.data;
    });
    //获取3
    this.$axios({
      url: API.teacherTop,
      method: "get",
      params: {}
    }).then(res => {
      // console.log(res);
      this.eucation_data3 = res.data.data;
    });
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../stylus/index.styl';

.education {
  height: 100vh;
  padding: 10px;
  box-sizing: border-box;
}

.education_button {
  margin: 20px;
}

.education_button:hover {
  background: $exit;
  color: $orange;
  border: 1px solid $exit;
}
</style>