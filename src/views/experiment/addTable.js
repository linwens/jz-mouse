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
    label: '分组名称',
    prop: 'experimentGroupName',
    overHidden: true
  }, {
    label: '处理',
    prop: 'eventName'
  }, {
    label: '检测',
    prop: 'experimentGroupSelectionLabels'
  }, {
    label: '小鼠',
    prop: 'experimentGroupSelectionMiceIds',
    slot: true
  }, {
    label: '小鼠数量',
    prop: 'sum',
    slot: true
  }]
}

export const mouseListOption = {
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
    label: '编号',
    prop: 'miceId',
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
    overHidden: true,
    slot: true
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
    prop: 'color'
  }, {
    label: '健康状况',
    prop: 'status',
    overHidden: true
  }]
}
