<template>
  <div class="panel">
    <FormData @setChart="setChart" />
    <div id="main"></div>
  </div>
</template>
<script setup>
import { onMounted,reactive, ref } from "vue";
import FormData from "./FormData.vue";
import * as echarts from "echarts";
import { BUG_TYPE, bugTypeToCN } from "../enum/bugType";

const dataList = ref([]);
const startDate = ref('')
const endDate = ref('')

async function setChart (data) {
  const list = Object.values(data)
  const totalList = list.filter(item => typeof item === 'number')
  const bugSum = totalList.reduce((prev, cur) => {
    return    prev+cur
  }, 0)

  option.title.text = `bug分类统计图(总数${bugSum}个)`
  startDate.value = data.date[0]
  endDate.value = data.date[1]
  option.title.subtext = `${startDate.value} ~ ${endDate.value}`
  option.series[0].data.forEach((item) => {
    console.log(item,'items')
    item.value = data[item.key];
    // item.name = `${item.name}${data[item.key]}个`
  });
  await getChart();
}

const option = reactive({
  title: {
    text: "bug分类统计图",
    subtext: '请选择统计周期',
    left: "center",
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: 'horizontal',  //水平排列显示
align: 'left', //图例在左，文字在右
top: '85%',// 这个是重要信息，因为是横着排列，如果这个值过大，没有空间换行
width: '400',// 这个定义图例的总宽度，
textStyle: {
          color: '#999',
        // 这个宽度和上一级的宽度，有关系，这个宽度略小于上一级的一半，则第三个就会换行
          width: 106,
          overflow: 'break',
        }
    // orient: 'vertical',
    // right: 10,
    // top: 'center'
    // orient: "vertical",
    // left: "bottom",
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: "50%",
      label: {
            formatter: '{b} \n({d}%)'
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
});

function getChart() {
  const chartDom = document.getElementById("main");
  const myChart = echarts.init(chartDom);

  option && myChart.setOption(option);
}

onMounted(async() => {
  option.series[0].data = Object.values(BUG_TYPE).map((item) => {
    return {
      value: 0,
      name: bugTypeToCN[item],
      key: item,
    };
  });
  
  await getChart();
});
</script>

<style type="text/css">

.panel {
  margin-top: 200px;
}

#main {
  width: 600px;
  height: 400px;
  margin-left: 50px;
}
</style>
