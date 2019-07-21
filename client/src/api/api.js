import axios from 'axios'

let ax = axios.create({
    baseURL: 'http://35.197.147.46',
    timeout: 10000
  })
  
export default ax