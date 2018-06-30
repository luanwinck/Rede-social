import React from 'react'

import './TextArea.css'

export default class TextArea extends React.Component {

    render() {
        return <div className="form-group">
            <label htmlFor="exampleInputEmail1" className="label">{this.props.label}</label>
            <textarea
                onChange={this.props.handleChange}
                value={this.props.value}
                type={this.props.type}
                className="form-control input"
                name={this.props.name}
                placeholder={this.props.placeholder} 
                rows='10'
            />
        </div>
    }

}