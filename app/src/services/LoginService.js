import ApiService from './ApiServices'

class LoginService {
    static login(email, password) {
        return ApiService.login(email, password)
    }
}

export default LoginService
