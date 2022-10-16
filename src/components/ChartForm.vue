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
  startDate.value = data.date[0]
  endDate.value = data.date[1]
  option.title.subtext = `${startDate.value} ~ ${endDate.value}`
  option.series[0].data.forEach((item) => {
    item.value = data[item.key];
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
    orient: "vertical",
    left: "left",
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: "50%",
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
#main {
  width: 600px;
  height: 400px;
  margin-left: 50px;
}
</style>
