import React, { useContext,useState,useEffect} from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch ,ScrollView,Platform} from 'react-native';
import {styles} from '../../style';
import { StackActions } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';

import RNPickerSelect from 'react-native-picker-select';
import DataContext from "../../consumerContext";
const HistoryInfo = ({navigation}) => {
    const user=useContext(DataContext)
    const [base, setBase] = useState({
        customerId:"",
        name: "",
        gender: "",
        age: 0,
        mobile: "",
        address: "",
        postCode: "",
        state: "",
        email: ""
    },);
    const [medi, setMedi] = useState({
        category: "",
        name: "",
        expireDate: "",
        number: "",
        serialNumber: ""
    });

    const goBack= () => {
    navigation.dispatch(StackActions.pop(1))
    console.log(telephone);
    console.log(postcode);
        
    /*let url = 'http://'+user.url+'/aicare-customer-api/customer/customer-info/save'
    
    fetch(url,{
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'sso-auth-token': user.token,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'content-type, sso-auth-token',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE',
      },
      body: JSON.stringify({
        name: name,
        gender:gender,
        age:age,
        mobile:telephone,
        address:address,
        postCode:postcode,   
        state:state,    
        email:email,
      })
      })
      .then((response) => response.json())
      .then((json) => {
        if (json.code === 0) {
          //alert("提交成功");
          console.log(json.msg);
        } else {
          //console.log(json.msg)
          console.log(base);
          alert('个人信息提交失败');
        }
      });
      if(selectedType=="Medicare"){
        let url = 'http://'+user.url+'/aicare-customer-api/customer/customer-info/medical-card'
    
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
      },
      body: JSON.stringify({
        category:selectedType,
        name:cardName?cardName:"",
        expireDate:expire?expire:"",
        number:cardNumber?cardNumber:"",
        serialNumber:serial?serial:"",
      })
      })
      .then((response) => response.json())
      .then((json) => {
        if (json.code === 0) {
          //alert("医疗信息提交成功");
          console.log(json.msg);
        } else {
          alert('医疗信息提交失败');
        }
      });
      }else if(selectedType=="私人保险"){
        let url = 'http://'+user.url+'/aicare-customer-api/customer/customer-info/medical-card'
    
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
      },
      body: JSON.stringify({
        category:"私人保险",
        name:cardName,
        number:cardNumber,
      })
      })
      .then((response) => response.json())
      .then((json) => {
        if (json.code === 0) {
          //alert("医疗信息提交成功");
          console.log(json.msg);
        } else {
          console.log(json.msg)
          alert('医疗信息提交失败');
        }
      });
      }   */
    }
    /*useEffect(() => {
    
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

                    setBase(json.user_base_info);
                    setMedi(json.user_health_card);
                    setName(json.user_base_info.name);
                    setGender(json.user_base_info.name.gender);
                    setAge(json.user_base_info.age);
                    setTelephone(json.user_base_info.telephone);
                    setAddress(json.user_base_info.address);
                    setPostcode(json.user_base_info.postCode);
                    setState(json.user_base_info.state);
                    setEmail(json.user_base_info.email);

                    setcardName(json.user_health_card.name);
                    setExpire(json.user_health_card.expireDate);
                    setSerial(json.user_health_card.serialNumber);
                    setCardNumber(json.user_health_card.number);
                    setSelectedType(json.user_health_card.category);
                    //console.log("schedule");
                    //console.log(timeSection);
                    //console.log(json.code);
                    //Alert.alert('查询成功');
                  } else if(json.code==1){
                      console.log("基本信息未录入")
                      setMedi(json.user_health_card);
                      setcardName(json.user_health_card.name);
                    setExpire(json.user_health_card.expireDate);
                    setSerial(json.user_health_card.serialNumber);
                    setCardNumber(json.user_health_card.number);
                    setSelectedType(json.user_health_card.category);
                  }else if(json.code==2){

                      console.log("医保信息未录入")
                      setBase(json.user_base_info);
                      setBase(json.user_base_info);
                      setMedi(json.user_health_card);
                      setName(json.user_base_info.name);
                      setGender(json.user_base_info.name.gender);
                      setAge(json.user_base_info.age);
                      setTelephone(json.user_base_info.telephone);
                      setAddress(json.user_base_info.address);
                      setPostcode(json.user_base_info.postCode);
                      setState(json.user_base_info.state);
                      setEmail(json.user_base_info.email);
                  }else if(json.code == 3){

                      console.log("you got nothing")
                  }else{
                    console.log(json.msg);
                    Alert.alert('查询失败');
                  }
                }).catch(error => console.warn(error));
        },[])*/
        
    const goEmail= () => {
        navigation.navigate("changeEmail")
    }
    const [selectedType, setSelectedType] = React.useState("None");
    const [name, setName] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [age, setAge] = React.useState("");
    const [telephone, setTelephone] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [postcode, setPostcode] = React.useState("");
    const [state, setState] = React.useState("");
    const [cardName, setcardName] = React.useState("");
    const [expire, setExpire] = React.useState("");
    const [serial, setSerial] = React.useState("");
    const [cardNumber, setCardNumber] = React.useState("");
    const [email, setEmail] = React.useState("");


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
    marginLeft:100,}}>病史信息</Text>
        </View>
        <Image style = {{width:80,height:80,borderRadius:40}}
            source= {require('../../images/chris.png')}
          />
        <View style={{ marginTop:10,marginLeft:-20,width: 300, height: 50, marginBottom: 0, alignItems: "center", flexDirection: 'row'}}>
            <Image
          style = {{width:22,
            height: 22,
            marginLeft:10,
            marginRight:10,}}
          source={require('../../images/telehealth_icon/account_icon_medical.png')}
        />
            <Text style={{fontSize:16}}>病史信息</Text>
        </View>
        <View style={{ marginLeft:25,width: 300, height: 50, marginBottom: 0, alignItems: "center", flexDirection: 'row',borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:320}}>
            <Text>慢性病史： </Text>
            <TextInput defaultValue="高血压，1类糖尿病"  placeholder="请输入您的医保卡号码" placeholderTextColor="grey" onChangeText={text => setName(text)}></TextInput>
        </View>
        <View style={{ marginLeft:25,width: 300, height: 50, marginBottom: 0, alignItems: "center", flexDirection: 'row',borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:320}}>
            <Text>家庭病史： </Text>
            <TextInput placeholder="高血压" defaultValue="高血压，心脏病"  placeholderTextColor="grey" onChangeText={text => setGender(text)}></TextInput>
        </View>
        <View style={{ marginLeft:25,width: 300, height: 50, marginBottom: 0, alignItems: "center", flexDirection: 'row',borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:320}}>
            <Text>过敏史： </Text>
            <TextInput placeholder="青霉素"  defaultValue="酒精过敏" placeholderTextColor="grey" onChangeText={text => setAge(text)}></TextInput>
        </View>
        <View style={{ marginLeft:25,width: 300, height: 50, marginBottom: 0, alignItems: "center", flexDirection: 'row',borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:320}}>
            <Text>用药历史： </Text>
            <TextInput placeholder="请输入您的生日"  defaultValue="阿司匹林" placeholderTextColor="grey" onChangeText={text => setAge(text)}></TextInput>
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
        <TouchableOpacity style={styles.next_wrapper} onPress ={goBack}>
            <Text style={styles.onsite_text}>确认</Text>
        </TouchableOpacity>
        </View>
        <View style={{height:300}}></View>
        </View>
        </ScrollView>
    );
}
  
export default HistoryInfo;