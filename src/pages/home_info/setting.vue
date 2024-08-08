<template>
  <div
    class="app"
    :class="
      activedLiIndex == 3 || activedLiIndex == 2 || activedLiIndex == 4 ? 'app_regular' : 'app'
    "
  >
    <Nav :init_title="navTitle" />
    <div class="content">
      <ul class="settings_list">
        <li
          class="settings_item"
          v-for="(setting, setting_index) of settingsList"
          :key="setting_index"
          :data-index="setting_index"
          @click="activeSetting"
        >
          <img :src="setting.img" class="img" />
          <div class="name">{{ setting.name }}</div>
          <div class="arrow">
            <i class="iconfont icon-jiantou"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div
    class="mask"
    v-if="activedLiIndex == 3 || activedLiIndex == 2 || activedLiIndex == 4"
    @click="activedMask"
  ></div>
  <!-- privacy页面，terms页面 -->
  <div class="terms" v-if="activedLiIndex == 3 || activedLiIndex == 2">
    <div class="line_box">
      <div class="line"></div>
    </div>
    <div class="terms_title" v-if="activedLiIndex == 3">
      {{ terms.title }}
    </div>
    <div class="terms_title" v-if="activedLiIndex == 2">
      {{ terms.title2 }}
    </div>
    <div class="terms_content" v-html="terms.content"></div>
  </div>
  <!-- invite friends页面 -->
  <div class="invite" v-if="activedLiIndex == 4">
    <div class="line_box">
      <div class="line"></div>
    </div>
    <div class="invite_title">Spread the word!</div>
    <div class="invite_discription">Share services you love on your favourite platforms</div>
    <div class="platforms">
      <img src="@/assets/invite.jpg" class="img" />
    </div>
    <div class="or">Or send an email below!</div>
    <div class="email_input">
      <input type="email" placeholder="Recipient's email address" class="email" />
    </div>
    <div class="bottom">
      <div class="button_box">
        <div class="create_button">
          <p class="text">Save</p>
        </div>
      </div>
      <div class="button_box1">
        <div class="create_button">
          <p class="text">Cancel</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Nav from '@/components/nav'

const router = useRouter()
const route = useRoute()

// 导入导航栏
const navTitle = 'Settings'

const settingsList = reactive([
  {
    id: '1',
    name: 'Password Settings',
    img: 'src/assets/setting_pwd.jpg'
  },
  {
    id: '2',
    name: 'Language Settings',
    img: 'src/assets/setting_language.jpg'
  },
  {
    id: '3',
    name: 'Privacy Policy',
    img: 'src/assets/setting_privacy.jpg'
  },
  {
    id: '4',
    name: 'Terms & Conditions',
    img: 'src/assets/setting_terms.jpg'
  },
  {
    id: '5',
    name: 'Invite Friends',
    img: 'src/assets/setting_invite.jpg'
  }
])

const activedLiIndex = ref()
const activeSetting = (e) => {
  activedLiIndex.value = e.currentTarget.dataset.index
  console.log(activedLiIndex)
  if (activedLiIndex.value == 1) {
    router.push({
      path: '/language'
    })
  } else if (activedLiIndex.value == 2) {
    router.push({
      //   path: '/whishlist'
    })
  } else if (activedLiIndex.value == 3) {
    router.push({
      //   path: '/payment_history'
    })
  } else if (activedLiIndex.value == 4) {
    router.push({
      //   path: '/setting'
    })
  }
}

// 控制蒙层
const activedMask = () => {
  activedLiIndex.value = !activedLiIndex.value
}

const terms = reactive({
  title: 'Terms & Conditions',
  title2: 'Privacy Policy',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididuntut labore et dolore magna aliqua.<br/><br/>Vitae et leo duis ut. Fermentum dui faucibus inornare quam viverra. Laoreet non curabiturgravida arcu ac tortor. Viverra adipiscing at intellus integer feugiat scelerisque varius.<br/><br/>Ultrices tincidunt arcu non sodales nequesodales ut etiam sit.<br/>Et netus et malesuada fames. Cras sed felis egetvelit aliquet sagittis. Eu sem integer vitae justoeget magna. Neque ornare aenean euismodelementum.Adipiscing diam donec adipiscingtristique risus.<br/><br/>Fringilla ut morbi tincidunt augue. Turpistincidunt id aliquet risus feugiat in ante metusLorem ipsum dolor sit amet, consecteturadipiscing elit, sed do eiusmod tempor incididuntut labore et dolore magna aliqua. Lorem ipsumdolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et doloremagna aliqua.<br/><br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididuntut labore et dolore magna aliqua.<br/><br/>Vitae et leo duis ut. Fermentum dui faucibus inornare quam viverra. Laoreet non curabiturgravida arcu ac tortor. Viverra adipiscing at intellus integer feugiat scelerisque varius.<br/><br/>Ultrices tincidunt arcu non sodales nequesodales ut etiam sit.<br/>Et netus et malesuada fames. Cras sed felis egetvelit aliquet sagittis. Eu sem integer vitae justoeget magna. Neque ornare aenean euismodelementum.Adipiscing diam donec adipiscingtristique risus.<br/><br/>Fringilla ut morbi tincidunt augue. Turpistincidunt id aliquet risus feugiat in ante metusLorem ipsum dolor sit amet, consecteturadipiscing elit, sed do eiusmod tempor incididuntut labore et dolore magna aliqua. Lorem ipsumdolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et doloremagna aliqua.'
})
</script>

