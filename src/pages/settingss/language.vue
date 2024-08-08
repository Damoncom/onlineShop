<template>
  <div class="app">
    <Nav :init_title="navTitle" />
    <div class="content">
      <ul class="language_list">
        <li
          class="language_item"
          v-for="(language, language_index) of languageList"
          :key="language_index"
          :data-index="language_index"
          @click="chooseLanguage"
        >
          <i
            class="iconfont icon-xuanzhong"
            :class="activedLiIndex == language_index ? 'icon-xuanzhong_purple' : 'icon-xuanzhong'"
          ></i>
          <div class="name">{{ language.name }}</div>
          <div class="img_box">
            <img :src="language.img" class="img" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Nav from '@/components/nav'

const router = useRouter()
const route = useRoute()

// 导入导航栏
const navTitle = 'Language Settings'

const languageList = reactive([
  {
    id: '1',
    name: 'English',
    img: 'src/assets/english.svg'
  },
  {
    id: '2',
    name: 'Spanish',
    img: 'src/assets/spanish.svg'
  },
  {
    id: '3',
    name: 'Mandarin',
    img: 'src/assets/mandarin.svg'
  },
  {
    id: '4',
    name: 'Arabic',
    img: 'src/assets/arabic.svg'
  },
  {
    id: '5',
    name: 'Bengali',
    img: 'src/assets/bangali.jpg'
  },
  {
    id: '6',
    name: 'Korean',
    img: 'src/assets/korean.svg'
  },
  {
    id: '7',
    name: 'German',
    img: 'src/assets/german.svg'
  },
  {
    id: '8',
    name: 'Portuguese',
    img: 'src/assets/portuguese.svg'
  }
])

// 选择语言
const activedLiIndex = ref(0)
const chooseLanguage = (e) => {
  activedLiIndex.value = e.currentTarget.dataset.index
}
</script>

<style lang="scss" scoped>
.app {
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // ul
    .language_list {
      width: 343px;
      height: 582px;
      margin: 24px 0 50px 0;
      // li
      .language_item {
        width: 343px;
        height: 64px;
        border-radius: 10px;
        border: 1px solid #ececec;
        box-shadow: rgba(149, 157, 165, 0.109) 0px 0px 24px;
        margin-bottom: 12px;
        display: flex;
        align-items: center;

        .icon-xuanzhong {
          font-size: 20px;
          color: #e3e5e5;
          margin-left: 12px;
        }
        .icon-xuanzhong_purple {
          color: #a456dd;
        }
        .name {
          margin-left: 16px;
        }
        .img_box {
          width: 32px;
          height: 24px;
          margin-left: auto;
          margin-right: 40px;
          .img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }
}
</style>
