const { createApp, ref, onMounted } = Vue
const app = createApp({
  setup() {
    const chartsData = ref([])
    onMounted(() => {
      // TODO:待补充代码 请求数据，并正确渲染柱形图和地图
      axios
        .get('../mock/map.json')
        .then((res) => {
          chartsData.value = res.data
          showChartBar()
          showChinaMap()
        })
        .catch((err) => {
          console.log(err)
        })
    })
    // 展示柱状图
    const showChartBar = () => {
      const myChart = echarts.init(document.getElementById('chart'))

      let data = chartsData.value.map((item, index) => {
        return item.school_power
      })
      console.log(data)
      let result = data.flat(1).sort((a, z) => {
        return z.power - a.power
      })
      let arr = result.slice(0, 10)
      let school = arr.map((item) => {
        return item.name
      })
      let power = arr.map((item) => {
        return item.power
      })
      console.log(school)
      console.log(power)
      // 指定配置和数据
      const option = {
        xAxis: {
          type: 'category',
          axisLabel: { interval: 0, rotate: 40 },
          // TODO：待修改  柱状图 x 轴数据 -> 前 10 学校名称
          data: school
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        series: [
          {
            // TODO：待修改   柱状图 y 轴数据->学校战力值
            data: power,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            },
            itemStyle: {
              color: '#8c7ae6'
            }
          }
        ]
      }

      // 把配置给实例对象
      myChart.setOption(option)
      // 根据浏览器大小切换图表尺寸
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    }

    // 展示地图
    const showChinaMap = () => {
      const chinaMap = echarts.init(document.getElementById('chinaMap'))

      // 进行相关配置
      const mapOption = {
        tooltip: [
          {
            backgroundColor: '#fff',
            subtext: 'aaa',
            borderColor: '#ccc',
            padding: 15,
            formatter: (params) => {
              return params.name + '热度值:' + params.value + '<br>' + params.data.school_count + '所学校已加入备赛'
            },
            textStyle: {
              fontSize: 18,
              fontWeight: 'bold',
              color: '#464646'
            },
            subtextStyle: {
              fontSize: 12,
              color: '#6E7079'
            }
          }
        ],
        geo: {
          // 这个是重点配置区
          map: 'china', // 表示中国地图
          label: {
            normal: {
              show: false // 是否显示对应地名
            }
          },
          itemStyle: {
            normal: {
              borderColor: 'rgb(38,63,168)',
              borderWidth: '0.4',
              areaColor: '#fff'
            },
            emphasis: {
              //鼠标移入的效果
              areaColor: 'rgb(255,158,0)',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        visualMap: {
          show: true,
          left: 'center',
          top: 'bottom',
          type: 'piecewise',
          align: 'bottom',
          orient: 'horizontal',
          pieces: [
            {
              gte: 80000,
              color: 'rgb(140,122,230)'
            },
            {
              min: 50000,
              max: 79999,
              color: 'rgba(140,122,230,.8)'
            },
            {
              min: 30000,
              max: 49999,
              color: 'rgba(140,122,230,.6)'
            },
            {
              min: 10000,
              max: 29999,
              color: 'rgba(140,122,230,.4)'
            },
            {
              min: 1,
              max: 9999,
              color: 'rgba(140,122,230,.2)'
            }
          ],
          textStyle: {
            color: '#000',
            fontSize: '11px'
          }
        },
        series: [
          {
            type: 'map',
            geoIndex: 0,
            // TODO:待修改 地图对应数据
            data: chartsData.value.map((item) => {
              return {
                name: item.name,
                school_count: item.school_count,
                value: item.value
              }
            })
          }
        ]
      }

      // 把配置给实例对象
      chinaMap.setOption(mapOption)
    }

    return {
      chartsData,
      showChartBar,
      showChinaMap
    }
  }
})

app.mount('#app')
