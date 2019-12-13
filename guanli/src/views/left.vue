<template>
  <div class="left">
    <div class="super" v-if="type==0">
      <router-link class="router_link" active-class="select" to="/index/manage">管理员系统</router-link>
    </div>
    <div class="ordinary" v-if="type==1">
      <router-link class="router_link" active-class="select" to="/index/banner">banner管理</router-link>
      <router-link class="router_link" active-class="select" to="/index/education">家教管理</router-link>
      <router-link class="router_link" active-class="select" to="/index/water">水站管理</router-link>
      <router-link class="router_link" active-class="select" to="/index/repair">维修管理</router-link>
      <router-link class="router_link" active-class="select" to="/index/housekeeping">家政管理</router-link>
      <router-link class="router_link" active-class="select" to="/index/changepass">修改密码</router-link>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      type: ""
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {
    this.type = localStorage.getItem("login_type");
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../stylus/index.styl';

.left {
  width: 200px;
  background: $exit;
  text-align: center;
}

.router_link {
  color: $fontColor1;
  display: block;
  margin: 20px;
  padding: 5px;
  cursor: pointer;
}

.router_link:hover {
  color: $white;
  background: $orange;
}

.select {
  color: $white;
  background: $orange;
}
</style>