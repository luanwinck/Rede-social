import React from 'react'

import './PerfilUsuario.css'

export default class extends React.Component {
  constructor(props) {
    super(props)
  }

  _renderImagemPerfil(){
    let imagemPerfil = this.props.perfil.imagemPerfil
    let imagemRender = imagemPerfil != null ? (
        <div className="imagemPerfilHome">
            <img src={imagemPerfil} alt=""/>
        </div> 
    ) : null
    return imagemRender
  }

  render() {
    return (<div className="conteinerPerfilHome">
        {this._renderImagemPerfil()}
        <div>
            <h1>{this.props.perfil.nomeCompleto}</h1>
            <h2>{this.props.perfil.apelido}</h2>
        </div>
    </div>)
  }
}