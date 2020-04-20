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
    prop: 'num',
    overHidden: true
  }, {
    label: '性别',
    prop: 'sex',
    dicData: [
      {
        label: '雌',
        value: 0
      }, {
        label: '雄',
        value: 1
      }
    ]
  }, {
    label: '周龄',
    prop: 'week',
    overHidden: true
  }, {
    label: '体重',
    prop: 'weight'
  }, {
    width: 200,
    label: '品系',
    prop: 'class_type'
  }, {
    width: 200,
    label: '基因型',
    prop: 'gene',
    overHidden: true
  }, {
    label: '毛色',
    prop: 'fur'
  }, {
    label: '健康状况',
    prop: 'health_status',
    overHidden: true
  }, {
    width: 120,
    label: '受孕时间',
    prop: 'preg_time',
    slot: true,
    format: 'yyyy-MM-dd hh:mm:ss'
  }]
}
