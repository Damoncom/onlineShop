<template>
  <div class="app">
    <Nav :init_title="navTitle" />
    <div class="content">
      <div class="img_box" @click="changeImg">
        <img :src="user.iconImage" class="img" />
        <i class="iconfont icon-zhaoxiangji1"></i>
      </div>
      <div class="frame">
        <div class="input_name">
          <div class="title">Your Name</div>
          <div class="form">
            <div class="main">
              <i class="iconfont icon-geren"></i>
              <input type="text" placeholder="Enter your name" class="name" v-model="user.name" />
            </div>
          </div>
        </div>
        <div class="input_email">
          <div class="title">Your Email</div>
          <div class="form">
            <div class="main">
              <i class="iconfont icon-xinxi"></i>
              <input
                type="email"
                placeholder="Enter your email"
                class="email"
                v-model="user.email"
              />
            </div>
          </div>
        </div>
        <div class="input_phone">
          <div class="title">Your Phone No.</div>
          <div class="form">
            <div class="main">
              <i class="iconfont icon-tel"></i>
              <input
                type="text"
                placeholder="Enter your phone number"
                class="phone"
                v-model="user.phoneNumber"
              />
            </div>
          </div>
        </div>
        <div class="input_birthday">
          <div class="title">Birth Date</div>
          <div class="form">
            <div class="main">
              <i class="iconfont icon-rili"></i>
              <input type="date" class="birthday" v-model="user.birthday" />
            </div>
          </div>
        </div>
        <div class="input_gender">
          <div class="title">Gender</div>
          <div class="form">
            <div class="main">
              <i class="iconfont icon-xingbie"></i>
              <input
                type="text"
                placeholder="Enter your gender"
                class="gender"
                readonly="readonly"
                v-model="input_gender"
              />
              <div class="select" @click="selectGender">
                <i class="iconfont icon-jiantou"></i>
              </div>
            </div>
          </div>
          <div class="select_list" v-if="isSelectGender == true">
            <div class="male" @click="clickMale(user)">
              <p class="male_text">Male</p>
            </div>
            <div class="female" @click="clickFemale(user)">
              <p class="female_text">Female</p>
            </div>
          </div>
        </div>
      </div>
      <div class="button">
        <div class="back_home_button" @click="save">
          <p class="text1">Save</p>
        </div>
      </div>
    </div>
  </div>
  <div class="mask" v-if="isChange == true" @click="isChangeImg_box"></div>
  <div class="changeImg_box" v-if="isChange == true">
    <div class="take_photo">
      <input
        type="file"
        accept="image/*"
        capture="camera"
        @change="takePhoto"
        ref="cameraInput"
        class="camera_input"
      />
      <div class="photo">
        <img src="@/assets/photo_img.jpg" class="photo_img" />
        <div class="photo_text">Take a photo</div>
      </div>
    </div>
    <div class="picture_upload">
      <input type="file" @change="handleFileUpload" ref="uploadInput" class="upload_input" />
      <div class="picture">
        <img src="@/assets/picture_img.jpg" class="picture_img" />
        <div class="picture_text">Gallary</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, unref, onBeforeMount, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Nav from '@/components/nav'
import { Toast_Success } from '@/utils/extract'
import { useUserStore } from '@/stores/user'

// 接口
const userStore = useUserStore()

const router = useRouter()
const route = useRoute()

// 导入导航栏
const navTitle = 'Edit Profile'

// 修改头像
const uploadInput = ref(null)
const cameraInput = ref(null)
const imgUrl = ref('src/assets/imgurl.jpg')

// 控制蒙层和changeImg_box的出现
let isChange = ref(false)
const changeImg = () => {
  isChange.value = true
}
const isChangeImg_box = (e) => {
  // console.log(e.target)
  isChange.value = false
}

//获取摄像头功能
const takePhoto = async () => {
  isChange.value = false
  console.log(cameraInput)

  // 需要发送的数据
  let formData1 = new FormData()
  formData1.append('file', unref(cameraInput).files[0])

  // post上传用户头像
  const resp_upload_photo = await userStore.uploadImage(formData1)
  if (resp_upload_photo.errCode == 1000) {
    // 获取上传图片的路径
    imgUrl.value = 'https://api.cake803.cn' + resp_upload_photo.url
    user.iconImage = 'https://api.cake803.cn' + resp_upload_photo.url
  } else {
  }
  console.log(resp_upload_photo)
}

// 上传照片

