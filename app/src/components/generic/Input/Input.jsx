import React from 'react'

import './Input.css'

export default class Input extends React.Component {

    render() {
        return <div className="form-group">
            <label htmlFor="exampleInputEmail1" className="label">{this.props.label}</label>
            <input
                onChange={this.props.handleChange}
                value={this.props.value}
                type={this.props.type}
                className="form-control input"
                name={this.props.name}
                placeholder={this.props.placeholder} />
        </div>
    }

}