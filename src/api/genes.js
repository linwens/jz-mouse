import request from '@/utils/request'

export function fetchList(query) { // 获取列表
  return request({
    url: '/micevarieties/page',
    method: 'get',
    params: query
  })
}

export function getLisByVariety(query) { // 获取品系id下基因列表
  return request({
    url: '/micegene/getMiceGeneByVId',
    method: 'get',
    params: query
  })
}

export function addNewGenes(obj) { // 新增基因型
  return request({
    url: '/micegene',
    method: 'post',
    data: obj
  })
}

export function editGenes(obj) { // 修改基因型(删除 通过修改state字段实现)
  return request({
    url: '/micegene',
    method: 'put',
    data: obj
  })
}

export function getItemObj(id) { // 获取详情
  return request({
    url: '/micevarieties/' + id,
    method: 'get'
  })
}

export function putItemObj(obj) { // 修改
  return request({
    url: '/micevarieties',
    method: 'put',
    data: obj
  })
}
