<template>
  <i class="iconfont icon-jiazaizhong2"></i>
</template>

<script setup></script>

<style lang="scss" scoped>
.icon-jiazaizhong2 {
  display: inline-block; /*需要设置为行内块元素动画才会生效*/
  font-size: 26px;
  color: #a456dd;
  animation: rotating 1s infinite linear;
}
@keyframes rotating {
  0% {
    transform: rotate(0deg); /*动画起始位置为旋转0度*/
  }

  to {
    transform: rotate(1turn); /*动画结束位置为旋转1圈*/
  }
}
</style>
