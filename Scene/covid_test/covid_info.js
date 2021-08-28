import React,{useContext, useState,useEffect} from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity, TextInput,Switch,ScrollView,Platform,Modal,ActivityIndicator } from 'react-native';
import {styles} from '../../style';
import { CheckBox } from 'react-native-elements';
import { StackActions } from '@react-navigation/native';
//import DataContext from "../consumerContext"
import call from 'react-native-phone-call'
import DataContext from "../../consumerContext";
import SwitchSelector from "react-native-switch-selector";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment-timezone';
import * as Localization from 'expo-localization';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import I18n from "../language"

const args = {
  number: '0403555432', // String value with the number to call
  prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
}
//import { Checkbox } from 'react-native-paper/lib/typescript/components/Checkbox/Checkbox';
//mport { grey100 } from 'react-native-paper/lib/typescript/styles/colors';
export default function covid_info({navigation,route}) {
  const user=useContext(DataContext);
  const [members,setMembers]=useState([]);
  const [first,setFirst]=useState(user.fir)
  const [last,setLast]=useState(user.las)
  const [email,setEmial]=useState(user.ema)
  const [number,setNumber]=useState("")
  const [serial,setSerial]=useState("")
  const [expire,setExpire]=useState("")
  const [candidate,setCandidate]=useState({});
  const [modalVisible,setModalVisible]=useState(false);
  const {des,air,dep,book,center,ncp,ncm} = route.params;

  const [loading,setLoading]=useState(false)
 
  const goBack= () => {
    navigation.dispatch(StackActions.pop(1))
  }
  //const { scheduleId,date,doctype,address,docName,startTime,endTime,teleFlg,Did,orgId} = route.params;
  const [gender,setGender]=useState("")
  const [id,setId]=useState(null);

  const [visible,setVisible]=useState(false)
  const [expVis,setExpVis]=useState(false)
  const [type,setType]=useState("")
  
  const [dob,setDob]=useState(user.dob)
  const [add,setAdd]=useState(user.add)
  
  const [sub,setSub]=useState(user.sub)
  const [sta,setSta]=useState(user.sta)
  const [post,setPost]=useState(user.post)
  const [pass,setPass]=useState(user.pass)
  const [nat,setNat]=useState(user.nat)

  const orders = members.length>0?members.map((item,index)=>{
    return(
        <TouchableOpacity style={{width:150,height:50,borderRadius:30,borderWidth:1,alignItems:"center",paddingTop:10,marginBottom:10}}
        onPress={()=>setId(item.id)}>
        <Text>{item.name}</Text>
        </TouchableOpacity>
    )
}):null;
  const [checked1, setChecked1] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);
  const [checked4, setChecked4] = React.useState(false);
  const [mobile,setMobile]=React.useState(user.mob);
  return (

    <KeyboardAwareScrollView contentContainerStyle={{backgroundColor:"white"}} style={{backgroundColor:"white"}} enableOnAndroid={true}
    enableAutomaticScroll={(Platform.OS === 'ios')}
    >

    <View style={styles.container}>
    <View style={{flexDirection:'row',marginTop:45,marginLeft:-140}}>
    <TouchableOpacity onPress = {goBack} style={{marginRight:60,marginLeft:35}}>
      <Image
        style = {styles.arrow_image}
        source={require('../../images/icon/2/Arrow_left.png')}
      />
    </TouchableOpacity>
    
    <Text style = {{    color:'black',
    fontSize:17,
    marginTop:20,
    marginLeft:20,}}>{"新冠检测"}</Text>
    </View>
    <Image
    style = {{width:350,height:60,marginTop:20}}
        source={require('../../images/progress2.png')}
      />
    <View style={{marginTop:0,marginLeft:20,alignContent:"flex-start"}}>
    <Text style={{marginLeft:0,marginTop:20,fontSize:17,fontWeight:"500"}}>个人信息</Text>
    <View style={{width:350,marginLeft:0,marginTop:10}}>
        <Text>请用英文规范书写并核对以下信息，姓名必须与护照上一致，如果有误有可能直接影响到您的登记过程。</Text>
    </View>
    <View style={{flexDirection:"row",marginTop:10}}>  
      <Text style={{marginLeft:0}}>名 First name</Text>
      <Text style={{marginLeft:65}}>姓 Last name</Text>

</View>
<View style={{flexDirection:"row"}}>  
<TextInput style = {{height: 35,
    width: 150,
    marginLeft:0,
    borderBottomColor: '#999999',
    borderBottomWidth:1,}}
          placeholder={"大写英文输入名"}
          valule={user.fir}
                   onChangeText={(text)=>{setFirst(text);user.action.changeFir(text)}}

      />    
    <TextInput style = {{height: 35,
    width: 150,
    marginLeft:30,
    borderBottomColor: '#999999',
    borderBottomWidth:1,}}
          placeholder ={"大写英文输入姓"}
          value={user.las}
           onChangeText={(text)=>{setLast(text);user.action.changeLas(text)}}

      />

</View>
<Text style={{marginTop:15,fontWeight:"500",marginLeft:0}}>性别 Gender</Text>
<View style={{marginTop:0,flexDirection:"row"}}>
    <CheckBox
            checked={checked1 }
            checkedColor='#FF8570'
            uncheckedIcon='circle-thin'
            checkedIcon='check-circle'
            size={33}
            containerStyle={{marginLeft:0}}
            onPress={() => {
            setChecked1(true);
            setChecked3(false)    
            }}
          />
        <Text style={{fontSize:16,marginTop:20}}>男 Male</Text>

        <CheckBox
            checked={checked3 }
            checkedColor='#FF8570'
            uncheckedIcon='circle-thin'
            checkedIcon='check-circle'
            size={33}
            containerStyle={{marginLeft:50}}
            onPress={() => {
            setChecked1(false);
            setChecked3(true)
            }}
          />
        <Text style={{fontSize:16,marginTop:20}}>女 Female</Text>
    </View>
    <Text style={{marginTop:7,fontWeight:"500",marginLeft:10}}>出生日期 Date of birth DD/MM/YYYY</Text>

<TextInput style = {{height: 35,
width: 300,
marginLeft:10,
borderBottomColor: '#999999',
borderBottomWidth:1,}}
    placeholder="DD/MM/YYYY"
    value={user.dob}
    onChangeText={(text)=>{setDob(text);user.action.changeDob(text)}}

/>

<Text style={{marginTop:7,fontWeight:"500",marginLeft:10}}>住址 Address</Text>

<TextInput style = {{height: 35,
width: 300,
marginLeft:10,
borderBottomColor: '#999999',
borderBottomWidth:1,}}
placeholder="请英文输入住址"
value={user.add}
    onChangeText={(text)=>{setAdd(text);user.action.changeAdd(text)}}

/>
<Text style={{marginTop:7,fontWeight:"500",marginLeft:10}}>区 Suburb</Text>

<TextInput style = {{height: 35,
width: 300,
marginLeft:10,
borderBottomColor: '#999999',
borderBottomWidth:1,}}
placeholder="请英文输入区"
value={user.sub}
    onChangeText={(text)=>{setSub(text);user.action.changeSub(text)}}

/>
<Text style={{marginTop:7,fontWeight:"500",marginLeft:10}}>州 State</Text>

<TextInput style = {{height: 35,
width: 300,
marginLeft:10,
borderBottomColor: '#999999',
borderBottomWidth:1,}}
placeholder="请英文简写输入州"
value={user.sta}
onChangeText={(text)=>{setSta(text);user.action.changeSta(text)}}

/>
<Text style={{marginTop:7,fontWeight:"500",marginLeft:10}}>邮编 Postcode</Text>

<TextInput style = {{height: 35,
width: 300,
marginLeft:10,
borderBottomColor: '#999999',
borderBottomWidth:1,}}
placeholder="请输入邮编"
value={user.post}
    onChangeText={(text)=>{setPost(text);user.action.changePost(text)}}

/>
<Text style={{marginTop:7,fontWeight:"500",marginLeft:10,color:"red"}}>电话 Mobile *</Text>
<View style={{flexDirection:"row"}}>
<Text style={{marginTop:7,marginLeft:10}}>+61</Text>
<TextInput style = {{height: 35,
width: 275,
marginLeft:5,
borderBottomColor: '#999999',
borderBottomWidth:1,}}
placeholder="4xxxxxxxx"
value={user.mob}
    onChangeText={(text)=>{setMobile(text);user.action.changeMob(text)}}

/>
</View>
<Text style={{marginTop:7,fontWeight:"500",marginLeft:10,color:"red"}}>邮箱 Email *</Text>

<TextInput style = {{height: 35,
width: 300,
marginLeft:10,
borderBottomColor: '#999999',
borderBottomWidth:1,}}
value={user.ema}
onChangeText={(text)=>{setEmial(text);user.action.changeEma(text)}}
placeholder="请输入邮箱"

/>
<Text style={{marginTop:7,fontWeight:"500",marginLeft:10}}>护照号 Passport No</Text>

<TextInput style = {{height: 35,
width: 300,


marginLeft:10,
borderBottomColor: '#999999',
borderBottomWidth:1,}}
placeholder="请输入您的护照号"
value={user.pass}
onChangeText={(text)=>{setPass(text);user.action.changePass(text)}}

/>
<Text style={{marginTop:7,fontWeight:"500",marginLeft:10}}>国籍 Nationality</Text>

<TextInput style = {{height: 35,
width: 300,
marginLeft:10,
borderBottomColor: '#999999',
borderBottomWidth:1,}}
placeholder="请英文输入国籍"
value={user.nat}
onChangeText={(text)=>{setNat(text);user.action.changeNat(text)}}

/>

<View style={{width:350,marginLeft:5,marginTop:10}}>
        <Text>请用英文规范书写并核对以上信息，姓名必须与护照上一致，如果有误有可能直接影响到您的登记过程。</Text>
    </View>
    </View>

    
    
    
    
   
    <View style = {styles.container}>
      
        
    
        
     
      
    
    <View>
    
    

    </View>
    <View style={{marginLeft:-80}}> 
    <View style={{marginTop:10}}></View>

    <TouchableOpacity style={styles.next_wrapper} onPress = {
      ()=>{
      if(first.length==0||last.name){Alert.alert("您还没用英文输入姓和名哦。");return};
      if(add.length==0){Alert.alert("您还没输入地址哦。");return};
      if(sub.length==0){Alert.alert("您还没输入区哦。");return};
      if(sta.length==0){Alert.alert("您还没输入州哦。");return};
      if(post.length==0){Alert.alert("您还没输入邮编哦。");return};
      if(mobile.length==0){Alert.alert("您还没输入电话哦。");return};
      if(email.length==0){Alert.alert("您还没输入邮箱哦。");return};
      if(pass.length==0){Alert.alert("您还没输入护照哦。");return};
      if(nat.length==0){Alert.alert("您还没输入国籍哦。");return};

      navigation.navigate("covid_confirm",{dob:dob,first:first,last:last,gender:checked1?1:2,add:add,sub:sub,sta:sta,post:post,mobile:mobile,email:email,pass:pass,nat:nat,ncp:ncp,ncm:ncm,des:des,air:air,dep:dep,book:book,center:center})}}>
      {/*this need to manually calculated */}
      <Text style={styles.onsite_text}>{"下一步"}</Text>
    </TouchableOpacity>
    </View>
    </View>
    
    <TouchableOpacity onPress={()=>user.action.contact()}>
            <Image
                style={{width:60,height:60,borderRadius:20,marginBottom:20,marginLeft:280,marginTop:50}}
                source = {require("../../images/mobile_icon.png")}
            />
    </TouchableOpacity>
    
    
  
  </View>
  
  </KeyboardAwareScrollView>

  )}

