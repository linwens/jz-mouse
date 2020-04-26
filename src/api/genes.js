import request from '@/utils/request'

export function fetchList(query) { // 获取列表
  return request({
    url: '/micevarieties/page',
    method: 'get',
    params: query
  })
}

export function fetchItemList(query) {
  return request({
    url: '/dict/item/page',
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

export function getItemObj(id) { // 获取详情
  return request({
    url: '/micevarieties/' + id,
    method: 'get'
  })
}

export function delItemObj(id) {
  return request({
    url: '/dict/item/' + id,
    method: 'delete'
  })
}

export function putItemObj(obj) { // 修改
  return request({
    url: '/micevarieties',
    method: 'put',
    data: obj
  })
}

export function addObj(obj) {
  return request({
    url: '/dict/',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/dict/' + id,
    method: 'get'
  })
}

export function delObj(row) {
  return request({
    url: '/dict/' + row.id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/dict/',
    method: 'put',
    data: obj
  })
}

export function remote(type) {
  return request({
    url: '/dict/type/' + type,
    method: 'get'
  })
}
