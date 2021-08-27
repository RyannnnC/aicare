import React ,{Component}from 'react';
import { Platform,Text, Button, View, Alert, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput } from 'react-native';
import DataContext from '../../providerContext';
import I18n from '../switchLanguage';
import {TwilioVideo,TwilioVideoLocalView,TwilioVideoParticipantView} from 'react-native-twilio-video-webrtc'

export default class Patients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audioEnabled:true,
      videoEnabled:true,
      status:'disconnected',
      participants:new Map(),
      videoTracks:new Map(),
      token:'',
      room:'',
      pid:'',
    }
    this.twilioRef = React.createRef();
  }

  componentDidMount() {
    this.setState({pid:Platform.constants.Brand+Platform.constants.Model})
    console.log(Platform.constants.Brand+Platform.constants.Model)
  }
  createRoom = () =>{
    let url = 'http://'
    +this.context.url
    +'/aicare-business-api/business/twilio/create-room'
    console.log(url)
    fetch(url,{
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json',
      'sso-auth-token': this.context.token,
      'sso-refresh-token': this.context.refresh_token,
    }})
    .then((response) => response.json())
    .then((json) =>  {
        if (json.code === 0) {
          this.setState({room:json.room.sid})
          console.log(json.room.sid)
        } else {
          alert(json.msg)
          return false;
        }
    })
  }

  getToken = () => {
    let url = 'http://'
    +this.context.url
    +'/aicare-business-api/business/twilio/get-token?'
    +'sid=RMa903d2dfef98c2644b772a63e3fb96c2' //+ this.state.room
    +'&identity=' + this.state.pid
    console.log(url)
    fetch(url,{
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json',
      'sso-auth-token': this.context.token,
      'sso-refresh-token': this.context.refresh_token,
    }})
    .then((response) => response.json())
    .then((json) =>  {
        if (json.code === 0) {
          this.setState({token:json.token})
          alert(json.msg)
          console.log(json.token)
        } else {
          console.log(json.msg)
          Alert.alert("Get token error");
          return false;
        }
    })
  }
   _onConnectButtonPress = () => {
   this.twilioRef.current.connect({ accessToken:this.state.token});
   this.setState({status:'connecting'});
 }

  _onEndButtonPress = () => {
   this.twilioRef.current.disconnect();
 };

  _onMuteButtonPress = () => {
   this.twilioRef.current
     .setLocalAudioEnabled(!this.state.audioEnabled)
     .then(isEnabled => this.setState({audioEnabled: isEnabled}));
 };

  _onFlipButtonPress = () => {
   this.twilioRef.current.flipCamera();
 };

  _onRoomDidConnect = ({roomName, error}) => {
   console.log('onRoomDidConnect: ', roomName);
   this.setState({status:'connected'});
 };

  _onRoomDidDisconnect = ({ roomName, error }) => {
   console.log('[Disconnect]ERROR: ', error);
   this.setState({status:'disconnected'});
 };

  _onRoomDidFailToConnect = error => {
   console.log('[FailToConnect]ERROR: ', error);
   this.setState({status:'disconnected'});
 };

  _onParticipantAddedVideoTrack = ({ participant, track }) => {
   console.log('onParticipantAddedVideoTrack: ', participant, track);

   this.setState({
     videoTracks: new Map([
       ...this.state.videoTracks,
       [
         track.trackSid,
         { participantSid: participant.sid, videoTrackSid: track.trackSid },
       ],
     ]),
   });
 };

  _onParticipantRemovedVideoTrack = ({ participant, track }) => {
   console.log('onParticipantRemovedVideoTrack: ', participant, track);

   const videoTracksLocal = this.state.videoTracks;
   videoTracksLocal.delete(track.trackSid);
   this.setState({videoTracks: videoTracksLocal});
 };
  render() {
    return (
      <View style={{flex: 1,
    backgroundColor: "white",}}>
      {this.state.status === 'disconnected' &&
        <View>
          <Text style={{ fontSize: 30,textAlign: "center",paddingTop: 40,}}>
            React Native Twilio Video
          </Text>
          <TextInput
            style={{ height: 50,borderWidth: 1,marginRight: 70,marginLeft: 70,marginTop: 50,textAlign: "center",backgroundColor: "white",}}
            autoCapitalize='none'
            value={this.state.token}
            onChangeText={(text) => this.setState({token:text})}>
          </TextInput>
          <Button
            title="Connect"
            style={{marginTop: 100}}
            onPress={this._onConnectButtonPress}>
          </Button>
          <Button
            title="createRoom"
            style={{marginTop: 150}}
            onPress={this.createRoom}>
          </Button>
          <Button
            title="Get token"
            style={{marginTop: 150}}
            onPress={this.getToken}>
          </Button>
        </View>
      }
      {(this.state.status === 'connected' || this.state.status === 'connecting') &&
          <View style={{flex: 1,position: "absolute",bottom: 0,top: 0,left: 0,right: 0,}}>
          {this.state.status === 'connected' &&
            <View style={{flex: 1,flexDirection: "row",flexWrap: "wrap",}}>
              {Array.from(this.state.videoTracks, ([trackSid, trackIdentifier]) => {
                  return (
                    <TwilioVideoParticipantView
                      style={{zIndex:1,marginTop: 20,marginLeft: 10,marginRight: 10,width: '100%',height: '100%'}}
                      key={trackSid}
                      trackIdentifier={trackIdentifier}
                    />
                  )
                })
              }
            </View>
          }
          <View
            style={{zIndex:2,position: "absolute",left: 0,bottom: 0,right: 0,height: 100,flexDirection: "row",alignItems: "center",}}>
            <TouchableOpacity
              style={{ width: 60,height: 60,marginLeft: 10,marginRight: 10,borderRadius: 100 / 2,backgroundColor: "grey",justifyContent: "center",alignItems: "center",}}
              onPress={this._onEndButtonPress}>
              <Text style={{fontSize: 12}}>End</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{width: 60,height: 60,marginLeft: 10,marginRight: 10,borderRadius: 100 / 2,backgroundColor: "grey",justifyContent: "center",alignItems: "center",}}
              onPress={this._onMuteButtonPress}>
              <Text style={{fontSize: 12}}>{ this.state.audioEnabled ? "Mute" : "Unmute" }</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{width: 60,height: 60,marginLeft: 10,marginRight: 10,borderRadius: 100 / 2,backgroundColor: "grey",justifyContent: "center",alignItems: "center",}}
              onPress={this._onFlipButtonPress}>
              <Text style={{fontSize: 12}}>Flip</Text>
            </TouchableOpacity>
            <TwilioVideoLocalView
              enabled={true}
              style={{flex: 1,width: 150,height: 250,position: "absolute",right: 10,bottom: 10,}}
            />
          </View>
        </View>
      }

      <TwilioVideo
        ref={ this.twilioRef }
        onRoomDidConnect={ this._onRoomDidConnect }
        onRoomDidDisconnect={ this._onRoomDidDisconnect }
        onRoomDidFailToConnect= { this._onRoomDidFailToConnect }
        onParticipantAddedVideoTrack={ this._onParticipantAddedVideoTrack }
        onParticipantRemovedVideoTrack= { this._onParticipantRemovedVideoTrack }
      />
    </View>
  );}
}
Patients.contextType = DataContext;
