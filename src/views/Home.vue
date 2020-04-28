<template>
  <div>
    <top />
    <banner />
    <hotgoods />
    <selected />
    <brand />
    <choise />
    <scorll />
    <indexbottom />
  </div>
</template>

<script>
import banner from "../components/banner/banner";
import hotgoods from "../components/hotgoods/hotgoods";
import selected from "../components/selected/selected";
import brand from "../components/brand/brand";
import choise from "../components/choise/choise";
import scorll from "../components/scorll/scorll";
// import indexbottom from "../components/indexbottom/indexbottom";
export default {
  data() {
    return {};
  },
  components: {
    banner,
    hotgoods,
    selected,
    brand,
    choise,
    scorll
  },
  mounted() {},
  methods: {},
  watch: {},
  computed: {}
};
</script>

<style lang='scss' scoped>
</style>