import CONFIG from '../config'
import axios from 'axios'

class ApiService {

    static login(email, password) {
        return axios.post(`${CONFIG.API_URL_BASE}/public/login`, {
            email: email,
            senha: password
        })
    }

    static register(email, password, nomeCompleto, apelido, dataNascimento, imagemPerfil){
        return axios.post(`${CONFIG.API_URL_BASE}/public/usuario`, {
            nomeCompleto,
            email,
            apelido,
            dataNascimento,
            senha: password,
            imagemPerfil
        })
    }

    static getPerfilUsuario() {
        const token = localStorage.getItem('accesToken')
        const config = { headers: { 'Authorization': token } };    
        return axios.get(`${CONFIG.API_URL_BASE}/public/usuario`, config)
    }

    static getPosts(idPagina) {
        const token = localStorage.getItem('accesToken')
        const config = { headers: { 'Authorization': token } };    
        return axios.get(`${CONFIG.API_URL_BASE}/post/${idPagina}`, config)
    }

    
}

export default ApiService
