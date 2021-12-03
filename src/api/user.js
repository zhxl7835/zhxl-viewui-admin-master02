import request from './request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data:{
      username:data.userName,
      password:data.passWord,
    }
  })
}

export function editPwd(data) {
  return request({
    url: '/api/account/password/modify',
    method: 'post',
    data
  })
}
