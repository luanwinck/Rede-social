import ApiService from './ApiServices'

class GetPostsService {
    static getPosts(idPagina) {
        return ApiService.getPosts(idPagina)
    }
}

export default GetPostsService
