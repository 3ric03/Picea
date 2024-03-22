import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FeaturedRemoteVideos, useMeetingManager, VideoTileGrid, useLocalVideo, DeviceLabels, LocalVideo, PreviewVideo } from 'amazon-chime-sdk-component-library-react';
import { MeetingSessionConfiguration } from 'amazon-chime-sdk-js';

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
        <button onClick={toggleCamera}>Toggle Camera</button>
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
            const testMeeting = {
                ExternalMeetingId: 'default-meeting',
                MediaPlacement: {
                  AudioFallbackUrl: 'wss://haxrp.m3.ue1.app.chime.aws:443/calls/cb71c58b-5bd1-49fd-9166-02fc7a382713',
                  AudioHostUrl: 'd29a3159707377c8c8181b7f1ef85772.k.m3.ue1.app.chime.aws:3478',
                  EventIngestionUrl: 'https://data.svc.ue1.ingest.chime.aws/v1/client-events',
                  ScreenDataUrl: 'wss://bitpw.m3.ue1.app.chime.aws:443/v2/screen/cb71c58b-5bd1-49fd-9166-02fc7a382713',
                  ScreenSharingUrl: 'wss://bitpw.m3.ue1.app.chime.aws:443/v2/screen/cb71c58b-5bd1-49fd-9166-02fc7a382713',
                  ScreenViewingUrl: 'wss://bitpw.m3.ue1.app.chime.aws:443/ws/connect?passcode=null&viewer_uuid=null&X-BitHub-Call-Id=cb71c58b-5bd1-49fd-9166-02fc7a382713',
                  SignalingUrl: 'wss://signal.m3.ue1.app.chime.aws/control/cb71c58b-5bd1-49fd-9166-02fc7a382713',
                  TurnControlUrl: 'https://2713.cell.us-east-1.meetings.chime.aws/v2/turn_sessions'
                },
                MediaRegion: 'us-east-1',
                MeetingArn: 'arn:aws:chime:us-east-1:351964880991:meeting/cb71c58b-5bd1-49fd-9166-02fc7a382713',
                MeetingId: 'cb71c58b-5bd1-49fd-9166-02fc7a382713',
                TenantIds: []
              }
            
            const attendee = {
                AttendeeId: 'adabd142-eec6-252b-628f-a554338159b6',
                Capabilities: {
                  Audio: 'SendReceive',
                  Content: 'SendReceive',
                  Video: 'SendReceive'
                },
                ExternalUserId: 'default-user',
                JoinToken: 'YWRhYmQxNDItZWVjNi0yNTJiLTYyOGYtYTU1NDMzODE1OWI2OjUzNGVmOGZhLTUwZDctNGZmMS1hMjU5LTNjMWMwNGU2YWQ2MA'
              }
        
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
            await toggleVideo();
            setMeetingJoined(true);
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
            </>
        ) : (

            <div>
                <h1>Hello, welcome to the video page {id} </h1>
            </div>
        )
};

export default MeetingRoom;
