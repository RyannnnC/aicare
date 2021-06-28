import React ,{Component}from 'react';
import { KeyboardAvoidingView,Text,  View, Alert, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput,Platform,ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons,  FontAwesome} from '@expo/vector-icons';
import DataContext from '../../providerContext';
import I18n from '../switchLanguage';
//import Voice from '@react-native-community/voice';
import * as Permissions from "expo-permissions";
import ImageView from 'react-native-image-view';

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
      image:[],
      visible:false,
      name:'',
      gender:'',
      dob:'',
      mobile:'',
      medicareCard:[],
      language:[],
      userId:null,
      infoId:null,
      medicineUsage:[],
      familyHistory:[],
      chronic:[],
      allergy:[],
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
          name:json.medicalInfo.firstName + json.medicalInfo.lastName,
          gender:json.medicalInfo.gender,
          dob:json.medicalInfo.dob,
          mobile:json.medicalInfo.mobile,
          medicareCard:json.medicalInfo.medicareCard,
          language:json.medicalInfo.languages,
          userId:json.medicalInfo.customerUserId,
          infoId:json.medicalInfo.customerUserInfoId,
          patientComment:json.medicalInfo.patientStatement,
          allergy:json.medicalInfo.allergen,
          medicineUsage:json.medicalInfo.medicineUsage,
          familyHistory:json.medicalInfo.familyHistory,
          chronic:json.medicalInfo.chronic,
        })
       let src = {uri: json.medicalInfo.commentImg,}
       let image = []
       let obj = {source:src}
       image.push(obj)
       this.setState({
          image:image
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

  render() {
    if (this.state.isLoading){
      return(
     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
         <ActivityIndicator size="large" color="#00ff00"  />
      </View>
    )
    }else {
    return (
    <KeyboardAvoidingView style={{ flex:1, flexDirection:'row',justifyContent: "center", alignItems: "center" ,backgroundColor:'rgb(51,51,51)'}}
    behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={{height:'91.5%',width:'65%',backgroundColor:'white',borderRadius:5,padding:'2%'}}>
        <Text style={{ fontSize:18, fontWeight: '500',marginTop:10, marginBottom:10}}>{I18n.t('statement')}</Text>
        <View style={{width:'100%',height:'15%',alignItems:'center',flexDirection:'row'}}>
          {this.state.image.map((item) => {
            if (item.uri != null) {
            return(
            <TouchableOpacity style={{height:'100%',width:'30%'}} onPress={() => {this.setState({visible:true})}}>
              <Image
                style={{height:'100%',width:'100%'}}
                source={item.source}
              />
            </TouchableOpacity>
          )}})}
          <Text style={{fontSize:16, fontWeight: '400'}}>{this.state.patientComment}</Text>
        </View>

        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:18, fontWeight: '500'}}>{I18n.t('patientComplaint')}</Text>
        </View>
          <TextInput style={{width:'100%',height:'15%',padding:'2%',borderWidth:1, borderColor:'#bbbbbb',borderRadius:11}}
            value={this.state.complaint}
            onChangeText={(text) => {this.setState({complaint:text})}}
            multiline={true}
          />

        <View style={{flexDirection: 'row', marginBottom:10,marginTop:10}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('diagnosisSuggestion')}</Text>
          {this.state.talk ?
          <TouchableOpacity style={{marginLeft:15}} onPress={() => {//this.stopRecognizing()
          }}>
            <MaterialCommunityIcons name="microphone-off" size={24} color="black" />
          </TouchableOpacity>
          :
          <TouchableOpacity style={{marginLeft:15}} onPress={() => {//this.startRecognizing()
          }}>
            <FontAwesome name="microphone" size={24} color="black" />
          </TouchableOpacity>
          }
        </View>
        <TextInput style={{width:'100%',height:'15%',borderWidth:1, borderColor:'#bbbbbb',borderRadius:11,padding:'2%'}}
          value={this.state.doctorComment}
          onChangeText={(text) => {this.setState({doctorComment:text})}}
          multiline={true}
        />

        <View  style={{ flexDirection:'row',height:'10%',justifyContent: "center", alignItems: "center",marginTop:10,marginBottom:'10%'}}>
          <TouchableOpacity style={{
          width: '55%',
          height: 40,
          backgroundColor: '#68B0AB',
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: "center",
          margin:'2%'}} onPress={() => {
          this.props.navigation.navigate(I18n.t('enote3'),{id: this.state.id,patientComplaint:this.state.complaint,doctorComplaint:this.state.doctorComment})
          }}>
          <Text style={{ fontSize:16, fontWeight: '500', color: '#ffffff' }}>{I18n.t('nextStep')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
          width: '20%',
          height: 40,
          borderColor: '#68B0AB',
          borderWidth:1,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: "center",
          margin:'1%'}} onPress={() => {

          }}>
          <Text style={{ fontSize:16, fontWeight: '500', color: 'black' }}>{I18n.t('referral')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
          width: '20%',
          height: 40,
          borderColor: '#68B0AB',
          borderWidth:1,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: "center",
          margin:'1%'}} onPress={() => {

          }}>
          <Text style={{ fontSize:16, fontWeight: '500', color: 'black' }}>{I18n.t('followup')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ImageView
        images={this.state.image}
        imageIndex={0}
        isVisible={this.state.visible}
        onClose={()=>{this.setState({visible:false})}}
      />
      <View style={{width:'30%',borderRadius:5,padding:'2%'}}>
        <View style={{height:'33%',backgroundColor:'white',borderTopLeftRadius:5,borderTopRightRadius:5,padding:'2%'}}>
          <Text style={{ fontSize:18, fontWeight: '500', color: '#68B0AB' }}>{I18n.t('pInfo')}</Text>
          <Text style={{ fontSize:15, fontWeight: '400',marginTop:'2%' }}>{I18n.t('name')}: {this.state.name}</Text>
          <Text style={{ fontSize:15, fontWeight: '400',marginTop:'2%' }}>{I18n.t('gender')}: {this.state.gender}</Text>
          <Text style={{ fontSize:15, fontWeight: '400',marginTop:'2%' }}>{I18n.t('dateofBirth')}: {this.state.dob}</Text>
          <Text style={{ fontSize:15, fontWeight: '400',marginTop:'2%' }}>{I18n.t('mobile')}: {this.state.mobile}</Text>
          <Text style={{ fontSize:16, fontWeight: '500',marginTop:'2%'}}>{I18n.t('mcInfo')}</Text>
          {this.state.medicareCard ?
            this.state.medicareCard.map((item)=>(
              <View key={item.number}>
                <Text style={{ fontSize:15, fontWeight: '400',marginTop:'2%' }}>{I18n.t('insuranceType')}: {item.category}</Text>
                <Text style={{ fontSize:15, fontWeight: '400',marginTop:'2%' }}>{I18n.t('cardNumber')}: {item.number}</Text>
              </View>
            ))
          :
          <View>
            <Text style={{ fontSize:15, fontWeight: '400',marginTop:'2%' }}>{I18n.t('nomcInfo')}</Text>
          </View>
          }
        </View>
        <View style={{height:'13%',backgroundColor:'white',padding:'3%',marginTop:'2%'}}>
          <Text style={{ fontSize:18, fontWeight: '500', color: '#68B0AB' }}>{I18n.t('allergy')}</Text>
          {this.state.allergy ?
            this.state.allergy.map((item)=>(
              <View key={item.id} style={{flexDirection:'row'}}>
                <Text style={{ fontSize:15, fontWeight: '400',marginTop:'2%' }}>{item.allergen}</Text>
              </View>
            ))
          :
          <View>
            <Text style={{ fontSize:15, fontWeight: '400',marginTop:'2%' }}>{I18n.t('none')}</Text>
          </View>
          }
        </View>
        <View style={{height:'20%',backgroundColor:'white',padding:'3%',marginTop:'2%'}}>
          <Text style={{ fontSize:18, fontWeight: '500', color: '#68B0AB' }}>{I18n.t('mediHis')}</Text>
          {this.state.medicineUsage ?
            this.state.medicineUsage.map((item)=>(
              <View key={item.id} style={{flexDirection:'row'}}>
                <Text style={{ fontSize:15, fontWeight: '400',marginTop:'2%' }}>{item.medicine}</Text>
              </View>
            ))
          :
          <View>
            <Text style={{ fontSize:15, fontWeight: '400',marginTop:'2%' }}>{I18n.t('none')}</Text>
          </View>
          }
        </View>
        <View style={{height:'15%',backgroundColor:'white',padding:'3%',marginTop:'2%'}}>
          <Text style={{ fontSize:18, fontWeight: '500', color: '#68B0AB' }}>{I18n.t('famHis')}</Text>
          {this.state.familyHistory?
            this.state.familyHistory.map((item)=>(
              <View key={item.id} style={{flexDirection:'row'}}>
                <Text style={{ fontSize:15, fontWeight: '400',marginTop:'2%' }}>{item.disease}</Text>
              </View>
            ))
          :
          <View>
            <Text style={{ fontSize:15, fontWeight: '400',marginTop:'2%' }}>{I18n.t('none')}</Text>
          </View>
          }
        </View>
        <View style={{height:'13%',backgroundColor:'white',padding:'3%',borderBottomLeftRadius:5,borderBottomRightRadius:5,marginTop:'2%'}}>
          <Text style={{ fontSize:18, fontWeight: '500', color: '#68B0AB' }}>{I18n.t('chronic')}</Text>
          {this.state.chronic?
            this.state.chronic.map((item)=>(
              <View key={item.id} style={{flexDirection:'row'}}>
                <Text style={{ fontSize:15, fontWeight: '400',marginTop:'2%' }}>{item.chronic}</Text>
              </View>
            ))
          :
          <View>
            <Text style={{ fontSize:15, fontWeight: '400',marginTop:'2%' }}>{I18n.t('none')}</Text>
          </View>
          }
        </View>
      </View>
    </KeyboardAvoidingView>
  );}}
}
Enotes.contextType = DataContext;
