<template>
  <div class="app">
    <div class="content">
      <div class="img_box">
        <img src="@/assets/location_logo.jpg" class="img" />
      </div>
      <div class="text_box">
        <div class="title">Service Delivery Location</div>
        <div class="discription">
          Select the area where you would like to receive some amazing services. You can change this
          later!
        </div>
      </div>
      <div class="current_button" @click="getCurrentLocation">
        <div class="current">
          <p class="text">My Current Location</p>
        </div>
      </div>
      <RouterLink to="/select_location" class="link_selectLocation">
        <div class="select_button">
          <div class="select">
            <p class="text">Select Location</p>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
  <div class="mask" v-if="isActivedCurrent == true" @click="activedMask"></div>
  <div class="location_current_box" v-if="isActivedCurrent == true">
    <div class="current_box_title">Comfirm your Location</div>
    <i class="iconfont icon-dingwei"></i>
    <div class="details">{{ postData.location }}</div>
    <div class="box_button">
      <div class="cancel_button" @click="cancel">
        <div class="cancel">
          <p class="text">Cancel</p>
        </div>
      </div>
      <div class="confirm_button" @click="comfirm">
        <div class="comfirm">
          <p class="text">Comfirm</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AMap from '@amap/amap-jsapi-loader'
// import MapLoader from '../../utils/unti'

const router = useRouter()
const route = useRoute()

const token_info = localStorage.getItem('token')

// 添加配送地址
const postData = reactive({})

// 控制蒙层
let isActivedCurrent = ref(false)
const activedMask = () => {
  isActivedCurrent.value = false
}

// 获取当前定位
const getCurrentLocation = async () => {
  isActivedCurrent.value = true

  window._AMapSecurityConfig = {
    securityJsCode: 'f65db0bf29f4fa45b64363831ae37e69'
  }
  const map = await AMap.load({
    key: 'eb1f4dd61ef1ba411c76dbd10a5940d6', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.Geolocation', 'AMap.Geocoder'] //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
  })
  console.log('🚀 ~ onMounted ~ map:', map)

  map.plugin(['AMap.Geolocation', 'AMap.Geocoder'], () => {
    const geocoder = new map.Geocoder()
    const geolocation = new map.Geolocation({
      enableHighAccuracy: true, // 是否使用高精度定位，默认：true
      timeout: 10000, // 设置定位超时时间，默认：无穷大
      offset: [10, 20], // 定位按钮的停靠位置的偏移量
      zoomToAccuracy: true, //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      position: 'RB' //  定位按钮的排放位置,  RB表示右下
    })
    console.log('🚀 ~ AMap.plugin ~ geolocation:', geolocation)

    geolocation.getCurrentPosition((status, result) => {
      if (status == 'complete') {
        onComplete(result)
      } else {
        onError(result)
      }
    })

    const onComplete = ({ position }) => {
      console.log('🚀 ~ onComplete ~ position:', position)
      Reflect.set(postData, 'lat', position.lat)
      Reflect.set(postData, 'lng', position.lng)

      // data是具体的定位信息
      geocoder.getAddress([position.lng, position.lat], (status, result) => {
        console.log('🚀 ~ geocoder.getAddress ~ status:', status)
        if (status === 'complete' && result.info === 'OK') {
          // result为对应的地理位置详细信息
          console.log('🚀 ~ result:', result)
          Reflect.set(postData, 'location', result.regeocode.formattedAddress)
          console.log('我的', postData)
        } else {
          console.log('🚀 ~ status:', status)
          console.log('🚀 ~ result:', result)
        }
      })
    }

    const onError = (data) => {
      console.log('🚀 ~ onError ~ data:', data)
      // 定位出错
    }
  })
}

// 取消
const cancel = () => {
  isActivedCurrent.value = false
}

// comfirm按钮，发送post请求，添加配送地址
const comfirm = async () => {
  await nextTick()

  isActivedCurrent.value = false

  const { data: resp_location } = await axios({
    method: 'post',
    url: '/onlineShop/createLocation',
    data: postData,
    headers: {
      Authorization: `Bearer ${token_info}`,
      'Content-Type': 'multipart/form-data'
    }
  })
  if (resp_location.errCode == 1000) {
    isActivedCurrent.value = false
    router.push({
      path: '/profile'
    })
  } else {
    isActivedCurrent.value = true
  }
  console.log('post添加配送地址：', resp_location)
}
</script>

<style lang="scss" scoped>
.app {
  .content {
    width: 375px;
    height: 812px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .img_box {
      .img {
        width: 96px;
        height: 96px;
      }
    }
    .text_box {
      width: 308px;
      margin-top: 31px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .title {
        font-size: 20px;
        color: #333333;
      }
      .discription {
        margin-top: 18px;
        font-size: 14px;
        color: #333333;
        line-height: 20px;
        text-align: center;
      }
    }
    .current_button {
      width: 335px;
      height: 46px;
      margin-top: 147px;
      display: flex;
      justify-content: center;
      align-items: center;
      .current {
        width: 335px;
        height: 46px;
        border-radius: 6px;
        background-color: #a456dd;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.1s ease-in-out;
        .text {
          font-size: 16px;
          color: #ffffff;
        }
      }
      .current:active {
        width: 325px;
        height: 44px;
      }
    }
    .link_selectLocation {
      text-decoration: none;
      .select_button {
        width: 335px;
        height: 46px;
        margin-top: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        .select {
          width: 335px;
          height: 46px;
          border-radius: 6px;
          border: 1px solid #a456dd;
          background-color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.1s ease-in-out;
          .text {
            font-size: 16px;
            color: #a456dd;
          }
        }
        .select:active {
          width: 325px;
          height: 44px;
        }
      }
    }
  }
}
.mask {
  width: 375px;
  height: 812px;
  background-color: rgba($color: #000000, $alpha: 0.5);
  position: absolute;
  top: 0;
}
.location_current_box {
  width: 375px;
  height: 351px;
  background-color: #ffffff;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  .current_box_title {
    font-size: 16px;
    color: #333333;
    line-height: 20px;
  }
  .icon-dingwei {
    margin-top: 27px;
    font-size: 24px;
    color: #a456dd;
  }
  .details {
    margin-top: 13px;
    width: 302px;
    font-size: 14px;
    line-height: 20px;
    color: #828282;
    text-align: center;
  }
  .box_button {
    display: flex;
    align-items: center;
    margin-top: 25px;

    .cancel_button {
      width: 159px;
      height: 50px;
      //   margin-top: 18px;
      margin-right: 8.5px;
      display: flex;
      justify-content: center;
      align-items: center;
      .cancel {
        width: 159px;
        height: 50px;
        border-radius: 6px;
        background-color: #f6eefc;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.1s ease-in-out;
        .text {
          font-size: 16px;
          color: #a456dd;
        }
      }
      .cancel:active {
        width: 149px;
        height: 46.8px;
      }
    }
    .confirm_button {
      width: 159px;
      height: 50px;
      //   margin-top: 18px;
      margin-left: 8.5px;
      display: flex;
      justify-content: center;
      align-items: center;
      .comfirm {
        width: 159px;
        height: 50px;
        border-radius: 6px;
        background-color: #a456dd;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.1s ease-in-out;
        .text {
          font-size: 16px;
          color: #ffffff;
        }
      }
      .comfirm:active {
        width: 149px;
        height: 46.8px;
      }
    }
  }
}
</style>
