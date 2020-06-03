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
  menuWidth: 100,

  column: [{
    label: '品系名称',
    width: 180,
    prop: 'varietiesName',
    overHidden: true
  }, {
    label: '基因型名称',
    width: 300,
    prop: 'geneName',
    overHidden: true
  }, {
    label: '饲养条件',
    width: 110,
    prop: 'miceCondition',
    overHidden: true
  }, {
    label: '毛色',
    prop: 'color',
    width: 80
  }, {
    label: '应用领域',
    width: 300,
    prop: 'area',
    overHidden: true
  }, {
    label: '健康状况',
    width: 120,
    prop: 'status',
    overHidden: true
  }, {
    width: 100,
    label: '负责人',
    prop: 'operatorName'
  }]
}
