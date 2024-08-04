<template>
  <div class="toast">
    <p>{{ props.init }}</p>
  </div>
</template>

<script setup>
const props = defineProps(['init'])
// console.log(props.init)
</script>

<style lang="scss" scoped>
#app {
  position: relative;
  .toast {
    width: 300px;
    height: auto;
    background-color: #d5d7da;
    border-radius: 50px;
    position: absolute;
    top: 310px;
    left: 37.5px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: toast 4s ease-in-out;
    p {
      font-size: 16px;
      color: white;
      padding: 5px 10px;
      text-align: center;
    }
  }
  @keyframes toast {
    from {
      background-color: #d5d7da;
    }
    to {
      background-color: transparent;
    }
  }
}
</style>
