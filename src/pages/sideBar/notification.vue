<template>
  <div class="app">
    <Nav :init_title="navTitle" />
    <div class="content">
      <ul class="notification_list">
        <li
          class="notification_item"
          v-for="(notification, notification_index) of nocticeStore.notification"
          :key="notification_index"
          @click="readNotice(notification)"
        >
          <div class="img_box">
            <i class="iconfont icon-ling"></i>
          </div>
          <div class="text_box">
            <div class="msg">{{ notification.content }}</div>
            <div class="source">{{ notification.vendor }}</div>
          </div>
          <div class="time_box">
            <div class="time">{{ notification.timediff }}</div>
            <i class="iconfont icon-yuan" v-if="notification.read == false"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { onBeforeMount, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Nav from '@/components/nav'
import { useNocticeStore } from '@/stores/notification'

// 接口
const nocticeStore = useNocticeStore()

const router = useRouter()
const route = useRoute()

// 导入导航栏
const navTitle = 'Notification'

onBeforeMount(async () => {
  // get通知列表
  await nocticeStore.getNotification()
})

// 已读通知put请求
const readNotice = async (notification) => {
  await nextTick()

  // 已读消息点击不会发送请求处理
  if (notification.read == true) {
    return notification
  } else {
    notification.read = true

    // put请求
    const resp_read = await nocticeStore.readNotification(notification.id)
    if (resp_read.errCode == 1000) {
      notification.read = true
    } else {
      notification.read = false
    }
  }
}
</script>

<style lang="scss" scoped>
.app {
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    // ul
    .notification_list {
      margin-top: 24px;
      padding-bottom: 30px;
      width: 375px;
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      // li
      .notification_item {
        width: 327px;
        height: 73px;
        border-radius: 10px;
        border: 1px solid #ececec;
        box-shadow: rgba(149, 157, 165, 0.109) 0px 0px 24px;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        .img_box {
          width: 48px;
          height: 48px;
          background-color: #f6eefc;
          border-radius: 50px;
          margin-left: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          .icon-ling {
            font-size: 25px;
            color: #a456dd;
          }
        }
        .text_box {
          width: 212px;
          // height: 34px;
          margin-left: 12px;

          .msg {
            font-size: 14px;
            color: #474949;
            line-height: 20px;
          }
          .source {
            font-size: 12px;
            color: #828282;
            line-height: 15px;
          }
        }
        .time_box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .time {
            font-size: 8px;
            color: #828282;
            line-height: 16px;
            letter-spacing: -0.16px;
          }
          .icon-yuan {
            font-size: 8px;
            color: #a456dd;
            line-height: 10px;
          }
        }
      }
    }
  }
}
</style>
@/utils/getNotice
