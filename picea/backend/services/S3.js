"use strict";

const AWS = require("aws-sdk");
const s3 = new AWS.S3({ signatureVersion: "v4" });
const bucketName = "picea-storage";
const expirationInSeconds = 300;

module.exports.storage = async (event, context) => {
    const key = event.queryStringParameters.fileName;

    const params = {
        Bucket: bucketName,
        Key: key,
        ContentType: "multipart/form-data",
        Expires: expirationInSeconds
    };

    try {
        // Creating the presigned Url
        const preSignedURL = await s3.getSignedUrl("putObject", params);
        let returnObject = {
            statusCode: 200,
            headers: {
                "access-control-allow-origin": "*"
            },
            body: JSON.stringify({
                fileUploadURL: preSignedURL
            })
        };

        return returnObject;
    } catch (e) {
        const response = {
            err: e.message,
            headers: {
                "access-control-allow-origin": "*"
            },
            body: "error occured"
        };
        return response;
    }
};