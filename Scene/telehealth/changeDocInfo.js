import React,{ useState,setState,useContext,useEffect }from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch,ScrollView,Modal,FlatList} from 'react-native';
import {styles} from '../../style';
import { StackActions } from '@react-navigation/native';
import call from 'react-native-phone-call'
import { CheckBox } from 'react-native-elements';
import DataContext from "../../consumerContext";
import DateSelect from "./DateSelect";
import DateFilter from "./datefilter";
const args = {
  number: '0403555432', // String value with the number to call
  prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
}

export default function changeDocInfo({route,navigation}) {
  
  const user=useContext(DataContext);
  const { orgId, docId,doctype,address,docName,id } = route.params;
  const timeSection = user.schedule;
  //const timeSection=[{id:10},{id:20},{id:30},{id:40},{id:50},{id:60}]
  const schduleId=3227;
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  
  const makecall=()=>{
    call(args).catch(console.error)
  }

  const goBack= () => {
    navigation.dispatch(StackActions.pop(1))
  }
  
  useEffect(() => {
    
    let url = "http://3.104.232.106:8085/aicare-customer-api/customer/user/query-doctors?"+"id=56";
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
                console.log(address);
                //console.log(json);
                //console.log("schedule");
                //console.log(timeSection);
                //console.log(json.code);
                //Alert.alert('查询成功');
              } else {
                console.log(json.msg);
                Alert.alert('查询失败');
              }
            }).catch(error => console.warn(error));
    },[])
    const updateAppointment=(s_id)=>{
        let url2 = "http://3.104.232.106:8085/aicare-customer-api/customer/user/update-appointment?scheduleDetailedId=".concat(s_id).concat("&id=").concat(id);
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
                    console.log("ok");
                    user.action.changeSchedule([]);
                    setModalVisible(modalVisible=>!modalVisible);
                    Alert.alert("已更改成功");
                    navigation.navigate("teleSuccess");
                  } else {
                    console.log(json.msg);
                    Alert.alert('更改失败');
                  }
                }).catch(error => console.warn(error));
      }
  const confirm=(item)=>{
    Alert.alert(
        "更改核对",
        "确定要更改预约到以下时间和医生吗？\n".concat("时间: ").concat("3.25").concat(" ").concat(item.item.startTime.slice(0,5)).concat(" - ").concat(item.item.endTime.slice(0,5)).concat("\n诊所: ").concat(address).concat("\n医生: ").concat(docName),
        [
          {
            text: "取消",
            onPress: () => console.log("cancel change"),
            style: "cancel"
          },
          { text: "确定", onPress: () => { console.log(item.item.id);updateAppointment(item.item.scheduleDetailedId);
        }},
        ],
        { cancelable: false }
        )
  }
  const renderItemComponent = (item) => 
  <TouchableOpacity style={{width: 140,
    height: 40,
    backgroundColor: "#8FD7D3",
    borderRadius: 10,
    textAlign: 'center',
    marginRight: 25,
    marginTop: 15,
    paddingTop:10,paddingLeft:20}}
    onPress={()=>confirm(item)}> 
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

     <Image style = {{width:400,height:900}}
      source = {require('../../images/doc_image.png')}
    />
    <TouchableOpacity onPress={makecall}>
            <Image
                style={{width:60,height:60,position:"absolute",borderRadius:30,bottom:5,right:10}}
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
      {user.schedule!=[]?
      <FlatList
        style={{maxHeight:115,}}
        data={timeSection}
        renderItem={item => renderItemComponent(item)}
        keyExtractor={item => item.scheduleDetailedId.toString()}
      />:<Text>抱歉，这天无可选时间。</Text>}
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
    <TouchableOpacity style={styles.next_wrapper} onPress={() => {setModalVisible(modalVisible=>!modalVisible);user.action.changeOrgId(orgId);user.action.changeDocId(docId)}}>
      <Text style={styles.onsite_text}>预约</Text>
    </TouchableOpacity>
    <View style={{height:50}}></View>

    </ScrollView>
   
  </View>
)}

