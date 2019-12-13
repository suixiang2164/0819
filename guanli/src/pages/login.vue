<template>
  <div class="login">
    <div class="login_box">
      <el-select class="login_select" v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input class="login_input" placeholder="请输入账号" v-model="user.name" clearable></el-input>
      <el-input class="login_input" placeholder="请输入密码" v-model="user.pass" show-password></el-input>
      <el-row>
        <el-button :plain="true" class="login_button" @click="toIndex">登录</el-button>
      </el-row>
    </div>
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
      user: {
        name: "",
        pass: "",
        type: ""
      },
      options: [
        {
          value: "0",
          label: "超级管理员"
        },
        {
          value: "1",
          label: "普通管理员"
        }
      ],
      value: "",
      input: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    toIndex() {
      this.user.type = this.value;
      // console.log(this.user.type);
      this.$axios({
        url: API.login,
        method: "post",
        data: this.user
      }).then(res => {
        // console.log(res);
        if (this.user.name == "") {
          this.$message({
            showClose: true,
            message: "请输入账号密码",
            type: "warning"
          });
        } else {
          if (res.data.isok) {
            this.$message({
              showClose: true,
              message: res.data.info,
              type: "success"
            });
            localStorage.setItem("login_type", res.data.type);
            localStorage.setItem("login_name", this.user.name);

            this.$router.push("/index");
          } else {
            this.$message({
              showClose: true,
              message: res.data.info,
              type: "warning"
            });
          }
        }
      });
    }
  },
  created() {},
  mounted() {
    localStorage.removeItem("login_type");
    localStorage.removeItem("login_name");
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../stylus/index.styl';

.login {
  width: 100vw;
  height: 100vh;
  background: $orange;
}

.login_box {
  width: 300px;
  height: 300px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  background: $white;
  padding: 40px 0;
  box-sizing: border-box;
  border-radius: 30px;
}

.login_select {
  width: 80%;
  margin: 0 0 10px;
}

.login_input {
  width: 80%;
  margin: 10px;
}

.login_button {
  margin: 10px 0 0;
  background: $backgroundColor1;
  color: $white;
}

.login_button:hover {
  background: $backgroundColor2;
  color: $backgroundColor3;
  border: 1px solid $backgroundColor2;
}
</style>