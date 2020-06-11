import axios from 'axios'
import Agent from 'agentkeepalive'

import { NetworkError } from './errors'

const CORE_API = 'https://api.core.ac.uk/internal'

const keepAliveAgent = new Agent({
  maxFreeSockets: 20,
  timeout: 60000, // active socket keepalive for 60 seconds
  freeSocketTimeout: 30000, // free socket keepalive for 30 seconds
})

const httpClient = axios.create({ httpAgent: keepAliveAgent })

const apiRequest = async (url, method = 'GET', params = {}) => {
  try {
    const response = await httpClient.request({
      url: `${CORE_API}${url}`,
      method,
      params,
      headers: {
        Accept: 'application/json',
      },
    })

    return [response.data, response.status]
  } catch (e) {
    const { response, message } = e
    let networkError
    if (response) {
      networkError = new NetworkError(
        `Request for ${method} ${url} failed. Response: ${response.status}, ${response.data}`
      )
    } else if (message === 'Network Error') {
      networkError = new NetworkError(
        `Request ${method} ${url} failed. You are probably in offline mode.`
      )
    } else {
      networkError = new NetworkError(
        `Request ${method} ${url} failed. The original error was: ${message}`
      )
    }
    networkError.statusCode = (response && response.status) || 500
    throw networkError
  }
}

export default apiRequest
