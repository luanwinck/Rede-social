import React from 'react'
import { Redirect } from 'react-router-dom';

import { InputGroup, InputGroupAddon, Input, InputGroupText, Button } from 'reactstrap';

import PerfilUsuario from '../../components/PerfilUsuario/PerfilUsuario'

import GetPerfilUsuarioService from '../../services/GetPerfilUsuarioService'
import GetPostsService from '../../services/GetPostsService'

//import Button from '../../components/generic/Button/Button'
import Post from '../../components/Post/Post'

import './Home.css'

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            token: localStorage.getItem('accesToken'),
            perfil: {},
            posts: []
        }
        this.onLogout = this.onLogout.bind(this)
        this.onComentarios = this.onComentarios.bind(this)
        this.onCurtir = this.onCurtir.bind(this)
        this.onVisitUser = this.onVisitUser.bind(this)
    }

    componentWillMount() {
        this.getPerfilUsuario()
    }

    getPerfilUsuario(){
        GetPerfilUsuarioService
        .getPerfilUsuario()
        .then((result) => {
            this.setState({
                perfil: result.data
            })
            this.getPosts()
            console.log(result.data)
        }).catch((err) => {
            this.setState({
                shouldRedirectLogin: true
            })
        })
        
    }

    getPosts(){
        GetPostsService
        .getPosts(0)
        .then((result) => {
            this.setState({
                posts: result.data.content,
                totalPaginas: result.data.totalPages
            })
            console.log(result.data)
        }).catch((err) => {
            this.setState({
                shouldRedirectLogin: true
            })
        })
    }

    onLogout(){
        localStorage.removeItem('accesToken')
        this.setState({
            shouldRedirectLogin: true
        })
    }

    onComentarios(id){

    }
    onCurtir(id){

    }
    onVisitUser(id){

    }

    renderPosts() {
        return this.state.posts.map((post, key) => {
            return <Post key={key} 
                post={post}
                onComentarios={this.onComentarios} 
                onCurtir={this.onCurtir}  
                onVisitUser={this.onVisitUser} 
            />
        })
    }


    render() {
    if (this.state.shouldRedirectLogin) {
        return <Redirect to='/login' />
    }
    return (<div>
        <div className="navBarHome">
            <h1>Logo</h1>
            <div className="inputBuscar">
                <InputGroup size="sm">
                    <Input placeholder="Pesquise por novos amigos..."/>
                    <InputGroupAddon addonType="append">
                        <Button color="secondary">
                            <img className="imgPesquisa" src="https://images.vexels.com/media/users/3/132068/isolated/preview/f9bb81e576c1a361c61a8c08945b2c48--cone-de-pesquisa-by-vexels.png" alt=""/>
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
            </div>
            <Button onClick={this.onLogout} color='secondary' text='Logout'>Logout</Button>{' '}
        </div>
        <PerfilUsuario 
        perfil={this.state.perfil} />
        {this.renderPosts()}
        <div className="FooterHome">
            <Button color="success">Ver mais</Button>
        </div>
    </div>)
    }
}