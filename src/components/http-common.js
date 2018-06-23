import axios from 'axios'

export const AXIOS = axios.create({
  baseURL: `http://127.0.0.1:8088`,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})
export const _axios = axios.create()

