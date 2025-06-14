import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://phimapi.com/',
  timeout: 1000,
})

export default instance
