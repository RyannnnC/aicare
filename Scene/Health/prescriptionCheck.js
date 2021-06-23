import React ,{Component}from 'react';
import { Image,Text, View, TouchableOpacity,ScrollView,SafeAreaView,ActivityIndicator } from 'react-native';
import DataContext from '../../providerContext';
import I18n from '../switchLanguage';
import moment from 'moment';

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
      dname:'',
      dmobile:'',
      }
    }
  componentDidMount(){
    this.setState({
      id:this.props.route.params.id,
      medicine:this.props.route.params.medicine});
    this.queryPatient();
    this.queryDoctor();
  }

  queryDoctor() {
    let url = 'http://'
    +this.context.url
    +'/aicare-business-api/business/employer/list'
    +'?employerId=' + this.context.employerId;
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
      .then((json) => {
        this.setState({isLoading:false})
        if (json.code === 0) {
          console.log(json.msg);
          this.setState({
            dname:json.employerInfo.name,
            dmobile:json.employerInfo.mobile,
          })
        } else {
          console.log(json.msg)
        }
      }).catch(error => console.warn(error));
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
          name:json.medicalInfo.firstName + json.medicalInfo.lastName,
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
      usage:this.state.medicine[i].usage,
      isRepeat:this.state.medicine[i].isRepeat,
      repetition:this.state.medicine[i].times,
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
        this.finish()
      })
      .catch(error => console.warn(error));
  }

  finish(){
    this.setState({isLoading:true});
    let url = 'http://'
    +this.context.url
    +'/aicare-business-api/business/appointment/complete?'
    +'id=' + this.props.route.params.id;
      fetch(url,{
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
        'sso-auth-token': this.context.token,
        'sso-refresh-token': this.context.refresh_token,
      },
      })
      .then((response) => response.json())
      .then((json) => {
        if (json.code === 0) {
          alert('完成成功')
        } else {
          console.log(json.msg)
        }
        this.setState({isLoading:false})
      })
     .then(() => {
        this.props.navigation.navigate(I18n.t('finish'))
      })
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
      let medicine = []
      if (this.state.medicine.length >0) {
      medicine = this.state.medicine.map((item) => {
        return (
          <View key = {item.id} style={{flexDirection:'row',width:'90%'}}>
          <View style={{alignItems:'center',justifyContent:'center',width:'65%',margin:'5%',height:100,borderRadius:10,backgroundColor:'#EBEBEB'}}>
            <Text style={{ color: 'black', fontSize: 18, fontWeight: '500'}}>{item.name}</Text>
            <Text style={{ color: '#696969', fontSize: 15, fontWeight: '400'}}>{I18n.t('usage')}：{item.usage}</Text>
          </View>
          <View style={{width:'30%',margin:'6%'}}>
              <Image
                style={{width:'100%',height:100}}
                resizeMode='stretch'
                source={require('../../images/providerImg/barcode.png')}
              />
          </View>
        </View>
        )
      })}
    return (
    <SafeAreaView style={{ flex:1,height:'100%',width:'100%', justifyContent: "center", alignItems: "center" ,backgroundColor:'rgb(51,51,51)'}}>
      <View style={{height:'95%',width:'95%',flexDirection:'row',justifyContent: "center",backgroundColor:"white",borderRadius:5}}>
        <ScrollView style={{height:'95%',width:'25%',borderRightWidth:1,margin:'2%'}}>
          <Text style={{ fontSize:20, fontWeight: '500', color: '#68B0AB' }}>{I18n.t('docInfo')}</Text>
          <Text style={{ fontSize:16, fontWeight: '400',marginTop:'5%' }}>{I18n.t('name')}: {this.state.dname}</Text>
          <Text style={{ fontSize:16, fontWeight: '400',marginTop:'5%' }}>Prescribe Number: 80225873</Text>
          <Text style={{ fontSize:16, fontWeight: '400',marginTop:'5%' }}>{I18n.t('mobile')}: {this.state.dmobile}</Text>
          <Text style={{ fontSize:16, fontWeight: '400',marginTop:'5%' }}>{I18n.t('address')}: 9 Park Road Hurstvile NSW 2220</Text>
          <Text style={{ fontSize:20, fontWeight: '500',marginTop:'5%'}}>{I18n.t('diagnosisSuggestion')}:</Text>
          <Text style={{ fontSize:16, fontWeight: '400',marginTop:'5%' }}>{this.props.route.params.doctorComplaint}</Text>
          <Text style={{ fontSize:20, fontWeight: '500',marginTop:'5%'}}>{I18n.t('patientComplaint')}:</Text>
          <Text style={{ fontSize:16, fontWeight: '400',marginTop:'5%' }}>{this.props.route.params.patientComplaint}</Text>
        </ScrollView>
        <View style={{height:'95%',width:'25%',borderRightWidth:1,marginTop:'2%',marginBottom:'2%',marginRight:'2%'}}>
          <Text style={{ fontSize:20, fontWeight: '500', color: '#68B0AB' }}>{I18n.t('pInfo')}</Text>
          <Text style={{ fontSize:16, fontWeight: '400',marginTop:'5%' }}>{I18n.t('name')}: {this.state.name}</Text>
          <Text style={{ fontSize:16, fontWeight: '400',marginTop:'5%' }}>{I18n.t('gender')}: {this.state.gender}</Text>
          <Text style={{ fontSize:16, fontWeight: '400',marginTop:'5%' }}>{I18n.t('dateofBirth')}: {this.state.dob}</Text>
          <Text style={{ fontSize:16, fontWeight: '400',marginTop:'5%' }}>{I18n.t('mobile')}: {this.state.mobile}</Text>
          <Text style={{ fontSize:20, fontWeight: '500',marginTop:'5%'}}>{I18n.t('mcInfo')}</Text>
          {this.state.medicareCard ?
            this.state.medicareCard.map((item)=>(
              <View>
                <Text style={{ fontSize:16, fontWeight: '400',marginTop:'5%' }}>{I18n.t('insuranceType')}: {item.category}</Text>
                <Text style={{ fontSize:16, fontWeight: '400',marginTop:'5%' }}>{I18n.t('cardNumber')}: {item.number}</Text>
              </View>
            ))
          :
          <View>
            <Text style={{ fontSize:16, fontWeight: '400',marginTop:'5%' }}>{I18n.t('nomcInfo')}</Text>
          </View>
          }

        </View>
        <View style={{height:'95%',width:'40%',marginRight:'1%',marginLeft:'1%',marginTop:'2%',marginBottom:'2%'}}>
          <Text style={{ fontSize:20, fontWeight: '500', color: '#68B0AB'}}>{I18n.t('presInfo')}</Text>
          <Text style={{ fontSize:16, fontWeight: '400', marginTop:'5%' }}>{I18n.t('preNumber')}: 01{new Date().getFullYear().toString()}{new Date().getMonth().toString()}{new Date().getDate().toString()}</Text>
          <Text style={{ fontSize:16, fontWeight: '400',marginTop:'5%'}}>{I18n.t('bookingDate')}: {moment(new Date()).format('L')}</Text>
          <ScrollView
                  style={{flex:1,width:'100%',maxHeight:'60%',marginTop:'5%'}}
                  >
          {this.state.medicine.length>0 ? medicine
          :
            <View style={{alignItems:'center',justifyContent:'center',width:'90%',height:100,borderRadius:10,backgroundColor:'#EBEBEB'}}>
              <Text style={{fontSize: 16, fontWeight: '400'}}>{I18n.t('nomedi')}</Text>
            </View>
          }
        </ScrollView>
        <View  style={{ height:'10%', width:'80%',margin:'10%',justifyContent: "center", alignItems: "center"}}>
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
        </View>
      </View>

    </SafeAreaView>
  );}}
}
PrescriptionCheck.contextType = DataContext;
