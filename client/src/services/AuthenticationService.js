// on exporte un objet qui nous permet d'appeler une méthode register/login qui va chercher dans les endpoints register/login
import Api from '@/services/Api'

export default {
  register (credentials) {
        // post method du module axios qui va faire une post request au register endpoint sur le serveur express en utilisant les credentials
    return Api().post('register', credentials)
  },
  login (credentials) {
    return Api().post('login', credentials)
  },
  profile (credentials) {
    return Api().get('profile', credentials)
  }
}
