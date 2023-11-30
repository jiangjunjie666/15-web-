/**
 * @param {string} val
 * @return {Object}
 */
var expectFn = function (val) {
  // TODO
  return {
    toBe: function (value) {
      if (val === value) {
        return true
      } else {
        return 'Not Equal'
      }
    },
    notToBe: function (value) {
      if (val !== value) {
        return true
      } else {
        return 'Equal'
      }
    }
  }
}

console.log(expectFn(5).toBe(5)) // true
console.log(expectFn(5).notToBe(5)) // "Equal"
// 检测需要，请勿删除
module.exports = expectFn
