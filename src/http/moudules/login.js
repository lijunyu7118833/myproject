import axios from '../axios'
export const doLogin = (data) => {
  return axios({
    url: '/user/doLogin',
    method: 'post',
    data
  })
}
export const doRegister = (data) => {
  return axios({
    url: '/user/doRegister',
    method: 'post',
    data
  })
}

export const find = (data) => {
  return axios({
    url: '/user/find',
    method: 'post',
    data
  })
}
