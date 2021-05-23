
import React,{useContext} from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch,TextInput,ScrollView } from 'react-native';
import {styles} from '../../style';
import DataContext from "../../consumerContext";

export default function TeleSuccess({navigation,route}) {
  const user = useContext(DataContext);

  const goToIcon= () => {
    navigation.navigate('Home')
  }
  const {docName,doctype,startTime,endTime,teleFlg,mobile,method } = route.params;

  return (
    <ScrollView style={{backgroundColor:"white"}}>
    <View style={styles.container}>

    <Image style = {{marginTop:50,
    height:360,
    width:315,
    marginLeft:0}}
        source= {require('../../images/success.png')}
      />
      <View style={{flex:"start",marginLeft:5}}>
      <Text style={{marginBottom:15,marginTop:20,color:"#808080"}}>预约医生:  {docName}</Text>
      <Text style={{marginBottom:15,color:"#808080"}}>就诊时间:  {user.date} {startTime.slice(0,5)} - {endTime.slice(0,5)}</Text>
      <Text style={{marginBottom:15,color:"#808080"}}>就诊科目:  {user.deptType[doctype]}</Text>
      <Text style={{marginBottom:15,color:"#808080"}}>就诊方式:  {teleFlg==1?"远程就诊":"实地会诊"}</Text>
      {teleFlg==1?<Text style={{marginBottom:10,color:"#808080"}}>远程方式:  {method==1?"FaceTIme(IOS)":"Skype(Android)"}</Text>:null}
      </View>
    <TouchableOpacity style={{
    backgroundColor:'#8FD7D3',
    padding:10,
    width:220,
    marginLeft:10,
    marginTop:30,
    height:45,
    alignItems: 'center',
    borderRadius:25,
    }} onPress={goToIcon}>
      <Text style={styles.onsite_text}>确定</Text>
    </TouchableOpacity>

    <Image style = {{width:280,height:50,marginTop:260}}
      source = {require('../../images/icon/1/contact.png')}
    />
  </View>
  </ScrollView>
  );
}
