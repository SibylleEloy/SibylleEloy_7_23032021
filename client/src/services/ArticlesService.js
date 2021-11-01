import Api from '@/services/Api'

export default {
  index (search) {
    // on passe des paramètres de recherche à l'endpoint qui passent sur la querystring
    // on interroge le backend à partir de ce que le user tape dans la barre de recherche
    return Api().get('articles', {
      params: {
        search: search
      }
    })
  },
  show (articleId) {
    return Api().get(`articles/${articleId}`)
  },
  post (article) {
    return Api().post('articles', article)
  },
  // pousse le payload avec l'article jusqu'à l'endpoint put
  put (article) {
    return Api().put(`articles/${article.id}`, article)
  },
  delete (articleId) {
    return Api().delete(`articles/${articleId}`)
  }
}
