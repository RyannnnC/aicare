import React,{ useState,setState,useEffect,useContext }from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch,ScrollView,Modal} from 'react-native';
import { Icon } from 'react-native-elements'
import ConsumerDate from "../consumerDate"
import {styles} from '../../style';
import { StackActions } from '@react-navigation/native';
import call from 'react-native-phone-call'
import { CheckBox } from 'react-native-elements';
import DataContext from "../../consumerContext";


//import call from 'react-native-phone-call'
//import { MaterialCommunityIcons, MaterialIcons, Feather } from '@expo/vector-icons';

const args = {
  number: '0403555432', // String value with the number to call
  prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
}

export default function ClinicInfo({route,navigation}) {
  const [isEnabled, setIsEnabled] = useState(false);

  const {item} = route.params;
  user=useContext(DataContext);
  const gotoDoc= () => {
    navigation.navigate('telehealthDoc')
  }
  const makecall=()=>{
    call(args).catch(console.error)
  }
  const goBack= () => {
    navigation.dispatch(StackActions.pop(1))
  }
  const splitString=(string)=>{
    let res = string.split(",").map(Number);
    return res;
  }
  
  const languages = item.serviceLanguage?splitString(item.serviceLanguage).map((item) => {
    return (
      <TouchableOpacity style={styles.resumeTag}>
        <Text style={{ fontSize:12, fontWeight: '300',paddingTop:6 }}>{user.lan[item]}</Text>
      </TouchableOpacity>
    )
  }):null;

  const types = item.serviceTypes?splitString(item.serviceTypes).map((item) => {
    return (
      <TouchableOpacity style={styles.resumeTag}>
        <Text style={{ fontSize:12, fontWeight: '300',paddingTop:6 }}>{user.deptType[item]}</Text>
      </TouchableOpacity>
    )
  }):null;

  return (
    <View style={{backgroundColor: 'white',
    marginTop: 0,
    alignItems: 'center',}}>
    <ScrollView stype={{backgroundColor:"white"}}>
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
    marginLeft:40,}}>诊所信息</Text>
    <CheckBox
            checked={isEnabled }
            checkedColor='#FF7E67'
            uncheckedIcon='heart-o'
            checkedIcon='heart'
            size={28}
            containerStyle={{marginLeft:85}}
            onPress={() => {
              setIsEnabled(isEnabled => !isEnabled)

              if (!isEnabled){
                Alert.alert("已收藏")
              }

            }}
          />
    
    </View>

    <View style={{ width:'90%',flex:1, justifyContent: "center", alignItems: "center",marginTop:0,marginLeft:13}}>
          <Image style={{width:370,height:200}}
            source = {item.orgImg?{uri:item.orgImg}:require('../../images/telehealth_icon/service_doctor_img5.png')}
          />
        </View>
        <View style={{zIndex: 1,shadowColor:"000000",shadowOffset: {
	              width: 0,
	              height: 2,
                },
                shadowOpacity: 0.150,
                shadowRadius: 3.05,

                elevation: 2,marginTop:-50,width:'90%',marginLeft:15,height:160,justifyContent: "center",alignItems: "center",marginBottom:18,backgroundColor:'#F1FAFA',borderRadius:30}}>
          <Text style={{ fontSize:18, fontWeight: '600',marginTop:0 }}>{item.name}</Text>
          <View style={{flexDirection: 'row',paddingBottom: 15, }}>
            <Image
              style = {{width: 20, height:20 , marginLeft:10,marginTop:5, marginRight:1}}
              source = {require('../../images/telehealth_icon/stars.png')}
            />
            <Text style={{fontSize:12, color:'#999999', fontWeight: '400',marginTop:5}}>5</Text>
          </View>
          <View style={{borderColor:"#EEEEEE",borderTopWidth:1.5,marginTop:-10,width:280}}>
          <Text style={{ fontSize:12, fontWeight: '400',marginTop:13,color:"#666666" }}>地址:{item.address} </Text>
          <View style={{flexDirection:"row"}}>
          <Text style={{ fontSize:12, fontWeight: '400',marginTop:7,color:"#666666"  }}>电话:{item.mobile} </Text>
          </View>
          </View>
        </View>
        <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:1,width:340,marginLeft:18}}>
        <View style={{marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>诊所简介</Text>
        </View>
        <View style={{flexWrap: 'wrap', alignItems: 'flex-start',marginBottom:10}}>
          <Text style={{ fontSize:14, fontWeight: '300' }}>{item.introduce}</Text>
        </View>
        </View>
        <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:1,width:340,marginLeft:18}}>
        <View style={{marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>医生类型</Text>
        </View>
        <View style={{flexWrap: 'wrap', alignItems: 'flex-start',flexDirection:"row",marginBottom:10}}>
            {types}
        </View>
        </View>
        <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:1,width:340,marginLeft:18}}>

        <View style={{marginTop:15, marginBottom:10}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>服务语言</Text>
        </View>
        <View style={{flexDirection: 'row' , marginTop:10, marginBottom:10}}>
            {languages}
        </View>
        </View>
        <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:1,width:340,marginLeft:18}}>

        <View style={{ marginTop:15, marginBottom:15}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>服务类型</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <Image style={{width:17,height:17,marginBottom:10}}
            source = {require('../../images/telehealth_icon/service_icon_location_green.png')}
          />
        <Text style={{ fontSize:14, fontWeight: '300',marginBottom:13,marginLeft:5 }}>实地问诊</Text>
        </View>
        </View>
        <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:0,width:340,marginLeft:18}}>

        <View style={{ marginTop:15, marginBottom:15}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>收费方式</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <Image style={{width:17,height:17,marginBottom:10,marginTop:2}}
            source = {require('../../images/order_iocn_money.png')}
          />

        {item.chargingMethod=="1"?<Text style={{ marginLeft:5,fontSize:14, fontWeight: '300',marginBottom:10 }}>支持bulk billing</Text>:<Text style={{ marginLeft:5,fontSize:14, fontWeight: '300',marginBottom:10 }}>不支持bulk billing</Text>
        }
          </View>
        </View>



    <TouchableOpacity onPress={makecall}>
            <Image
                style={{width:60,height:60,position:"absolute",borderRadius:30,bottom:5,right:10}}
                source = {require("../../images/mobile_icon.png")}
            />
    </TouchableOpacity>
    <View style={{marginLeft:-15,marginTop:20}}>
    <TouchableOpacity style={styles.next_wrapper} onPress={goBack}>
      <Text style={styles.onsite_text}>预约医生</Text>
    </TouchableOpacity>
    </View>
    <View style={{height:50}}></View>
    </ScrollView>
   
  </View>
)}

