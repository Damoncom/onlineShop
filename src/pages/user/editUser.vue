<template>
  <div class="app">
    <div class="bar">
      <i class="iconfont icon-jiantou"></i>
      <div class="title">
        <p class="text">Edit Profile</p>
      </div>
    </div>
    <div class="content">
      <div class="img_box" @click="changeImg">
        <img :src="imgUrl" class="img" />
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
                type="text"
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
              <input
                type="text"
                placeholder="Enter your birth date"
                class="birthday"
                v-model="user.birthay"
              />
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
                v-model="user.gender"
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
    <!-- 引入toast组件 -->
    <Toast :init="msg" v-if="isSave == true" />
  </div>
  <div class="mask" v-if="isChange == true"></div>
  <div class="changeImg_box" v-if="isChange == true">
    <div class="take_photo">
      <img src="@/assets/photo_img.jpg" class="photo_img" />
      <div class="photo_text">Take a photo</div>
    </div>
    <div class="picture">
      <img src="@/assets/picture_img.jpg" class="picture_img" />
      <div class="picture_text">Gallary</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUpdated, nextTick } from 'vue'
import Toast from '../../components/toast.vue'

// 修改头像
const imgUrl = ref('src/assets/imgurl.jpg')
let isChange = ref(false)
const changeImg = () => {
  isChange.value = true
  console.log('yes')
}

// 用户信息
const user = ref({
  name: 'Demo',
  phoneNumber: '12345678910',
  pwd: '',
  email: 'demo@email.com',
  address: '3 Raynes park Rd, HamptonVIC 3188, Australia',
  birthay: '01/04/2020',
  cardNum: '1234 1234 1234 4242',
  gender: 'Male'
})

// 性别选择
const isSelectGender = ref(false)
let count = ref(0)
const clickMale = (user) => {
  user.gender = 'Male'
}
const clickFemale = (user) => {
  user.gender = 'Female'
}
const selectGender = () => {
  count.value++
  if (count.value % 2 == 0) {
    isSelectGender.value = false
  } else {
    isSelectGender.value = true
  }
}

// 保存修改按钮
let msg = ref('')
let isSave = ref(false)
const save = () => {
  isSave.value = true
  msg.value = 'Successfully Saved!'
  setTimeout(() => {
    isSave.value = false
  }, 3000)
}
</script>

<style lang="scss" scoped>
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
    // background-color: #a456dd;
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
  .picture {
    width: 50%;
    height: 80px;
    // background-color: #a456dd;
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
</style>
