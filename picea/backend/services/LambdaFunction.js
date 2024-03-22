// lambdaFunction.js

const { uploadToS3 } = require('./S3');

exports.handler = async (event, context) => {
    try {
        const result = await uploadToS3();
        return  {
            statusCode: 200,
            body: JSON.stringify(result)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
