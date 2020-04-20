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
  menu: true,

  column: [{
    label: '状态',
    prop: 'status',
    align: 'center',
    slot: true
  }, {
    label: '类型',
    prop: 'type'
  }, {
    label: '标题',
    prop: 'title',
    overHidden: true
  }, {
    width: 200,
    label: '提醒时间',
    prop: 'tipsTime',
    format: 'yyyy-MM-dd hh:mm:ss'
  }, {
    width: 200,
    label: '发送时间',
    prop: 'sendTime',
    format: 'yyyy-MM-dd hh:mm:ss'
  }]
}
