import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FeaturedRemoteVideos, useMeetingManager, VideoTileGrid, useLocalVideo, DeviceLabels, LocalVideo, PreviewVideo } from 'amazon-chime-sdk-component-library-react';
import { MeetingSessionConfiguration } from 'amazon-chime-sdk-js';
import Button from './Button'
import axios from 'axios';

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }


  const MeetingView = () => {
    const meetingManager = useMeetingManager();
    const { isVideoEnabled, setIsVideoEnabled } = useLocalVideo();
  
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
    return (
      <>
        <VideoTileGrid />
        {/* <button onClick={toggleCamera}>Toggle Camera</button> */}
      </>
    );
  };

const MeetingRoom = () => {
    const [meetingJoined, setMeetingJoined] = useState(false);
    const { toggleVideo } = useLocalVideo();
    
    const { id } = useParams();
    const meetingManager = useMeetingManager();

    useEffect(() => {
        const joinMeeting = async () => {
            axios(
                "https://bkd4zey0l4.execute-api.us-east-1.amazonaws.com/dev/meeting"
            ).then(async (response) => {
                console.log(response)
                const testMeeting = response.data.meeting;
                const attendee = response.data.attendee;

                const meetingSessionConfiguration = new MeetingSessionConfiguration(testMeeting, attendee);
                const options = {
                  deviceLabels: DeviceLabels.AudioAndVideo,
                };
                console.log(meetingSessionConfiguration);
                
                // Use the join API to create a meeting session using DeviceLabels.Video
                await meetingManager.join(
                  meetingSessionConfiguration,
                  options
                );
                console.log(meetingManager.meetingSession)
                // At this point you can let users setup their camera device
                // Or by default the SDK selects the first device in the list for the kind indicated by `deviceLabels`
                
                await meetingManager.start();
                console.log(meetingManager.meetingSession)
                
                await meetingManager.meetingSession?.audioVideo?.startVideoInput(
                    meetingManager.selectedVideoInputDevice
                    );
                meetingManager.meetingSession?.audioVideo?.startLocalVideoTile();
                // setIsVideoEnabled(true);
                // await toggleVideo();
                setMeetingJoined(true);
            })
          };


        joinMeeting()
    }, [])


    return meetingJoined ? 
        (
            <>
                {/* <button onClick={toggleVideo}>Toggle Camera</button> */}
                {/* <VideoTileGrid /> */}
                <MeetingView />
                <LocalVideo />
                <FeaturedRemoteVideos />
                <PreviewVideo />
                <Button />
            </>
        ) : (

            <div>
                <h1>Hello, welcome to the video page {id} </h1>
            </div>
        )
};

export default MeetingRoom;
