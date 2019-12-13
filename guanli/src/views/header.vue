<template>
  <div class="header">
    <el-row class="header_box">
      <el-button class="header_button" :plain="true" @click="header_exit">退出登录</el-button>
      <h1 class="header_h1">{{name}}</h1>
    </el-row>
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
      name: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    header_exit() {
      this.$confirm("是否退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            url: API.exit
          }).then(res => {
            this.$message({
              message: res.data.info,
              type: "success"
            });
            localStorage.removeItem("login_name");
            localStorage.removeItem("login_type");
            this.$router.push("/login");
            // console.log(res);
          });
        })
        .catch(() => {});
    }
  },
  created() {},
  mounted() {
    this.name = localStorage.getItem("login_name");
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../stylus/index.styl';

.header {
  width: 100vw;
  height: 100px;
  padding: 20px;
  box-sizing: border-box;
  background: $orange;
}

.header_h1, .header_button {
  float: right;
  margin: 0 20px;
}

.header_button:hover {
  background: $exit;
  color: $orange;
  border: 1px solid $orange;
}
</style>