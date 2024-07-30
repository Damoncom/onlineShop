<template>
  <div class="app">
    <div class="bar">
      <i class="iconfont icon-jiantou"></i>
      <div class="title">
        <p class="text">Select Location</p>
      </div>
    </div>
    <div class="content">
      <div class="search_box">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" class="search" placeholder="Search..." v-model="inputText" />
      </div>
      <div class="select_box">
        <div class="active" @click="chooseRegion">
          <div
            class="box"
            v-for="(region, index) of regionList"
            :key="index"
            :data-name="region.name"
            :data-index="index"
            :class="avtivedIndex == index || searchIndex == region.id ? 'box_purple' : 'box'"
          >
            <i
              class="iconfont icon-xuanzhong"
              :class="avtivedIndex == index ? 'icon-xuanzhong_purple' : 'icon-xuanzhong'"
            ></i>
            <div class="place_text">{{ region.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onUpdated, nextTick } from 'vue'

const regionList = ref([
  {
    id: '1',
    name: 'Queensland'
  },
  {
    id: '2',
    name: 'New South Wales'
  },
  {
    id: '3',
    name: 'Victoria'
  },
  {
    id: '4',
    name: 'Western Australia'
  },
  {
    id: '5',
    name: 'Tasmania'
  }
])
let avtivedIndex = ref(0)
const chooseRegion = (e) => {
  avtivedIndex.value = e.target.dataset.index
}

let inputText = ref('')
let searchElement = ref('')
let searchIndex = ref('')
onUpdated(async () => {
  await nextTick()
  searchElement.value = regionList.value.find((region) => region.name == inputText.value)
  searchIndex.value = searchElement.value.id
})
</script>
<style lang="scss" scoped>
.app {
  .bar {
    width: 375px;
    height: 48px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon-jiantou {
      font-size: 16px;
      color: #191d31;
      margin-right: auto;
      margin-left: 20px;
    }
    .title {
      height: 24px;
      margin-right: 130px;
      display: flex;
      align-items: center;
      justify-content: center;
      .text {
        font-size: 16px;
        color: #374151;
        text-align: center;
      }
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .search_box {
      width: 335px;
      height: 44px;
      margin-top: 24px;
      border: 1px solid #d9d9d9;
      border-radius: 10px;
      background-color: white;
      display: flex;
      align-items: center;
      .icon-sousuo {
        font-size: 25px;
        color: #94a3b8;
        margin-left: 10px;
      }
      .search {
        width: 250px;
        font-size: 16px;
        line-height: 18px;
        margin-left: 10px;
      }
      .search::-webkit-input-placeholder {
        font-size: 16px;
        line-height: 18px;
        color: #828282;
      }
    }
    .select_box {
      margin-top: 32px;
      .active {
        .box {
          width: 335px;
          height: 50px;
          border: 1px solid #f1f1f1;
          border-radius: 6px;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          .icon-xuanzhong {
            font-size: 24px;
            color: #e3e5e5;
            margin-left: 20px;
          }
          .icon-xuanzhong_purple {
            color: #a456dd;
          }
          .place_text {
            font-size: 14px;
            color: #4f4f4f;
            margin-left: 10px;
          }
        }
        .box_purple {
          border: 1px solid #a456dd;
        }
      }
    }
  }
}
</style>
