import axios from 'axios'

export const AXIOS = axios.create({
  baseURL: `http://60.205.184.152:8088`,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})
export const _axios = axios.create()

