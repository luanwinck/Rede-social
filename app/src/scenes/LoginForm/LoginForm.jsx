import React from 'react'

import Input from '../../components/generic/Input/Input'

import { Alert } from 'reactstrap';
import { Redirect } from 'react-router-dom';

import Button from '../../components/generic/Button/Button'

import './LoginForm.css'

import LoginService from '../../services/LoginService'

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
}

export default class LoginForm extends React.Component {

    constructor() {
        super()
        this.state = this.getInitialState()
        this.handleChange = this.handleChange.bind(this)
        this._renderEmail = this._renderEmail.bind(this)
        this._renderPassword = this._renderPassword.bind(this)
        this._doLogin = this._doLogin.bind(this)
        this._doRegister = this._doRegister.bind(this)
        this._renderErrorComponent = this._renderErrorComponent.bind(this)
        
    }

    getInitialState() {
        return {
            email: '',
            password: '',
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

    _renderPassword() {
        const passwordValidation = this.state.validations.password
        return (
            <div>
                <Input
                        label="Senha"
                        value={this.state.password}
                        name="password"
                        placeholder="Digite sua senha"
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

    _doLogin() {
        let validations = this.state.validations
        validations.email.isValid = validateEmail(this.state.email)
        validations.password.isValid = this.state.password.length > 0

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
            LoginService.
                login(account.email, account.password)
                .then((result) => {
                    localStorage.setItem('accesToken',result.data.accessToken) 
                    this.setState({
                        shouldRedirectHome: true
                    })
                }).catch((err) => {
                    this.setState({
                        error: err.response.data.message
                    })
                })
        }
    }

    _doRegister(){
        this.setState({
            shouldRedirectRegister: true
        })
    }

    render() {
        if (this.state.shouldRedirectHome) {  
            return <Redirect to='/home' />
        } else if (this.state.shouldRedirectRegister) {  
            return <Redirect to='/registrar' />
        }

        return (
            <div className="LoginForm--global">
                <div className="LoginForm--content">
                    {this.renderError()}
                    {this._renderEmail()}
                    {this._renderPassword()}
                    <Button onClick={this._doRegister} classButton='secondary' text='Registra-se'/>

                    <Button onClick={this._doLogin} classButton='success' text='Entrar'/>

                </div>
            </div>

        )
    }
}