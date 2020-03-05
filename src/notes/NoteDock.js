import React, {Component} from "react";
import Dock from 'react-dock'
import {Button} from 'antd';
import NoteList from "./NoteList";

export default class NoteDock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            size: 0.25,
            dimModeIdx: 1
        }
    }


    render() {

        return (<div>
                <Button style={{float: 'right', margin: 15}}
                        onClick={() => this.setState({isVisible: !this.state.isVisible})}>Notes</Button>
                <Dock className="note-dock" position='left' isVisible={this.state.isVisible} size={this.state.size} dockStyle={{background: "#282c34"}}>
                    <div>
                        <Button className="dock-button" onClick={() => this.setState({isVisible: !this.state.isVisible})}>Close</Button>
                        <NoteList currentUser={this.props}/>
                    </div>
                </Dock>
            </div>
        )
    }
}

