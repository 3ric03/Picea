// Import the AWS SDK
var AWS = require('aws-sdk');

// Set credentials and Region
// This can also be done directly on the service client
AWS.config.update({region: 'us-east-1', credentials: {YOUR_CREDENTIALS}});

var dynamodb = new AWS.DynamoDB({
    apiVersion: '2012-08-10',
    region: 'us-east-1' 
    });


// module.exports.storage = async (event) => {
//     // TODO implement
//     const response = {
//         statusCode: 200,
//         body: JSON.stringify('This is a meeting'),
//     };
//     return response;
// };
      