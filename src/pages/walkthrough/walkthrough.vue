<template>
  <div class="app">
    <div class="default" v-if="isLoad == true">
      <img src="@/assets/walkthrough_logo.jpg" class="start_logo" v-if="isStart == true" />
      <img src="@/assets/walk_logo.jpg" class="end_logo" v-if="isStart == false" />
    </div>
    <swiper-container
      ref="swiper"
      class="scroll_box"
      :space-between="spaceBetween"
      :centered-slides="true"
      :pagenation="true"
    >
      <swiper-slide>
        <div class="swiper_wrapper">
          <div class="img_box">
            <img src="@/assets/walk1.jpg" class="img" />
          </div>
          <div class="text_box">
            <div class="title">Search Your Product Easily</div>
            <div class="discription">
              Now you can search your favorite product by only sweeping up your smartphone
            </div>
          </div>
          <div class="nav_icon">
            <img src="@/assets/nav_icon.jpg" class="nav_img" />
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper_wrapper">
          <div class="img_box">
            <img src="@/assets/walk2.jpg" class="img" />
          </div>
          <div class="text_box">
            <div class="title">Search Your Product Easily</div>
            <div class="discription">
              Now you can search your favorite product by only sweeping up your smartphone
            </div>
          </div>
          <div class="nav_icon">
            <img src="@/assets/nav_icon.jpg" class="nav_img" />
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper_wrapper">
          <div class="img_box">
            <img src="@/assets/walk3.jpg" class="img" />
          </div>
          <div class="text_box">
            <div class="title">Search Your Product Easily</div>
            <div class="discription">
              Now you can search your favorite product by only sweeping up your smartphone
            </div>
          </div>
          <div class="nav_icon">
            <img src="@/assets/nav_icon.jpg" class="nav_img" />
          </div>
          <div class="jump">
            <RouterLink to="/signUp" class="link">Start</RouterLink>
          </div>
        </div>
      </swiper-slide>
    </swiper-container>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

// 引入swiper
import { register } from 'swiper/element/bundle'

register()

// 翻页
const spaceBetween = 10
const onProgress = (e) => {
  const [swiper, progress] = e.detail
  console.log(progress)
}
const onSlideChange = (e) => {
  console.log('slide changed')
}

let swiper = ref(null)

// 开屏动画
let isLoad = ref(true)
let isStart = ref(true)
onMounted(async () => {
  await nextTick()
  setTimeout(() => {
    isStart.value = false
  }, 1900)
})
onMounted(async () => {
  setTimeout(() => {
    isLoad.value = false
  }, 3000)
})
</script>

<style lang="scss" scoped>
.app {
  .default {
    width: 375px;
    height: 812px;
    // height: 100%;
    // height: 100ph;
    background-color: #a456dd;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: default 3s ease-in-out;
    .start_logo {
      width: 88px;
      height: 88px;
      animation: startLogo 2s ease-in-out;
    }
    @keyframes startLogo {
      from {
        transform: rotateY(0deg);
      }
      to {
        transform: rotateY(180deg);
      }
    }
    .end_logo {
      width: 105.5px;
      height: 22.5px;
    }
  }
  @keyframes default {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  .scroll_box {
    width: 375px;
    height: 812px;
    // height: 100%;
    background-image: url('src/assets/walk_bg.jpg');
    background-size: contain;
    display: flex;
    align-items: center;
    justify-content: center;
    .swiper_wrapper {
      width: 375px;
      height: 812px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .img_box {
        display: flex;
        align-items: center;
        justify-content: center;
        .img {
          width: 288px;
          height: 218px;
        }
      }
      .text_box {
        width: 301px;
        height: 80px;
        margin-top: 120px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .title {
          font-size: 20px;
          color: #141a1f;
        }
        .discription {
          font-size: 12px;
          color: #3b3b3b;
          line-height: 20px;
          margin-top: 15px;
          text-align: center;
        }
      }
      .nav_icon {
        margin-top: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        .nav_img {
          width: 51px;
          height: 7px;
        }
      }
      .jump {
        width: 139px;
        height: 40px;
        margin-top: 24px;
        background-color: #a456dd;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        .link {
          font-size: 16px;
          color: white;
          text-decoration: none;
        }
      }
    }
  }
}
</style>
