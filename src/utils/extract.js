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
