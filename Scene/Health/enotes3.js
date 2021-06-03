import React ,{Component}from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput,Platform,ActivityIndicator } from 'react-native';
import {styles} from '../providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import moment from 'moment-timezone';
import DataContext from '../../providerContext';
import * as Localization from 'expo-localization';
import I18n from '../switchLanguage';

export default class Enotes3 extends Component {
    constructor(props) {
      super(props);
      this.state={
      pressed:false,
      pressed1:false,
      complaint:'',
      doctorComment:'',
      id:null,
      }
    }
  async componentDidMount(){
    this.setState({
      id:this.props.route.params.id,
      complaint:this.props.route.params.patientComplaint});
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

        <View style={{flexDirection: 'row',marginTop:20,marginBottom:10}}>
          <View style={{flexDirection: 'row',width:'50%'}}>
            <Text style={{ fontSize:18, fontWeight: '500' , marginRight: 20}}>{I18n.t('prescription')}</Text>
          </View>
          <View style={{flexDirection: 'row',width:'50%',justifyContent:'flex-end'}}>
            <TouchableOpacity onPress={this.addMedicine}>
              <Image style={{width:20,height:20,borderRadius:40}}
                source = {require('../../images/providerImg/account_icon_add_1.png')}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('medicineName')}</Text>
          <TextInput style={styles.resumeInput} placeholder= "Kingsford Clinic"
          value={this.context.name}
          onChangeText={(text) => {this.context.action.changename(text)}}/>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('dosage')}</Text>
          <TextInput style={styles.resumeInput} placeholder= "0403571833"
          value={this.context.phone}
          onChangeText={(text) => {this.context.action.changephone(text)}}/>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('quantity')}</Text>
          <TextInput style={styles.resumeInput} placeholder= "657416708xy@gmail.com"
          value={this.context.email}
          onChangeText={(text) => {this.context.action.changeemail(text)}}/>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('repeat')}</Text>
          <TextInput style={styles.resumeInput} placeholder= "657416708xy@gmail.com"
          value={this.context.email}
          onChangeText={(text) => {this.context.action.changeemail(text)}}/>
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
              justifyContent: "center",}} onPress={() => {this.saveReport()}}>
              <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>{I18n.t('nextStep')}</Text>
            </TouchableOpacity>
          </View>
      </View>
    </SafeAreaView>
  );}}
}
Enotes3.contextType = DataContext;
