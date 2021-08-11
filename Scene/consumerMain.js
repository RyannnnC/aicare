
import React,{useContext, useEffect,useState} from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity, FlatList,Platform,AsyncStorage,Modal} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {styles} from '../style';
import DataContext from "../consumerContext";
import moment from 'moment-timezone';
import * as Localization from 'expo-localization';
import I18n from "./language"
import ChatBot from 'react-native-chatbot-expo';

export default function ProviderMain({navigation}) {
    
    const [len, setLen] = useState(0)
    const [order,setOrder]=useState([]);
    const [rec,setRec]=useState(-1);
    const goToOrder= () => {
        navigation.navigate("consumerOrder")
    }
    const gotoOlist=()=>{
      navigation.navigate("ConsumerOrderPage")
    }
    const goToTelehealth= () => {
      console.log(user.token);
      if(checkToken()){
        Alert.alert(
          I18n.t("login_notice"),
          I18n.t("login_notice_text"),
          [
            {text:I18n.t("cancel"),
              onPress:()=>console.log("cancel redirect"),
              style:"cancel"
          },{
            text:I18n.t("go_login"),
            onPress:()=>removeToken()

          }
          
        ]
        )
        return;
      }
      navigation.navigate("telehealthMain")
  }
  const steps = [
    {
      id: '0',
      message: 'Welcome to react chatbot!',
      trigger: '1',
    },
    {
      id: '1',
      message: 'Bye!',
      end: true,
    },
  ];
  
    const checkToken=()=>{
      if (user.token==-1){
        return true
      }else{
        return false
      }
    }
    const removeToken=async() =>{
      try {
        await AsyncStorage.removeItem("token");
        //await AsyncStorage.removeItem("firsttime");
    
        console.log("Remove token success");
        user.action.clearstate();
      } catch (error) {
        console.log("Something went wrong", error);
    
      }
    }
  const goVaccine= () => {
    console.log(user.token)
    if(checkToken()){
      Alert.alert(
        I18n.t("login_notice"),
          I18n.t("login_notice_text"),
          [
            {text:I18n.t("cancel"),
              onPress:()=>console.log("cancel redirect"),
              style:"cancel"
          },{
            text:I18n.t("go_login"),
            onPress:()=>removeToken()

        }
        
      ]
      )
      return;
    }
    Alert.alert(
      I18n.t("vaccine_notice"),
      I18n.t("vaccine_text"),      
      [
        {
          text: I18n.t("cancel"),
          onPress: () => console.log(user.token),
          style: "cancel"
        },
        { text: I18n.t("confirm_cancel"), onPress :()=>{
        if(Platform.OS==="ios"){
          navigation.navigate("telehealthClinic",{return:"",type:true,doctype:7,state:"NSW"})//navigation.navigate("telehealthSub",{docType:7})
        }else{
          navigation.navigate("telehealthClinic",{return:"",type:true,doctype:7,state:"NSW"})
        }
         }} //this should navigate to the login page
      ],
      { cancelable: false }
      )
    
}
  const goSomewhere=(index)=>{
    if(checkToken()){
      Alert.alert(
        I18n.t("login_notice"),
          I18n.t("login_notice_text"),
          [
            {text:I18n.t("cancel"),
              onPress:()=>console.log("cancel redirect"),
              style:"cancel"
          },{
            text:I18n.t("go_login"),
            onPress:()=>removeToken()

        }
        
      ]
      )
      return;
    }
    navigation.navigate("telehealthClinic",{return:"",type:true,doctype:index,state:"NSW"})
  }
  const user = useContext(DataContext);
  const [visible,setVisible]=useState(user.ad);

  useEffect(() => {
    getting();
    let poll = setInterval(() => {
      getting();
    }, 5000);
    setRec(poll);
  return()=>clearInterval(poll)
    
            //
            /**/
    },[])
  
    const getting=()=>{
      var today = new Date();
    var month =(today.getMonth()+1);
    if (month<10){
      month = ('0' + month).slice(-2)
    }
    var day = today.getDate();
    if (day<10){
      day = ('0' + day).slice(-2)

    }
    var date = today.getFullYear()+'-'+month+'-'+day;
            let url2 = "http://"+user.url+"/aicare-customer-api/customer/user/query-appointment?appointDate="+date+"&dateFlg=1";
            fetch(url2,{
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
                //this.setState({query:json.page})
                //setLen(json.page.length)
                setOrder(json.page);
                //Alert.alert('查询成功');
                //console.log(json.page)
                //console.log("查询成功");
                //console.log(json.page[0].deptId)
                console.log(order[0].deptId)
              } else {
                console.log(json.msg);
                //Alert.alert('查询失败');
              }
            }).catch(error => console.warn(error));
            

    }

    
   
      const getToken =async() => {
        console.log("getting")
        try {
          let userData = await AsyncStorage.getItem("token");
          
          console.log(userData);
          //let id = await AsyncStorage.getItem("id");
          /*if(id) {
            this.setState({employerId:JSON.parse(id)});
            console.log("Get id success");
          }*/
          if(userData){
            console.log(userData);
          }
        } catch (error) {
          console.log("Something went wrong", error);
        }
      }
  const getDate=(date)=>{
    var date=new Date(Date.parse(date));
    date.setDate(date.getDate() + 1)
    var today = new Date();
    if (today== date){
      return I18n.t("today")
    }
    date=date.toLocaleDateString().slice(5,);
    return date;
    }

    const gotoOrderPage=()=>{
      navigation.navigate("订单")
    }
    var date = new Date();
    var day = new Date().getDay();
    var month = new Date().getMonth() + 1;
    var icon = null;
    if (day==1){
      icon = require('../images/emotion1.png');
    } else if (day==2){
      icon = require('../images/emotion2.png');
    }else if (day==3){
      icon = require('../images/emotion3.png');
    }else if (day==4){
      icon = require('../images/emotion4.png');
    }else{
      icon = require("../images/emotion5.png");
    }
    return (
      <View style={{ flex:1, justifyContent: "center", alignItems: "center" ,paddingTop: 40,backgroundColor:"white"}}>
        <ScrollView style={{ flex:1}}>

        <View style={{flexDirection: 'row', marginBottom: 15,marginTop:85}}>
          <View style={{marginLeft:15, marginRight:10}}>
            <Text style={{ color: '#006A71', fontSize: 24, fontWeight: '600'}} >{I18n.strftime(date, "%b %d")}</Text>
            {/*<Text>您今日有{len}项订单</Text>*/}
            <Text style={{fontSize:12,marginTop:5}}>{I18n.t('aitext_homepage')}</Text>
          </View>
          <TouchableOpacity onPress={()=>Alert.alert(I18n.t("updating_module"))}>
          <Image
            style = {{height:70,width:70,marginTop:-10}}
            source = {require('../images/Group.png')}
          />
          </TouchableOpacity>
        </View>

      <View style={{textAlign: "left",marginBottom:8,marginTop:25 }}>
        <Text style={{ color: '#333333', fontSize: 19,marginLeft:8, fontWeight: '500'}}>{I18n.t('myservice_homepage')}</Text>
      </View>

      <View style={styles.buttons}>
        
      <TouchableOpacity style={{marginTop:12,marginLeft:-2}} onPress={goToTelehealth}>
          <Image
          style = {{width:110,height:110}}
          source = {user.language=="en"?require("../images/appointment_eng.png"):require('../images/appointment.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:14,marginLeft:5}} onPress={goVaccine}>
          <View style={{marginTop:-3,marginLeft:-6}}>
          <Image
          style = {{width:110,height:110}}
          source = {user.language=="en"?require("../images/vaccine_eng.png"):require('../images/vaccine.png')}
          />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={{marginTop:14,marginLeft:5}} onPress={()=>navigation.navigate("reservation")}>
          <View style={{marginTop:-3,marginLeft:-6}}>
          <Image
          style = {{width:110,height:110}}
          source = {user.language=="en"?require("../images/covid_test_s_e.png"):require('../images/covid_test_s.png')}
          />
          </View>
        </TouchableOpacity>
        {/*<TouchableOpacity style={{marginTop:12,marginLeft:10}} onPress={alertHandler}>
          <Image
          style = {{width:106,height:106}}
          source = {require('../images/vaccine/telehealth_consumer_icon/home_service_block2.png')}
          />
        </TouchableOpacity>*/}
        
      </View>
      <View style={styles.buttons}>
        
      <TouchableOpacity style={{marginTop:-5,marginLeft:-2}} onPress={()=>{
         if(checkToken()){
          Alert.alert(
            I18n.t("login_notice"),
            I18n.t("login_notice_text"),
            [
              {text:I18n.t("cancel"),
                onPress:()=>console.log("cancel redirect"),
                style:"cancel"
            },{
              text:I18n.t("go_login"),
              onPress:()=>removeToken()
  
            }
            
          ]
          )
          return;
        }
        console.log(user.customerUserInfoId);navigation.navigate("资料收集");}}>
          <Image
          style = {{width:110,height:110}}
          source = {user.language=="en"?require("../images/telehealth.png"):require('../images/now.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity style={{marginTop:-5,marginLeft:-2}} onPress={()=>{
           if(checkToken()){
            Alert.alert(
              I18n.t("login_notice"),
              I18n.t("login_notice_text"),
              [
                {text:I18n.t("cancel"),
                  onPress:()=>console.log("cancel redirect"),
                  style:"cancel"
              },{
                text:I18n.t("go_login"),
                onPress:()=>removeToken()
    
              }
              
            ]
            )
            return;
          }
          navigation.navigate("healthRecord");}}>
          <Image
          style = {{width:110,height:110}}
          source = {user.language=="en"?require("../images/record_eng.png"):require('../images/record.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:-5,marginLeft:-2}} onPress={()=>{
            if(checkToken()){
              Alert.alert(
                I18n.t("login_notice"),
                I18n.t("login_notice_text"),
                [
                  {text:I18n.t("cancel"),
                    onPress:()=>console.log("cancel redirect"),
                    style:"cancel"
                },{
                  text:I18n.t("go_login"),
                  onPress:()=>removeToken()
                }                
              ]
              )
              return;
            }
            navigation.navigate("prescription");}}>
          <Image
          style = {{width:110,height:110}}
          source = {user.language=="en"?require("../images/pres_eng.png"):require('../images/pres.png')}
          />
        </TouchableOpacity>
        
        
        
      </View>
        <View style={{textAlign: "left",marginTop:15,marginBottom:8 }}>
          <Text style={{ color: '#333333', marginLeft:8,fontSize: 19, fontWeight: '500',marginBottom:8}}>{I18n.t('myappointment_homepage')}</Text>
        </View>
      <TouchableOpacity onPress ={gotoOrderPage}>
      {order[0]?
      <View style={styles.home}>
        <View style={{flexDirection: 'row', borderBottomColor:'#EEEEEE',borderBottomWidth:1, marginTop:21, paddingBottom:10}}>
          <View style={{marginLeft:20,width:220 }}>
            <Text style={{ color: '#333333', fontSize: 16, fontWeight: '500', marginBottom:5}}>{moment(order[0].appointDate).tz(Localization.timezone).format('DD/MM')} {order[0].startTime?order[0].startTime.slice(0,5) + " - "+order[0].endTime.slice(0,5):null}</Text>
            <Text style={{ color: '#666666', fontSize: 12, fontWeight: '300'}}>{order[0].deptId+1?I18n.t("ordertype_homepage")+I18n.t("types")[order[0].deptId]+"。":null}</Text>
          </View>
        
        <Image
          style = {styles.img3}
          source = {require('../images/crayon-892.png')}
          />
        </View>
        <View style={{flexDirection: 'row', marginTop:10}}>
          <Text style={{fontSize:12, color:'#999999', fontWeight: '400',marginLeft:20}}>{order[0].businessEmployerName+" - "+order[0].orgName}</Text>
        </View>
        <View style={{height:10}}></View>
    </View>:<View style={styles.home}><View style={{flexDirection: 'row', borderBottomColor:'#EEEEEE',borderBottomWidth:1, marginTop:21, paddingBottom:10}}>
          <View style={{marginLeft:20,marginTop:0,width:200 }}>
            <Text style={{ color: '#333333', fontSize: 12, fontWeight: '400', marginBottom:5}}>{I18n.t("no_appointment1")}</Text>
          </View>
          <Image
          style = {styles.img3}
          source = {require('../images/crayon-892.png')}
          />
        
        </View>
        <View style={{flexDirection: 'row', marginTop:10}}>
          <Text style={{fontSize:12, color:'#333333', fontWeight: '400',marginLeft:20}}>{I18n.t("no_appointment2")}</Text>
        </View>
        <View style={{height:10}}></View>
        {/*<View style={{flexDirection: 'row', marginTop:2}}>
          <Text style={{fontSize:12, color:'#999999', fontWeight: '400',marginLeft:20}}>如需预约新冠疫苗，请点击上方新冠疫苗:)</Text>
      </View>*/}
          </View>}
      </TouchableOpacity>
      <Modal
        transparent={true}
        style={{marginTop:0,alignContent:"center",alignItems:"center"}}
        //backgroundColor="#000000"
        visible={visible}
        onRequestClose={()=>{
          setVisible(!visible);}
        }>
          <View style={{marginTop:270,alignContent:"center",alignItems:"center",backgroundColor:"#F7FAFA",borderColor:"#68B0AB",borderRadius:50,borderWidth:1,width:350,marginLeft:33}}>
         <View style={{flexDirection: 'row', marginBottom: 15,marginTop:30}}>
         <TouchableOpacity onPress={()=>{
          setVisible(visible=>!visible);user.action.changeAd(false)}}>
                     <Text style={{marginLeft:-40,fontSize:16,color:"#999999"}}>{'X'}</Text>

          </TouchableOpacity>

          <Text style={{marginLeft:5,fontSize:18}}>{"双阴检测Covid Test"}</Text> 
         
        </View>
        <Image style={{width:240,height:180}}source={require('../images/healthpac.png')}></Image>
        <View style={{marginTop:20,marginBottom:20,borderTopWidth:0.8,width:250,alignItems:"center",borderColor:'#999999'}}>
          <TouchableOpacity onPress={()=>{user.action.changeAd(false);setVisible(visible=>!visible);navigation.navigate("reservation")}}>
          <Text style={{marginTop:10,color:"#61B0AB",fontSize:17,fontWeight:"600"}}>立刻预约</Text>
          <View style={{borderTopWidth:2,marginTop:3,borderColor:"#61B0AB"}}></View>
          </TouchableOpacity>
        </View>
        </View>
        </Modal>
      <View style={{marginBottom:20,marginTop:60,}}>
      <TouchableOpacity onPress={()=>navigation.navigate("chatbot") } 
      >     
            
            <Image
                style={{width:160,height:50,borderRadius:0,marginLeft:0}}
                source = {require("../images/symptom_check.png")}
            />
      </TouchableOpacity>
    </View>
      </ScrollView>

      </View>
    );
  }