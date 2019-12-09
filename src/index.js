import apiRequest from './request/request'

class API {
  static getArticleMetadata(id) {
    return apiRequest(`/articles/${id}`)
  }

  static getIntegrations(providerId) {
    return apiRequest(`/data-providers/${providerId}/integrations`)
  }
}

export default API
