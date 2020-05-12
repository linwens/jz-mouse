export const tableOption = {
  border: false,
  noIndex: true,
  stripe: false,
  headerCellStyle: {
    color: '#333',
    backgroundColor: '#F0F0F0'
  },
  rowClassName: 'mouse__table--stripe',
  align: 'left',
  menu: false,

  column: [{
    label: '实验组',
    prop: 'experimentName',
    align: 'center'
  }, {
    label: '开始时间',
    prop: 'startTime',
    format: 'yyyy-MM-dd hh:mm:ss'
  }, {
    width: 200,
    label: '结束时间',
    prop: 'endTime',
    format: 'yyyy-MM-dd hh:mm:ss'
  }, {
    label: '分组名称',
    prop: 'sampleGroupName',
    overHidden: true
  }, {
    label: '处理',
    prop: 'eventName',
    overHidden: true
  }, {
    label: '检测',
    prop: 'testName',
    overHidden: true
  }]
}
