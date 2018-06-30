import ApiService from './ApiServices'

class RegisterService {
    static register(email, password, nomeCompleto, apelido, dataNascimento, imagemPerfil) {

        let dataFormatada = dataNascimento.split("-")
        const ano = parseInt(dataFormatada[0])
        const mes = parseInt(dataFormatada[1])
        const dia = parseInt(dataFormatada[2])

        const dataFormatadaInt = [ano, mes, dia]

        return ApiService.register(email, password, nomeCompleto, apelido, dataFormatadaInt, imagemPerfil)
    }
}

export default RegisterService
