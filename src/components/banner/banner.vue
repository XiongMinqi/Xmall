<template>
  <div class="bodys">
    
    <div class="banner bannerbody">
      <Carousel
        v-model="value"
        loop
        autoplay
      >
        <CarouselItem
          v-for="(item,index) in bannerlist"
          :key="index"
        >
          <div
            class="imgs"
            
          >
            <img
              class="imgone"
              :src="item.picUrl"
            >
            <img
              class="imgtwo"
              :src="item.picUrl2"
            >
            <img
              class="imgthree"
              :src="item.picUrl3"
            >
          </div>
        </CarouselItem>
      </Carousel>
    </div>
    <div class="scorllmsg">
      <div class="scorll bannerbody">
        <div
        @click="detail(item)"
          class="scorllimg"
          :class="{'borderleft':index===0,'borderright':index===3}"
          v-for="(item,index) in scorlllist"
          :key="index"
        >
          <img :src="item.picUrl">
          <div class="absolute"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 0,
      token:"",
     
      bannerlist: [],
      scorlllist: []
    };
  },
  components: {},
  methods: {
    detail(e) {
      this.token=localStorage.getItem("token")
      console.log(this.token,"token");
      console.log(e);
      window.open("http://localhost:9999/detail")
    }
  },
  mounted() {
    this.$api
      .getdata()
      .then(res => {
        this.bannerlist = res.data[0].panelContents;
        this.scorlllist = res.data[1].panelContents;
        console.log(res);
        console.log(this.bannerlist, "banner");
        console.log(this.scorlllist, "scorlllist");
      })
      .catch(err => {
        console.log(err);
      });
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.bodys {
  // background: #f2f2f2;
}
.bannerbody {
  max-width: 1200px;
  margin: 0 auto;
}
.toptitle {
  background: white;
}
.chooselist {
  display: flex;
  align-items: center;
  div {
    padding: 10px;
    &:hover {
      color: #5079d9;
      cursor: pointer;
    }
  }
}
.banner {
  margin: 20px auto;
  .imgs {
    width: 100%;
    height: 500px;
    position: relative;
    .imgone {
      position: absolute;
      top: 0;
      left: 0;
      height: 500px;
    }
    .imgtwo {
      position: absolute;
      top: 0;
      left: 0;
      height: 500px;
    }
    .imgthree {
      position: absolute;
      top: 0;
      left: 0;
      height: 500px;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
}
.scorllimg {
  display: inline-block;
  position: relative;
  border-radius: 5px;
  width: 25%;
  height: 195px;
  border: 0.5px solid #b2b2b2;
  &:hover {
    .absolute {
      display: block;
    }
  }
  .absolute {
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
.borderleft {
  border-radius: 5px 0 0 5px;
  img {
    border-radius: 5px 0 0 5px;
  }
}
.borderright {
  border-radius: 0 5px 5px 0;
  img {
    border-radius: 0 5px 5px 0;
  }
}
.scorllmsg {
  padding-bottom: 20px;
}
.scorll {
  border-radius: 20px;
  border: 0.5px solid #b2b2b2;
  height: 196px;
  // border-left: 0;
}
</style>