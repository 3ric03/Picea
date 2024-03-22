"use strict";

const { ChimeSDKMeetings } = require('@aws-sdk/client-chime-sdk-meetings');

const chimeSDKMeetings = new ChimeSDKMeetings({ region: 'us-east-1' });

function uuid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		const r = (Math.random() * 16) | 0,
			v = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

module.exports.createMeetings = async (event, context, callback) => {
	const title = 'default-meeting';
	const userId = 'default-user';

	const request = {
		ClientRequestToken: uuid(),
		MediaRegion: 'us-east-1',
		ExternalMeetingId: title.substring(0, 64),
	};
	console.info('Creating new meeting before joining: ' + JSON.stringify(request));
	const meetingInfo = await chimeSDKMeetings.createMeeting(request);
	console.log(meetingInfo)

	const { Attendee } = await chimeSDKMeetings.createAttendee({
		MeetingId: meetingInfo.Meeting.MeetingId,
		ExternalUserId: userId,
	});

    let returnObject = {
        statusCode: 200,
        headers: {
            "access-control-allow-origin": "*"
        },
        body: JSON.stringify({
            meeting: meetingInfo,
            attendee: Attendee
        })
    };

	callback(null, returnObject);
}