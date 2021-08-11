import React,{ useState,setState,useContext,useEffect }from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch,ScrollView,Modal,FlatList,ActivityIndicator} from 'react-native';
import {styles} from '../style';
import { StackActions } from '@react-navigation/native';
import { CheckBox } from 'react-native-elements';
import DataContext from "../consumerContext";
import I18n from "./language"

export default function Report({route,navigation}) {
  
  const user=useContext(DataContext);
  const [isEnabled, setIsEnabled] = useState(false);
  const [doc, setDoc] = useState({});
  const {appId} = route.params;

  const goBack= () => {
    navigation.dispatch(StackActions.pop(1))
  }
  
  useEffect(() => {
    //console.log(docId);
    let url = "http://"+user.url+"/aicare-customer-api/customer/consultation/query-consultation-info-by-appointment?customerAppointmentId="+appId;
            fetch(url,{
              method: 'GET',
              mode: 'cors',
              credentials: 'include',
              headers: {
              'Accept':       'application/json',
              'Content-Type': 'application/json',
              'sso-auth-token': user.token,
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
              'Access-Control-Allow-Headers': 'content-type, sso-auth-token',
              'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE',
            }})
            .then((response) => response.json())
            .then((json) => {
              if (json.code == 0) {
                //console.log(json);
                //console.log(json.businessEmployer[0]);
                setDoc(json.report);
                console.log(json.report.businessEmployerImg);
                //console.log(json.businessEmployer[0].chargingMethodList[0].value==1);
                //console.log(json.businessEmployer[0].videoChannel)
                //console.log(json);
                //console.log(url);
                //console.log("schedule");
                //console.log(timeSection);
                //console.log(json.code);
                //Alert.alert('查询成功');
              } else {
                console.log(json.msg);
                //console.log(queryId);
                Alert.alert(I18n.t("fail"));
              }
            }).catch(error => console.warn(error));
    },[])
 
  
    const pres = doc.prescription?doc.prescription.map((item) => {
        return (
          <View style={{borderTopWidth:0.7}}>
            <Text style={{ fontSize:12, fontWeight: '300',paddingTop:6 }}>{I18n.t("medicine_name")}：{item.medicineName}</Text>
            <Text style={{ fontSize:12, fontWeight: '300',paddingTop:6 }}>{I18n.t("usage")}：{item.usage}</Text>
            <Text style={{ fontSize:12, fontWeight: '300',paddingTop:6 }}>{I18n.t("dosage")}：{item.dose}</Text>
            <Text style={{ fontSize:12, fontWeight: '300',paddingTop:6 }}>{I18n.t("number_medicine")}：{item.amount}</Text>
            <Text style={{ fontSize:12, fontWeight: '300',paddingTop:6 }}>{I18n.t("repetition")}：{item.repetition}</Text>
            <Text style={{ fontSize:12, fontWeight: '300',paddingTop:6,marginBottom:10 }}>{I18n.t("repeat")}:{item.isRepeat==0?I18n.t("no"):I18n.t("yes")}</Text>

          </View>
        )
      }):null;

  return (
    <View style={{    backgroundColor: 'white',
    marginTop: 0,
    alignItems: 'center'}}>
    <ScrollView>
    <View style={{flexDirection:'row',marginTop:40,marginLeft:10}}>
    <TouchableOpacity onPress = {goBack} style={{marginRight:30}}>
      <Image
        style = {styles.arrow_image}
        source={require('../images/icon/2/Arrow_left.png')}
      />
    </TouchableOpacity>
    <View style={{marginLeft:10}}></View>
    <Text style = {{color:'black',
    fontSize:17,
    marginTop:20,
    marginLeft:40,}}>{I18n.t("health_record")}</Text>
    
    
    </View>
    <View style={{borderBottomColor:"#EEEEEE",width:340,marginLeft:18}}>
        <View style={{marginTop:20, marginBottom:10}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t("overview")}</Text>
        </View>
        
        </View>
    <TouchableOpacity >
    <View style={{ width:'90%',flex:1, justifyContent: "center", alignItems: "center",marginTop:10,zIndex: 1,marginLeft:10}}>
      
          <Image style={{width:60,height:60,borderRadius:40,marginLeft:-200,marginTop:0}}
            source = {doc.businessEmployerImg?{uri:doc.businessEmployerImg}:require("../images/telehealth_icon/service_doctor_img5.png")}
          />
          </View>
        <View style={{shadowColor:"000000",shadowOffset: {
	              width: 0,
	              height: 2,
                },
                shadowOpacity: 0.150,
                shadowRadius: 3.05,

                elevation: 0,marginTop:-60,width:'90%',marginLeft:15,height:200,justifyContent: "center",alignItems: "center",marginBottom:18,borderRadius:30}}>
          <Text style={{ fontSize:18, fontWeight: '600',marginTop:0 }}>   {doc.businessEmployerName}</Text>
          <View style={{flexDirection: 'row',paddingBottom: 15, }}>
            
            <Text style={{fontSize:12, color:'#999999', fontWeight: '400',marginTop:5}}>{doc.orgName}</Text>
          </View>
          <View style={{borderColor:"#EEEEEE",borderTopWidth:1.5,marginTop:-10,width:280}}>
          <Text style={{ fontSize:12, fontWeight: '400',marginTop:13 }}>{I18n.t("slot_doctorinfo")}: {doc.dateOfDiagnosis} </Text>
          <Text style={{ fontSize:12, fontWeight: '400',marginTop:7 }}>{I18n.t("category_type")}: {doc.serviceClass} </Text>
          <View style={{flexDirection:"row"}}>
          <Text style={{ fontSize:12, fontWeight: '400',marginTop:7 }}>{I18n.t("on_clinicinfo")}: {doc.type} </Text>

          </View>
          <Text style={{fontSize:12, fontWeight: '400',paddingTop:6 }}>Presciber{I18n.t("number")}：{doc.prescriberNumber?doc.prescriberNumber:I18n.t("not_fiiled")}</Text>
          <Text style={{fontSize:12, fontWeight: '400',paddingTop:6 }}>{I18n.t("mobile")}：{doc.doctorMobile?doc.doctorMobile:I18n.t("not_fiiled")}</Text>

          </View>
        </View>
        </TouchableOpacity>

        <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:0,width:340,marginLeft:18,}}>
        <View style={{marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t("patient_info")}</Text>
          <Text style={{fontSize:12, fontWeight: '300',paddingTop:6 }}>{I18n.t("name")}：{doc.lastName?doc.lastName:I18n.t("not_fiiled")} {doc.firstName?doc.firstName:"未填写名"}</Text>
          <Text style={{fontSize:12, fontWeight: '300',paddingTop:6 }}>{I18n.t("gender")}：{doc.gender?doc.gender:I18n.t("not_fiiled")}</Text>
          <Text style={{fontSize:12, fontWeight: '300',paddingTop:6 }}>{I18n.t("DOB")}：{doc.dob?doc.dob:I18n.t("not_fiiled")}</Text>
          <Text style={{fontSize:12, fontWeight: '300',paddingTop:6 }}>{I18n.t("medicare_number")}：{doc.medicare?doc.medicare.number:I18n.t("not_fiiled")}</Text>

        </View>
        
        </View>
        <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:0,width:340,marginLeft:18}}>

        <View style={{marginTop:15, marginBottom:10}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t("patient_statement")}</Text>
          <Text style={{fontSize:12, fontWeight: '300',paddingTop:6 }}>{I18n.t("description")}{"："+doc.patientStatement}</Text>
          <Text style={{fontSize:12, fontWeight: '300',paddingTop:6 }}>{I18n.t("files")}{"："}</Text>
          {doc.patientStatementAttachment?
      <Image
      style = {{height:130,width:130,marginTop:14}}
      source={{ uri: doc.patientStatementAttachment }}
 
      />:null
      
      }
        <View style={{marginTop:20, marginBottom:0,borderTopWidth:0.5,}}>
          <Text style={{ fontSize:18, fontWeight: '500',marginTop:15}}>{I18n.t("doctor_diagnosis")}</Text>
          <Text style={{fontSize:12, fontWeight: '300',paddingTop:6 }}>{doc.patientComment}</Text>

        </View>
        </View>
        <View style={{flexDirection: 'row' , marginTop:0, marginBottom:10}}>
        </View>
        </View>
        <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:0,width:340,marginLeft:18}}>
        <View style={{marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t("medical_advice")}</Text>
          <Text style={{fontSize:12, fontWeight: '300',paddingTop:6 }}>{doc.doctorComment}</Text>

        </View>
        <View style={{flexWrap: 'wrap', alignItems: 'flex-start',flexDirection:"row",marginBottom:10}}>
        </View>
        </View>
        <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:0,width:340,marginLeft:18}}>

        <View style={{ marginTop:15, marginBottom:15}}>
          <Text style={{ fontSize:18, fontWeight: '500',marginBottom:10 }}>{I18n.t("prescription")}</Text>
          {pres}
        </View>

        </View>
        

       
        
        
    <TouchableOpacity onPress={()=>user.action.contact()}>
            <Image
                style={{width:60,height:60,marginLeft:300,borderRadius:30,bottom:5,right:10}}
                source = {require("../images/mobile_icon.png")}
            />
    </TouchableOpacity>
    
    
    <View style={{height:100}}></View>

    </ScrollView>
   
  </View>
)}

