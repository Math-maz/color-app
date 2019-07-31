import React, { Component } from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import './ColorBox.css'
class ColorBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            copied: false
        }
        this.changeCopyState = this.changeCopyState.bind(this);
    }
    changeCopyState(){
        this.setState({copied: true}, ()=>{
            setTimeout(()=>{
                this.setState({copied: false})
            }, 1500);
        });
    }
    render(){
        return(
            <CopyToClipboard onCopy={this.changeCopyState} text={this.props.background.toUpperCase()}>
                <div style={{background: this.props.background}} className="ColorBox">
                    <div style={{background: this.props.background}} className={`copy-overlay ${this.state.copied && "show"}`}/>
                    <div className={`copy-msg ${this.state.copied && "show"}`}>
                        <h1>COPIED!</h1>
                        <p>{this.props.background}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span>{this.props.name}</span>
                        </div>
                        <button className="copy-button">
                            Copy
                        </button>
                    </div>
                    <span className="see-more">MORE</span>
                </div>
            </CopyToClipboard>
        )
    }
}
export default ColorBox;
