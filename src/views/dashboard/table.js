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
  scrollDist: 600, // 点击分页时滚轮上移距离

  column: [{
    label: '编号',
    prop: 'id'
  }, {
    label: '负责人',
    prop: 'operator'
  }, {
    label: '品系',
    prop: 'varietiesName',
    width: 100
  }, {
    label: '基因型',
    prop: 'geneName',
    width: 100
  }, {
    label: '纯/杂合子',
    prop: 'pureHeterozygote',
    dicData: [
      {
        label: '纯合子',
        value: 0
      }, {
        label: '杂合子',
        value: 1
      }, {
        label: '未测试',
        value: 2
      }
    ]
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
    width: 100,
    slot: true
  }, {
    label: '状态',
    prop: 'status',
    slot: true
  }, {
    label: '笼位号',
    prop: 'cageId',
    width: 100
  }, {
    label: '检测结果',
    prop: 'rslt',
    slot: true
  }]
}
