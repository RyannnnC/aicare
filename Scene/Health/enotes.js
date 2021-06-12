import React ,{Component}from 'react';
import { KeyboardAvoidingView,Text,  View, Alert, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput,Platform,ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons,  FontAwesome} from '@expo/vector-icons';
import DataContext from '../../providerContext';
import I18n from '../switchLanguage';
//import Voice from '@react-native-community/voice';
import * as Permissions from "expo-permissions";

export default class Enotes extends Component {
    constructor(props) {
      super(props);
  //    Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
  //    Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
  //    Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
      this.state={
      pressed:false,
      pressed1:false,
      complaint:'',
      doctorComment:'',
      patientComment:'',
      id:null,
      talk:false,
      hasAudioPermission: null,
      }
    }
  onSpeechStartHandler = (e) => {
    //Invoked when .start() is called without error
    console.log('onSpeechStart: ', e);
  };

  onSpeechResultsHandler = (e) => {
    //Invoked when SpeechRecognizer is finished recognizing
    console.log('onSpeechResults: ', e);
    this.setState({complaint:e.value});
  };

  onSpeechEndHandler = (e) => {
    //Invoked when SpeechRecognizer stops recognition
    console.log('onSpeechEnd: ', e);
  };

  async componentDidMount(){
      this.setState({id:this.props.route.params.id});
      const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
      this.setState({ hasAudioPermission: status === "granted" });
      this.queryPatient();
  }

  queryPatient() {
    let url = 'http://'
    +this.context.url
    +'/aicare-business-api/business/medical-report/query-medical-info-by-appointment'
    +'?customerAppointmentId='+this.props.route.params.id ;
    fetch(url,{
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json',
      'sso-auth-token': this.context.token,
      'sso-refresh-token': this.context.refresh_token,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Headers': 'content-type, sso-auth-token',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE',
    }})
    .then((response) => response.json())
    .then((json) => {
      if (json.code === 0) {
        this.setState({
          image:json.medicalInfo.commentImg,
          patientComment:json.medicalInfo.patientComment,
        })
      } else {
        console.log(json.msg)
      }
    })
    .catch(error => console.warn(error));
  }

  async startRecognizing() {
    //Starts listening for speech for a specific locale
    try   {
      await Voice.start('en-US');
      this.setState({
        complaint:[],
        talk:true,
      });
    }   catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };
  async stopRecognizing()  {
    //Stops listening for speech
    try {
      await Voice.stop();
      this.setState({
        talk:false,
      });
    } catch (e) {
      console.error(e);
    }
  };
    /*
        <View style={{marginTop:15}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('emRecord')}</Text>
        </View>
        <TouchableOpacity style={{flexDirection: 'row', marginTop:10, marginBottom:10}} onPress={() => {this.setState({pressed:!this.state.pressed})}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('basicMedicalHistory')}</Text>
          <AntDesign name="down" size={18} color="black" />
        </TouchableOpacity>
       {this.state.pressed &&
        <View>
        <TouchableOpacity style={{flexDirection: 'row', marginTop:10, marginBottom:10}} onPress={() => {this.setState({pressed:!this.state.pressed})}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('orginfo')}</Text>
          <AntDesign name="down" size={18} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', marginTop:10, marginBottom:10}} onPress={() => {this.setState({pressed:!this.state.pressed})}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('personalRecord')}</Text>
          <AntDesign name="down" size={18} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', marginTop:10, marginBottom:10}} onPress={() => {this.setState({pressed:!this.state.pressed})}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('personalMedicine')}</Text>
          <AntDesign name="down" size={18} color="black" />
        </TouchableOpacity>
        </View>
        }
        <TouchableOpacity style={{flexDirection: 'row', marginTop:10, marginBottom:10}} onPress={() => {this.setState({pressed1:!this.state.pressed})}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('historyRecord')}</Text>
          <AntDesign name="down" size={18} color="black" />
        </TouchableOpacity>*/
  render() {
    if (this.state.isLoading){
      return(
     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
         <ActivityIndicator size="large" color="#00ff00"  />
      </View>
    )
    }else {
    return (
    <KeyboardAvoidingView style={{ flex:1, justifyContent: "center", alignItems: "center" ,backgroundColor:"white"}}
    behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <SafeAreaView style={{flex:1,width:'90%'}}>
      <ScrollView style={{height:'90%'}}>

        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:18, fontWeight: '500'}}>{I18n.t('patientComplaint')}</Text>
        </View>
        <View style={{width:'100%', height:200,borderWidth:1, borderColor:'#bbbbbb',borderRadius:11}}>
          <Text style={{margin:'5%',fontSize:16, fontWeight: '400'}}>{this.state.patientComment}</Text>
        </View>

        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:18, fontWeight: '500'}}>{I18n.t('patientComplaint')}</Text>
          {this.state.talk ?
            <TouchableOpacity onPress={() => {this.stopRecognizing()}}>
              <MaterialCommunityIcons name="microphone-off" size={24} color="black" />
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => {this.startRecognizing()}}>
              <FontAwesome name="microphone" size={24} color="black" />
            </TouchableOpacity>
          }
        </View>

        <View style={{width:'100%', height:200,borderWidth:1, borderColor:'#bbbbbb',borderRadius:11}}>
          <TextInput style={{width:'90%',height:'90%'}}
            value={this.state.complaint}
            onChangeText={(text) => {this.setState({complaint:text})}}
            multiline={true}
          />
        </View>

        <View style={{flexDirection: 'row', marginBottom:10,marginTop:10}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('diagnosisSuggestion')}</Text>
        </View>
        <View style={{width:'100%', height:200,borderWidth:1, borderColor:'#bbbbbb',borderRadius:11,marginBottom:50}}>
          <TextInput style={{width:'90%',height:'90%'}}
            value={this.state.doctorComment}
            onChangeText={(text) => {this.setState({doctorComment:text})}}
            multiline={true}
          />
        </View>

      </ScrollView>
      <View  style={{ height:'10%',flex:1, justifyContent: "center", alignItems: "center",marginTop:10,marginBottom:'10%'}}>
      <TouchableOpacity style={{
        width: '100%',
        height: 40,
        backgroundColor: '#68B0AB',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: "center",}} onPress={() => {
        this.props.navigation.navigate(I18n.t('enote3'),{id: this.state.id,patientComplaint:this.state.complaint,doctorComplaint:this.state.doctorComment})
        }}>
        <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>{I18n.t('nextStep')}</Text>
      </TouchableOpacity>
      </View>
        <View style={{ flex : 1 }} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );}}
}
Enotes.contextType = DataContext;
