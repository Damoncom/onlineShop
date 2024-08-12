<script setup>
import { onMounted, onUnmounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'

let map = null

onMounted(() => {
  window._AMapSecurityConfig = {
    securityJsCode: 'f65db0bf29f4fa45b64363831ae37e69'
  }
  AMapLoader.load({
    key: 'eb1f4dd61ef1ba411c76dbd10a5940d6', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.Scale', 'AMap.Geolocation'] //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
  })

    .then((AMap) => {
      map = new AMap.Map('container', {
        // 设置地图容器id
        viewMode: '3D', // 是否为3D地图模式
        zoom: 11 // 初始化地图级别
        // center: [116.397428, 39.90923] // 初始化地图中心点位置
      })
      map.on('click', function (ev) {
        //触发事件的对象
        var target = ev.target
        //触发事件的地理坐标，AMap.LngLat 类型
        var lnglat = ev.lnglat
        //触发事件的像素坐标，AMap.Pixel 类型
        var pixel = ev.pixel
        //触发事件类型
        var type = ev.type
        console.log(lnglat)
      })

      //TODO:获取不到当前位置
      geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 10000, //超过10秒后停止定位，默认：无穷大
        maximumAge: 0, //定位结果缓存0毫秒，默认：0
        convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true, //显示定位按钮，默认：true
        buttonPosition: 'LB', //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      })
      map.addControl(geolocation)
      geolocation.getCurrentPosition()
      AMap.event.addListener(geolocation, 'complete', onComplete) //返回定位信息
      AMap.event.addListener(geolocation, 'error', onError) //返回定位出错信息
    })

    .catch((e) => {
      console.log(e)
    })
})

onUnmounted(() => {
  map?.destroy()
})
</script>

<template>
  <div id="container"></div>
</template>

<style scoped>
#container {
  width: 100%;
  height: 800px;
}
</style>
