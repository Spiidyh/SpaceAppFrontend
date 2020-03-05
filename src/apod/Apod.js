import React, {Component} from "react";
import Youtube from 'react-youtube-embed'
import "./Apod.css"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'


class Apod extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: "",
            explanation: "",
            media_type: "",
            service_version: "",
            title: "",
            url: "",
            loading: true
        }
        this.getMediaByType = this.getMediaByType.bind(this)
        this.matchYoutubeUrl = this.matchYoutubeUrl.bind(this)

    }

    componentDidMount() {
        fetch("https://api.nasa.gov/planetary/apod?api_key=NOIZfwmhds58UhgcdT9wUTCaeEl4SEkweZKhgfKm", {
            method: "GET",
            headers: {'content-type': 'application/json'},

        })
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                this.setState(data)

            })
            .catch(console.log)
        this.setState(prevState => {
            this.state.loading = !prevState.loading
        })
    }

    matchYoutubeUrl(url){
        let p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        return (url.match(p)) ? RegExp.$1 : false ;
    }

    getMediaByType() {
        if (this.state.url !== undefined) {
            if (this.state.media_type === "video") {
                return (
                    <Youtube id={this.matchYoutubeUrl(this.state.url)}/>
                )
            } else {
                return (
                    <img src={this.state.url} alt={this.state.title}/>
                )
            }
        }
    }


    render() {
        if (this.state.loading) return <p><br/><br/><br/><Loader type="Puff"
                                               color="#00BFFF"
                                               height={100}
                                               width={100}
        />
        </p>;
        return (
            <div>
                <h1>Astronomy Picture of the Day</h1>
                <p>Date: {this.state.date}</p>
                <p>Explanation: {this.state.explanation}</p>
                <br/>
                <h3>{this.state.title}</h3>
                {this.getMediaByType()}
            </div>
        )
    }
}

export default Apod