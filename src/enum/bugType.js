'个人代码原因', 'UI未标注/无交互图', 'prd描述问题', '测试用例未覆盖', '历史bug'
export const BUG_TYPE = {
  PERSON_REASON: 'personReason',
  UI_REASON: 'uiReason',
  PRD_REASON: 'prdReason',
  TEST_REASON: 'testReason',
  HISTORY_REASON: 'historyReason',
  AFTER_END_REASON: 'afterEndReason'
}

export const bugTypeToCN = {
  [BUG_TYPE.PERSON_REASON]: '个人代码原因',
  [BUG_TYPE.UI_REASON]: 'UI未标注/无交互图',
  [BUG_TYPE.PRD_REASON]: 'prd描述问题',
  [BUG_TYPE.TEST_REASON]: '测试用例未覆盖',
  [BUG_TYPE.HISTORY_REASON]: '历史bug',
  [BUG_TYPE.AFTER_END_REASON]: '后端接口原因',
}