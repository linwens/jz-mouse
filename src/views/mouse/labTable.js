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
    prop: 'group',
    align: 'center'
  }, {
    label: '开始时间',
    prop: 'start',
    format: 'yyyy-MM-dd hh:mm:ss'
  }, {
    width: 200,
    label: '结束时间',
    prop: 'end',
    format: 'yyyy-MM-dd hh:mm:ss'
  }, {
    label: '分组名称',
    prop: 'name',
    overHidden: true
  }, {
    label: '处理',
    prop: 'handle',
    overHidden: true
  }, {
    label: '检测',
    prop: 'check',
    overHidden: true
  }]
}
