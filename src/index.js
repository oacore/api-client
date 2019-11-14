import apiRequest from './request/request'

class API {
  static getArticleMetadata(id) {
    return apiRequest(`articles/${id}`)
  }
}

export default API
