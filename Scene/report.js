import React,{ useState,setState,useContext,useEffect }from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch,ScrollView,Modal,FlatList,ActivityIndicator} from 'react-native';
import {styles} from '../style';
import { StackActions } from '@react-navigation/native';
import { CheckBox } from 'react-native-elements';
import DataContext from "../consumerContext";


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
                Alert.alert('查询失败');
              }
            }).catch(error => console.warn(error));
    },[])
 
  
    const pres = doc.prescription?doc.prescription.map((item) => {
        return (
          <View style={{borderTopWidth:0.7}}>
            <Text style={{ fontSize:12, fontWeight: '300',paddingTop:6 }}>药名：{item.medicineName}</Text>
            <Text style={{ fontSize:12, fontWeight: '300',paddingTop:6 }}>用法：{item.usage}</Text>
            <Text style={{ fontSize:12, fontWeight: '300',paddingTop:6 }}>剂量：{item.dose}</Text>
            <Text style={{ fontSize:12, fontWeight: '300',paddingTop:6 }}>数量：{item.amount}</Text>
            <Text style={{ fontSize:12, fontWeight: '300',paddingTop:6 }}>疗程：{item.repetition}</Text>
            <Text style={{ fontSize:12, fontWeight: '300',paddingTop:6,marginBottom:10 }}>是否重复:{item.isRepeat}</Text>

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
    marginLeft:40,}}>电子病历</Text>
    
    
    </View>
    <View style={{borderBottomColor:"#EEEEEE",width:340,marginLeft:18}}>
        <View style={{marginTop:20, marginBottom:10}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>诊断总览</Text>
        </View>
        
        </View>
    <TouchableOpacity onPress={()=>navigation.navigate("docInfo",{orgId:null,docId:doc.businessEmployerId,docType:"全科",address:"bankstown clinics",docName:"Dr ryan",queryId:doc.businessEmployerId})}>
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
          <Text style={{ fontSize:18, fontWeight: '600',marginTop:0 }}>{doc.businessEmployerName}</Text>
          <View style={{flexDirection: 'row',paddingBottom: 15, }}>
            
            <Text style={{fontSize:12, color:'#999999', fontWeight: '400',marginTop:5}}>{doc.orgName}</Text>
          </View>
          <View style={{borderColor:"#EEEEEE",borderTopWidth:1.5,marginTop:-10,width:280}}>
          <Text style={{ fontSize:12, fontWeight: '400',marginTop:13 }}>时间: {doc.dateOfDiagnosis} </Text>
          <Text style={{ fontSize:12, fontWeight: '400',marginTop:7 }}>科目: {doc.serviceClass} </Text>
          <View style={{flexDirection:"row"}}>
          <Text style={{ fontSize:12, fontWeight: '400',marginTop:7 }}>就诊方式: {user.consultWay[doc.type]} </Text>

          </View>
          <Text style={{fontSize:12, fontWeight: '400',paddingTop:6 }}>Presciber号码：{doc.prescriberNumber?doc.prescriberNumber:"未填写"}</Text>
          <Text style={{fontSize:12, fontWeight: '400',paddingTop:6 }}>医生电话：{doc.doctorMobile?doc.doctorMobile:"未填写"}</Text>

          </View>
        </View>
        </TouchableOpacity>

        <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:0,width:340,marginLeft:18,borderTopWidth:0.7}}>
        <View style={{marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>病人信息</Text>
          <Text style={{fontSize:12, fontWeight: '300',paddingTop:6 }}>姓名：{doc.lastName?doc.lastName:"未填写姓"} {doc.firstName?doc.firstName:"未填写名"}</Text>
          <Text style={{fontSize:12, fontWeight: '300',paddingTop:6 }}>性别：{doc.gender?doc.gender:"未填写"}</Text>
          <Text style={{fontSize:12, fontWeight: '300',paddingTop:6 }}>年龄：{doc.age?doc.age:"未填写"}</Text>
          <Text style={{fontSize:12, fontWeight: '300',paddingTop:6 }}>出生日期：{doc.dob?doc.dob:"未填写"}</Text>
          <Text style={{fontSize:12, fontWeight: '300',paddingTop:6 }}>Medicare卡号：{doc.medicare?doc.medicare.number:"未填写"}</Text>

        </View>
        
        </View>
        <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:0,width:340,marginLeft:18}}>

        <View style={{marginTop:15, marginBottom:10}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>病情陈述</Text>
          <Text style={{fontSize:12, fontWeight: '300',paddingTop:6 }}>{"病人描述："+doc.patientStatement}</Text>
          <Text style={{fontSize:12, fontWeight: '300',paddingTop:6 }}>{"附件上传："}</Text>
          {doc.patientStatementAttachment?
      <Image
      style = {{height:130,width:130,marginTop:14}}
      source={{ uri: doc.patientStatementAttachment }}
 
      />:null
      
      }
        <View style={{marginTop:20, marginBottom:0,borderTopWidth:0.5,}}>
          <Text style={{ fontSize:18, fontWeight: '500',marginTop:15}}>病人主诉</Text>
          <Text style={{fontSize:12, fontWeight: '300',paddingTop:6 }}>{doc.patientComment}</Text>

        </View>
        </View>
        <View style={{flexDirection: 'row' , marginTop:0, marginBottom:10}}>
        </View>
        </View>
        <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:0,width:340,marginLeft:18}}>
        <View style={{marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>诊疗意见</Text>
          <Text style={{fontSize:12, fontWeight: '300',paddingTop:6 }}>{doc.doctorComment}</Text>

        </View>
        <View style={{flexWrap: 'wrap', alignItems: 'flex-start',flexDirection:"row",marginBottom:10}}>
        </View>
        </View>
        <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:0,width:340,marginLeft:18}}>

        <View style={{ marginTop:15, marginBottom:15}}>
          <Text style={{ fontSize:18, fontWeight: '500',marginBottom:10 }}>处方信息</Text>
          {pres}
        </View>

        </View>
        <TouchableOpacity style={{backgroundColor: '#8FD7D3',
              padding:10,
              width:200,
              marginLeft:80,
              marginTop:10,
              height:45,
              alignItems: 'center',
              borderRadius:25,}}
              onPress = {()=>Alert.alert("购买成功")}>
        <Text style={{color:"white"}}>一键购买</Text>
      </TouchableOpacity>

       
        
        
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

