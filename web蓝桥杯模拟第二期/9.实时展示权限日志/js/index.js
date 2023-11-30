/**
 * 请完成下面的 TODO 部分，其他代码请勿改动
 */

// 对响应进行统一处理，如果不调用该函数，可能导致判题出错
// 参数为服务器的响应对象
function parseRes(res) {
  return (res.json && res.json()) || res.data
}

const App = {
  setup() {
    const { onMounted } = Vue
    const data = Vue.reactive({
      userList: [], //用户数组
      loggerList: [] //日志数组
    })
    const getPowerText = (power) => {
      return power ? '可以登录' : '禁止登录'
    }
    const handleChange = async (e) => {
      if (e.target.tagName !== 'INPUT') {
        return
      }
      // TODO 处理发送请求修改当前用户的权限并更新一条日志记录
      //处理put请求
      let res = await axios.put(`/editUser`, {
        id: e.target.dataset.id,
        power: e.target.checked
      })
      if (res.status == 200) {
        data.userList = parseRes(res.data)
      } else {
        console.log('修改失败')
      }
      //调用post请求，添加一条修改日志
      //用id找出用户名
      let userName = data.userList.find((item) => item.id == e.target.dataset.id).name
      let postRes = await axios.post('/logger', {
        data: `超级管理员将用户${userName}设置为${getPowerText(e.target.checked)}权限`
      })
      if (postRes.status == 200) {
        //将数据放在数组首
        let a = parseRes(postRes.data)
        data.loggerList.unshift(a)
      } else {
        console.log('添加日志失败')
      }
    }

    // TODO 在页面挂载之前请求用户数据并修改对应的响应数据
    //利用axios获取数据
    const getUserData = async () => {
      let res = await axios.get('/users')
      if (res.status == 200) {
        data.userList = res.data.data
      } else {
        getUserData()
      }
    }
    onMounted(() => {
      getUserData()
    })
    return {
      data,
      handleChange,
      getPowerText,
      getUserData
    }
  }
}
const app = Vue.createApp(App)
app.mount(document.querySelector('#app'))
