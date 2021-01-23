import axios from '../axios'
export const find = (data) => {
  return axios({
    url: '/article/find',
    method: 'post',
    data
  })
}
export const add = (data) => {
  return axios({
    url: '/article/add',
    method: 'post',
    data
  })
}
export const edit = (data) => {
  return axios({
    url: '/article/edit',
    method: 'post',
    data
  })
}
export const dellete = (data) => {
  return axios({
    url: '/article/dellete',
    method: 'post',
    data
  })
}

export const like = (data) => {
  return axios({
    url: '/article/like',
    method: 'post',
    data
  })
}
