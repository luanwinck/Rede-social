import React from 'react'

import Input from '../../components/generic/Input/Input'

import { Alert } from 'reactstrap';
import { Redirect } from 'react-router-dom';

import RegisterService from '../../services/RegisterService'

import Button from '../../components/generic/Button/Button'

import './RegisterForm.css'


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
}

export default class extends React.Component {
    constructor() {
        super()
        this.state = this.getInitialState()
        this.handleChange = this.handleChange.bind(this)
        this._doRegister = this._doRegister.bind(this)
        this._backLogin = this._backLogin.bind(this)
    }

    getInitialState() {
        return {
            email: '',
            password: '',
            passwordConfirm: '',
            nomeCompleto: '',
            apelido: '',
            dataNascimento: '',
            imagemPerfil: '',

            error: '',
            shouldRedirectHome: false,
            validations: {
                email: {
                    isValid: true,
                    message: 'email inválido'
                },
                password: {
                    isValid: true,
                    message: 'senha inválida (mínimo 8 caracteres)'
                },
                passwordConfirm: {
                    isValid: true,
                    message: 'senhas incopatíveis'
                },
                nomeCompleto: {
                    isValid: true,
                    message: 'nome é obrigatório'
                },
                dataNascimento: {
                    isValid: true,
                    message: 'data de nascimento é obrigatório'
                }
            }
        }
    }
    handleChange(event) {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name

        this.setState({
            [name]: value
        })
        let teste = value.split("-")
        console.log(value)
        console.log(teste)
    }

    _renderErrorComponent(isValid, message) {
        let ErrorComponent = isValid ? null : (
            <span style={{ color: 'red' }}>{message}</span>
        )
        return ErrorComponent
    }

    renderError() {
        return this.state.error ?<Alert color='danger'>{this.state.error}</Alert> : undefined
    }

    _renderEmail() {
        const emailValidation = this.state.validations.email
        return (
            <div>
                <Input
                        label="E-mail"
                        value={this.state.email}
                        name="email"
                        placeholder="Digite seu e-mail"
                        handleChange={this.handleChange}
                        type="email"
                    />
                <br />
                {this._renderErrorComponent(
                    emailValidation.isValid,
                    emailValidation.message
                )}
            </div>
        )
    }

    _renderNomeCompleto() {
        const nomeValidation = this.state.validations.nomeCompleto
        return (
            <div>
                <Input
                        label="Nome completo"
                        value={this.state.nomeCompleto}
                        name="nomeCompleto"
                        placeholder="Digite seu nome completo"
                        handleChange={this.handleChange}
                        type="text"
                    />
                <br />
                {this._renderErrorComponent(
                    nomeValidation.isValid,
                    nomeValidation.message
                )}
            </div>
        )
    }

    _renderApelido() {
        return (
            <div>
                <Input
                        label="Apelido (Opcional)"
                        value={this.state.apelido}
                        name="apelido"
                        placeholder="Digite um apelido"
                        handleChange={this.handleChange}
                        type="text"
                    />
                <br />
            </div>
        )
    }

    _renderDataNascimento() {
        const dataValidation = this.state.validations.dataNascimento
        return (
            <div>
                <Input
                        label="Data nascimento"
                        value={this.state.dataNascimento}
                        name="dataNascimento"
                        placeholder="Digite seu nome completo"
                        handleChange={this.handleChange}
                        type="date"
                    />
                <br />
                {this._renderErrorComponent(
                    dataValidation.isValid,
                    dataValidation.message
                )}
            </div>
        )
    }

    _renderImagemPerfil() {
        return (
            <div>
                <Input
                        label="Imagem de perfil (Opcional)"
                        value={this.state.imagemPerfil}
                        name="imagemPerfil"
                        placeholder="Cole a URL aqui"
                        handleChange={this.handleChange}
                        type="text"
                    />
                <br />
            </div>
        )
    }

    _renderPassword() {
        const passwordValidation = this.state.validations.password
        return (
            <div>
                <Input
                        label="Senha"
                        value={this.state.password}
                        name="password"
                        placeholder="Digite sua senha (mínimo 8 caracteres)"
                        handleChange={this.handleChange}
                        type="password"
                    />
                <br />
                {this._renderErrorComponent(
                    passwordValidation.isValid,
                    passwordValidation.message
                )}
            </div>
        )
    }

    _renderPasswordConfirm() {
        const passwordConfirmValidation = this.state.validations.passwordConfirm
        return (
            <div>
                <Input
                        label="Digite novamente"
                        value={this.state.passwordConfirm}
                        name="passwordConfirm"
                        placeholder="Digite sua senha novamente"
                        handleChange={this.handleChange}
                        type="password"
                    />
                <br />
                {this._renderErrorComponent(
                    passwordConfirmValidation.isValid,
                    passwordConfirmValidation.message
                )}
            </div>
        )
    }

    _doRegister() {
        let validations = this.state.validations
        validations.email.isValid = validateEmail(this.state.email)
        validations.password.isValid = this.state.password.length > 7
        validations.passwordConfirm.isValid = this.state.passwordConfirm === this.state.password
        validations.nomeCompleto.isValid = this.state.nomeCompleto.length > 0
        validations.dataNascimento.isValid = this.state.dataNascimento.length > 0

        const allValidations = [
            validations.email.isValid,
            validations.password.isValid
        ]

        const hasInvalidFields =
            allValidations.filter(isValid => isValid === false).length > 0

        if (hasInvalidFields) {
            this.setState({ validations })
        } else {
            const account = this.state
            RegisterService
                .register(account.email, account.password, account.nomeCompleto,
                account.apelido, account.dataNascimento, account.imagemPerfil)
                .then((result) => {
                    this.setState({
                        shouldRedirectLogin: true
                    })
                }).catch((err) => {
                    this.setState({
                        error: err.response.data.message
                    })
                })
        }
    }

    _backLogin() {
        this.setState({
            shouldRedirectLogin: true
        })
    }

    render() {
        if (this.state.shouldRedirectLogin) {  
            return <Redirect to='/login' />
        }

        return (<div className="RegisterForm--content">
            {this.renderError()}
            {this._renderEmail()}
            {this._renderNomeCompleto()}
            {this._renderApelido()}
            {this._renderDataNascimento()}
            {this._renderImagemPerfil()}
            {this._renderPassword()}
            {this._renderPasswordConfirm()}

            <Button onClick={this._backLogin} classButton='secondary' text='Voltar'/>

            <Button onClick={this._doRegister} classButton='success' text='Registra-se'/>

        </div>)
    }
}