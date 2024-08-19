import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

// 校验手机号码正确与否
export async function checkPhoneNumber(data) {
  // /^[1][3-9][0-9]{9}$/   注:以数字1开头，第二位是3到9的数字，后面跟着9个数字
  const phoneReg = /^[1][3-9][0-9]{9}$/
  return phoneReg.test(data)
}

// 校验密码格式正确与否
export async function checkPwd(data) {
  // /^[1][3-9][0-9]{9}$/   注:以数字1开头，第二位是3到9的数字，后面跟着9个数字
  const pwdReg = /^[a-zA-Z]\w{5,17}$/
  return pwdReg.test(data)
}

// 调用toast(error)
export function Toast(data) {
  return toast(data, {
    theme: 'auto',
    type: 'error',
    position: 'top-left',
    autoClose: 1500,
    transition: 'zoom',
    limit: 1,
    dangerouslyHTMLString: true
  })
}
// 调用toast(success)
export function Toast_Success(data) {
  return toast(data, {
    theme: 'auto',
    type: 'success',
    position: 'top-center',
    autoClose: 1500,
    transition: 'flip',
    limit: 1,
    dangerouslyHTMLString: true
  })
}
// 调用toast(info)
export function Toast_Info(data) {
  return toast(data, {
    theme: 'auto',
    type: 'info',
    position: 'bottom-center',
    autoClose: 1500,
    transition: 'flip',
    dangerouslyHTMLString: true
  })
}
