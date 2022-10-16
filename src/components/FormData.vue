<template>
  <a-form :model="dataForm" v-bind="layout" name="nest-messages" @finish="onFinish">
    <a-form-item :name="BUG_TYPE.PERSON_REASON" :label="bugTypeToCN[BUG_TYPE.PERSON_REASON]">
      <a-input placeholder="请输入个人代码原因bug数量" v-model:value="dataForm.personReason" />
    </a-form-item>
    <a-form-item :name="BUG_TYPE.UI_REASON" :label="bugTypeToCN[BUG_TYPE.UI_REASON]">
      <a-input placeholder="请输入UI未标注/无交互图bug数量" v-model:value="dataForm.uiReason" />
    </a-form-item>
    <a-form-item :name="BUG_TYPE.PRD_REASON" :label="bugTypeToCN[BUG_TYPE.PRD_REASON]">
      <a-input placeholder="请输入prd描述问题bug数量" v-model:value="dataForm.prdReason" />
    </a-form-item>
    <a-form-item :name="BUG_TYPE.TEST_REASON" :label="bugTypeToCN[BUG_TYPE.TEST_REASON]">
      <a-input placeholder="请输入测试用例未覆盖bug数量" v-model:value="dataForm.testReason" />
    </a-form-item>
    <a-form-item :name="BUG_TYPE.HISTORY_REASON" :label="bugTypeToCN[BUG_TYPE.HISTORY_REASON]">
      <a-input placeholder="请输入历史bug数量" v-model:value="dataForm.historyReason" />
    </a-form-item>
    <a-form-item name="date" label="统计周期">
      <a-range-picker value-format="YYYY-MM-DD" style="width:100%" v-model:value="dataForm.date" />
    </a-form-item>
    <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 5 }">
      <a-button type="primary" html-type="submit">图表生成12</a-button>
    </a-form-item>
  </a-form>
</template>
<script setup>
import { defineComponent, reactive } from "vue";
import { message } from 'ant-design-vue'
import { BUG_TYPE, bugTypeToCN } from '../enum/bugType'

const emit = defineEmits(["setChart"]);

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const dataForm = reactive({
  personReason:'',
  uiReason:'',
  prdReason:'',
  testReason:'',
  historyReason: '',
  date:[]
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
