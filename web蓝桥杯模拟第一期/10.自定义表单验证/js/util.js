/** 邮箱验证函数
 * @param {string} val  邮箱地址
 * @return {boolean}
 */
const is_email = (val) => {
  // TODO：目标 2 待补充代码
  const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z]{2,4}$/
  return emailRegex.test(val)
}

/**手机号验证函数
 * @param {string} 手机号
 * @return {boolean}
 */
const is_phone = (val) => {
  return /^[0-9]{11}$/.test(val)
}

// 以下代码为测试需要请勿删除
try {
  module.exports = is_email
} catch {}
