<template>
  <div class="main">
    <v-left></v-left>
    <v-right></v-right>
  </div>
</template>
<script>
import vLeft from "./left";
import vRight from "./right";
export default {
  components: {
    vLeft,
    vRight
  },
  props: [],
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../stylus/index.styl';

.main {
  flex: 1;
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
  box-sizing: border-box;
}
</style>