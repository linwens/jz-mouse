export const filesOption = {
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
  menuWidth: 120,

  column: [{
    label: '文件名称',
    prop: 'name',
    overHidden: true
  }, {
    label: '文件格式',
    prop: 'type',
    width: 180
  }, {
    label: '上传时间',
    prop: 'opr_time',
    width: 180,
    format: 'yyyy-MM-dd hh:mm:ss'
  }]
}
