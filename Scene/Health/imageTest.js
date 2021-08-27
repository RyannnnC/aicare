import React ,{Component}from 'react';
import { KeyboardAvoidingView,Text,  View, Alert, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput,Platform,ActivityIndicator } from 'react-native';
import DataContext from '../../providerContext';
import I18n from '../switchLanguage';
import * as Permissions from "expo-permissions";
import ImageView from 'react-native-image-view';
import { CheckBox } from 'react-native-elements';


export default class Radiology extends Component {
    constructor(props) {
      super(props);
      this.newRef = React.createRef();
      this.state={
      id:null,
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
      medicine:[],
      dname:'',
      dmobile:'',
      pn:'',
      daddress:'',
      er:'',
      ich:'',
      fast:0,
      canscroll:true,
      }
    }

  async componentDidMount(){
      this.setState({id:this.props.route.params.id});
      if(this.props.route.params.er != null) {
        this.setState({er:this.props.route.params.er});
      }
      if(this.props.route.params.ich != null) {
        this.setState({ich:this.props.route.params.ich});
      }
      this.queryPatient();
      this.queryDoctor();
  }

  handleSignature = signature => {
    this.setState({signature:signature})
    const path = FileSystem.cacheDirectory + 'sign.png';
    FileSystem.writeAsStringAsync(path, signature.replace('data:image/png;base64,', ''), {encoding: FileSystem.EncodingType.Base64})
    .then(res => {
      FileSystem.getInfoAsync(path, {size: true, md5: true}).then(file => {
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
    + this.context.url
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
          this.setState({
            dname:json.employerInfo.name,
            dmobile:json.employerInfo.mobile,
            pn:json.employerInfo.prescriberNumber,
          })
          if(json.employerInfo.address!=null){
            this.setState({
              daddress:json.employerInfo.address
            })
          }
        } else {
          alert(json.msg)
        }
      }).catch(error => console.warn(error));
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
      } else {
        console.log(json.msg)
      }
    })
    .catch(error => console.warn(error));
  }


  loggedin(msg) {
    Alert.alert(
      '',
      msg,
      [
        {text: '确定', onPress: () => {this.context.action.logout()}},
      ],
      {
        cancelable: false
      }
    );
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
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex:1,justifyContent: "center", alignItems: "center" ,backgroundColor:'rgb(51,51,51)'}}>
      <View style={{flex:1,alignItems:'center',height:'100%',width:'95%',backgroundColor:'white',borderRadius:5}}>
        <ScrollView style={{flex:1,width:'90%'}} scrollEnabled={this.state.canscroll}>
          <View style={{marginTop:'5%',width:'100%',alignItems:'center',flexDirection:'row',height:200,justifyContent:'space-between'}}>
            <View style={{width:'47.5%',height:'100%',borderWidth:2,borderColor:'rgb(33,192,196)'}}>
              <View style={{justifyContent:'center',width:'100%',height:'15%',backgroundColor:'rgb(33,192,196)'}}>
                <Text style={{color:'white',marginLeft:'5%'}}>{I18n.t('pInfo')}</Text>
              </View>
              <View style={{alignItems:'center',justifyContent:'center',width:'100%',height:'90%',flexDirection:'row'}}>
                <View style={{justifyContent:'center',padding:'1%',width:'47.5%',height:'90%',borderRightWidth:1,borderColor:'#EEEEEE'}}>
                  <Text style={{ fontSize:15, fontWeight: '400',marginTop:'1%' }}>{I18n.t('name')}: {this.state.name}</Text>
                  <Text style={{ fontSize:15, fontWeight: '400',marginTop:'1%' }}>{I18n.t('gender')}: {this.state.gender}</Text>
                  <Text style={{ fontSize:15, fontWeight: '400',marginTop:'1%' }}>{I18n.t('dateofBirth')}: {this.state.dob}</Text>
                  <Text style={{ fontSize:15, fontWeight: '400',marginTop:'1%' }}>{I18n.t('mobile')}: {this.state.mobile}</Text>
                </View>
                <View style={{justifyContent:'center',padding:'1%',width:'47.5%',height:'90%'}}>
                {this.state.medicareCard ?
                  this.state.medicareCard.map((item)=>(
                    <View key={item.number}>
                      <Text style={{ fontSize:15, fontWeight: '400',marginTop:'1%' }}>{I18n.t('insuranceType')}: {item.category}</Text>
                      <Text style={{ fontSize:15, fontWeight: '400',marginTop:'1%' }}>{I18n.t('cardNumber')}: {item.number}</Text>
                      <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('cardHolder')}: {item.cardHolder}</Text>
                    </View>
                  ))
                :
                <View>
                  <Text style={{ fontSize:15, fontWeight: '400',marginTop:'2%' }}>{I18n.t('nomcInfo')}</Text>
                </View>
                }
                </View>
              </View>
            </View>
            <View style={{width:'47.5%',height:'100%',borderWidth:2,borderColor:'rgb(33,192,196)'}}>
              <View style={{justifyContent:'center',width:'100%',height:'15%',backgroundColor:'rgb(33,192,196)'}}>
                <Text style={{color:'white',marginLeft:'5%'}}>{I18n.t('docInfo')}</Text>
              </View>
              <View style={{alignItems:'center',justifyContent:'center',width:'100%',height:'90%',flexDirection:'row'}}>
                <View style={{justifyContent:'center',padding:'1%',width:'47.5%',height:'90%',borderRightWidth:1,borderColor:'#EEEEEE'}}>
                  <Text style={{ fontSize:16, fontWeight: '400',marginTop:'1%' }}>{I18n.t('name')}: {this.state.dname}</Text>
                  <Text style={{ fontSize:16, fontWeight: '400',marginTop:'1%' }}>{I18n.t('mobile')}: {this.state.dmobile}</Text>
                  <Text numberOfLines={1} style={{ fontSize:16, fontWeight: '400',marginTop:'1%' }}>{I18n.t('cl')}: </Text>
                  <Text numberOfLines={1} style={{ fontSize:16, fontWeight: '400',marginTop:'1%' }}>{I18n.t('address')}: {this.state.daddress}</Text>
                </View>
                <View style={{justifyContent:'center',padding:'1%',width:'47.5%',height:'90%'}}>
                  <Text style={{ fontSize:16, fontWeight: '400',marginTop:'1%' }}>Prescribe Number: {this.state.pn}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{marginTop:'5%',width:'100%',alignItems:'center',flexDirection:'row',height:900,justifyContent:'space-between'}}>
            <View style={{width:'100%',height:'100%',borderWidth:2,borderColor:'rgb(33,192,196)'}}>
              <View style={{alignItems:'center',justifyContent:'center',width:'100%',height:'5%',backgroundColor:'rgb(33,192,196)'}}>
                <Text style={{color:'white',marginLeft:'5%',fontSize:20,fontWeight:'500'}}>{I18n.t('checkList')}</Text>
              </View>
              <View style={{width:'100%',height:'95%',alignItems:'center'}}>
                <View style={{width:'90%'}}>
                <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
                  <Text style={{color:'rgb(33,192,196)',fontSize:20, fontWeight: '500'}}>{I18n.t('examR')}</Text>
                </View>
                  <TextInput style={{width:'100%',height: 250,padding:'2%',borderWidth:1, borderColor:'#bbbbbb',borderRadius:5}}
                    value={this.state.er}
                    onChangeText={(text) => {this.setState({er:text})}}
                    multiline={true}
                  />
                  <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
                    <Text style={{color:'rgb(33,192,196)',fontSize:20, fontWeight: '500'}}>{I18n.t('clinicalHis')}</Text>
                  </View>
                    <TextInput style={{width:'100%',height: 250,padding:'2%',borderWidth:1, borderColor:'#bbbbbb',borderRadius:5}}
                      value={this.state.ich}
                      onChangeText={(text) => {this.setState({ich:text})}}
                      multiline={true}
                    />
                    <View  style={{ marginTop: 20,height:40, width:'100%',justifyContent: "center", alignItems: "center"}}>
                    <TouchableOpacity style={{
                      width: '100%',
                      height: 40,
                      marginBottom:20,
                      backgroundColor: 'rgb(33,192,196)',
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: "center",}} onPress={() => {
                        this.props.navigation.navigate(I18n.t('enote'),{er:this.state.er,ich:this.state.ich})
                      }}>
                      <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>{I18n.t('confirmation')}</Text>
                    </TouchableOpacity>
                    </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );}}
}
Radiology.contextType = DataContext;
