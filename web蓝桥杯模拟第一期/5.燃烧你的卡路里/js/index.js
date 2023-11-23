const { createApp, reactive, ref } = Vue

const app = createApp({
  setup() {
    const drawer = ref(false)
    const direction = ref('rtl')

    const form = reactive({
      age: 20,
      gender: '男士',
      goal: 5,
      weight: 70
    })
    const breakfast = ref([])
    const lunch = ref([])
    const dinner = ref([])
    const eatFoodEntryByDay = ref(0)
    const carbohydrateIn = ref(0)
    const proteinIn = ref(0)
    const fatIn = ref(0)
    const carbohydrateG = ref(0)
    const proteinG = ref(0)
    const fatG = ref(0)
    const desDinner = ref('')
    const submit = async () => {
      // TODO 待添加的代码 功能显示抽屉组件
      drawer.value = true
      // 三餐数据获取
      let res = await axios.get('../mock/menu.json')
      breakfast.value = res.data.breakfast
      dinner.value = res.data.dinner
      lunch.value = res.data.lunch

      // 目标体重
      let desWeight = form.weight - form.goal

      // 进食的热量每日
      eatFoodEntryByDay.value = Math.floor(desWeight * 26.4)
      // 碳水化合每日物摄入
      carbohydrateIn.value = Math.floor(eatFoodEntryByDay.value * 0.5)
      // 蛋白质每日摄入
      proteinIn.value = Math.floor(eatFoodEntryByDay.value * 0.35)
      // 脂肪每日摄入
      fatIn.value = Math.floor(eatFoodEntryByDay.value * 0.15)
      // 碳水每日摄入重量
      carbohydrateG.value = Math.floor(carbohydrateIn.value / 4)
      // 蛋白每日摄入重量
      proteinG.value = Math.floor(proteinIn.value / 4)
      // 脂肪每日摄入重量
      fatG.value = Math.floor(fatIn.value / 9)
      // 早餐是每日摄入量的三分之一
      let breakfast_carbohydrateKg = Math.floor(carbohydrateG.value / 3)
      let breakfast_proteinKg = Math.floor(proteinG.value / 3)
      let breakfast_fatKg = Math.floor(fatG.value / 3)

      let breakfast_sortCarbohydrate = sortItem(breakfast.value, 'carbohydrate', breakfast_carbohydrateKg)
      let breakfast_sortProtein = sortItem(breakfast.value, 'protein', breakfast_proteinKg)
      let breakfast_sortFat = sortItem(breakfast.value, 'fat', breakfast_fatKg)
      // 碳水不大于每日中午摄入量
      breakfast_sortCarbohydrate.weight *= compareItem(breakfast_sortCarbohydrate, 'carbohydrate', breakfast_carbohydrateKg)
      // 组成新的饮食数组，给表格显示
      breakfast.value = [breakfast_sortCarbohydrate, breakfast_sortProtein, breakfast_sortFat]
      // 午餐是每日摄入量的四分之一
      let lunch_carbohydrateKg = Math.floor(carbohydrateG.value / 4)
      let lunch_proteinKg = Math.floor(proteinG.value / 4)
      let lunch_fatKg = Math.floor(fatG.value / 4)

      let lunch_sortCarbohydrate = sortItem(lunch.value, 'carbohydrate', lunch_carbohydrateKg)
      let lunch_sortProtein = sortItem(lunch.value, 'protein', lunch_proteinKg)
      let lunch_sortFat = sortItem(lunch.value, 'fat', lunch_fatKg)

      // 碳水不大于每日中午摄入量
      lunch_sortCarbohydrate.weight *= compareItem(lunch_sortCarbohydrate, 'carbohydrate', lunch_carbohydrateKg)

      lunch.value = [lunch_sortCarbohydrate, lunch_sortProtein, lunch_sortFat]

      // 晚餐是每日摄入量的三分之一
      let dinner_carbohydrateKg = Math.floor(carbohydrateG.value / 3)
      let dinner_proteinKg = Math.floor(proteinG.value / 3)
      let dinner_fatKg = Math.floor(fatG.value / 3)

      let dinner_sortCarbohydrate = sortItem(dinner.value, 'carbohydrate', dinner_carbohydrateKg)

      let dinner_sortProtein = sortItem(dinner.value, 'protein', dinner_proteinKg)
      let dinner_sortFat = sortItem(dinner.value, 'fat', dinner_fatKg)
      // 碳水不大于每日中午摄入量
      dinner_sortCarbohydrate.weight *= compareItem(dinner_sortCarbohydrate, 'carbohydrate', dinner_carbohydrateKg)

      dinner.value = [dinner_sortCarbohydrate, dinner_sortProtein, dinner_sortFat]
      // 检测脚本取值，请勿修改
      desDinner.value = JSON.stringify(dinner.value)
    }
    /**
     * @param {Array} arr 早餐/午餐/晚餐的数组数据
     * @param {String} pro 食物属性名称，string类型，可取值 "carbohydrate"/"protein"/"fat"
     * @param {*} compare 摄入量上限值，作为比较条件用的，已给出具体值
     * @return {Object}  最优食材
     */
    const sortItem = (arr, pro, compare) => {
      // TODO 根据 compare 匹配食材对象后返回这个对象
      // 按照食物属性名称将早餐/午餐/晚餐的数组数据从大到小排序，然后找到排序后的数组中第一个不大于对应摄入量上限的食材对象，并将其返回。
      const sortedArr = arr.sort((a, b) => b[pro] - a[pro])
      const optimalItem = sortedArr.find((item) => item[pro] <= compare)
      return optimalItem
    }
    /**
     * @param {Array} cur sortItem函数中，返回的数组数据
     * @param {String} pro 可取值 "carbohydrate"/"protein"/"fat"
     * @param {Number} dest 摄入量上限目标值，作为比较条件用
     * @return {Number} Number 满足输入营养食材的份数
     */
    const compareItem = (cur, pro, dest) => {
      if (cur[pro] < dest) {
        for (let i = 2; cur[pro] * i < dest; i++) {
          return i
        }
        return 1
      }
    }
    return {
      drawer,
      direction,
      form,
      breakfast,
      lunch,
      dinner,
      carbohydrateIn,
      eatFoodEntryByDay,
      proteinIn,
      fatIn,
      carbohydrateG,
      proteinG,
      fatG,
      desDinner,
      submit
    }
  }
})
app.use(ElementPlus)
app.mount('#app')
