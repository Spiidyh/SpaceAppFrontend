import React, {useState} from "react";
import {ACCESS_TOKEN, API_BASE_URL} from "../constants";
import {Button} from "antd";
import EditableLabel from 'react-inline-editing';
import ContentEditable from 'react-contenteditable'

export default function Note(props) {
    const [text, setText] = useState(props.item.text);
    const onClickModify = () => {
        const headers = new Headers({
            'Content-Type': 'application/json',
        })
        if (localStorage.getItem(ACCESS_TOKEN)) {
            headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
        }
        headers.append("body", JSON.stringify({text}))
        headers.append("method", "PUT")
        console.log(text)
        fetch(API_BASE_URL + '/notes/' + props.currentUser.username + "/" + props.item.id, {headers})
            .then(response => {
                    console.log(response)
                }
            )
    }
    const onClickDelete = () => {
        const headers = new Headers({
            'Content-Type': 'application/json',
        })
        if (localStorage.getItem(ACCESS_TOKEN)) {
            headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
        }
        headers.append("body", JSON.stringify({text}))
        headers.append("method", "DELETE")
        fetch(API_BASE_URL + '/notes/' + props.currentUser.username + "/" + props.item.id, {headers})
            .then(response => {
                    console.log(response)
                }
            )
    }


console.log(props.currentUser.username)
    return (
        <div>
            <ContentEditable html={text} onChange={e => setText(e.target.value)} style={{color: 'white'}}/>

            {/*<EditableLabel style={{color: "white"}} text = {text} inputWidth = "300px"/>*/}
            <Button variant="primary" size="small" onClick={onClickModify}>
                Save changes
            </Button>
            <Button variant="primary" size="small" onClick={onClickDelete}>
                Delete
            </Button>

        </div>

    )
}