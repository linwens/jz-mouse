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
  menu: false,
  scrollDist: 600, // 点击分页时滚轮上移距离

  column: [{
    width: 200,
    label: '编号',
    prop: 'miceNo'
  }, {
    label: '负责人',
    width: 100,
    prop: 'operator',
    slot: true
  }, {
    label: '品系',
    prop: 'varietiesName',
    width: 150,
    overHidden: true
  }, {
    label: '基因型',
    prop: 'geneName',
    overHidden: true
  }, {
    label: '纯/杂合子',
    prop: 'pureHeterozygote',
    width: 80,
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
    width: 60,
    prop: 'genderDesc'
  }, {
    label: '周龄',
    prop: 'birthDate',
    width: 70,
    slot: true
  }, {
    label: '状态',
    width: 60,
    prop: 'status',
    slot: true
  }, {
    label: '笼位号',
    prop: 'cageNo',
    width: 70
  }, {
    label: '家谱记录',
    width: 80,
    prop: 'family',
    slot: true
  }, {
    label: '检测结果',
    width: 80,
    prop: 'rslt',
    slot: true
  }]
}