<style lang="scss" scoped>
.app {
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // ul
    .settings_list {
      width: 375px;
      height: auto;
      margin-top: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      // li
      .settings_item {
        width: 327px;
        height: 64px;
        border-radius: 10px;
        border: 1px solid #ececec;
        box-shadow: rgba(149, 157, 165, 0.109) 0px 0px 24px;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        .img {
          width: 40px;
          height: 40px;
          margin-left: 16px;
        }
        .name {
          font-size: 16px;
          color: #101520;
          margin-left: 16px;
        }
        .arrow {
          margin-left: auto;
          margin-right: 16px;
          transform: rotate(00.5turn);
          display: flex;
          align-items: center;
          .icon-jiantou {
            font-size: 14px;
            color: #94a3b8;
          }
        }
      }
    }
  }
}
.app_regular {
  position: fixed;
  top: 0;
}
.mask {
  width: 375px;
  height: 812px;
  background-color: rgba($color: #000000, $alpha: 0.5);
  position: absolute;
  top: 0;
  z-index: 2;
}
.terms {
  width: 375px;
  height: 87vh;
  background-color: white;
  z-index: 3;
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: scroll;

  .line_box {
    width: 375px;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 12vh;
    .line {
      width: 44px;
      height: 4px;
      border-radius: 10px;
      background-color: #e0e0e0;
      margin-top: 14px;
    }
  }

  .terms_title {
    font-size: 25px;
    color: #1a1a1a;
    // margin: 44px 0 0 24px;
    margin: 630px 0 0 24px;
  }
  .terms_content {
    width: 327px;
    line-height: 20px;
    color: #808080;
    padding-bottom: 50px;
    margin: 24px 0 0 24px;
  }
}
.invite {
  width: 375px;
  height: 390px;
  position: fixed;
  bottom: 0;
  background-color: white;
  z-index: 3;
  .line_box {
    width: 375px;
    display: flex;
    justify-content: center;
    .line {
      width: 44px;
      height: 4px;
      border-radius: 10px;
      background-color: #e0e0e0;
      margin-top: 7px;
    }
  }
  .invite_title {
    font-size: 23px;
    color: #1a1a1a;
    margin: 20px 0 10px 24px;
  }
  .invite_discription {
    font-size: 16px;
    margin: 0 0 0 24px;
    color: #484848;
    line-height: 20px;
  }
  .platforms {
    .img {
      width: 328px;
      height: 48px;
      margin: 16px 0 0 24px;
    }
  }
  .or {
    font-size: 16px;
    color: #1a1a1a;
    margin: 30px 0 10px 24px;
  }
  .email_input {
    width: 327px;
    height: 42px;
    border-radius: 6px;
    border: 1px solid #e8e8e8;
    margin: 20px 0 0 24px;
    display: flex;
    align-items: center;
    .email {
      width: 300px;
      margin-left: 10px;
      font-size: 16px;
    }
  }
  .bottom {
    width: 375px;
    height: 70px;
    background-color: white;
    position: fixed;
    bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    .button_box {
      width: 160px;
      height: 46px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 7.5px;
      .create_button {
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
      .create_button:active {
        width: 325px;
        height: 44px;
      }
    }
    .button_box1 {
      width: 160px;
      height: 46px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 7.5px;
      .create_button {
        width: 160px;
        height: 46px;
        border-radius: 6px;
        background-color: #ffffff;
        border: 1px solid #a456dd;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.1s ease-in-out;
        .text {
          font-size: 16px;
          color: #a456dd;
        }
      }
      .create_button:active {
        width: 325px;
        height: 44px;
      }
    }
  }
}
</style>
