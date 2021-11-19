import Api from '@/services/Api'

export default {
  index (message) {
    return Api().get('messages', {
      params: message
    })
  },
  post (message) {
    return Api().post('messages', message)
  },
  delete (messageId) {
    return Api().delete(`messages/${messageId}`)
  }
}
