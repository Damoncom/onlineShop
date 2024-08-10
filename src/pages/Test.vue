<template>
  <div>
    <div style="display: flex; flex-direction: row">
      <ImgCutter
        ref="imgCutterModal"
        v-on:cutDown="cutDownImg"
        :WatermarkText="''"
        :is-modal="false"
        :tool="false"
        :sizeChange="false"
        :boxWidth="700"
        :boxHeight="458"
        :cutWidth="470"
        :cutHeight="270"
        @onPrintImg="cutterPrintImg"
        :originalGraph="true"
        style="padding: 10px"
      >
        <template #cancel>
          <div></div>
        </template>
      </ImgCutter>
      <div style="margin-left: 10px; padding: 10px">
        <div style="margin-left: 10px; padding-bottom: 20px; font-size: 18px; font-weight: bold">
          图像预览
        </div>
        <div
          style="
            width: 470px;
            height: 270px;
            border: 1px solid #e8e8e8;
            background-color: rgba(0, 0, 0, 0.1);
          "
        >
          <img :src="temImgPath" style="width: 100%" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ImgCutter from 'vue-img-cutter' //引入vue-img-cutter
import { ref, watch, onMounted } from 'vue'
const emit = defineEmits(['getCoverImage']) //与父组件事件通信
const props = defineProps({
  imgUrl: String
})
const temImgPath = ref('')
const imgCutterModal = ref()
watch(
  () => props.imgUrl,
  (val, o) => {
    temImgPath.value = props.imgUrl
    imgCutterModal.value.handleOpen({
      name: '封面图片',
      src: props.imgUrl
    })
  }
)
//实时更新预览效果
function cutterPrintImg(obj) {
  temImgPath.value = obj.dataURL
}

// 图片裁剪点击确认后触发
function cutDownImg(option) {
  //向后端发送请求等
  //请求成功时，emit("getCoverImage")，让父组件再次获取刚修改的新图片
}
</script>

<style lang="less" scoped>
.remove-btn-wrap {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  text-align: center;
  display: none;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
}

.ant-upload:hover .remove-btn-wrap {
  display: flex;
}

:deep(.ant-upload) {
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 2px;
  }
}
:deep(.copyright a[data-v-391393b9]) {
  display: none !important;
}
</style>
