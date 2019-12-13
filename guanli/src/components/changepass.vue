<template>
  <div class="changepass">
    <h1>{{$route.name}}</h1>
    <el-form :model="form">
      <el-form-item label="账号" :label-width="formLabelWidth">
        <el-input v-model="form.name" disabled autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="原密码" :label-width="formLabelWidth" aria-placeholder>
        <el-input
          class="input"
          v-model="form.oldpass"
          show-password
          autocomplete="off"
          placeholder="请输入原密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" aria-placeholder>
        <el-input
          class="input"
          v-model="form.newpass"
          show-password
          autocomplete="off"
          placeholder="请输入新密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" :label-width="formLabelWidth">
        <el-input
          class="input"
          v-model="form.newpass1"
          show-password
          autocomplete="off"
          placeholder="请再次输入新密码"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="changepass()" class="changepass_button">修改</el-button>
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
      form: {
        name: localStorage.getItem("login_name"),
        oldpass: "",
        newpass: "",
        newpass1: ""
      },
      formLabelWidth: "100px",
      changepass_data: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    changepass() {
      if (this.form.newpass != this.form.newpass1) {
        this.$message({
          showClose: true,
          message: "新密码两次输入不一致",
          type: "warning"
        });
        return;
      }
      if (this.form.newpass == this.form.newpass1) {
        this.$axios({
          url: API.changePassManage,
          method: "post",
          data: this.form
        }).then(res => {
          // console.log(res);
          if (res.data.isok) {
            this.$message({
              showClose: true,
              message: res.data.info,
              type: "success"
            });
            this.form = {
              name: "",
              oldpass: "",
              newpass: ""
            };
            this.$router.replace("/login");
          } else {
            this.$message({
              showClose: true,
              message: res.data.info,
              type: "warning"
            });
          }
        });
      }
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../stylus/index.styl';

.changepass {
  height: 100vh;
  padding: 10px;
  box-sizing: border-box;
}

.changepass_button {
  margin: 20px;
}

.changepass_button:hover {
  background: $exit;
  color: $orange;
  border: 1px solid $exit;
}
</style>