<template>
  <div class="box">
    <i class="iconfont icon-404"></i>
    <img src="@/assets/404.svg" class="img" />
    <h1>404</h1>
    <p>The server crashed, please try again later</p>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.box {
  width: 375px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .icon-404 {
    font-size: 50px;
    line-height: 100px;
    color: #a456dd;
    margin-top: -50px;
  }
  img {
    width: 375px;
  }
  h1 {
    font-size: 50px;
    line-height: 100px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: #a456dd;
  }
  p {
    font-size: 18px;
    line-height: 20px;
    color: #a456dd;
  }
}
</style>
