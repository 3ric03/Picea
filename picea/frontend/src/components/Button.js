import React, { Component } from "react";
import axios from "axios";
import  "./fileupload.css";

// var cors = require('cors');
// app.use(cors({origin: true, credentials: true}));

export default class FileUpload extends Component {
    state = {
        fileToUpload: undefined,
        uploadSuccess: undefined,
        error: undefined
    };
uploadFile() {
        console.log("about to send");
        console.log(this.state.fileToUpload)
        axios(
            "https://bkd4zey0l4.execute-api.us-east-1.amazonaws.com/dev/storage?fileName=" +
                this.state.fileToUpload.name
        ).then(response => {
            // Getting the url from response
            const url = response.data.fileUploadURL;
            console.log(url);
            axios({
                method: "PUT",
                url: url,
                data: this.state.fileToUpload,
                headers: { "Content-Type": "multipart/form-data" }
            })
                .then(res => {
                    this.setState({
                        uploadSuccess: "File upload successfull",
                        error: undefined
                    });
                })
                .catch(err => {
                    this.setState({
                        error: "Error Occured while uploading the file",
                        uploadSuccess: undefined
                    });
                });
        });
    }
    
    render() {
        return (
            <div className={'fileUploadCont'}>
                <div className={'header'}>
                    File Upload to S3 with Lambda, And React axios Application
                </div>
                <div>
                    <form>
                        <div className="form-group">
                            <input
                                type="file"
                                className="form-control-file"
                                id="fileUpload"
                                onChange={e => {
                                    this.setState({
                                        fileToUpload: e.target.files[0]
                                    });
                                }}
                            />
                            {this.state.fileToUpload ? (
                                <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={e => {
                                        this.uploadFile();
                                    }}
                                >
                                    Upload your file
                                </button>
                            ) : null}
<div>
                                <span>
                                    {this.state.uploadSuccess
                                        ? "File Upload Successfully"
                                        : ""}
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}