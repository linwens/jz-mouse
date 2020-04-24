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
    label: '基因型名称',
    prop: 'genes',
    overHidden: true
  }, {
    label: '饲养条件',
    prop: 'breed_condition',
    overHidden: true
  }, {
    label: '毛色',
    prop: 'fur_color',
    width: 80
  }, {
    label: '应用领域',
    prop: 'app_domain',
    overHidden: true
  }, {
    width: 100,
    label: '负责人',
    prop: 'man'
  }]
}
