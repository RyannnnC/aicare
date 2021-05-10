import React,{ useState,setState,useContext,useEffect }from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch,ScrollView,Modal,FlatList,ActivityIndicator} from 'react-native';
import {styles} from '../../style';
import { StackActions } from '@react-navigation/native';
import call from 'react-native-phone-call'
import { CheckBox } from 'react-native-elements';
import DataContext from "../../consumerContext";
import DateSelect from "./DateSelect";
import DateFilter from "./datefilter";
import moment from 'moment-timezone';
import * as Localization from 'expo-localization';

const args = {
  number: '0403555432', // String value with the number to call
  prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
}

export default function DocInfo({route,navigation}) {
  
  const user=useContext(DataContext);
  //const [load,setLoad]=useState(false); 
  const { orgId, docId,doctype,address,docName,queryId } = route.params;
  const timeSection = user.schedule;
  //const timeSection=[{id:10},{id:20},{id:30},{id:40},{id:50},{id:60}]
  const schduleId=3227;
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [doc, setDoc] = useState({});

  const goInsurance= (scheduleId,startTime,endTime,teleFlg) => {
    user.action.changeSchedule([]);
    //console.log(doctype);

    navigation.navigate('telehealthPay',{teleFlg:teleFlg,scheduleId:scheduleId,date:"2021.3.25",doctype:doctype,address:address,docName:docName,startTime:startTime,endTime:endTime});
    setModalVisible(modalVisible=>!modalVisible);
    //user.action.changeOrgId(0);user.action.changeDocId(0);
  }
  const makecall=()=>{
    call(args).catch(console.error)
  }

  const goBack= () => {
    navigation.dispatch(StackActions.pop(1))
  }
  
  useEffect(() => {
    console.log(docId);
    let url = "http://"+user.url+"/aicare-customer-api/customer/user/query-doctors?"+"id="+queryId;
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
                setDoc(json.businessEmployer[0]);
                console.log(json.businessEmployer[0].videoChannel)
                //console.log(json);
                console.log(url);
                //console.log("schedule");
                //console.log(timeSection);
                //console.log(json.code);
                //Alert.alert('查询成功');
              } else {
                console.log(json.msg);
                console.log(queryId);
                Alert.alert('查询失败');
              }
            }).catch(error => console.warn(error));
    },[])
  /*const splitString=(string)=>{
    let res = string.split(",").map(Number);
    return res;
  }*/
  const types = doc.serviceClassList?doc.serviceClassList.map((item) => {
    return (
      <TouchableOpacity style={styles.resumeTag}>
        <Text style={{ fontSize:12, fontWeight: '300',paddingTop:6 }}>{item.name}</Text>
      </TouchableOpacity>
    )
  }):null;
  const telehealth = doc.serviceTypeList?doc.serviceTypeList.map((item) => {
    return (
        <Text style={{ fontSize:14, fontWeight: '300',marginBottom:13,marginLeft:5 }}>{item.name}</Text>
    )
  }):null;
  const videochannel = doc.videoChannel?doc.videoChannel.map((item) => {
    return (
      
        <Text style={{ fontSize:14, fontWeight: '300',marginBottom:13,marginLeft:5 }}>{item.channel}</Text>
    )
  }):null;
  const languages = doc.languages?doc.languages.map((item) => {
    return (
      <TouchableOpacity style={styles.resumeTag}>
        <Text style={{ fontSize:12, fontWeight: '300',paddingTop:6 }}>{item.name}</Text>
      </TouchableOpacity>
    )
  }):null;

  const times = doc.employerSchedulevos?doc.employerSchedulevos.map((item) => {
    if(item.status==1){
      let t1 = moment(item.startTime).tz(Localization.timezone).format('LT')
      let t2 = moment(item.endTime).tz(Localization.timezone).format('LT');
    return (
      <View style={{flexDirection:'row'}}>
        <Text style={{ fontSize:14, fontWeight: '300' }}>{item.dayOfWeekStr}</Text>
        <Text style={{ marginLeft:5,fontSize:14, fontWeight: '300' }}>{t1}-{t2}</Text>
      </View>
    )
  }} ):null;

  const renderItemComponent = (item) => 
  <TouchableOpacity style={{width: 120,
    height: 40,
    backgroundColor: "#8FD7D3",
    borderRadius: 10,
    textAlign: 'center',
    marginRight: 25,
    marginTop: 15,
    paddingTop:10,paddingLeft:10}}
    onPress={()=>{
      if (doc.videoChannel.length!=0){
      Alert.alert(
      "就诊方式",
      "您是要选择与医生远程视频问诊还是去诊所就诊呢？",
      [
        {
          text: "取消",
          onPress: () => console.log("didnt cancel order"),
          style: "cancel"
        },
        { text: "远程问诊", onPress: () => {goInsurance(item.item.scheduleDetailedId,item.item.startTime,item.item.endTime,1)}},
        { text: "实地问诊", onPress: () => {goInsurance(item.item.scheduleDetailedId,item.item.startTime,item.item.endTime,0)}} 
      ],
      { cancelable: false }
      )}else{
        goInsurance(item.item.scheduleDetailedId,item.item.startTime,item.item.endTime,0)
      }
      }}> 
    <Text style={{color:"white"}}>{item.item.startTime.slice(0,5)+" - "+item.item.endTime.slice(0,5)}</Text>
  </TouchableOpacity>
  
  
  return (
    <View style={{    backgroundColor: 'white',
    marginTop: 0,
    alignItems: 'center'}}>
    <ScrollView>
    <View style={{flexDirection:'row',marginTop:0,marginLeft:10}}>
    <TouchableOpacity onPress = {goBack} style={{marginRight:30}}>
      <Image
        style = {styles.arrow_image}
        source={require('../../images/icon/2/Arrow_left.png')}
      />
    </TouchableOpacity>
    <View style={{marginLeft:30}}></View>
    <Text style = {{color:'black',
    fontSize:17,
    marginTop:20,
    marginLeft:40,}}>医生信息</Text>
    <CheckBox
            checked={isEnabled }
            checkedColor='#FF7E67'
            uncheckedIcon='heart-o'
            checkedIcon='heart'
            size={28}
            containerStyle={{marginLeft:85}}
            onPress={() => {
              setIsEnabled(isEnabled => !isEnabled)
              console.log(user.schedule);

              if (!isEnabled){
                Alert.alert("已收藏")
              }

            }}
          />
    
    </View>

    <View style={{ width:'90%',flex:1, justifyContent: "center", alignItems: "center",marginTop:10,zIndex: 1,marginLeft:13}}>
      
          <Image style={{width:80,height:80}}
            source = {doc.imgUrl?{uri:doc.imgUrl}:require("../../images/telehealth_icon/service_doctor_img5.png")}
          />
          </View>
        <View style={{shadowColor:"000000",shadowOffset: {
	              width: 0,
	              height: 2,
                },
                shadowOpacity: 0.150,
                shadowRadius: 3.05,

                elevation: 0,marginTop:-50,width:'90%',marginLeft:15,height:200,justifyContent: "center",alignItems: "center",marginBottom:18,backgroundColor:'#F1FAFA',borderRadius:30}}>
          <Text style={{ fontSize:18, fontWeight: '600',marginTop:40 }}>{doc.name}</Text>
          <View style={{flexDirection: 'row',paddingBottom: 15, }}>
            <Image
              style = {{width: 20, height:20 , marginLeft:10,marginTop:5, marginRight:1}}
              source = {require('../../images/telehealth_icon/stars.png')}
            />
            <Text style={{fontSize:12, color:'#999999', fontWeight: '400',marginTop:5}}>{5.0}</Text>
          </View>
          <View style={{borderColor:"#EEEEEE",borderTopWidth:1.5,marginTop:-10,width:280}}>
          <Text style={{ fontSize:12, fontWeight: '400',marginTop:13,color:"#666666" }}>地址: {address}</Text>
          <View style={{flexDirection:"row"}}>
          <Text style={{ fontSize:12, fontWeight: '400',marginTop:7,color:"#666666"  }}>电话: {doc.mobile}</Text>
          <Text style={{ fontSize:12, fontWeight: '400',color:"#666666",marginTop:7, marginLeft:20 }}>经验:{doc.workLong?doc.workLong+"年":"未填写"}</Text>
          </View>
          </View>
        </View>
        <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:1,width:340,marginLeft:18}}>
        <View style={{marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>医生简介</Text>
        </View>
        <View style={{flexWrap: 'wrap', alignItems: 'flex-start',marginBottom:10}}>
          <Text style={{ fontSize:14, fontWeight: '300' }}>{doc.introduce}</Text>
        </View>
        </View>
        <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:1,width:340,marginLeft:18}}>

        <View style={{marginTop:15, marginBottom:10}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>服务语言</Text>
        </View>
        <View style={{flexDirection: 'row' , marginTop:10, marginBottom:10}}>
          {doc.languages?languages:null}
        </View>
        </View>
        <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:1,width:340,marginLeft:18}}>
        <View style={{marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>医生类型</Text>
        </View>
        <View style={{flexWrap: 'wrap', alignItems: 'flex-start',flexDirection:"row",marginBottom:10}}>
            {doc.serviceClassList?types:null}
        </View>
        </View>
        <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:1,width:340,marginLeft:18}}>

        <View style={{ marginTop:15, marginBottom:15}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>服务类型</Text>
        </View>
        

        {/*<View style={{flexDirection:'row'}}>
          <Image style={{width:17,height:17,marginBottom:10}}
            source = {require('../../images/telehealth_icon/service_icon_location_green.png')}
          />
        <Text style={{ fontSize:14, fontWeight: '300',marginBottom:13,marginLeft:5 }}>实地问诊</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <Image style={{width:17,height:17,marginBottom:10}}
            source = {require('../../images/telehealth_icon/service_icon_video.png')}
          />
        <Text style={{ fontSize:14, fontWeight: '300',marginBottom:13,marginLeft:5 }}>远程问诊</Text>
        </View>
              */}
        {telehealth}
        </View>
        <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:1,width:340,marginLeft:18}}>

        <View style={{ marginTop:15, marginBottom:15}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>远程方式</Text>
        </View>
        
        {videochannel}
        
        {/*<Text style={{ fontSize:14, fontWeight: '300',marginBottom:13,marginLeft:5 }}>FaceTime(支持苹果)</Text>
        <Text style={{ fontSize:14, fontWeight: '300',marginBottom:13,marginLeft:5 }}>Skype(支持安卓)</Text>*/}

        </View>

        <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:1,width:340,marginLeft:18}}>

        <View style={{marginTop:10,marginBottom:10}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>服务时间</Text>
        </View>
        {times?
        times
        :
        <Text>这位医生暂时没有服务时间</Text>}
        </View>
        <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:0,width:340,marginLeft:18}}>

        <View style={{ marginTop:15, marginBottom:15}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>收费方式</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <Image style={{width:17,height:17,marginBottom:10,marginTop:2}}
            source = {require('../../images/order_iocn_money.png')}
          />

          {doc.chargingMethod=="1"?<Text style={{ marginLeft:5,fontSize:14, fontWeight: '300',marginBottom:10 }}>支持bulk billing</Text>:<Text style={{ marginLeft:5,fontSize:14, fontWeight: '300',marginBottom:10 }}>不支持bulk billing</Text>
        }</View>
        </View>
        
    <TouchableOpacity onPress={()=>user.action.contact()}>
            <Image
                style={{width:60,height:60,marginLeft:300,borderRadius:30,bottom:5,right:10}}
                source = {require("../../images/mobile_icon.png")}
            />
    </TouchableOpacity>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
      <View style={{marginTop:200,backgroundColor:"#F7FAFA",borderRadius:40,shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 12,
},
shadowOpacity: 0.58,
shadowRadius: 16.00,

elevation: 24,}}>
  
    <View style={{flexDirection:"row"}}>
    <TouchableOpacity onPress={() =>{setModalVisible(!modalVisible);//user.action.changeOrgId(0);
    //user.action.changeDocId(0);
    //user.action.changeSchedule([]);

          }} style={{marginRight:20,marginLeft:30}}>
      <Image
        style = {styles.arrow_image}
        source={require('../../images/icon/2/Arrow_left.png')}
      />
    </TouchableOpacity>
    <View style={{marginLeft:40}}>
    <Text style = {styles.service}>预约时间</Text>
    </View>
    </View>
    
    <ScrollView style={{backgroundColor:"#F7FAFA"}}>
      {/*
      <DateSelect/>
        
      
             */}
      {<DateSelect/>}
      <View style={{alignItems:"center"}}>
      {user.loading?<ActivityIndicator color="#00FF00" size="large"></ActivityIndicator>:
      user.schedule.length!=0?
      <FlatList
        style={{maxHeight:115,}}
        numColumns={2}
        data={timeSection}
        renderItem={item => renderItemComponent(item)}
        keyExtractor={item => item.scheduleDetailedId.toString()}
      />:<Text style={{marginTop:15,marginBottom:10}}>抱歉，这天无可选时间哦。</Text>}
      </View>
      {/*<TouchableOpacity style={styles.next_wrapper} onPress={goInsurance
            //state.action.changetotal(Number(state.end_time.substring(0,2))-Number(state.start_time.substring(0,2))+(Number(state.end_time.substring(3,5))-Number(state.start_time.substring(3,5)))/60);
            //this.props.navigation.dispatch(StackActions.pop(1))}
          }>
          <Text style={styles.onsite_text}>确定</Text>
        </TouchableOpacity>*/}
        </ScrollView>
        
        <View style={{height:20}}/>
        </View>
      </Modal>
    <View style={{marginTop:15,marginLeft:-13}}>
    <TouchableOpacity style={styles.next_wrapper} onPress={() => {setModalVisible(modalVisible=>!modalVisible);user.action.changeOrgId(orgId);user.action.changeDocId(docId)}}>
      <Text style={styles.onsite_text}>预约</Text>
    </TouchableOpacity>
    </View>
    <View style={{height:100}}></View>

    </ScrollView>
   
  </View>
)}

