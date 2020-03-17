import React from "react";

export default function Asteroid(props) {
    const objects = props.item
    const approachData = objects.close_approach_data[0]

    return (
        <tr>
            <td>{objects.id}</td>
            <td>{objects.name}</td>
            <td><a href={objects.nasa_jpl_url}>Nasa JPL url</a></td>
            <td>{objects.absolute_magnitude_h}</td>
            <td>{objects.estimated_diameter.kilometers.estimated_diameter_min}km</td>
            <td>{objects.estimated_diameter.kilometers.estimated_diameter_max}/km</td>
            <td>{objects.is_potentially_hazardous_asteroid ? "True" : "False"}</td>
            <td>{approachData.close_approach_date}</td>
            <td>{approachData.relative_velocity.kilometers_per_hour}km/h</td>
            <td>{approachData.miss_distance.kilometers}km</td>
        </tr>

    )

}

