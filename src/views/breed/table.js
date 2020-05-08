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
    prop: 'name',
    overHidden: true
  }, {
    label: '繁育时间',
    prop: 'breedTime',
    format: 'yyyy-MM-dd hh:mm:ss'
  }, {
    label: '小鼠数量',
    prop: 'miceSum'
  }, {
    label: '创建时间',
    prop: 'createTime',
    format: 'yyyy-MM-dd hh:mm:ss'
  }]
}
