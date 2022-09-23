<template>
  <a-form :model="dataForm" v-bind="layout" name="nest-messages" @finish="onFinish">
    <a-form-item :name="BUG_TYPE.PERSON_REASON" :label="bugTypeToCN[BUG_TYPE.PERSON_REASON]">
      <a-input v-model:value="dataForm.personReason" />
    </a-form-item>
    <a-form-item :name="BUG_TYPE.UI_REASON" :label="bugTypeToCN[BUG_TYPE.UI_REASON]">
      <a-input v-model:value="dataForm.uiReason" />
    </a-form-item>
    <a-form-item :name="BUG_TYPE.PRD_REASON" :label="bugTypeToCN[BUG_TYPE.PRD_REASON]">
      <a-input v-model:value="dataForm.prdReason" />
    </a-form-item>
    <a-form-item :name="BUG_TYPE.TEST_REASON" :label="bugTypeToCN[BUG_TYPE.TEST_REASON]">
      <a-input v-model:value="dataForm.testReason" />
    </a-form-item>
    <a-form-item :name="BUG_TYPE.HISTORY_REASON" :label="bugTypeToCN[BUG_TYPE.HISTORY_REASON]">
      <a-input v-model:value="dataForm.historyReason" />
    </a-form-item>
    <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 5 }">
      <a-button type="primary" html-type="submit">图表生成</a-button>
    </a-form-item>
  </a-form>
</template>
<script setup>
import { defineComponent, reactive } from "vue";
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
  historyReason:''
});

const onFinish = (data) => {
  console.log("Success:", data);
  emit("setChart", data);
};
</script>
