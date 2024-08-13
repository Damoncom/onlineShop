<script setup>
import { onMounted, onUnmounted } from 'vue'
import AMap from '@amap/amap-jsapi-loader'
import { nextTick } from 'vue'

onMounted(async () => {
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
      // data是具体的定位信息
      geocoder.getAddress([position.lng, position.lat], (status, result) => {
        console.log('🚀 ~ geocoder.getAddress ~ status:', status)
        if (status === 'complete' && result.info === 'OK') {
          // result为对应的地理位置详细信息
          console.log('🚀 ~ result:', result)
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
})
</script>

<template>
  <div id="iCenter"></div>
</template>

<style scoped>
#container {
  width: 100%;
  height: 800px;
}
</style>
