<template>
  <div class="app">
    <Nav :init_title="navTitle" />
    <div class="content">
      <div class="info">
        <div class="name_box">
          <div class="name_text">Name</div>
          <div class="input_box">
            <input type="text" class="name_input" v-model="userStore.userData.name" />
          </div>
        </div>
        <div class="phone_box">
          <div class="phone_text">phone</div>
          <div class="input_box">
            <input type="number" class="phone_input" v-model="userStore.userData.phoneNumber" />
          </div>
        </div>
        <div class="area_box">
          <div class="area_text">Area</div>
          <div class="input_box">
            <div class="el_box">
              <AreaSelect class="areaSelect" />
            </div>
            <div class="area_input">{{ route.query.area }}</div>
            <div class="arrow">
              <i class="iconfont icon-jiantou"></i>
            </div>
          </div>
        </div>
        <div class="details_box">
          <div class="details_text">Details</div>
          <div class="input_box">
            <input type="text" class="details_input" v-model="detailsText" />
          </div>
        </div>
      </div>

      <div class="box_button">
        <div class="cancel_button" @click="save">
          <div class="cancel">
            <p class="text">Save</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import Nav from '@/components/nav'
import AreaSelect from '@/components/areaSelect'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useLocationStore } from '@/stores/location'

// 接口
const userStore = useUserStore()
const locationStore = useLocationStore()

// 导入导航栏
const navTitle = 'Add Location'

const router = useRouter()
const route = useRoute()

const detailsText = ref()

// 发送post请求，添加配送地址
const save = async () => {
  const postData = reactive({
    location: route.query.area + detailsText.value,
    lng: '114.215767',
    lat: '22.684308'
  })

  await locationStore.createLocation(postData)

  if (locationStore.createLocation.errCode == 1000) {
    router.push({
      path: '/select_location'
    })
  } else {
  }
}
</script>

<style lang="scss" scoped>
.app {
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    .info {
      width: 375px;
      margin: 24px 0 157px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      .name_box {
        width: 328px;
        height: 50px;
        margin-bottom: 18px;
        display: flex;
        align-items: center;
        .name_text {
          font-size: 14px;
        }
        .input_box {
          width: 250px;
          height: 45px;
          border: 1px solid #f3f3f3;
          border-radius: 12px;
          box-shadow: rgba(149, 157, 165, 0.109) 0px 4px 24px;
          margin-left: auto;
          display: flex;
          align-items: center;
          .name_input {
            margin-left: 10px;
            font-size: 16px;
            width: 220px;
          }
        }
      }
      .phone_box {
        width: 328px;
        height: 50px;
        margin-bottom: 18px;
        display: flex;
        align-items: center;
        .phone_text {
          font-size: 14px;
        }
        .input_box {
          width: 250px;
          height: 45px;
          border: 1px solid #f3f3f3;
          border-radius: 12px;
          box-shadow: rgba(149, 157, 165, 0.109) 0px 4px 24px;
          margin-left: auto;
          display: flex;
          align-items: center;
          .phone_input {
            margin-left: 10px;
            font-size: 16px;
            width: 220px;
          }
        }
      }
      .area_box {
        width: 328px;
        height: 50px;
        margin-bottom: 18px;
        display: flex;
        align-items: center;
        .area_text {
          font-size: 14px;
        }
        .input_box {
          width: 250px;
          height: 45px;
          border: 1px solid #f3f3f3;
          border-radius: 12px;
          box-shadow: rgba(149, 157, 165, 0.109) 0px 4px 24px;
          margin-left: auto;
          display: flex;
          align-items: center;
          position: relative;
          z-index: 0;
          .el_box {
            opacity: 0;
            z-index: 2;
          }
          .area_input {
            position: absolute;
            vertical-align: middle;
            left: 15px;
            font-size: 14px;
            width: 150px;
            z-index: 3;
          }
          .arrow {
            position: absolute;
            right: 20px;
            transform: rotate(0.75turn);
            z-index: 0;
            .icon-jiantou {
              font-size: 12px;
            }
          }
        }
      }
      .details_box {
        width: 328px;
        height: 50px;
        margin-bottom: 18px;
        display: flex;
        align-items: center;
        .details_text {
          font-size: 14px;
        }
        .input_box {
          width: 250px;
          height: 45px;
          border: 1px solid #f3f3f3;
          border-radius: 12px;
          box-shadow: rgba(149, 157, 165, 0.109) 0px 4px 24px;
          margin-left: auto;
          display: flex;
          align-items: center;
          .details_input {
            margin-left: 10px;
            font-size: 14px;
            width: 220px;
          }
        }
      }
    }

    .box_button {
      display: flex;
      align-items: center;
      margin-top: 25px;
      //   position: fixed;
      //   bottom: 50px;

      .cancel_button {
        width: 375px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        .cancel {
          width: 327px;
          height: 50px;
          border-radius: 6px;
          background-color: #a456dd;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.1s ease-in-out;
          .text {
            font-size: 16px;
            color: white;
          }
        }
        .cancel:active {
          width: 149px;
          height: 46.8px;
        }
      }
    }
  }
}
</style>
