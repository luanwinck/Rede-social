import React from 'react'

import './Button.css'

export default class Button extends React.Component {

    getClassName() {
        return `btn btn-${this.props.classButton} button`
    }
    render() {
        return <button className={this.getClassName()}
            onClick={this.props.onClick}
            type={this.props.type}>{this.props.text}</button>
    }

}