<template>
  <div class="app">
    <Nav :init_title="navTitle" />
    <div class="content">
      <div class="info">
        <div class="name_box">
          <div class="name_text">Name</div>
          <div class="input_box">
            <input type="text" class="name_input" v-model="user.name" />
          </div>
        </div>
        <div class="phone_box">
          <div class="phone_text">phone</div>
          <div class="input_box">
            <input type="number" class="phone_input" v-model="user.phoneNumber" />
          </div>
        </div>
        <div class="area_box">
          <div class="area_text">Area</div>
          <div class="input_box">
            <input type="text" class="area_input" v-model="areaText" />
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
        <div class="save_button" @click="save">
          <div class="save">
            <p class="text">Save</p>
          </div>
        </div>
        <div class="delete_button" @click="deleteB">
          <div class="delete">
            <p class="text">Delete</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 蒙层 -->
  <div class="mask" v-if="isMask == true" @click="activedMask"></div>

  <!-- 删除面板 -->
  <div class="delete_bigBox" @click.self="activedMask">
    <div class="delete_box" v-if="isMask == true">
      <i class="iconfont icon-shanchu"></i>
      <div class="delete_text">Are you sure to delete this address information?</div>
      <div class="choose_button">
        <div class="cancel_button" @click="cancelDelete">
          <p>no</p>
        </div>
        <div class="delete_button" @click="comfirmDelete">
          <p>yes</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onUpdated, nextTick, reactive, ref, onBeforeMount } from 'vue'
import Nav from '@/components/nav'
import { useRouter, useRoute } from 'vue-router'
import { removeLocation, updateLocation, getUserInfo } from '@/utils/api'

// 导入导航栏
const navTitle = 'Edit Location'

const router = useRouter()
const route = useRoute()

const user = reactive({})
const locationInfo = route.query
const str = ref(locationInfo.location)
const areaText = ref(str.value?.slice(0, str.value?.indexOf('区') + 1))
const detailsText = ref(str.value?.slice(str.value?.indexOf('区') + 1))

// 获取用户信息
onBeforeMount(async () => {
  // get用户信息
  const resp_userInfo = await getUserInfo()
  if (resp_userInfo.errCode == 1000) {
    Object.assign(user, resp_userInfo.data)
  } else {
  }
  console.log('get用户信息：', resp_userInfo)
})

// 发送put请求，修改配送地址
const save = async () => {
  await nextTick()

  const loc = `${areaText.value}${detailsText.value}`
  const postData = reactive({
    id: locationInfo.id,
    location: loc,
    lng: locationInfo.lng,
    lat: locationInfo.lat
  })
  console.log(postData)

  const resp_updateLocation = await updateLocation(postData)
  if (resp_updateLocation.errCode == 1000) {
    router.push({
      path: '/select_location'
    })
  } else {
  }
  console.log('put修改地址：', resp_updateLocation)
}

// 控制蒙层
const isMask = ref(false)
const activedMask = () => {
  isMask.value = !isMask.value
}

// 删除面板
const deleteB = async () => {
  await nextTick()

  isMask.value = !isMask.value
}

const cancelDelete = () => {
  isMask.value = !isMask.value
}

// delete删除配送地址
const comfirmDelete = async () => {
  const postData = reactive({
    id: locationInfo.id
  })
  const resp_removeLocation = await removeLocation(postData)
  console.log('delete删除配送地址', resp_removeLocation)

  if (resp_removeLocation.errCode == 1000) {
    router.push({
      path: '/select_location'
    })
  } else {
    isActivedCurrent.value = true
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
      margin: 24px 0 120px 0;
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
      flex-direction: column;
      align-items: center;
      margin-top: 25px;

      .save_button {
        width: 375px;
        height: 50px;
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        .save {
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
        .save:active {
          width: 315px;
          height: 46.8px;
        }
      }
      .delete_button {
        width: 375px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        .delete {
          width: 325px;
          height: 48px;
          border-radius: 6px;
          border: 1px solid red;
          // background-color: #a456dd;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.1s ease-in-out;
          .text {
            font-size: 16px;
            color: #a456dd;
          }
        }
        .delete:active {
          width: 315px;
          height: 46.8px;
        }
      }
    }
  }
}
// 蒙层
.mask {
  width: 375px;
  height: 812px;
  background-color: rgba($color: #000000, $alpha: 0.5);
  position: absolute;
  top: 0;
  z-index: 2;
}

// 删除面板
.delete_bigBox {
  position: absolute;
  top: 0;
  width: 375px;
  height: 812px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  .delete_box {
    width: 250px;
    height: 250px;
    border-radius: 10px;
    background-color: white;
    z-index: 4;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .icon-shanchu {
      font-size: 40px;
      color: rgb(255, 51, 51);
      line-height: 60px;
    }
    .delete_text {
      font-size: 16px;
      text-align: center;
      line-height: 25px;
      width: 200px;
      margin-bottom: 20px;
    }
    .choose_button {
      width: 250px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      .cancel_button {
        width: 70px;
        height: 30px;
        border-radius: 6px;
        background-color: #a456dd;
        margin-right: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        p {
          font-size: 17px;
          color: white;
        }
      }
      .delete_button {
        width: 70px;
        height: 30px;
        border-radius: 6px;
        background-color: #a456dd;
        margin-left: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        p {
          font-size: 17px;
          color: white;
        }
      }
    }
  }
}
</style>
