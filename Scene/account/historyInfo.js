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
        chronic:[{
          id:medical.chronic.id,
          chronic:history
        }],
        familyHistory:[{
          id:medical.familyHistory.id,
          relation:null,
          disease:family
        }],
        allergen:[{
          id:medical.allergy.id,
          allergen:allergy
        }],
        medicineUsage:[{
          id:medical.medicineUsage.id,
          medicine:medicine
        }]
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
            console.log(json.medicalInfo.allergen);
            setMedical(json.medicalInfo);
            if (json.medicalInfo.chronic&&json.medicalInfo.chronic[0]){
              
            setHistory(json.medicalInfo.chronic[0].chronic)
            
            
            }
            if(json.medicalInfo.familyHistory&&json.medicalInfo.familyHistory[0]){
            setFamily(json.medicalInfo.familyHistory[0].disease)}
            if(json.medicalInfo.allergen&&json.medicalInfo.allergen[0]){
            setAllergy(json.medicalInfo.allergen[0].allergen)}
            if(json.medicalInfo.medicineUsage&&json.medicalInfo.medicineUsage[0]){

            setMedicine(json.medicalInfo.medicineUsage[0].medicine)
            }
  
          } else {
            console.log(json.msg)
            Alert.alert(json.msg)
          }
        }).catch(error => console.warn(error));
          },[])

    const goBack= () => {
    navigation.dispatch(StackActions.pop(1))

        
    }
        
    
    const [history, setHistory] = React.useState("");
    const [family, setFamily] = React.useState("");
    const [allergy, setAllergy] = React.useState("");
    const [medicine, setMedicine] = React.useState("");
    const [medical,setMedical]=React.useState({})


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
            <TextInput defaultValue={history}  placeholder="慢性病史" placeholderTextColor="grey" onChangeText={text => setHistory(text)}></TextInput>
        </View>
        <View style={{ marginLeft:25,width: 300, height: 50, marginBottom: 0, alignItems: "center", flexDirection: 'row',borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:320}}>
            <Text>家庭病史： </Text>
            <TextInput defaultValue={family}  placeholder="家族病史" placeholderTextColor="grey" onChangeText={text => setFamily(text)}></TextInput>
        </View>
        <View style={{ marginLeft:25,width: 300, height: 50, marginBottom: 0, alignItems: "center", flexDirection: 'row',borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:320}}>
            <Text>过敏史： </Text>
            <TextInput defaultValue={allergy} placeholder="过敏史" placeholderTextColor="grey" onChangeText={text => setAllergy(text)}></TextInput>
        </View>
        <View style={{ marginLeft:25,width: 300, height: 50, marginBottom: 0, alignItems: "center", flexDirection: 'row',borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:320}}>
            <Text>用药历史： </Text>
            <TextInput  defaultValue={medicine} placeholder="用药历史" placeholderTextColor="grey" onChangeText={text => setMedicine(text)}></TextInput>
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
        <TouchableOpacity style={styles.next_wrapper} onPress ={update}>
            <Text style={styles.onsite_text}>确认</Text>
        </TouchableOpacity>
        </View>
        <View style={{height:300}}></View>
        </View>
        </ScrollView>
    );
}
  
export default HistoryInfo;