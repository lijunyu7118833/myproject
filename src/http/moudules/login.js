import axios from '../axios'
export const doLogin = (data) => {
  return axios({
    url: '/user/doLogin',
    method: 'post',
    data
  })
}
