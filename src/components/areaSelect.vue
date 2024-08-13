<template>
  <el-cascader
    size="large"
    :options="options"
    v-model="selectedOptions"
    @change="handleChange"
    style="width: 260px"
  >
  </el-cascader>
</template>

<script>
import { provinceAndCityData, codeToText } from 'element-china-area-data'
import { useRouter, useRoute } from 'vue-router'
import { nextTick } from 'vue'
export default {
  data() {
    return {
      options: provinceAndCityData,
      selectedOptions: [],
      router: useRouter(),
      route: useRoute()
    }
  },

  methods: {
    async handleChange() {
      await nextTick()
      var area = ''
      for (let i = 0; i < this.selectedOptions.length; i++) {
        area += codeToText[this.selectedOptions[i]]
      }
      console.log(area) //打印区域码所对应的属性值即中文地址
      this.router.push({
        path: '/add_location',
        query: {
          area: area
        }
      })
    }
  }
}
</script>
