<template>
  <el-cascader size="large" :options="options" v-model="selectedOptions" @change="handleChange">
  </el-cascader>
</template>

<script>
import { provinceAndCityData, codeToText } from 'element-china-area-data'

export default {
  data() {
    return {
      options: provinceAndCityData,
      selectedOptions: []
    }
  },

  methods: {
    handleChange() {
      var loc = ''
      for (let i = 0; i < this.selectedOptions.length; i++) {
        loc += codeToText[this.selectedOptions[i]]
      }
      console.log(loc) //打印区域码所对应的属性值即中文地址
    }
  }
}
</script>
