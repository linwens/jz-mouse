export const recordOption = {
  border: false,
  noIndex: true,
  stripe: false,
  headerCellStyle: {
    color: '#333',
    backgroundColor: '#F0F0F0'
  },
  rowClassName: 'mouse__table--stripe',
  align: 'left',
  menu: true,

  column: [{
    label: '操作类型',
    prop: 'type',
    align: 'center'
  }, {
    label: '处理检测时间',
    prop: 'checkTime',
    format: 'yyyy-MM-dd hh:mm:ss'
  }, {
    width: 200,
    label: '操作时间',
    prop: 'handleTime',
    format: 'yyyy-MM-dd hh:mm:ss'
  }, {
    label: '操作人',
    prop: 'name',
    overHidden: true
  }]
}
