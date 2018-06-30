import React, { Component } from 'react';
import './Loading.css';

class Loading extends Component {

    render() {
        return (
            <div className="loading">
                <svg id="load" x="0px" y="0px" viewBox="0 0 150 150">
                    <circle id="loading-inner" cx="75" cy="75" r="60" />
                </svg>
            </div>
        );
    }
}

export default Loading;