const handleFileUpload = async (file, fileList) => {
  isChange.value = false
  console.log(uploadInput)

  // 需要发送的数据
  let formData = new FormData()
  formData.append('file', unref(uploadInput).files[0])

  // 压缩图片
  const beforeUpload = async (file) => {
    let fileName = file[0].name
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const base64 = await fileToDataURL(file[0])
    const img = await dataURLToImage(base64)
    canvas.width = img.width
    canvas.height = img.height
    context.clearRect(0, 0, img.width, img.height)
    context.drawImage(img, 0, 0, img.width, img.height)
    let blob = await canvastoFile(canvas, 'image/jpeg', 0.5) //quality:0.5可根据实际情况计算
    const f = await new File([blob], fileName)
    return [f]
  }

  // TODO:图片链接前缀
  // post上传用户头像
  const resp_upload_picture = await userStore.uploadImage(formData)
  if (resp_upload_picture.errCode == 1000) {
    // 获取上传图片的路径
    imgUrl.value = 'http://192.168.100.7:7001' + resp_upload_picture.url
    user.iconImage = 'http://192.168.100.7:7001' + resp_upload_picture.url
  } else {
  }
  console.log(resp_upload_picture)
}

// 性别选择
const input_gender = ref('Male')
const isSelectGender = ref(false)
let count = ref(0)
const clickMale = (user) => {
  input_gender.value = 'Male'
  user.gender = '0'
  isSelectGender.value = false
  count.value = 0
}
const clickFemale = (user) => {
  input_gender.value = 'Female'
  user.gender = '1'
  isSelectGender.value = false
  count.value = 0
}
const selectGender = () => {
  count.value++
  if (count.value % 2 == 0) {
    isSelectGender.value = false
  } else {
    isSelectGender.value = true
  }
}

// 用户信息
const user = reactive({
  address: '',
  cardNum: '',
  iconImage: 'src/assets/imgurl.jpg',
  ...userStore.userData
})
console.log(user)

// get请求获取用户信息
onBeforeMount(async () => {
  // get用户信息
  await userStore.getUserInfo()

  if (userStore.userData.gender == '1') {
    input_gender.value = 'Female'
  } else {
    input_gender.value = 'Male'
  }
  console.log(user)
})

// 保存修改按钮
const save = async () => {
  await nextTick()

  // 性别判断
  if (input_gender.value == 'Male') {
    user.gender = '0'
  } else if (input_gender.value == 'Female') {
    user.gender = '1'
  }

  // 修改过的用户信息
  let obj = { ...user }

  // put修改用户信息
  const resp_update = await userStore.updateUserInfo(obj)
  if (resp_update.errCode == 1000) {
    Toast_Success('Successfully!')
    // 跳转到profile页面
    router.push({
      path: '/profile'
    })
  }
  console.log(resp_update)
}
</script>

