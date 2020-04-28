<template>
  <div class="scorllmsg">
      <div class="scorll bannerbody">
        <div
          class="scorllimg"
          v-for="(item,index) in scorlllist"
          :key="index"
        >
          <img :src="item.picUrl">
          <div class="absolute"></div>
        </div>
      </div>
    </div>
</template>

<script>
 export default {
   data () {
     return {
scorlllist:[]
     }
   },
   components: {

   },
   methods: {

   },
   mounted() {
 this.$api
      .getdata()
      .then(res => {
        this.scorlllist = res.data[6].panelContents;
        console.log(res);
        console.log(this.scorlllist, "scorlllist");
      })
      .catch(err => {
        console.log(err);
      });
   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
.scorllimg {
  display: inline-block;
  position: relative;
  width: 25%;
  height: 195px;
  border: 0.5px solid #b2b2b2;
  &:hover{
    .absolute{
      display: block;
    }
  }
  .absolute{
    width: 298px;
    height: 194px;
    display: none;
    position: absolute;
    box-shadow: 0 0 20px #c2c2c2 inset;
    top: 0;
    left: 0;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
.scorllmsg {
  padding-top: 50px;
  padding-bottom: 50px;
  max-width: 1200px;
  margin: 0 auto;
}
.scorll {
  // border-radius: 10px;
  border: 0.5px solid #b2b2b2;
  height: 196px;
  // border-left: 0;
}
</style>