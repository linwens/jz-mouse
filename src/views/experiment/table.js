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
    label: '实验组名称',
    prop: 'name',
    overHidden: true
  }, {
    label: '实验组数量',
    prop: 'miceTotal',
    overHidden: true
  }, {
    label: '小鼠总数',
    prop: 'sum',
    overHidden: true
  }, {
    label: '开始时间',
    prop: 'startTime',
    width: 120,
    format: 'yyyy-MM-dd'
  }, {
    label: '结束时间',
    prop: 'endTime',
    width: 120,
    format: 'yyyy-MM-dd'
  }, {
    label: '最新监测时间',
    prop: 'newTestTime',
    width: 200,
    format: 'yyyy-MM-dd hh:mm:ss'
  }, {
    label: '最新处理时间',
    prop: 'newHandleTime',
    width: 200,
    format: 'yyyy-MM-dd hh:mm:ss'
  }, {
    label: '操作记录查看',
    prop: 'operation_check',
    slot: true
  }, {
    label: '建模检测结果',
    prop: 'module_rslt',
    slot: true
  }]
}
