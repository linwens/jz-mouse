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
    prop: 'varietiesName',
    overHidden: true
  }, {
    label: '基因型名称',
    prop: 'geneName',
    overHidden: true
  }, {
    label: '饲养条件',
    prop: 'miceCondition',
    overHidden: true
  }, {
    label: '毛色',
    prop: 'color',
    width: 80
  }, {
    label: '应用领域',
    prop: 'area',
    overHidden: true
  }, {
    label: '健康状况',
    prop: 'status',
    overHidden: true
  }, {
    width: 100,
    label: '负责人',
    prop: 'operatorName'
  }]
}
