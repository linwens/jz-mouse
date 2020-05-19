import request from '@/utils/request'
// 一些公共组件的请求
export function fetchList(query) {
  return request({
    url: '/micebreed/page',
    method: 'get',
    params: query
  })
}

// export function getUploadParams(query) { // 获取OSS上传参数
//   return request({
//     baseURL: process.env.VUE_APP_FILE_API,
//     url: '/api/fileManage/uploadParam',
//     method: 'get',
//     params: query
//   })
// }

export function uploadFiles(obj) { // 图片批量上传
  return request({
    url: '/sysfile/uploadFiles',
    method: 'post',
    data: obj
  })
}

export function saveFiles(obj) { // 存储图片地址
  return request({
    url: '/sysfile',
    method: 'post',
    data: obj
  })
}

export function getItemObj(id) {
  return request({
    url: '/dict/item/' + id,
    method: 'get'
  })
}

export function delItemObj(id) {
  return request({
    url: '/dict/item/' + id,
    method: 'delete'
  })
}

export function putItemObj(obj) {
  return request({
    url: '/dict/item',
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
