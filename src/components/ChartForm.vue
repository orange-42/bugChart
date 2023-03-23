<template>
  <div class="panel">
    <FormData @toImage="toImage" class="form" @setChart="setChart" />
    <div ref="mainRef" id="main"> </div>
     
  </div>
</template>
<script setup>
import html2canvas from "html2canvas"
import { saveAs } from "file-saver"
import { onMounted, nextTick, reactive, ref } from "vue"
import FormData from "./FormData.vue"
import * as echarts from "echarts"
import { BUG_TYPE, bugTypeToCN } from "../enum/bugType"

const dataList = ref([])

async function setChart(data) {
  const list = Object.values(data)
  const totalList = list.filter((item) => typeof item === "number")
  const bugSum = totalList.reduce((prev, cur) => {
    return prev + cur
  }, 0)

  option.title.text = `bug分类统计图(总数${bugSum}个)`
 
  option.title.subtext = `${ data.date}`
  option.series[0].data.forEach((item) => {
    console.log(item, "items")
    item.value = data[item.key]
    // item.name = `${item.name}${data[item.key]}个`
  })
  await getChart()
}

const option = reactive({
  title: {
    text: "bug分类统计图",
    subtext: "请选择统计周期",
    left: "center",
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "horizontal", //水平排列显示
    align: "left", //图例在左，文字在右
    top: "85%", // 这个是重要信息，因为是横着排列，如果这个值过大，没有空间换行
    width: "420", // 这个定义图例的总宽度，
    textStyle: {
      color: "#999",
      // 这个宽度和上一级的宽度，有关系，这个宽度略小于上一级的一半，则第三个就会换行
      width: 106,
      overflow: "break",
    },
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: "50%",
      label: {
        formatter: "{b} \n {@[]}个 ({d}%)",
      },
      data: dataList.value,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
})

function getChart() {
  const chartDom = document.getElementById("main")
  const myChart = echarts.init(chartDom)

  option && myChart.setOption(option)
}

onMounted(async () => {
  option.series[0].data = Object.values(BUG_TYPE).map((item) => {
    return {
      value: 0,
      name: bugTypeToCN[item],
      key: item,
    }
  })

  await getChart()
})

const mainRef = ref()
//屏幕截图、保存图片到相册
// 页面元素转图片
function toImage() {
  // 手动创建一个 canvas 标签
  const canvas = document.createElement("canvas")
  // 获取父标签，意思是这个标签内的 DOM 元素生成图片
  // imageTofile是给截图范围内的父级元素自定义的ref名称
  let canvasBox = mainRef.value
  // 获取父级的宽高
  const width = parseInt(window.getComputedStyle(canvasBox).width)
  const height = parseInt(window.getComputedStyle(canvasBox).height)
  canvas.width = width 
  canvas.height = height 
  canvas.style.width = width  + "px"
  canvas.style.height = height  + "px"
  const options = {
    backgroundColor: 'white',
    canvas: canvas,
    useCORS: true,
  }
  html2canvas(canvasBox, options).then((canvas) => {
    // toDataURL 图片格式转成 base64
    let dataURL = canvas.toDataURL("image/png")
    console.log(dataURL)
    downloadImage(dataURL)
  })
}
//下载图片
function downloadImage(url) {
  // 如果是在网页中可以直接创建一个 a 标签直接下载
  let a = document.createElement("a")
  a.href = url
  a.download = "首页截图"
  a.click()
}
</script>

<style type="text/css">
.panel {
  display: flex;
}

.form {
  width: 50%;
}

#main {
  width: 600px;
  height: 400px;
  margin-left: 50px;
}
</style>
