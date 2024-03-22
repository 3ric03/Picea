// Import the AWS SDK
var AWS = require('aws-sdk');

// Set credentials and Region
// This can also be done directly on the service client
AWS.config.update({region: 'us-east-1'});
var documentClient = new AWS.DynamoDB.DocumentClient();

var db = new AWS.DynamoDB({
    apiVersion: '2012-08-10',
    region: 'us-east-1' 
    });
      
const meeting = "meeting"
const counsellor = "counsellor"

// Retrieve meeting from the meeting table by meeting title
module.exports.getMeeting = async (id) => {
    const result = await ddb.getItem({
      TableName: meeting,
      Key: {
        meeting_id: {
          S: id,
        },
      },
    });
    return result.Item ? JSON.parse(result.Item.Data.N) : null;
  };

  // Add meeting in the meeting table
module.exports.putMeeting = async (id, meetingInfo) => {
    await ddb.putItem({
      TableName: meeting,
      Item: {
        meeting_id: { N: id },
        Data: { S: JSON.stringify(meetingInfo) },
        counsellor_id: {N: null},
        participants: {NS: []},
      },
    });
  };

  //returns a list of participants in the given meeting
module.exports.getMeetingParticipants = async (id, participantId) => {
    const result = await ddb.getItem({
      TableName: meeting,
      Key: {
        meeting_id: {
          S: id,
        },
      },
    });
    return result.Item ? result.Item.participants.NS : null;
  };

  //returns the id of the counsellor of the meeting 
module.exports.getMeetingCounsellor = async (id, counsellorId) => {
    const result = await ddb.getItem({
      TableName: meeting,
      Key: {
        counsellor_id: {
          S: counsellorId,
        },
      },
    });
    if (!result.Item) {
      return 'Unknown';
    }
    return result.Item ? result.Item.counsellor_id.N : null;
  };
  
  //add a participant to a meeting
module.exports.addParticipantToMeeting = async (meetingID, participantId) => {
    await ddb.UpdateItem({
      TableName: meeting,
      Key: {
        meeting_id: {
          S: meetingID,
        },
      },
      UpdateExpression: 'SET participants = list_append(participants, :participantId)',
      ExpressionAttributeValues: {
        ':participantId': [participantId], 
      },
    });
  };


module.exports.addCounsellorToMeeting = async (meetingID, counsellorId) => {
    await ddb.UpdateItem({
      TableName: meeting,
      Key: {
        meeting_id: {
          S: meetingID,
        },
      },
      UpdateExpression: 'SET counsellor_id = :counsellorId',
      ExpressionAttributeValues: {
        ':counsellorId': counsellorId, 
      },
    });
  };

  //return a list of counsellor_id that fits within the participants' desired avaliability
module.exports.findAvaliableCounsellor = async (participantStartTime) => {
    await ddb.scan({
        TableName: counsellor,
        FilterExpression: 'endTime > :startTime', // Define your condition using a numerical comparison operator
        ExpressionAttributeValues: {
            ':startTime': participantEndTime // Specify the numerical value for comparison
        }
      });
    return result.Item ? result.Item.counsellor_id : null;
  };

module.exports.getCounsellorName = async (id) => {
    const result = await ddb.getItem({
      TableName: counsellor,
      Key: {
        counsellor_id: {
          S: id,
        },
      },
    });
    return result.Item ? JSON.parse(result.Item.name.SS) : null;
  };

const scanTable = async (tableName) => {
    const params = {
        TableName: tableName
    };

    const scanResults = [];
    let items;
    do{
        items = await documentClient.scan(params).promise();
        items.Items.forEach((item) => scanResults.push(item));
        params.ExclusiveStartKey = items.LastEvaluatedKey;
    }while(typeof items.LastEvaluatedKey !== "undefined");

    console.log(scanResults);
    
    return scanResults;
};

module.exports.getAllCounsellers = async () => {
    let reponse;
    try {
        reponse = { 
            'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': "*",
            "Content-Type": "application/json"

        },
        'body': JSON.stringify({
            counsellors: scanTable(counsellor)
        })
        }
    } catch (err) {
        console.log(err);
        return err;
    }


    return reponse;
}

// module.exports.database = async (
//     id, 
//     meetingInfo,
//     participantId, 
//     counsellorId, 
//     participantStartTime
// ) => {
//     getMeeting, putMeeting, getMeetingParticipants, getMeetingCounsellor, addParticipantToMeeting,
//     addCounsellorToMeeting, findAvaliableCounsellor, getCounsellorName
// };
