import React ,{Component}from 'react';
import { Modal,Text, View, TouchableOpacity,ScrollView,SafeAreaView,TextInput,ActivityIndicator } from 'react-native';
import {styles} from '../providerStyle';
import DataContext from '../../providerContext';
import I18n from '../switchLanguage';
import { CheckBox } from 'react-native-elements';

export default class PrescriptionCheck extends Component {
    constructor(props) {
      super(props);
      this.state={
      id:null,
      medicine:[],
      result:[],
      isLoading:false,
      name:'',
      gender:'',
      dob:'',
      mobile:'',
      medicareCard:[],
      language:[],
      userId:null,
      infoId:null,
      }
    }
  componentDidMount(){
    this.setState({
      id:this.props.route.params.id,
      medicine:this.props.route.params.medicine});
    this.queryPatient()
  }

  queryPatient() {
    this.setState({isLoading:true})
    let url = 'http://'
    +this.context.url
    +'/aicare-business-api/business/medical-report/query-medical-info-by-appointment'
    +'?customerAppointmentId='+ this.props.route.params.id;
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
      this.setState({isLoading:false})
      if (json.code === 0) {
        this.setState({
          name:json.medicalInfo.name,
          gender:json.medicalInfo.gender,
          dob:json.medicalInfo.dob,
          mobile:json.medicalInfo.mobile,
          medicareCard:json.medicalInfo.medicareCard,
          language:json.medicalInfo.languages,
          userId:json.medicalInfo.customerUserId,
          infoId:json.medicalInfo.customerUserInfoId,
        })
      } else {
        console.log(json.msg)
      }
    })
    .catch(error => console.warn(error));
  }

  modifyMedicine(rid){
    for (let i =0; i<this.state.medicine.length;i++)
    this.state.result.push({
      medicalReportId:rid,
      customerUserId:this.state.userId,
      customerUserInfoId: this.state.infoId,
      medicineDataId: this.state.medicine[i].id,
      isRepeat:this.state.medicine[i].isRepeat,
      repetition:this.state.medicine[i].usage,
    })
  }

  savePrescription(rid) {
    this.modifyMedicine(rid);
    console.log(this.state.result)
    let url = 'http://'
    +this.context.url
    +'/aicare-business-api/business/medical-report/save-prescription'
    fetch(url,{
      method: 'POST',
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
    },
    body: JSON.stringify(this.state.result),
    })
    .then((response) => response.json())
    .then((json) => {
      if (json.code === 0) {
        alert('提交药品成功')
      } else {
        console.log(json.msg)
      }
    })
    .catch(error => console.warn(error));
  }

  saveReport() {
    this.setState({isLoading:true});
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
        'sso-refresh-token': this.context.refresh_token,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'content-type, sso-auth-token',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE',
      },
        body: JSON.stringify({
          customerUserId : this.state.userId,
          customerUserInfoId : this.state.infoId,
          customerAppointmentId:this.props.route.params.id,
          type : "远程医疗",
          patientComment : this.props.route.params.patientComplaint,
          doctorComment : this.props.route.params.doctorComplaint,
      })
      })
      .then((response) => response.json())
      .then((json) => {
        if (json.code === 0) {
          this.savePrescription(json.reportId)
          alert('提交成功')
        } else {
          console.log(json.msg)
        }
        this.setState({isLoading:false})
      })
     .then(() => {
        this.props.navigation.navigate('预约')
      })
      .catch(error => console.warn(error));
  }


  render() {
    let medicine = []
    if (this.state.medicine.length >0) {
    medicine = this.state.medicine.map((item) => {
      return (
        <View key = {item.id}style={{alignItems:'center',justifyContent:'center',width:'90%',margin:'5%',height:100,borderRadius:10,backgroundColor:'#EBEBEB'}}>
          <Text style={{ color: 'black', fontSize: 24, fontWeight: '600'}}>{item.name}</Text>
          <Text style={{ color: '#696969', fontSize: 16, fontWeight: '400'}}>用法用量：{item.usage}</Text>
        </View>
      )
    })}
    if (this.state.isLoading){
      return(
     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
         <ActivityIndicator size="large" color="#00ff00"  />
      </View>
    )
    }else {
      let medicine = []
      if (this.state.medicine.length >0) {
      medicine = this.state.medicine.map((item) => {
        return (
          <View key = {item.id} style={{alignItems:'center',justifyContent:'center',width:'90%',margin:'5%',height:100,borderRadius:10,backgroundColor:'#EBEBEB'}}>
            <Text style={{ color: 'black', fontSize: 21, fontWeight: '600'}}>{item.name}</Text>
            <Text style={{ color: '#696969', fontSize: 16, fontWeight: '400'}}>用法用量：{item.usage}</Text>
          </View>
        )
      })}
    return (
    <SafeAreaView style={{ flex:1, justifyContent: "center", alignItems: "center" ,backgroundColor:"white"}}>
      <View style={{height:'85%',width:'95%',flexDirection:'row',justifyContent: "center",marginTop:'5%'}}>
        <View style={{height:'90%',width:'28%',borderRightWidth:1}}>
          <Text style={{ fontSize:20, fontWeight: '500', color: '#68B0AB' }}>医生信息</Text>
          <Text style={{ fontSize:18, fontWeight: '500',marginTop:'5%' }}>{I18n.t('name')}:</Text>
          <Text style={{ fontSize:18, fontWeight: '500',marginTop:'5%' }}>Prescriber No.</Text>
        </View>
        <View style={{height:'90%',width:'28%',borderRightWidth:1,marginLeft:'4%'}}>
          <Text style={{ fontSize:20, fontWeight: '500', color: '#68B0AB' }}>病人信息</Text>
          <Text style={{ fontSize:18, fontWeight: '500',marginTop:'5%' }}>{I18n.t('name')}: {this.state.name}</Text>
          <Text style={{ fontSize:18, fontWeight: '500',marginTop:'5%' }}>{I18n.t('gender')}: {this.state.gender}</Text>
          <Text style={{ fontSize:18, fontWeight: '500',marginTop:'5%' }}>{I18n.t('dateofBirth')}: {this.state.dob}</Text>
          <Text style={{ fontSize:18, fontWeight: '500',marginTop:'5%' }}>{I18n.t('mobile')}: {this.state.mobile}</Text>
          {this.state.medicareCard &&
          <View>
            <Text style={{ fontSize:18, fontWeight: '500',marginTop:'5%' }}>{I18n.t('insuranceType')}: {this.state.medicareCard.category}</Text>
            <Text style={{ fontSize:18, fontWeight: '500',marginTop:'5%' }}>{I18n.t('cardNumber')}: {this.state.medicareCard.number}</Text>
          </View>
          }
        </View>
        <View style={{height:'90%',width:'40%'}}>
          <Text style={{ fontSize:20, fontWeight: '500', color: '#68B0AB',marginLeft:'5%' }}>处方信息</Text>
          {this.state.medicine.length>0 ? medicine
          :
            <View style={{alignItems:'center',justifyContent:'center',width:'90%',height:100,borderRadius:10,backgroundColor:'#EBEBEB',margin:'5%'}}>
              <Text style={{fontSize: 16, fontWeight: '400'}}>暂无药品，请添加</Text>
            </View>
          }
        </View>
      </View>
      <View  style={{ height:'10%', width:'80%',justifyContent: "center", alignItems: "center"}}>
        <TouchableOpacity style={{
            width: '100%',
            height: 40,
            marginTop: 10,
            marginBottom:20,
            backgroundColor: '#68B0AB',
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: "center",}} onPress={() => {
              this.saveReport()
            }}>
            <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>{I18n.t('nextStep')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );}}
}
PrescriptionCheck.contextType = DataContext;
