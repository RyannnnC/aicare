import React, { useContext,useState,useEffect} from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch ,ScrollView,Platform} from 'react-native';
import {styles} from '../../style';
import { StackActions } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import SwitchSelector from "react-native-switch-selector";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment-timezone';
import * as Localization from 'expo-localization';
import RNPickerSelect from 'react-native-picker-select';
import DataContext from "../../consumerContext";
const AccountInfo = ({navigation}) => {
    const user=useContext(DataContext)
    const goBack= () => {
      navigation.dispatch(StackActions.pop(1))  
    }
    const update=()=>{
      let url = 'http://'
      +user.url
      +'/aicare-customer-api/customer/customer-info/save?customerInfoId='+user.customerUserInfoId;
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
      }, body: JSON.stringify({
        firstName: first,
        lastName : last,
        gender: gender,
        dob: dob,
        mobile: telephone,
        email: email,
        address: address,
        postcode: postcode,
        state: state,

      })
    })
      .then((response) => response.json())
      .then((json) => {
        //this.setState({loading:false})
        if (json.code === 0) {
          Alert.alert("信息保存成功")
          console.log(json.msg)

        } else {
          console.log(json.msg)
          Alert.alert(json.msg);
        }
      }).catch(error => console.warn(error));
    }
    useEffect(() => {
    console.log(user.customerUserInfoId)
      let url = 'http://'
      +user.url
      +'/aicare-customer-api/customer/customer-info/query-medical-info?customerUserInfoId='+user.customerUserInfoId;
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
        },
     
      })
      .then((response) => response.json())
      .then((json) => {
        //this.setState({loading:false})
        if (json.code === 0) {
          setFirst(json.medicalInfo.firstName)
          setLast(json.medicalInfo.lastName)
          setGender(json.medicalInfo.gender)
          setDob(json.medicalInfo.dob);
          setTelephone(json.medicalInfo.mobile)
          setEmail(json.medicalInfo.email)
          setPostcode(json.medicalInfo.postcode);
          setState(json.medicalInfo.state)
          setAddress(json.medicalInfo.address)
        } else {
          console.log(json.msg)
          Alert.alert(json.msg);
        }
      }).catch(error => console.warn(error));
        },[])
        
    const goEmail= () => {
        navigation.navigate("changeEmail")
    }
    const [first, setFirst] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [age, setAge] = React.useState("");
    const [telephone, setTelephone] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [postcode, setPostcode] = React.useState("");
    const [state, setState] = React.useState("");
    const [last, setLast] = React.useState("");
    const [dob, setDob] = React.useState("");
    const [serial, setSerial] = React.useState(0);
    const [email, setEmail] = React.useState("");
    const [visible,setVisible]=React.useState(false)

    return (
        <ScrollView style={{marginTop:-20,backgroundColor:"white"}}>
        <View style={styles.container}>
        <View style={{height:50}}></View>
        <View style={{flexDirection:"row",marginBottom:20}}>
        <TouchableOpacity onPress = {goBack} style={{marginLeft:-135}}>
          <Image
            style = {styles.arrow_image}
            source={require('../../images/icon/2/Arrow_left.png')}
          />
        </TouchableOpacity>
    
        <Text style = {{color:'black',
    fontSize:17,
    marginTop:20,
    marginLeft:100,}}>个人信息</Text>
        </View>
        <Image style = {{width:80,height:80,borderRadius:40}}
            source= {require('../../images/emotion1.png')}
          />
        <View style={{ marginTop:10,marginLeft:-20,width: 300, height: 50, marginBottom: 0, alignItems: "center", flexDirection: 'row'}}>
            <Image
          style = {{width:22,
            height: 22,
            marginLeft:10,
            marginRight:10,}}
          source={require('../../images/singup_icon_name.png')}
        />
            <Text style={{fontSize:16}}>基本信息</Text>
        </View>
        <View style={{ marginLeft:25,width: 300, height: 50, marginBottom: 0, alignItems: "center", flexDirection: 'row',borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:320}}>
            <Text>姓： </Text>
            <TextInput defaultValue={last}  placeholder="请输入您的姓" placeholderTextColor="grey" onChangeText={text => setLast(text)}></TextInput>
        </View>
        <View style={{ marginLeft:25,width: 300, height: 50, marginBottom: 0, alignItems: "center", flexDirection: 'row',borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:320}}>
            <Text>名： </Text>
            <TextInput placeholder="请输入您的名" defaultValue={first}  placeholderTextColor="grey" onChangeText={text => setFirst(text)}></TextInput>
        </View>
        <DateTimePickerModal
        display="spinner"
        isVisible={visible}
        mode="date"
        headerTextIOS='出生日期'
        cancelTextIOS="取消"
        confirmTextIOS='确认'
        onConfirm={(time)=>{setDob(moment(time).tz(Localization.timezone).format("DD/MM/YYYY"));setVisible(false);console.log(time)}}
        onCancel={()=>setVisible(false)}
        
      />
        <View style={{ marginLeft:25,width: 300, height: 50, marginBottom: 0, alignItems: "center", flexDirection: 'row',borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:320}}>
            <Text>出生日期： </Text>
            <TouchableOpacity style={{borderColor:"#8FD7D3",
      borderWidth:1,
    padding:8,
    width:120,
    marginTop:0,
    height:35,

    marginLeft:30,
    alignItems: 'center',
    borderRadius:25,}} onPress={()=>setVisible(true)}>
      <Text style={{fontSize:12}}>{dob}</Text>
    </TouchableOpacity>
        </View>
        <View style={{ marginLeft:25,width: 300, height: 50, marginBottom: 0, alignItems: "center", flexDirection: 'row',borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:320}}>
            <Text>性别： </Text>
            <SwitchSelector
  initial={gender=="M"?1:0}
  onPress={value => {setGender(value);}}
  buttonColor='#8FD7D3'
  borderColor='#8FD7D3'
  hasPadding
  style={{width:200,marginLeft:10}}
  height={35}
  defaultValue={"M"}//?
  options={[
    { label: "女性", value: "F",  }, 
    { label: "男性", value: "M", } 
  ]}
  testID="gender-switch-selector"
  accessibilityLabel="gender-switch-selector"></SwitchSelector>            
        </View>
        
        <View style={{ marginLeft:25,width: 300, height: 50, marginBottom: 0, alignItems: "center", flexDirection: 'row',borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:320}}>
            <Text>电话： </Text>
            <TextInput placeholder="请输入您的电话" defaultValue={telephone} placeholderTextColor="grey" onChangeText={text => setTelephone(text)}></TextInput>
        </View>
        <View style={{ marginLeft:25,width: 300, height: 50, marginBottom: 0, alignItems: "center", flexDirection: 'row',borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:320}}>
            <Text>邮箱： </Text>
            <TextInput placeholder="请输入您的邮箱" defaultValue={email} placeholderTextColor="grey" onChangeText={text => setEmail(text)}></TextInput>
        </View>
        <View style={{ marginLeft:25,width: 300, height: 50, marginBottom: 0, alignItems: "center", flexDirection: 'row',borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:320}}>
            <Text>地址： </Text>
            <TextInput placeholder="请输入您的地址" defaultValue={address} placeholderTextColor="grey" onChangeText={text => setAddress(text)}></TextInput>
        </View>
        <View style={{ marginLeft:25,width: 300, height: 50, marginBottom: 0, alignItems: "center", flexDirection: 'row',borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:320}}>
            <Text>编码： </Text>
            <TextInput placeholder="请输入邮编" defaultValue={postcode} placeholderTextColor="grey" onChangeText={text => setPostcode(text)}></TextInput>
            <Text style={{marginLeft:50}}>州： </Text>
            <TextInput placeholder="请输入州" defaultValue={state} placeholderTextColor="grey" onChangeText={text => setState(text)}></TextInput>
        </View>
        {/*<View style={{ marginLeft:25,width: 300, height: 50, marginBottom: 0, alignItems: "center", flexDirection: 'row',borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:320}}>
            <Text>邮箱： </Text>
            <TextInput placeholder="请输入您的邮箱" defaultValue={base.email} placeholderTextColor="grey" onChangeText={text => setEmail(text)}></TextInput>
            <View style={{marginTop:-15}}>
            <TouchableOpacity onPress = {goEmail}>
                <Image style = {styles.comment_image}
                source= {require('../../images/icon/2/Arrow_right.png')}
                />
            </TouchableOpacity>
            </View>
          </View>*/}{/* 
        <View style={{ marginTop:10,marginLeft:-20,width: 300, height: 50, marginBottom: 0, alignItems: "center", flexDirection: 'row'}}>
            <Image
          style = {{width:22,
            height: 22,
            marginLeft:10,
            marginRight:10,}}
          source={require('../../images/telehealth_icon/account_icon_medical.png')}
        />
            <Text style={{fontSize:16}}>医疗信息</Text>
        </View>
        <View style={{ marginLeft:25,width: 300, height: 50, marginBottom: 0, alignItems: "center", flexDirection: 'row',borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:320}}>
            <Text>保险类型： </Text>
            {Platform.OS == "ios"?null:<Text>{selectedType} </Text>}
            <View style={{marginTop:5}}>
            
        </View>
        
        </View>
        
        <Picker 
      style={{height: 50,  
        width: 100,  
        color: 'white',  
        marginTop:-50,
        justifyContent: 'center',marginLeft:50  }}
  selectedValue={selectedType}
  onValueChange={(value) => setSelectedType(value)
  }>
  <Picker.Item label="请选择更改类型...." value="请选择更改类型" />
  <Picker.Item label="Medicare" value="Medicare" />
  <Picker.Item label="私人保险" value="私人保险" />
  <Picker.Item label="无保险" value="无保险" />


</Picker>
        {selectedType=="Medicare"?<View style = {{alignItems:"center"}}>
        <TextInput style = {styles.account}
          placeholder="持卡人姓名" 
          defaultValue= {(medi.category=="Medicare"&&medi.name)?medi.name:""}
          onChangeText={text => setcardName(text)}
        />
        <View style={{flexDirection:"row"}}>
        <TextInput style = {{height: 35,
    width: 130,
    borderBottomColor: '#999999',
    marginLeft:3,
    borderBottomWidth:1,}}
    defaultValue= {(medi.category=="Medicare"&&medi.expireDate)?medi.expireDate.slice(0,10):""}

          placeholder="dd-mm-yyyy"
          onChangeText={text => setExpire(text)}
        />
      <TextInput style = {{height: 35,
    width: 130,
    marginLeft:40,
    borderBottomColor: '#999999',
    borderBottomWidth:1,}}
          placeholder="序列号"
          defaultValue= {(medi.category=="Medicare"&&medi.serialNumber)?medi.serialNumber:""}

          onChangeText={text => setSerial(text)}
      />
      </View>
      <TextInput style = {styles.account}
          placeholder="卡号"
          onChangeText={text => setCardNumber(text)}
          defaultValue= {(medi.category=="Medicare"&&medi.number)?medi.number:""}

      />

    </View>: null}
    {selectedType=="私人保险"?<View style = {{alignItems:"center"}}>
        
      <TextInput style = {styles.account}
          placeholder="保险人姓名"
          defaultValue= {(medi.category=="私人保险"&&medi.name)?medi.name:null}

          onChangeText={text => setcardName(text)}
      />
      <TextInput style = {styles.account}
          placeholder="保险号码(Policy Number)"
          defaultValue= {(medi.category=="私人保险"&&medi.number)?medi.number:null}

          onChangeText={text => setCardNumber(text)}
      />
   
    </View>: null}*/}
    
        <View style={{marginLeft:-75,marginTop:20}}>
        <TouchableOpacity style={styles.next_wrapper} onPress ={()=>update()}>
            <Text style={styles.onsite_text}>确认</Text>
        </TouchableOpacity>
        </View>
        <View style={{height:300}}></View>
        </View>
        </ScrollView>
    );
}
  
export default AccountInfo;
  
  