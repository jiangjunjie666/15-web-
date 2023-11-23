var chartOptions // 检测需要请勿修改
const useECharts = () => {
  const chart = Vue.ref(null)
  chartOptions = Vue.ref({
    xAxis: {
      name: '司龄',
      nameTextStyle: {
        color: '#000',
        fontSize: 16,
        align: 'center',
        verticalAlign: 'bottom'
      },
      type: 'category',
      data: []
    },
    yAxis: {
      name: '人数',
      nameTextStyle: {
        color: '#000080',
        fontSize: 16,
        align: 'right',
        verticalAlign: 'middle'
      },
      type: 'value'
    },
    series: [
      {
        name: '数量',
        type: 'bar',
        data: []
      }
    ]
  })
  const initChart = () => {
    chart.value = echarts.init(document.getElementById('chart'))
    chart.value.setOption(chartOptions.value)
  }
  Vue.onMounted(() => {
    initChart()
  })
  const updateData = (xAxisData, seriesData) => {
    chartOptions.value.xAxis.data = xAxisData
    chartOptions.value.series[0].data = seriesData
    chart.value.setOption(chartOptions.value)
  }
  return {
    updateData
  }
}

// 按照年龄分组的函数
const groupByAge = (peoples) => {
  // TODO:待补充代码，按照年龄进行分组
  //按照age进行排序
  const data = {}
  peoples.forEach((item) => {
    //判断data中是否存在
    if (!data[item.age]) {
      data[item.age] = []
    }
    data[item.age].push(item)
  })
  return data
}

const app = Vue.createApp({
  setup() {
    const { updateData } = useECharts()
    let xAxisData = Vue.ref([]) // X 轴数据，司龄从小到大排列
    let seriesData = Vue.ref([]) // Y 轴数据，司龄对应的人数
    const groupedPeople = Vue.ref([]) // table 中显示的数据
    Vue.onMounted(async () => {
      const data = await (await fetch('./mock/data.json')).json()
      groupedPeople.value = groupByAge(data) //把请求回来的数据变成需要的数据格式
      // TODO: 设置 Echars X 轴数据 xAxisData 和 Y 轴数据 seriesData
      xAxisData.value = Object.keys(groupedPeople.value).sort((a, b) => a - b)
      seriesData.value = Object.values(groupedPeople.value).map((item) => {
        return item.length
      })
      // 更新 echars 数据
      updateData(xAxisData.value, seriesData.value)
    })

    return {
      groupedPeople
    }
  }
})

app.mount('#app')
