export const exptOption = {
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
  menuWidth: 60,

  column: [{
    label: '操作类型',
    prop: 'type',
    overHidden: true
  }, {
    label: '处理/检测时间',
    prop: 'handle_time',
    width: 180,
    format: 'yyyy-MM-dd hh:mm:ss'
  }, {
    label: '操作时间',
    prop: 'opr_time',
    width: 180,
    format: 'yyyy-MM-dd hh:mm:ss'
  }, {
    label: '操作人',
    prop: 'man',
    slot: true
  }]
}
