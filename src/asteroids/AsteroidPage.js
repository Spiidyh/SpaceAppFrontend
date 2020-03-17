import React, {Component} from "react";
import Asteroid from "./Asteroid";
import "./AsteroidPage.css"


export default class AsteroidPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            element_count: 0,
            near_earth_objects: [],
            loading: true
        }
    }

    componentDidMount() {
        fetch("https://api.nasa.gov/neo/rest/v1/feed?start_date=" + searchDate + "&end_date=" + searchDate + "&api_key=NOIZfwmhds58UhgcdT9wUTCaeEl4SEkweZKhgfKm", {
            method: "GET",
            headers: {'content-type': 'application/json'},

        })
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    element_count: data.element_count,
                    near_earth_objects: data.near_earth_objects[searchDate],
                    loading: false
                })

            })
            .catch(console.log)
    }


    render() {

        return (
            <div>
                <link rel="stylesheet" type="text/css" href="AsteroidPage.css" media="all" />
                <h1>Watch out its asteroid season!</h1>
                <br/>
                <h2>{this.state.element_count} asteroids near Earth today.</h2>
                <table className="custom-table">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Nasa jpl url</th>
                        <th>Absolute magnitude</th>
                        <th>Estimated diameter min</th>
                        <th>Estimated diameter max</th>
                        <th>Is potentially hazardous</th>
                        <th>Close approach date</th>
                        <th>Relative velocity</th>
                        <th>Miss distance</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.near_earth_objects.map(item => (
                            <Asteroid key={item.id} item={item}/>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        )
    }

}


let date = new Date()
let month = date.getMonth() + 1
const searchDate = date.getFullYear() + "-0" + month + "-" + date.getDate()