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
    label: '编号',
    prop: 'numb'
  }, {
    label: '负责人',
    prop: 'man'
  }, {
    label: '品系',
    prop: 'variety',
    width: 100
  }, {
    label: '基因型',
    prop: 'genes',
    width: 100
  }, {
    label: '纯/杂合子',
    prop: 'pure'
  }, {
    label: '性别',
    prop: 'sex'
  }, {
    label: '周龄',
    prop: 'week',
    width: 100
  }, {
    label: '状态',
    prop: 'status',
    slot: true
  }, {
    label: '笼位号',
    prop: 'cage',
    width: 100
  }, {
    label: '检测结果',
    prop: 'rslt',
    slot: true
  }]
}
