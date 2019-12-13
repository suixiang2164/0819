<template>
  <div class="index">
    <v-header></v-header>
    <v-main></v-main>
  </div>
</template>
<script>
import vHeader from "../views/header";
import vMain from "../views/main";
export default {
  components: {
    vHeader,
    vMain
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

.index {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>