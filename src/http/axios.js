import axios from 'axios';
import config from './config1';

export default function $axios(options) {
  return new Promise((resolve, reject) => {


    const instance = axios.create({
      baseURL: config.baseUrl

    })
/*    // request 拦截器
    instance.interceptors.request.use(
      config => {

      },

      error => {

      }
    )
    // response 拦截器
    instance.interceptors.response.use(
      response => {

      },
      err => {

      }
    )*/
    // 请求处理
    instance(options).then(res => {
      resolve(res)
      return false
    }).catch(error => {
      reject(error)
    })


  })


}
