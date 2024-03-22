import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMeetingManager, VideoTileGrid, useLocalVideo, DeviceLabels } from 'amazon-chime-sdk-component-library-react';
import { MeetingSessionConfiguration } from 'amazon-chime-sdk-js';


const MeetingRoom = () => {
    const [meetingJoined, setMeetingJoined] = useState(false);
    const { isVideoEnabled, setIsVideoEnabled } = useLocalVideo();
    
    const { id } = useParams();
    const meetingManager = useMeetingManager();


    useEffect(async () => {
        setMeetingJoined(false);
        await joinMeeting(id);
    }, [])

    const joinMeeting = async (meetingId) => {
        // Fetch the meeting and attendee data from your server application
        const response = await fetch('/my-server');
        const data = await response.json();

        if (data == null){
            alert('Not a valid meeting id');
        }
    
        const meetingSessionConfiguration = new MeetingSessionConfiguration(data.Meeting, data.Attendee);
        const options = {
          deviceLabels: DeviceLabels.Video,
        };
        
        setMeetingJoined(true);
        // Use the join API to create a meeting session using DeviceLabels.Video
        await meetingManager.join(
          meetingSessionConfiguration,
          options
        );
    
        // At this point you can let users setup their camera device
        // Or by default the SDK selects the first device in the list for the kind indicated by `deviceLabels`
        
        await meetingManager.start();
      };

    const toggleCamera = async () => {
        if (isVideoEnabled || !meetingManager.selectedVideoInputDevice) {
            meetingManager.meetingSession?.audioVideo?.stopLocalVideoTile();
            // Change the state to hide the `LocalVideo` tile
            setIsVideoEnabled(false);
        } else {
            await meetingManager.meetingSession?.audioVideo?.startVideoInput(
            meetingManager.selectedVideoInputDevice
            );
            meetingManager.meetingSession?.audioVideo?.startLocalVideoTile();
            // Change the state to display the `LocalVideo` tile
            setIsVideoEnabled(true);
        }
    };

    return meetingJoined ? 
        (
            <>
                <VideoTileGrid />
                <button onClick={toggleCamera}>Toggle Camera</button>
            </>
        ) : (

            <div>
                <h1>Hello, welcome to the video page {id} </h1>
            </div>
        )
};

export default MeetingRoom;
