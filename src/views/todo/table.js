export const tableOption = {
  border: false,
  noIndex: true,
  stripe: false,
  headerCellStyle: {
    color: '#333',
    backgroundColor: '#F0F0F0'
  },
  rowClassName: 'mouse__table--stripe',
  align: 'left',
  menu: true,

  column: [{
    label: '状态',
    prop: 'status',
    align: 'center',
    slot: true
  }, {
    label: '类型',
    prop: 'type',
    dicData: [
      {
        label: '繁育组提醒',
        value: 0
      }, {
        label: '小鼠分笼提醒',
        value: 1
      }, {
        label: '小鼠鉴定提醒',
        value: 2
      }, {
        label: '实验组处理提醒',
        value: 3
      }, {
        label: '实验组检测提醒',
        value: 4
      }, {
        label: '鼠笼负责人转移提醒',
        value: 5
      }
    ]
  }, {
    label: '标题',
    prop: 'title',
    overHidden: true
  }, {
    width: 200,
    label: '提醒时间',
    prop: 'createTime',
    format: 'yyyy-MM-dd hh:mm:ss'
  }, {
    width: 200,
    label: '发送时间',
    prop: 'sendingTime',
    format: 'yyyy-MM-dd hh:mm:ss'
  }]
}
