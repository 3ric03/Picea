import { useEffect, useState } from 'react';
import axios from "axios";

export default Counsellers = () => {
    const [counsellers, setCounsellers] = useState({});


    useEffect(() => {
        axios(
            "https://bkd4zey0l4.execute-api.us-east-1.amazonaws.com/dev/" +
                this.state.fileToUpload.name
        ).then(response => {
            setCounsellers(response.data);
        })
    })

    return (
        <div>
            <h1>All our available counsellers and their respective schedules</h1>
        </div>
    )
}