// librairie qui créé un axios object pour se connecter au backend Api
import axios from 'axios'
import store from '@/store/store'

export default () => {
  return axios.create({
    baseURL: `http://localhost:8081/`,
    headers: {
      // on ajoute un header d'autorisation aux headers de request avec un token renregistré dans store dans le state
      Authorization: `Bearer ${store.state.token}`
    }
  })
}
