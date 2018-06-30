import React from 'react'

import Button from '../generic/Button/Button'

import './Post.css'

export default class Post extends React.Component {

    getClassButton() {
        return this.props.visitUser ? "buttonHidden" : "buttonAppears"
    }

    render() {
        return <div className="content--post">
                    <div className="content--post--text">
                        <h2 className="post--title"  onClick={() => this.props.onVisitUser(this.props.post.id)}>{this.props.post.usuario}</h2>
                        <div className="content--description">
                            <p>{this.props.post.descricao}</p>
                        </div>            
                    </div>
                    <div className="content--movie-remove-button">
                        <div>
                            <Button text="Editar" classButton={`outline-light ${this.getClassButton()}`} onClick={() => this.props.onCurtir(this.props.post.id)} />
                            <Button text="Remover" classButton={`outline-danger ${this.getClassButton()}`} onClick={() => this.props.onComentarios(this.props.post.id)} />
                        </div>
                    </div>
                    <form>
                    <div class="check-group">
                        <input type="checkbox" id={`check${this.props.id}`}></input>
                        <label for={`check${this.props.id}`} class="icon"><img src="http://emojinhoapp.com/wp-content/uploads/2016/07/emojnho_hands_blurry.png" alt=""></img></label>
                        <div class="Comentario">
                            Comentarios
                        </div>
                        
                    </div>
                    </form>
                </div>

      }
}