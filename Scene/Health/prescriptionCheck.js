import React ,{Component,useRef}from 'react';
import { Button,Image,Text, View, TouchableOpacity,ScrollView,SafeAreaView,ActivityIndicator } from 'react-native';
import DataContext from '../../providerContext';
import I18n from '../switchLanguage';
import moment from 'moment';
import SignatureScreen from 'react-native-signature-canvas';
import * as FileSystem from 'expo-file-system';
import ViewShot from "react-native-view-shot";
import * as Print from 'expo-print';
import {WebView } from 'react-native-webview';

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
      address:'',
      date:moment(new Date()).format('ll'),
      sn:new Date().getFullYear()*1000000 + (new Date().getMonth()+1)*10000+new Date().getDate()*100+Math.floor(Math.random() * 100),
      category:null,
      cardNumber:null,
      pdfuri:null,
      language:[],
      userId:null,
      infoId:null,
      dname:'',
      dmobile:'',
      pn:0,
      uri:null,
      signature:null,
      html:``,
      style:`.m-signature-pad {
            font-size: 15px;
            width: 280px;
            height: 150px;
            border: 1px solid #e8e8e8;
            background-color: #fff;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.08) inset;
          }
          .m-signature-pad--footer {
            position: absolute;
            left: 20px;
            right: 10px;
            bottom: 20px;
            height: 40px;
          }`
      }
      this.onCapture = this.onCapture.bind(this);
      this.refs = React.createRef();
    }
  componentDidMount(){
    this.setState({
      id:this.props.route.params.id,
      medicine:this.props.route.params.medicine});
    this.queryPatient();
    this.queryDoctor();
  }

   async renderHtml() {
    let medicine=''
    for(let i =0;i<this.state.medicine.length;i++){
      medicine = medicine + '<tr>'
      medicine = medicine + '<td>'
      medicine = medicine + '<span style="font-size:16px">'
      medicine = medicine + this.state.medicine[i].name
      medicine = medicine + '</span><br><small>'
      medicine = medicine + this.state.medicine[i].usage
      medicine = medicine + '</small><br><small>'
      if (this.state.medicine[i].isRepeat =='1') {
        medicine = medicine + ' Quantity: '
        medicine = medicine + this.state.medicine[i].times
        medicine = medicine + ' Repeats'
      }
      medicine = medicine + '</small></td>'
      medicine = medicine + '</tr>'
    }
    let html=`
    <body style="margin-top:20px;
  background:#eee;">
  <div>
     <div style="margin-top:20px;
     background: #f0f3f4;">
        <div style="background: #fff;
        padding: 20px">
           <div style="margin: 0 -20px;
           background: #f0f3f4;
           padding: 20px">
              <div style="display: table-cell;
              width: 1%;padding-right: 20px">
             <address class="m-t-5 m-b-5">
                <strong class="text-inverse">${this.state.dname}</strong><br>
                ${this.state.address}<br>
                Phone: ${this.state.dmobile}<br>
                <br>
                Prescribe Number: ${this.state.pn}
             </address>
          </div>
          <div style="display: table-cell;
            width: 1%;padding-right: 20px">
               <address class="m-t-5 m-b-5">
                  <strong style="font-size: 16px;
                  font-weight: 600">${this.state.name}</strong><br>
                Gender: ${this.state.gender}<br>
                Phone: ${this.state.mobile}<br>
                Medicare No: ${this.state.cardNumber}
             </address>
          </div>
          <div style="display: table-cell;
            width: 1%;text-align: right;
            padding-left: 20px">
               <small>Prescription</small>
               <div>${this.state.date}</div>
             <div class="invoice-detail">
                #${this.state.sn}<br>
             </div>
          </div>
       </div>
       <div style="margin-bottom: 20px">
            <div  style="margin-bottom: 20px">
								 <table>
	                   <thead style="border: 1px solid; font-size: 20px">
                      <tr>
                         <th>Medicine Detail</th>
                      </tr>
                   </thead>
                   <tbody style="border: 1px solid #ccc; font-size: 16px">
                      ${medicine}
                   </tbody>
                </table>
          </div>
       </div>
       <div>
        <img src=${this.state.signature} width="300" height="250"/>
       </div>
       <div style="border-top: 1px solid #ddd;
         padding-top: 10px;
         font-size: 10px">
          <p class="text-center m-b-5 f-w-600">
             THANK YOU FOR YOUR BUSINESS
          </p>
          <p class="text-center">
             <span class="m-r-10"> https://www.aicare.ai/</span><br>
             <span class="m-r-10"> Tel:(+61)421326182</span><br>
             <span class="m-r-10"> chriding@aicare.ai</span>
          </p>
       </div>
    </div>
 </div>
</div>
    `
    this.setState({html:html})
    try {
        const { uri } = await Print.printToFileAsync({ html:html });
        this.setState({pdfuri:uri});
    } catch (err) {
        console.error(err);
    }
    let data = new FormData();
    data.append('filename', 'prescriptionPDF');
    data.append('file', {
      uri: this.state.pdfuri,
      name: 'prescriptionPDF.pdf',
      type: 'pdf'
    });
    data.append('appointmentId',this.props.route.params.id);
    let url = 'http://'
        +this.context.url
        +'/aicare-business-api/business/message/save-send-chief-complaint';
       fetch(url,{
         method: 'POST',
         mode: 'cors',
         credentials: 'include',
         headers: {
         'Content-Type': 'multipart/form-data',
         'sso-auth-token': this.context.token,
         'sso-refresh-token': this.context.refresh_token,
       },
         body: data
       })
       .then((response) => response.json())
       .then((json) => {
         if (json.code === 0) {
           alert("pdf提交成功");
           console.log(json.msg);
         } else {
           alert('pdf提交失败');
           console.log(json.msg);
         }
       });
  }
  onCapture () {
    this.refs.viewShot.capture().then(uri =>{
      console.log("do something with ", uri);
      this.setState({uri:uri})
    })
  }

  handleSignature = signature => {
    console.log(signature);
    this.setState({signature:signature})
    const path = FileSystem.cacheDirectory + 'sign.png';
    FileSystem.writeAsStringAsync(path, signature.replace('data:image/png;base64,', ''), {encoding: FileSystem.EncodingType.Base64})
    .then(res => {
      console.log(res);
      FileSystem.getInfoAsync(path, {size: true, md5: true}).then(file => {
        console.log(file);
      })
    }).catch(err => {
      console.log("err", err);
    })
  };

  handleClear = () => {
    this.setState({signature:null})
    console.log('clear')
  }

  handleConfirm = () => {
    console.log("end");
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
            pn:json.employerInfo.prescriberNumber,
          })
          if(json.employerInfo.address!=null){
            this.setState({
              address:json.employerInfo.address
            })
          }
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
          language:json.medicalInfo.languages,
          userId:json.medicalInfo.customerUserId,
          infoId:json.medicalInfo.customerUserInfoId,
        })
        if(json.medicalInfo.medicareCard!=null){
          this.setState({
            category:json.medicalInfo.medicareCard[0].category,
            cardNumber:json.medicalInfo.medicareCard[0].number,
          })
        }
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
        console.log(json.msg)
      } else {
        console.log(json.msg)
      }
    })
    .catch(error => console.warn(error));
  }

  saveReport() {
    if(this.state.signature == null){
      alert('Please Save your Signature')
      return false;
    }
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
          this.renderHtml()
          console.log(json.msg)
        } else {
          console.log(json.msg)
        }
      })
     .then(() => {
        this.finish()
      })
      .catch(error => console.warn(error));
  }

  finish(){
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
          console.log(json.msg)
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

  /*  <WebView
      allowFileAccess={true}
      style={{width:200,height:300}}
      source={{html : this.state.html}}
      onMessage={this.onMessage}
    >
    </WebView>*/

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
          <View style={{alignItems:'center',justifyContent:'center',width:'75%',margin:'5%',height:100,borderRadius:10,backgroundColor:'#EBEBEB'}}>
            <Text style={{ color: 'black', fontSize: 18, fontWeight: '500'}}>{item.name}</Text>
            <Text style={{ color: '#696969', fontSize: 15, fontWeight: '400'}}>{I18n.t('usage')}：{item.usage}</Text>
          </View>
        </View>
        )
      })}
    return (
    <SafeAreaView style={{ flex:1,height:'100%',width:'100%', justifyContent: "center", alignItems: "center" ,backgroundColor:'rgb(51,51,51)'}}>
      <ViewShot ref="viewShot" onCapture={this.onCapture} options={{ format: "jpg", quality: 0.9 }} style={{height:'95%',width:'95%',flexDirection:'row',justifyContent: "center",backgroundColor:"white",borderRadius:5}}>
        <ScrollView style={{height:'95%',width:'25%',borderRightWidth:1,margin:'2%'}}>
          <Text style={{ fontSize:20, fontWeight: '500', color: '#68B0AB' }}>{I18n.t('docInfo')}</Text>
          <Text style={{ fontSize:16, fontWeight: '400',marginTop:'5%' }}>{I18n.t('name')}: {this.state.dname}</Text>
          <Text style={{ fontSize:16, fontWeight: '400',marginTop:'5%' }}>Prescribe Number: {this.state.pn}</Text>
          <Text style={{ fontSize:16, fontWeight: '400',marginTop:'5%' }}>{I18n.t('mobile')}: {this.state.dmobile}</Text>
          <Text style={{ fontSize:16, fontWeight: '400',marginTop:'5%' }}>{I18n.t('address')}: 9 Park Road Hurstvile NSW 2220</Text>
          <Text style={{ fontSize:20, fontWeight: '500',marginTop:'5%'}}>{I18n.t('diagnosisSuggestion')}:</Text>
          <Text style={{ fontSize:16, fontWeight: '400',marginTop:'5%' }}>{this.props.route.params.doctorComplaint}</Text>
          <Text style={{ fontSize:20, fontWeight: '500',marginTop:'5%'}}>{I18n.t('patientComplaint')}:</Text>
          <Text style={{ fontSize:16, fontWeight: '400',marginTop:'5%' }}>{this.props.route.params.patientComplaint}</Text>
        </ScrollView>
        <ScrollView style={{height:'95%',width:'25%',borderRightWidth:1,marginTop:'2%',marginBottom:'2%',marginRight:'2%'}}>
          <Text style={{ fontSize:20, fontWeight: '500', color: '#68B0AB' }}>{I18n.t('pInfo')}</Text>
          <Text style={{ fontSize:16, fontWeight: '400',marginTop:'5%' }}>{I18n.t('name')}: {this.state.name}</Text>
          <Text style={{ fontSize:16, fontWeight: '400',marginTop:'5%' }}>{I18n.t('gender')}: {this.state.gender}</Text>
          <Text style={{ fontSize:16, fontWeight: '400',marginTop:'5%' }}>{I18n.t('dateofBirth')}: {this.state.dob}</Text>
          <Text style={{ fontSize:16, fontWeight: '400',marginTop:'5%' }}>{I18n.t('mobile')}: {this.state.mobile}</Text>
          <Text style={{ fontSize:20, fontWeight: '500',marginTop:'5%'}}>{I18n.t('mcInfo')}</Text>
          {this.state.category ?
            <View>
              <Text style={{ fontSize:16, fontWeight: '400',marginTop:'5%' }}>{I18n.t('insuranceType')}: {this.state.category}</Text>
              <Text style={{ fontSize:16, fontWeight: '400',marginTop:'5%' }}>{I18n.t('cardNumber')}: {this.state.cardNumber}</Text>
            </View>
          :
          <View>
            <Text style={{ fontSize:16, fontWeight: '400',marginTop:'5%' }}>{I18n.t('nomcInfo')}</Text>
          </View>
          }
        </ScrollView>
        <ScrollView style={{height:'95%',width:'40%',marginRight:'1%',marginLeft:'1%',marginTop:'2%',marginBottom:'2%'}}>
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
        <Text style={{marginTop:20, fontSize:20, fontWeight: '500', color: '#68B0AB'}}>{I18n.t('esign')}</Text>
        <View style={{width:'90%',height:250}}>
          <SignatureScreen
            ref="sig"
            onOK={this.handleSignature}
            onEmpty={this.handleEmpty}
            onClear={this.handleClear}
            descriptionText='Please Sign Above'
            clearText="Clear"
            confirmText="Save"
            webStyle={this.state.style}
          />
        </View>
        <View  style={{ height:'10%', width:'80%',margin:'10%',justifyContent: "center", alignItems: "center"}}>
          <TouchableOpacity style={{
            width: '100%',
            height: 40,
            marginTop: 10,
            marginBottom:20,
            backgroundColor: '#68B0AB',
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: "center",}}
            onPress={()=>this.saveReport()}>
            <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>{I18n.t('nextStep')}</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </ViewShot>

    </SafeAreaView>
  );}}
}
PrescriptionCheck.contextType = DataContext;
