export const tableOption = {
  border: false,
  noIndex: true,
  stripe: true,
  headerCellStyle: {
    color: '#333',
    backgroundColor: '#F0F0F0'
  },
  rowClassName: 'mouse__table--stripe',
  align: 'left',
  menu: true,
  menuWidth: 130,

  column: [{
    label: '分组名称',
    prop: 'name',
    overHidden: true
  }, {
    label: '处理',
    prop: 'handle',
    format: 'yyyy-MM-dd hh:mm:ss'
  }, {
    label: '检测',
    prop: 'check'
  }, {
    label: '小鼠',
    prop: 'mouse',
    slot: true
  }, {
    label: '小鼠数量',
    prop: 'sum'
  }]
}
