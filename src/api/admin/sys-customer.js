import request from '@/utils/request'

// 查询参数列表
export function listCustomer(query) {
  return request({
    url: '/api/v1/customer',
    method: 'get',
    params: query
  })
}

// 查询参数详细
export function getCustomer(customerId) {
  return request({
    url: '/api/v1/customer/' + customerId,
    method: 'get'
  })
}

// 新增参数配置
export function addCustomer(data) {
  return request({
    url: '/api/v1/customer',
    method: 'post',
    data: data
  })
}

// 修改参数配置
export function updateCustomer(data) {
  return request({
    url: '/api/v1/customer/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除参数配置
export function delCustomer(data) {
  return request({
    url: '/api/v1/customer',
    method: 'delete',
    data: data
  })
}

// 客户信息上传
export function uploadCustomerFile(data) {
  return request({
    url: '/api/v1/customer/upload/file',
    method: 'post',
    data: data
  })
}
