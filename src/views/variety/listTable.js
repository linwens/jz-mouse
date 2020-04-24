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
    label: '品系名称',
    prop: 'name',
    overHidden: true
  }, {
    label: '负责人',
    prop: 'man'
  }, {
    label: '创建时间',
    prop: 'create_time',
    format: 'yyyy-MM-dd hh:mm:ss'
  }]
}