<style lang="scss" scoped>
input {
  background: none;
  outline: none;
  border: none;
}
.app {
  .bar {
    width: 375px;
    height: 48px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon-jiantou {
      font-size: 16px;
      color: #191d31;
      margin-right: auto;
      margin-left: 20px;
    }
    .title {
      height: 24px;
      margin-right: 148px;
      display: flex;
      align-items: center;
      justify-content: center;
      .text {
        font-size: 16px;
        color: #374151;
      }
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .img_box {
      width: 100px;
      height: 100px;
      margin-top: 24px;
      position: relative;

      .img {
        width: 100px;
        height: 100px;
        border-radius: 10px;
      }
      .icon-zhaoxiangji1 {
        font-size: 24px;
        font-weight: 800;
        color: #a456dd;
        position: absolute;
        top: 5px;
        right: 5px;
      }
    }
    .frame {
      margin-top: 24px;
      .input_name {
        width: 327px;
        height: 78px;
        margin-bottom: 20px;
        .title {
          width: auto;
          height: 25px;
          font-size: 16px;
          color: #a7a9b7;
          margin-left: 5px;
        }
        .form {
          width: 327px;
          height: 52px;
          border: 1px solid #f3f3f3;
          border-radius: 12px;
          display: flex;
          align-items: center;
          .main {
            width: 300px;
            height: 24px;
            margin-left: 10px;
            display: flex;
            align-items: center;
            .icon-geren {
              font-size: 20px;
              color: #a7a9b7;
            }
            .name {
              vertical-align: center;
              margin-left: 14px;
              width: 235px;
              font-size: 17px;
            }
            .name::-webkit-input-placeholder {
              font-size: 16px;
              color: #a7a9b7;
            }
            .right {
              width: 23px;
              height: 23px;
            }
          }
        }
      }
      .input_email {
        width: 327px;
        height: 78px;
        margin-bottom: 20px;
        .title {
          width: auto;
          height: 25px;
          font-size: 16px;
          color: #a7a9b7;
          margin-left: 5px;
        }
        .form {
          width: 327px;
          height: 52px;
          border: 1px solid #f3f3f3;
          border-radius: 12px;
          display: flex;
          align-items: center;
          .main {
            width: 300px;
            height: 24px;
            margin-left: 10px;
            display: flex;
            align-items: center;
            .icon-xinxi {
              font-size: 23px;
              color: #a7a9b7;
            }
            .email {
              vertical-align: center;
              margin-left: 12px;
              width: 235px;
              font-size: 17px;
            }
            .email::-webkit-input-placeholder {
              font-size: 16px;
              color: #a7a9b7;
            }
            .right {
              width: 23px;
              height: 23px;
            }
          }
        }
      }
      .input_phone {
        width: 327px;
        height: 78px;
        margin-bottom: 20px;
        .title {
          width: auto;
          height: 25px;
          font-size: 16px;
          color: #a7a9b7;
          margin-left: 5px;
        }
        .form {
          width: 327px;
          height: 52px;
          border: 1px solid #f3f3f3;
          border-radius: 12px;
          display: flex;
          align-items: center;
          .main {
            width: 300px;
            height: 24px;
            margin-left: 10px;
            display: flex;
            align-items: center;
            .icon-tel {
              font-size: 20px;
              color: #a7a9b7;
            }
            .phone {
              vertical-align: center;
              margin-left: 14px;
              width: 235px;
              font-size: 17px;
            }
            .phone::-webkit-input-placeholder {
              font-size: 16px;
              color: #a7a9b7;
            }
            .right {
              width: 23px;
              height: 23px;
            }
          }
        }
      }
      .input_birthday {
        width: 327px;
        height: 78px;
        margin-bottom: 20px;
        .title {
          width: auto;
          height: 25px;
          font-size: 16px;
          color: #a7a9b7;
          margin-left: 5px;
        }
        .form {
          width: 327px;
          height: 52px;
          border: 1px solid #f3f3f3;
          border-radius: 12px;
          display: flex;
          align-items: center;
          .main {
            width: 300px;
            height: 24px;
            margin-left: 10px;
            display: flex;
            align-items: center;
            .icon-rili {
              font-size: 23px;
              color: #a7a9b7;
            }
            .birthday {
              vertical-align: center;
              margin-left: 12px;
              width: 235px;
              font-size: 17px;
            }
            .birthday::-webkit-input-placeholder {
              font-size: 16px;
              color: #a7a9b7;
            }
            .right {
              width: 23px;
              height: 23px;
            }
          }
        }
      }
      .input_gender {
        width: 327px;
        height: 78px;
        margin-bottom: 20px;
        position: relative;
        .title {
          width: auto;
          height: 25px;
          font-size: 16px;
          color: #a7a9b7;
          margin-left: 5px;
        }
        .form {
          width: 327px;
          height: 52px;
          border: 1px solid #f3f3f3;
          border-radius: 12px;
          display: flex;
          align-items: center;
          .main {
            width: 300px;
            height: 24px;
            margin-left: 10px;
            display: flex;
            align-items: center;
            .icon-xingbie {
              font-size: 23px;
              color: #a7a9b7;
            }
            .gender {
              vertical-align: center;
              margin-left: 11px;
              width: 235px;
              font-size: 17px;
            }
            .gender::-webkit-input-placeholder {
              font-size: 16px;
              color: #a7a9b7;
            }
            .select {
              transform: rotate(0.75turn);
              .icon-jiantou {
                color: #a7a9b7;
              }
            }
          }
        }
        .select_list {
          position: absolute;
          top: 85px;
          width: 327px;
          border: 1px solid #f3f3f3;
          border-radius: 8px;
          background-color: #ffffff;

          .male {
            height: 40px;
            display: flex;
            align-items: center;
            border-radius: 8px 8px 0 0;
            .male_text {
              font-size: 16px;
              color: #a7a9b7;
              margin-left: 20px;
            }
          }
          .male:active {
            background-color: #a556dd33;
          }
          .male:active .male_text {
            color: #ffffff;
          }
          .female {
            height: 40px;
            display: flex;
            align-items: center;
            .female_text {
              font-size: 16px;
              color: #a7a9b7;
              margin-left: 20px;
            }
          }
          .female:active {
            background-color: #a556dd33;
          }
          .female:active .female_text {
            color: #ffffff;
          }
        }
      }
    }
    .button {
      width: 335px;
      height: 46px;
      margin: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      .back_home_button {
        width: 335px;
        height: 46px;
        border-radius: 6px;
        background-color: #a456dd;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.1s ease-in-out;
        .text1 {
          font-size: 16px;
          color: #ffffff;
        }
      }
      .back_home_button:active {
        width: 325px;
        height: 44px;
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
  z-index: 3;
}
.changeImg_box {
  width: 288px;
  height: 117px;
  border-radius: 10px;
  background-color: #ffffff;
  z-index: 999;
  position: absolute;
  top: 348px;
  left: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  .take_photo {
    width: 49%;
    height: 80px;
    border-right: 1px solid #c4c4c4;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .camera_input {
      position: absolute;
      width: 144px;
      height: 80px;
      opacity: 0;
    }
    .photo {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .photo_img {
        width: 36px;
        height: 36px;
      }
      .photo_text {
        font-size: 12px;
        line-height: 26px;
        font-weight: 700;
      }
    }
  }
  .picture_upload {
    width: 50%;
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    .upload_input {
      position: absolute;
      width: 144px;
      height: 80px;
      opacity: 0;
    }
    .picture {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .picture_img {
        width: 36px;
        height: 36px;
      }
      .picture_text {
        font-size: 12px;
        line-height: 26px;
        font-weight: 700;
      }
    }
  }
}
</style>
