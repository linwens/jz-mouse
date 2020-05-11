import request from '@/utils/request'

export function fetchCageList(query) { // 鼠笼列表
  return request({
    url: '/micecage/page',
    method: 'get',
    params: query
  })
}

export function recordList(query) { // 记录列表
  return request({
    url: '/dict/page',
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

export function addCage(obj) { // 新增笼位
  return request({
    url: '/micecage',
    method: 'post',
    data: obj
  })
}

export function addMouse(obj) { // 新增小鼠
  return request({
    url: '/miceinfo',
    method: 'post',
    data: obj
  })
}

export function getMouseInfo(id) { // 获取小鼠信息
  return request({
    url: '/miceinfo/' + id,
    method: 'get'
  })
}

export function getNewCageNo(id) { // 获取最新笼位号
  return request({
    url: '/micecage/getNewRoomId',
    method: 'get'
  })
}

export function getMouseExpInfo(id) { // 获取小鼠实验组信息
  return request({
    url: '/experiment/getMiceExperimentRecord?miceId=' + id,
    method: 'get'
  })
}

export function delItemObj(id) {
  return request({
    url: '/dict/item/' + id,
    method: 'delete'
  })
}

export function transferCage(obj) { // 移笼操作
  return request({
    url: '/miceinfo/transferCageByMiceId',
    method: 'post',
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
