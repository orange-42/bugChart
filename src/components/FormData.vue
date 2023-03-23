<template>
  <a-form :model="dataForm" v-bind="layout" name="nest-messages" @finish="onFinish">
    <a-form-item v-for="(name,index) in BUG_TYPE" :name="name" :label="bugTypeToCN[name]">
      <a-input-number :precision="0" style="width:100%" :placeholder="`请输入${bugTypeToCN[name]}bug数量`" v-model:value="dataForm[name]" />
    </a-form-item>
    <a-form-item name="date" label="统计周期">
    <a-date-picker v-model:value="dataForm.date" placeholder="请选择月份"  value-format="YYYY年M月" picker="month" style="width:100%" />
    </a-form-item>
    <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 7 }">
    <a-space>
     <a-button type="primary" html-type="submit">图表生成</a-button>
       <a-button  @click="toImage">保存截图</a-button> 
    </a-space>
     
    </a-form-item>
  </a-form>
</template>
<script setup>
import { defineComponent, reactive } from "vue";
import { message } from 'ant-design-vue'
import { BUG_TYPE, bugTypeToCN } from '../enum/bugType'

const emit = defineEmits(["setChart","toImage"]);

function toImage() {
  emit('toImage')
}

const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 20 },
};

const dataForm = reactive({
  personReason:'',
  uiReason:'',
  prdReason:'',
  testReason:'',
  historyReason: '',
  afterEndReason:'',
  date:''
});

const onFinish = (data) => {
  let bugNum = []
  for (let key in BUG_TYPE) {
    if (dataForm[BUG_TYPE[key]]) {
      bugNum.push(dataForm[BUG_TYPE[key]])
    }
  }
  if (!bugNum?.length) {
    message.warning('请填写至少一种bug类型')
    return
  } else if (!data.date?.length) {
    message.warning('请选择统计周期')
    return
  }
  
  emit("setChart", data);
};
</script>
