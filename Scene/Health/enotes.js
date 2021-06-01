import React ,{Component}from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput,Platform,ActivityIndicator } from 'react-native';
import {styles} from '../providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons, FontAwesome,AntDesign } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import moment from 'moment-timezone';
import DataContext from '../../providerContext';
import * as Localization from 'expo-localization';
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
  }
  saveReport() {
    let url = 'http://'
    +this.context.url
    +'/aicare-business-api/business/medical-report/save';
      fetch(url,{
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
        'sso-auth-token': this.context.token,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'content-type, sso-auth-token',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE',
      },
        body: JSON.stringify({
          customerUserId : this.state.id,
          customerUserInfoId : 1,
          diagnosisTitle : "report_001",
          type : "远程医疗",
          patientComment : this.state.complaint,
          doctorComment : this.state.doctorComment,
          clinicalConditions : "MAD",
      })
      })
      .then((response) => response.json())
      .then((json) => {
        if (json.code === 0) {
          console.log(json);
        } else {
          console.log(json.msg)
        }
      })
      .then(() => {this.props.navigation.navigate('预约')})
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
    <SafeAreaView style={{ flex:1, justifyContent: "center", alignItems: "center" ,backgroundColor:"white"}}>
      <View style={{width:'90%'}}>
      <ScrollView style={{height:'90%'}}>


        <View style={{flexDirection: 'row',marginBottom:10}}>
            <Text style={{ fontSize:18, fontWeight: '500' , marginRight: 20}}>{I18n.t('currentPatient')}</Text>
        </View>

        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Image
            style = {{width: 20,
            height: 20,
            marginRight:5}}
            source={require('../../images/providerImg/singup_icon_name.png')}
          />
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('name')}</Text>
          <TextInput style={{width:'30%',
          height: 22,
          marginLeft: 5,
          borderBottomWidth:1,
          borderBottomColor:'#EEEEEE'}} placeholder= "Kingsford Clinic"
          value={this.context.name}/>
          <MaterialCommunityIcons name="gender-male-female" size={20} color="black" style={{marginRight:5}}/>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('gender')}</Text>
          <TextInput style={{
            width:'30%',
            height: 22,
            marginLeft: 5,
            borderBottomWidth:1,
            borderBottomColor:'#EEEEEE'}} placeholder= "0403571833"
          value={this.context.phone}/>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <MaterialCommunityIcons name="human-male-child" size={20} color="black" style={{marginRight:5}}/>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('age')}</Text>
          <TextInput style={{width:'30%',
          height: 22,
          marginLeft: 5,
          borderBottomWidth:1,
          borderBottomColor:'#EEEEEE'}} placeholder= "657416708xy@gmail.com"
          value={this.context.email}/>
          <FontAwesome name="calendar-o" size={20} color="black" style={{marginRight:5}}/>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('dateofBirth')}</Text>
          <TextInput
          style={{width:'30%',
          height: 22,
          marginLeft: 5,
          borderBottomWidth:1,
          borderBottomColor:'#EEEEEE'}}
          placeholder= "1001/1 Mooltan Avanue"
          value = {this.context.street}
          />
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

        <View style={{width:'100%', height:250,borderWidth:1, borderColor:'#bbbbbb',borderRadius:11}}>
          <TextInput style={{width:'90%',height:'90%',marginTop:15,marginLeft:20,marginRight:20}}
            placeholder={this.context.intro}
            value={this.state.complaint}
            onChangeText={(text) => {this.setState({complaint:text})}}
            multiline={true}
          />
        </View>

        <View style={{flexDirection: 'row', marginBottom:10}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('diagnosisSuggestion')}</Text>
        </View>
        <View style={{width:'100%', height:150,borderWidth:1, borderColor:'#bbbbbb',borderRadius:11}}>
          <TextInput style={{width:'90%',height:60,marginTop:15,marginLeft:20,marginRight:20}}
            placeholder={this.context.intro}
            value={this.state.doctorComment}
            onChangeText={(text) => {this.setState({doctorComment:text})}}
            multiline={true}
          />
        </View>

      </ScrollView>
      <View  style={{ height:'10%',flex:1, justifyContent: "center", alignItems: "center"}}>
      <TouchableOpacity style={{
        width: '100%',
        height: 40,
        marginTop: 10,
        marginBottom:20,
      backgroundColor: '#68B0AB',
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: "center",}} onPress={() => {
        this.saveReport();
        this.props.navigation.navigate(I18n.t('enote3'),{id: this.state.id,patientComplaint:this.state.complaint})
        }}>
        <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>{I18n.t('nextStep')}</Text>
      </TouchableOpacity>
      </View>
      </View>
    </SafeAreaView>
  );}}
}
Enotes.contextType = DataContext;
