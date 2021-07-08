
import React,{useContext, useEffect,useState} from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity, FlatList,Platform,AsyncStorage} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {styles} from '../style';
import DataContext from "../consumerContext";
import moment from 'moment-timezone';
import * as Localization from 'expo-localization';

//call(args).catch(console.error)
export default function ProviderMain({navigation}) {
    const alertHandler= () => {
      Alert.alert('功能将在下一版本更新，敬请期待')
    }
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
          "登陆提醒",
          "您还没登陆，如需使用此功能请移步注册登录",
          [
            {text:"取消",
              onPress:()=>console.log("cancel redirect"),
              style:"cancel"
          },{
            text:"注册登陆",
            onPress:()=>removeToken()

          }
          
        ]
        )
        return;
      }
      navigation.navigate("telehealthMain")
  }
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
        "登陆提醒",
        "您还没登陆，如需使用此功能请移步注册登录",
        [
          {text:"取消",
            onPress:()=>console.log("cancel redirect"),
            style:"cancel"
        },{
          text:"注册登陆",
          onPress:()=>removeToken()

        }
        
      ]
      )
      return;
    }
    Alert.alert(
      "新冠疫苗阶段提醒",
      "根据澳大利亚政府信息，目前(2021.6.8之后)澳大利亚新冠疫苗阶段处于2a阶段，只有符合2a条件(40岁以上或关键高风险工作者)可以注射疫苗，诊所提供的疫苗类型是阿斯利康，请在预约之前自行核实自己是否符合标准。具体信息可在health.gov.au查看。点击确认继续疫苗预约。",
      [
        {
          text: "取消",
          onPress: () => console.log(user.token),
          style: "cancel"
        },
        { text: "确定", onPress :()=>{
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
        "登陆提醒",
        "您还没登陆，如需使用此功能请移步注册登录",
        [
          {text:"取消",
            onPress:()=>console.log("cancel redirect"),
            style:"cancel"
        },{
          text:"注册登陆",
          onPress:()=>removeToken()//navigation.navigate("登陆")

        }
        
      ]
      )
      return;
    }
    navigation.navigate("telehealthClinic",{return:"",type:true,doctype:index,state:"NSW"})
  }
  const user = useContext(DataContext);

  useEffect(() => {
    getting();
    /*let poll = setInterval(() => {
      getting();
    }, 5000);
    setRec(poll);
    return()=>clearInterval(poll)
    */
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
            /*url2 = "http://"+user.url+"/aicare-customer-api/customer/user/query-appointment?appointDate="+date+"&dateFlg=0";
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
                setLen(json.page.length)
                //console.log(order)
              } else {
                console.log(json.msg);
                //Alert.alert('查询失败');
              }
            }).catch(error => console.warn(error));*/
            /*if(user.first_svisit==0){
            let url = "http://"+user.url+"/aicare-customer-api/customer/customer-info/all-info";
            fetch(url,{
              method: 'POST',
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

                console.log("已录入")
                //console.log("schedule");
                //console.log(timeSection);
                //console.log(json.code);
                //Alert.alert('查询成功');
              } else if(json.code==1){
                  console.log("基本信息未录入")
                  console.log("you got nothing")
            Alert.alert(
              "提醒",
              "检测到您的基本信息还未完善，需要进一步完善您的基本信息吗？",
              [
                {
                  text: "取消",
                  onPress: () => {user.action.changevisit(1);console.log("Cancel Pressed")},
                  style: "cancel"
                },
                { text: "确定", onPress: () => {user.action.changevisit(1);navigation.navigate("accountInfo")} } //this should navigate to the login page
              ],
              { cancelable: false }
              )
              }else if(json.code==2){
                console.log("you got nothing")
                Alert.alert(
                  "提醒",
                  "检测到您的医疗卡信息还未完善，需要进一步完善您的医疗卡信息吗？",
                  [
                    {
                      text: "取消",
                      onPress: () => {user.action.changevisit(1);console.log("Cancel Pressed")},
                      style: "cancel"
                    },
                    { text: "确定", onPress: () => {user.action.changevisit(1);navigation.navigate("accountInfo")} } //this should navigate to the login page
                  ],
                  { cancelable: false }
                  )
                  console.log("医保信息未录入")
                  setBase(json.user_base_info);
              }else if(json.code == 3){

                console.log("you got nothing")
                Alert.alert(
                  "提醒",
                  "检测到您的个人信息还未完善，需要进一步完善您的个人信息吗？",
                  [
                    {
                      text: "取消",
                      onPress: () => {user.action.changevisit(1);console.log("Cancel Pressed")},
                      style: "cancel"
                    },
                    { text: "确定", onPress: () => {user.action.changevisit(1);navigation.navigate("accountInfo")} } //this should navigate to the login page
                  ],
                  { cancelable: false }
                  )
              }else{
                console.log(json.msg);
                Alert.alert('查询失败');
              }
            }).catch(error => console.warn(error));}*/

    }

    
    /*let url = "http://3.104.87.14:8085/aicare-customer-api/customer/user/query-appointment";
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
                //this.setState({query:json.page})
                setLen(json.page.length)
                Alert.alert('查询成功');
              } else {
                console.log(json.msg);
                Alert.alert('查询失败');
              }
            }).catch(error => console.warn(error));
    */
    /* if (user.first_vist==0){
        let url2= "http://3.104.87.14:8085/aicare-customer-api/customer/customer-info/all-info";
        fetch(url2,{
          method: 'POST',
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

           // setBase(json.user_base_info);
            //setMedi(json.user_health_card);
            console.log("info all loged")
            //console.log("schedule");
            //console.log(timeSection);
            //console.log(json.code);
            //Alert.alert('查询成功');
          } else if(json.code==1){
              console.log("基本信息未录入")
              //setMedi(json.user_health_card);
              Alert.alert(
                "提醒",
                "您的个人基本信息还未录入，是否录入？",
                [
                  {
                    text: "取消",
                    onPress: () => {user.action.changevisit(1);console.log("Cancel Pressed")},
                    style: "cancel"
                  },
                  { text: "确定", onPress: () => {user.action.changevisit(1);navigation.navigate("accountInfo")} } //this should navigate to the login page
                ],
                { cancelable: false }
                )
          }else if(json.code==2){

              console.log("医保信息未录入")
              Alert.alert(
                "提醒",
                "您的医疗卡信息还未录入，是否录入？",
                [
                  {
                    text: "取消",
                    onPress: () => {user.action.changevisit(1);console.log("Cancel Pressed")},
                    style: "cancel"
                  },
                  { text: "确定", onPress: () => {user.action.changevisit(1);navigation.navigate("accountInfo")} } //this should navigate to the login page
                ],
                { cancelable: false }
                )
              //setBase(json.user_base_info);
          }else if(json.code == 3){

              console.log("you got nothing")
              Alert.alert(
                "提醒",
                "您的所有个人信息还未录入，是否录入？",
                [
                  {
                    text: "取消",
                    onPress: () => {user.action.changevisit(1);console.log("Cancel Pressed")},
                    style: "cancel"
                  },
                  { text: "确定", onPress: () => {user.action.changevisit(1);navigation.navigate("accountInfo")} } //this should navigate to the login page
                ],
                { cancelable: false }
                )
          }else{
            console.log(json.msg);
            //Alert.alert('查询失败');
          }
        }).catch(error => console.warn(error));
      }*/
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
      return "今日"
    }
    date=date.toLocaleDateString().slice(5,);
    return date;
    }

    const gotoOrderPage=()=>{
      navigation.navigate("订单")
    }
    var date = new Date().getDate();
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
            <Text style={{ color: '#006A71', fontSize: 24, fontWeight: '600'}} >{month}月{date}日，</Text>
            {/*<Text>您今日有{len}项订单</Text>*/}
            <Text style={{fontSize:12,marginTop:5}}>使用AI助手来测试今日心情吧。</Text>
          </View>
          <TouchableOpacity onPress={()=>Alert.alert("该功能目前正在升级，敬请期待！")}>
          <Image
            style = {{height:70,width:70,marginTop:-10}}
            source = {require('../images/Group.png')}
          />
          </TouchableOpacity>
        </View>
      <View style={{textAlign: "left",marginBottom:8,marginTop:25 }}>
        <Text style={{ color: '#333333', fontSize: 19,marginLeft:8, fontWeight: '500'}}>热门服务</Text>
      </View>
      <View style={styles.buttons}>
        
      <TouchableOpacity style={{marginTop:12,marginLeft:-2}} onPress={goToTelehealth}>
          <Image
          style = {{width:110,height:110}}
          source = {require('../images/appointment.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:14,marginLeft:5}} onPress={goVaccine}>
          <View style={{marginTop:-3,marginLeft:-6}}>
          <Image
          style = {{width:110,height:110}}
          source = {require('../images/vaccine.png')}
          />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={{marginTop:14,marginLeft:5}} onPress={()=>goSomewhere(9)}>
          <View style={{marginTop:-3,marginLeft:-6}}>
          <Image
          style = {{width:110,height:110}}
          source = {require('../images/check.png')}
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
            "登陆提醒",
            "您还没登陆，如需使用此功能请移步注册登录",
            [
              {text:"取消",
                onPress:()=>console.log("cancel redirect"),
                style:"cancel"
            },{
              text:"注册登陆",
              onPress:()=>removeToken()
  
            }
            
          ]
          )
          return;
        }
        console.log(user.customerUserInfoId);navigation.navigate("资料收集");}}>
          <Image
          style = {{width:110,height:110}}
          source = {require('../images/now.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity style={{marginTop:-5,marginLeft:-2}} onPress={()=>{
           if(checkToken()){
            Alert.alert(
              "登陆提醒",
              "您还没登陆，如需使用此功能请移步注册登录",
              [
                {text:"取消",
                  onPress:()=>console.log("cancel redirect"),
                  style:"cancel"
              },{
                text:"注册登陆",
                onPress:()=>removeToken()
    
              }
              
            ]
            )
            return;
          }
          navigation.navigate("healthRecord");}}>
          <Image
          style = {{width:110,height:110}}
          source = {require('../images/record.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:-5,marginLeft:-2}} onPress={()=>{
            if(checkToken()){
              Alert.alert(
                "登陆提醒",
                "您还没登陆，如需使用此功能请移步注册登录",
                [
                  {text:"取消",
                    onPress:()=>console.log("cancel redirect"),
                    style:"cancel"
                },{
                  text:"注册登陆",
                  onPress:()=>removeToken()      
                }                
              ]
              )
              return;
            }
            navigation.navigate("prescription");}}>
          <Image
          style = {{width:110,height:110}}
          source = {require('../images/pres.png')}
          />
        </TouchableOpacity>
        
        
        
      </View>
        <View style={{textAlign: "left",marginTop:15,marginBottom:8 }}>
          <Text style={{ color: '#333333', marginLeft:8,fontSize: 19, fontWeight: '500',marginBottom:8}}>最近预约</Text>
        </View>
      <TouchableOpacity onPress ={gotoOrderPage}>
      {order[0]?
      <View style={styles.home}>
        <View style={{flexDirection: 'row', borderBottomColor:'#EEEEEE',borderBottomWidth:1, marginTop:21, paddingBottom:10}}>
          <View style={{marginLeft:20 }}>
            <Text style={{ color: '#333333', fontSize: 16, fontWeight: '500', marginBottom:5}}> {moment(order[0].appointDate).tz(Localization.timezone).format('L')} {order[0].startTime?order[0].startTime.slice(0,5) + " - "+order[0].endTime.slice(0,5):null}</Text>
            <Text style={{ color: '#666666', fontSize: 12, fontWeight: '300'}}>{order[0].deptId+1?"您预约了一门"+user.deptType[order[0].deptId]+"。":null}</Text>
          </View>
        
        <Image
          style = {styles.img3}
          source = {require('../images/crayon-892.png')}
          />
        </View>
        <View style={{flexDirection: 'row', marginTop:10}}>
          <Text style={{fontSize:12, color:'#999999', fontWeight: '400',marginLeft:20}}>{order[0].businessEmployerName+" - "+order[0].orgName}</Text>
        </View>
    </View>:<View style={styles.home}><View style={{flexDirection: 'row', borderBottomColor:'#EEEEEE',borderBottomWidth:1, marginTop:21, paddingBottom:10}}>
          <View style={{marginLeft:20,marginTop:15 }}>
            <Text style={{ color: '#333333', fontSize: 16, fontWeight: '500', marginBottom:5}}>您目前还没有预约哦。</Text>
          </View>
        <Image
          style = {styles.img3}
          source = {require('../images/crayon-892.png')}
          />
        </View>
        <View style={{flexDirection: 'row', marginTop:10}}>
          <Text style={{fontSize:12, color:'#999999', fontWeight: '400',marginLeft:20}}>如需预约医生，请点击上方医生预约:)</Text>
        </View>
        {/*<View style={{flexDirection: 'row', marginTop:2}}>
          <Text style={{fontSize:12, color:'#999999', fontWeight: '400',marginLeft:20}}>如需预约新冠疫苗，请点击上方新冠疫苗:)</Text>
      </View>*/}
          </View>}
      </TouchableOpacity>
      <View style={{marginBottom:20,marginTop:60,}}>
      {/*<TouchableOpacity onPress={()=>Alert.alert("情绪识别模块未就绪。") } 
      style={{right:-240}}
      >     
            
            <Image
                style={{width:100,height:100,borderRadius:30,}}
                source = {icon}
            />
      </TouchableOpacity>*/}
    </View>
      </ScrollView>

      </View>
    );
  }