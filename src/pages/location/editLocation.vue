<template>
  <div class="app">
    <Nav :init_title="navTitle" />
    <div class="content">
      <div class="info">
        <div class="name_box">
          <div class="name_text">Name</div>
          <div class="input_box">
            <input type="text" class="name_input" />
          </div>
        </div>
        <div class="phone_box">
          <div class="phone_text">phone</div>
          <div class="input_box">
            <input type="number" class="phone_input" />
          </div>
        </div>
        <div class="area_box">
          <div class="area_text">Area</div>
          <div class="input_box">
            <input type="text" class="area_input" />
          </div>
        </div>
        <div class="details_box">
          <div class="details_text">Details</div>
          <div class="input_box">
            <input type="text" class="details_input" />
          </div>
        </div>
      </div>
      <!-- <div class="img_box">
        <img src="@/assets/edit_location.jpg" class="img" />
      </div> -->
      <div class="box_button">
        <div class="cancel_button">
          <div class="cancel">
            <p class="text">Save</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Nav from '@/components/nav'

// 导入导航栏
const navTitle = 'Edit Location'
</script>

<style lang="scss" scoped>
.app {
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    .info {
      width: 375px;
      margin: 24px 0 157px 0;
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
          .area_input {
            margin-left: 10px;
            font-size: 16px;
            width: 220px;
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
            font-size: 16px;
            width: 220px;
          }
        }
      }
    }
    .img_box {
      position: absolute;
      top: 80px;
      transform: rotateX(180deg);
      //   transform: rotate(-0.45turn);
      opacity: 0.5;
      z-index: -1;
      .img {
        width: 327px;
      }
    }
    .box_button {
      display: flex;
      align-items: center;
      margin-top: 25px;
      //   position: fixed;
      //   bottom: 50px;

      .cancel_button {
        width: 375px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        .cancel {
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
        .cancel:active {
          width: 149px;
          height: 46.8px;
        }
      }
    }
  }
}
</style>
