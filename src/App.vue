<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./styles/common";
#nprogress .bar {
  background: black !important; //自定义颜色
}
#app {
  margin: 0;
  padding: 0;
  background: #f2f2f2;
}
</style>
