import React ,{Component}from 'react';
import {Modal,ActivityIndicator,ScrollView,Text, View,  Image,TouchableOpacity,SafeAreaView,TextInput } from 'react-native';
import {styles} from '../providerStyle';
import DataContext from '../../providerContext';
import I18n from '../switchLanguage';

export default class BasicInformation extends Component {
  constructor(props) {
    super(props);
    this.state={
    name:'',
    gender:'',
    dob:'',
    mobile:'',
    address:'',
    email:'',
    address:'',
    category:null,
    cardNumber:null,
    cardHolder:'',
    historyMedicalRecords:[],
    customerAppointmentId:null,
    visible:false,
    mtype:'',
    mpcomment:'',
    mdcomment:'',
    mdate:'',
    mclass:'',
    mdoctor:'',
    mclinic:'',
    }
  }

  async componentDidMount(){
    if(this.props.route.params.appointmentId != null) {
      this.setState({customerAppointmentId:this.props.route.params.appointmentId});
    }
    this.queryPatient()
  }

  queryPatient() {
    this.setState({isLoading:true})
    let url = 'http://'
    +this.context.url
    +'/aicare-business-api/business/medical-report/query-medical-info-by-appointment'
    +'?customerAppointmentId='+ this.props.route.params.appointmentId;
    fetch(url,{
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
      'Accept': 'application/json',
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
          email:json.medicalInfo.email,
          address:json.medicalInfo.address,
          infoId:json.medicalInfo.customerUserInfoId,
          allergy:json.medicalInfo.allergen,
          medicineUsage:json.medicalInfo.medicineUsage,
          familyHistory:json.medicalInfo.familyHistory,
          chronic:json.medicalInfo.chronic,
          historyMedicalRecords:json.medicalInfo.historyMedicalRecords,
        })
        if(json.medicalInfo.medicareCard!=null){
          this.setState({
            category:json.medicalInfo.medicareCard[0].category,
            cardNumber:json.medicalInfo.medicareCard[0].number,
            cardHolder:json.medicalInfo.medicareCard[0].firstName + json.medicalInfo.medicareCard[0].lastName,
          })
        }
      } else if (json.code == 10011) {
        this.loggedin(json.msg)
      } else {
        alert(json.msg)
      }
    })
    .catch(error => console.warn(error));
  }

  render() {
    if (this.state.isLoading){
      return(
     <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor:'rgb(51,51,51)' }}>
         <ActivityIndicator size="large" color="white"  />
      </View>
    )}else {
      return (
    <SafeAreaView style={{ flex:1,height:'100%', justifyContent: "center", alignItems: "center" , backgroundColor:'rgb(51,51,51)'}}>
      <ScrollView style={{ flex:1, width:'90%',height:'100%',backgroundColor:'white'}}
      contentContainerStyle={{alignItems:'center'}}>
      <View style={{width:'90%',flexDirection: 'row',marginTop:'2%'}}>
        <Image
          style = {{width:20,height:20,marginTop:2}}
          source={require('../../images/providerImg/dzbl-B1.png')}
        />
        <Text style={{ marginLeft:'1%',fontSize:22, fontWeight: '600' ,color: 'rgb(32,191,195)'}}>{I18n.t('bi')}</Text>
      </View>
      <View style={{width:'90%',flexDirection: 'row',marginTop:'1%'}}>
        <View style={{width:'45%'}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('name')}:  {this.state.name}</Text>
        </View>
        <View style={{width:'45%'}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('email')}:  {this.state.email}</Text>
        </View>
      </View>
      <View style={{width:'90%',flexDirection: 'row'}}>
        <View style={{width:'45%'}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('gender')}: {this.state.gender}</Text>
        </View>
        <View style={{width:'45%'}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('address')}: {this.state.address}</Text>
        </View>
      </View>
      <View style={{width:'90%',flexDirection: 'row'}}>
        <View style={{width:'45%'}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('dateofBirth')}: {this.state.dob}</Text>
        </View>
        <View style={{width:'45%'}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('mobile')}: {this.state.mobile}</Text>
        </View>
      </View>
      <View style={{width:'90%',borderColor:'#EEEEEE',borderBottomWidth:1,marginTop:'1%'}}/>
      <View style={{width:'90%',flexDirection: 'row',marginTop:'1%'}}>
        <Text style={{color:'rgb(32,191,195)', fontSize:20, fontWeight: '500' }}>{I18n.t('mcInfo')}</Text>
      </View>
        {this.state.category ?
          <View style={{width:'90%'}}>
            <View style={{width:'30%'}}>
              <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('insuranceType')}: {this.state.category}</Text>
            </View>
            <View style={{width:'30%'}}>
              <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('cardNumber')}: {this.state.cardNumber}</Text>
            </View>
            <View style={{width:'30%'}}>
              <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('cardHolder')}: {this.state.cardHolder}</Text>
            </View>
          </View>
            :
          <View style={{width:'90%',flexDirection: 'row'}}>
            <Text style={{ fontSize:16, fontWeight: '400',marginTop:'5%' }}>{I18n.t('nomcInfo')}</Text>
          </View>
        }
        <View style={{width:'90%',borderColor:'rgb(32,191,195)',borderBottomWidth:1,marginTop:'2%'}}/>
        <View style={{width:'90%',flexDirection: 'row',marginTop:'2%',marginBottom:'1%'}}>
          <Image
            style = {{width:20,height:20,marginTop:2}}
            source={require('../../images/providerImg/dzbl-B2.png')}
          />
          <Text style={{marginLeft:'1%', fontSize:22, fontWeight: '600' ,color: 'rgb(32,191,195)'}}>{I18n.t('allergy')}</Text>
        </View>
        {this.state.allergy ?
          this.state.allergy.map((item)=>(
            <View key={item.id} style={{width:'90%',flexDirection:'row'}}>
              <Text style={{ fontSize:16, fontWeight: '400' }}>{item.allergen}</Text>
            </View>
          ))
        :
        <View>
          <Text style={{ fontSize:16, fontWeight: '400'}}>{I18n.t('none')}</Text>
        </View>
        }
        <View style={{width:'90%',borderColor:'rgb(32,191,195)',borderBottomWidth:1,marginTop:'2%'}}/>
        <View style={{width:'90%',flexDirection: 'row',marginTop:'2%',marginBottom:'1%'}}>
          <Image
            style = {{width:20,height:20,marginTop:2}}
            source={require('../../images/providerImg/dzbl-B3.png')}
          />
          <Text style={{marginLeft:'1%',  fontSize:22, fontWeight: '600' ,color: 'rgb(32,191,195)'}}>{I18n.t('mediHis')}</Text>
        </View>
        {this.state.medicineUsage ?
          this.state.medicineUsage.map((item)=>(
            <View key={item.id} style={{width:'90%',flexDirection:'row'}}>
              <Text style={{ fontSize:16, fontWeight: '400' }}>{item.medicine}</Text>
            </View>
          ))
        :
        <View>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('none')}</Text>
        </View>
        }
        <View style={{width:'90%',borderColor:'rgb(32,191,195)',borderBottomWidth:1,marginTop:'2%'}}/>
        <View style={{width:'90%',flexDirection: 'row',marginTop:'2%',marginBottom:'1%'}}>
          <Image
            style = {{width:20,height:20,marginTop:2}}
            source={require('../../images/providerImg/dzbl-B4.png')}
          />
          <Text style={{ marginLeft:'1%', fontSize:22, fontWeight: '600' ,color: 'rgb(32,191,195)'}}>{I18n.t('famHis')}</Text>
        </View>
        {this.state.familyHistory?
          this.state.familyHistory.map((item)=>(
            <View key={item.id} style={{width:'90%',flexDirection:'row'}}>
              <Text style={{ fontSize:16, fontWeight: '400' }}>{item.disease}</Text>
            </View>
          ))
        :
        <View>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('none')}</Text>
        </View>
        }
        <View style={{width:'90%',borderColor:'rgb(32,191,195)',borderBottomWidth:1,marginTop:'2%'}}/>
        <View style={{width:'90%',flexDirection: 'row',marginTop:'2%',marginBottom:'1%'}}>
        <Image
          style = {{width:20,height:20,marginTop:2}}
          source={require('../../images/providerImg/dzbl-B6.png')}
        />
          <Text style={{ marginLeft:'1%', fontSize:22, fontWeight: '600' ,color: 'rgb(32,191,195)'}}>{I18n.t('chronic')}</Text>
        </View>
        {this.state.chronic?
          this.state.chronic.map((item)=>(
            <View key={item.id} style={{width:'90%',flexDirection:'row'}}>
              <Text style={{ fontSize:16, fontWeight: '400' }}>{item.chronic}</Text>
            </View>
          ))
        :
        <View>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('none')}</Text>
        </View>
        }
        <View style={{width:'90%',borderColor:'rgb(32,191,195)',borderBottomWidth:1,marginTop:'2%'}}/>
        <View style={{width:'90%',flexDirection: 'row',marginTop:'2%',marginBottom:'1%'}}>
          <Image
            style = {{width:20,height:20,marginTop:2}}
            source={require('../../images/providerImg/dzbl-B7.png')}
          />
          <Text style={{marginLeft:'1%',  fontSize:22, fontWeight: '600' ,color: 'rgb(32,191,195)'}}>{I18n.t('historyRecord')}</Text>
        </View>
        {this.state.historyMedicalRecords.length>0?
          this.state.historyMedicalRecords.map((item)=>(
            <TouchableOpacity key={item.reportId} style={{width:'90%',flexDirection:'row',backgroundColor:'#ececec',margin:'1%',padding:'2%'}}
            onPress={() => {
              this.setState({
                mtype:item.serviceTypeName,
                mpcomment:item.patientComment,
                mdcomment:item.doctorComment,
                mdoctor:item.businessEmployerName,
                mdate:item.dateOfDiagnosis.substring(0,10),
                mclinic:item.orgName,
                mclass:item.serviceClassName,
              })
              this.setState({visible:true})
            }}>
            <View style={{width:'30%'}}>
              <Text style={{ fontSize:16, fontWeight: '400' }}>{item.dateOfDiagnosis!=null && item.dateOfDiagnosis.substring(0,10)}</Text>
            </View>
            <View style={{width:'60%'}}>
              <Text style={{ fontSize:16, fontWeight: '400' }}>{item.doctorComment}</Text>
            </View>
            <View style={{width:'10%'}}>
              <Text style={{ color:'#696969',fontSize:16, fontWeight: '400' }}>{I18n.t('detail')}</Text>
            </View>
            </TouchableOpacity>
          ))
        :
        <View>
          <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('none')}</Text>
        </View>
        }
      </ScrollView>
      <Modal
        transparent={true}
        visible={this.state.visible}
        onRequestClose={() => this.setState({visible:false})}
      >
      <TouchableOpacity
      style={{alignItems:'center',justifyContent:'center',width:'100%',height:'100%',backgroundColor:'rgba(0, 0, 0, 0.5)'}}
      onPress={() => this.setState({visible:false})}>
        <View style={{alignItems:'center',width:'65%',height:'70%',backgroundColor:'white',borderRadius:5,borderWidth:2,borderColor:'rgb(33,192,196)'}}>
          <View style={{width:'90%',flexDirection:'row',marginTop:'5%'}}>
            <Text style={{ fontSize:22, fontWeight: '600' ,color: 'rgb(32,191,195)'}}>{this.state.mclass}</Text>
          </View>
          <View style={{width:'90%',flexDirection:'row'}}>
            <View style={{width:'50%'}}>
              <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('date')}: {this.state.mdate}</Text>
            </View>
            <View style={{width:'50%'}}>
              <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('serviceType')}: {this.state.mtype}</Text>
            </View>
          </View>
          <View style={{width:'90%',flexDirection:'row'}}>
            <View style={{width:'50%'}}>
              <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('dt')}: {this.state.mdoctor}</Text>
            </View>
            <View style={{width:'50%'}}>
              <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('cl')}: {this.state.mclinic}</Text>
            </View>
          </View>
          <View style={{width:'90%',borderBottomWidth:1,marginTop:'2%'}}/>
          <View style={{width:'90%',flexDirection: 'row',marginTop:'2%',marginBottom:'1%'}}>
            <Text style={{ fontSize:22, fontWeight: '600' ,color: 'rgb(32,191,195)'}}>{I18n.t('patientComplaint')}</Text>
          </View>
          <View style={{width:'90%',flexDirection:'row'}}>
            <Text style={{ fontSize:16, fontWeight: '400' }}>{this.state.mpcomment}</Text>
          </View>
          <View style={{width:'90%',borderBottomWidth:1,marginTop:'2%'}}/>
          <View style={{width:'90%',flexDirection: 'row',marginTop:'2%',marginBottom:'1%'}}>
            <Text style={{ fontSize:22, fontWeight: '600' ,color: 'rgb(32,191,195)'}}>{I18n.t('diagnosisSuggestion')}</Text>
          </View>
          <View style={{width:'90%',flexDirection:'row'}}>
            <Text style={{ fontSize:16, fontWeight: '400' }}>{this.state.mdcomment}</Text>
          </View>
        </View>
      </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  )}}
}
BasicInformation.contextType = DataContext;
