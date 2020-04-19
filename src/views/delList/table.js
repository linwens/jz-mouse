export const tableOption = {
  border: false,
  noIndex: true,
  stripe: true,
  align: 'left',
  menu: true,

  column: [{
    label: '编号',
    prop: 'num'
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
    width: 200,
    label: '出生时间',
    prop: 'borth_time',
    format: 'yyyy-MM-dd hh:mm:ss'
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
    prop: 'gene'
  }, {
    label: '毛色',
    prop: 'fur'
  }, {
    label: '健康状况',
    prop: 'health_status'
  }, {
    label: '类型',
    prop: 'type'
  }]
}
