import React, {Component} from "react";
import {ACCESS_TOKEN, API_BASE_URL} from "../constants";
import Note from "./Note";

class NoteList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],

        };

    }

    componentDidMount() {
        const headers = new Headers({
            'Content-Type': 'application/json',
        })
        if(localStorage.getItem(ACCESS_TOKEN)) {
            headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
        }
        fetch(API_BASE_URL + '/notes/' + this.props.currentUser.currentUser.username, {headers})
            .then(res => res.json())
            .then((data) => {
                this.setState({notes: data})
            })
            .catch(console.log)

    }

    render() {
        return (<div>
                {this.state.notes.map(item => (
                    <Note key={item.id} item={item} currentUser={this.props.currentUser.currentUser}/>
                ))}
            </div>
        )


    }
}

export default NoteList