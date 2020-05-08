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
  menuWidth: 102,

  column: [{
    label: '编号',
    prop: 'miceInfoId',
    overHidden: true
  }, {
    label: '性别',
    prop: 'gender',
    dicData: [
      {
        label: '雌',
        value: 1
      }, {
        label: '雄',
        value: 0
      }
    ]
  }, {
    label: '周龄',
    prop: 'birthDate',
    overHidden: true
  }, {
    label: '体重',
    prop: 'weight'
  }, {
    width: 200,
    label: '品系',
    prop: 'varietiesName'
  }, {
    width: 200,
    label: '基因型',
    prop: 'geneName',
    overHidden: true
  }, {
    label: '毛色',
    prop: 'miceColor'
  }, {
    label: '健康状况',
    prop: 'status',
    overHidden: true
  }, {
    width: 120,
    label: '受孕时间',
    prop: 'preg_time',
    slot: true,
    format: 'yyyy-MM-dd hh:mm:ss'
  }]
}
