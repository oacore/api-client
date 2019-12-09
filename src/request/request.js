import axios from 'axios'

import { NetworkError } from './errors'

const CORE_API = 'https://api.core.ac.uk/internal'

const apiRequest = async (url, method = 'GET', params = {}) => {
  try {
    const response = await axios({
      url: `${CORE_API}${url}`,
      method,
      params,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return { ...response.data, statusCode: response.status }
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
