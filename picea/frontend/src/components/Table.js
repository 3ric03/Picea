import React from 'react'
import JsonData from './data.json'

function JsonDataDisplay(){
    const DisplayData=JsonData.map(
        (info)=>{
            return(
                <tr>
                    <td>{info.name.SS[0]}</td>
                    <td>{info.name.SS[1]}</td>
                    <td>{info.email.S}</td>
                    <td>{info.startTime.N}</td>
                    <td>{info.endTime.N}</td>
                </tr>
            )
        }
    )
 
    return(
        <div>
            <table class="table table-striped">
                <thead>
                    <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    </tr>
                </thead>
                <tbody>
                    {DisplayData}
                </tbody>
            </table>
        </div>
    )
 }
 
 export default JsonDataDisplay;