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
    label: '繁育组名称',
    prop: 'num',
    overHidden: true
  }, {
    label: '繁育时间',
    prop: 'borth_time',
    format: 'yyyy-MM-dd hh:mm:ss'
  }, {
    label: '小鼠数量',
    prop: 'weight'
  }, {
    label: '创建时间',
    prop: 'borth_time',
    format: 'yyyy-MM-dd hh:mm:ss'
  }]
}
