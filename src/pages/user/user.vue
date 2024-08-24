<template>
  <div class="app">
    <Nav :init_title="navTitle" />
    <div class="content">
      <div class="user">
        <div class="details">
          <img :src="userStore.userData.iconImage" class="img" />
          <div class="info">
            <div class="name">{{ userStore.userData.name }}</div>
            <div class="emailAndphone">
              <div class="email">{{ userStore.userData.email }}</div>
              <div class="phone">{{ userStore.userData.phoneNumber }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="contact">
        <div class="title_text">Contact Details</div>
        <div class="email_box">
          <div class="list">
            <div class="title">Email</div>
            <div class="detail">{{ userStore.userData.email }}</div>
          </div>
        </div>
        <div class="mobile_box">
          <div class="list">
            <div class="title">Mobile</div>
            <div class="detail">{{ userStore.userData.phoneNumber }}</div>
          </div>
        </div>
        <div class="address_box" @click="linkToLoaction">
          <div class="list">
            <div class="title">Address</div>
            <div class="detail">{{ locationStore.locationList.location }}</div>
          </div>
        </div>
        <div class="birthday_box">
          <div class="list">
            <div class="title">Birthday</div>
            <div class="detail">{{ userStore.userData.birthday }}</div>
          </div>
        </div>
        <div class="vacination_box">
          <div class="list">
            <div class="title">Vacination</div>
            <div class="detail">(Attached Certificate)</div>
            <i class="iconfont icon-zhaoxiangji"></i>
          </div>
        </div>
      </div>
      <div class="payment">
        <div class="title_text">Payment Detail</div>
        <div class="visa_box">
          <div class="list">
            <img src="@/assets/visa_logo.jpg" class="title_img" />
            <div class="more">(Default)</div>
            <div class="num">{{ userStore.userData.cardNum }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <TabBar :init_profile="isProfilePage" />
</template>
<script setup>
import { onBeforeMount, reactive } from 'vue'
import TabBar from '@/components/tabBar'
import Nav from '@/components/nav'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useLocationStore } from '@/stores/location'

// 接口
const userStore = useUserStore()
const locationStore = useLocationStore()

const router = useRouter()
const route = useRoute()

// 导入导航栏
const navTitle = 'Profile'

// 用户信息
// TODO:默认照片
const user = reactive({
  // iconImage: 'src/assets/imgurl.jpg'
})

onBeforeMount(async () => {
  // get地址信息
  const locationPost = reactive({
    size: 1,
    page: 1
  })
  await locationStore.getLocation(locationPost)

  // get用户信息
  await userStore.getUserInfo()
})

// 确认是Profile页面
const isProfilePage = true

// address跳到定位页面
const linkToLoaction = () => {
  router.push({
    path: '/location'
  })
}
</script>

<style lang="scss" scoped>
.app {
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .user {
      width: 335px;
      height: 132px;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      margin-top: 24px;
      border: 1px solid #ececec;
      border-radius: 8px;
      display: flex;
      align-items: center;
      .details {
        width: 295px;
        height: 100px;
        display: flex;
        align-items: center;
        .img {
          width: 100px;
          height: 100px;
          border-radius: 10px;
          margin-left: 20px;
        }
        .info {
          width: 171px;
          height: 86px;
          margin-left: 24px;
          .name {
            font-size: 20px;
            color: #192252;
            line-height: 30px;
            font-weight: 500;
            padding-bottom: 5px;
            letter-spacing: 0.2;
            border-bottom: 1px solid #eff3fa;
          }
          .emailAndphone {
            padding-top: 5px;
            .email {
              font-size: 12px;
              color: #848fac;
              line-height: 22px;
              letter-spacing: 0.12;
            }
            .phone {
              font-size: 12px;
              color: #848fac;
              line-height: 22px;
              letter-spacing: 0.12;
            }
          }
        }
      }
    }
    .contact {
      width: 335px;
      height: 380px;
      margin-top: 10px;
      .title_text {
        width: 93px;
        height: 24px;
        margin-bottom: 8px;
        font-size: 12px;
        font-weight: 600;
        color: #828282;
        line-height: 24px;
      }
      .email_box {
        width: 335px;
        height: 60px;
        border: 1px solid #ececec;
        border-radius: 8px;
        margin-bottom: 12px;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 0px 24px;
        display: flex;
        align-items: center;
        .list {
          width: 303px;
          height: 20px;
          margin-left: 17px;
          display: flex;
          align-items: center;
          .title {
            margin-bottom: 0;
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #828282;
            line-height: 19.6px;
            letter-spacing: 0.3;
          }
          .detail {
            font-size: 14px;
            color: #333333;
            line-height: 19.6px;
            letter-spacing: 0.3;
            margin-left: auto;
            font-weight: 600;
          }
        }
      }
      .mobile_box {
        width: 335px;
        height: 60px;
        border: 1px solid #ececec;
        border-radius: 8px;
        margin-bottom: 12px;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 0px 24px;
        display: flex;
        align-items: center;
        .list {
          width: 303px;
          height: 20px;
          margin-left: 17px;
          display: flex;
          align-items: center;
          .title {
            font-size: 14px;
            color: #828282;
            line-height: 19.6px;
            letter-spacing: 0.3;
            margin-bottom: 0;
            display: flex;
            align-items: center;
          }
          .detail {
            font-size: 14px;
            color: #333333;
            line-height: 19.6px;
            letter-spacing: 0.3;
            margin-left: auto;
            font-weight: 600;
          }
        }
      }
      .address_box {
        width: 335px;
        height: 60px;
        border: 1px solid #ececec;
        border-radius: 8px;
        margin-bottom: 12px;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 0px 24px;
        display: flex;
        align-items: center;
        .list {
          width: 303px;
          height: 20px;
          margin-left: 17px;
          display: flex;
          align-items: center;
          .title {
            font-size: 14px;
            color: #828282;
            line-height: 19.6px;
            letter-spacing: 0.3;
            margin-bottom: 0;
            display: flex;
            align-items: center;
          }
          .detail {
            width: 220px;
            font-size: 13px;
            color: #333333;
            line-height: 19.6px;
            letter-spacing: 0.3;
            margin-left: auto;
            text-align: end;
            font-weight: 700;
          }
        }
      }
      .birthday_box {
        width: 335px;
        height: 60px;
        border: 1px solid #ececec;
        border-radius: 8px;
        margin-bottom: 12px;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 0px 24px;
        display: flex;
        align-items: center;
        .list {
          width: 303px;
          height: 20px;
          margin-left: 17px;
          display: flex;
          align-items: center;
          .title {
            font-size: 14px;
            color: #828282;
            line-height: 19.6px;
            letter-spacing: 0.3;
            margin-bottom: 0;
            display: flex;
            align-items: center;
          }
          .detail {
            font-size: 14px;
            color: #333333;
            line-height: 19.6px;
            letter-spacing: 0.3;
            margin-left: auto;
            font-weight: 600;
          }
        }
      }
      .vacination_box {
        width: 335px;
        height: 60px;
        border: 1px solid #ececec;
        border-radius: 8px;
        margin-bottom: 12px;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 0px 24px;
        display: flex;
        align-items: center;
        .list {
          width: 303px;
          height: 20px;
          margin-left: 17px;
          display: flex;
          align-items: center;
          .title {
            font-size: 14px;
            color: #828282;
            line-height: 19.6px;
            letter-spacing: 0.3;
            margin-bottom: 0;
            display: flex;
            align-items: center;
          }
          .detail {
            margin-top: 2px;
            font-size: 12px;
            color: #cfcfcf;
            line-height: 20px;
            letter-spacing: 0.3;
            margin-left: auto;
            margin-right: 10px;
            display: flex;
            align-items: center;
            // font-weight: 600;
          }
          .icon-zhaoxiangji {
            font-size: 22px;
            color: #a456dd;
          }
        }
      }
    }
    .payment {
      width: 335px;
      height: 132px;
      margin: 24px 0 50px 0;
      .title_text {
        width: 93px;
        height: 24px;
        margin-bottom: 8px;
        font-size: 12px;
        font-weight: 600;
        color: #828282;
        line-height: 24px;
      }
      .visa_box {
        width: 335px;
        height: 60px;
        border: 1px solid #ececec;
        border-radius: 8px;
        margin-bottom: 12px;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 0px 24px;
        display: flex;
        align-items: center;
        .list {
          width: 335px;
          display: flex;
          align-items: center;
          .title_img {
            width: 38px;
            height: 11.5px;
            margin-left: 20px;
          }
          .more {
            font-size: 12px;
            color: #cfcfcf;
            line-height: 20px;
            letter-spacing: 0.3;
            margin-left: 10px;
          }
          .num {
            font-size: 14px;
            line-height: 19.6px;
            letter-spacing: 0.3;
            font-weight: 500;
            color: #333333;
            margin-left: auto;
            margin-right: 20px;
          }
        }
      }
    }
  }
}
</style>
