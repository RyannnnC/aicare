
import React,{useContext} from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch,TextInput,ScrollView } from 'react-native';
import {styles} from '../../style';
import DataContext from "../../consumerContext";
import I18n from "../language"
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
        source= {user.language=="en"?require("../../images/success_eng.png"):require('../../images/success.png')}
      />
      <View style={{alignItems:"flex-start",marginLeft:5}}>
      <Text style={{marginBottom:15,marginTop:20,color:"#808080"}}>{I18n.t("doctor")}:  {docName}</Text>
      <Text style={{marginBottom:15,color:"#808080"}}>{I18n.t("slot_doctorinfo")}:  {user.date} {startTime.slice(0,5)} - {endTime.slice(0,5)}</Text>
      <Text style={{marginBottom:15,color:"#808080"}}>{I18n.t("doctor_type_doctorinfo")}:  {I18n.t("types")[doctype]}</Text>
      <Text style={{marginBottom:15,color:"#808080"}}>{I18n.t("on_clinicinfo")}:  {teleFlg==2?I18n.t("online_clinicinfo"):I18n.t("onsite_clinicinfo")}</Text>
      {teleFlg==2?<Text style={{marginBottom:10,color:"#808080"}}>{I18n.t("online_method_doctorinfo")}:  {method==1?"FaceTIme(IOS)":"Skype(Android)"}</Text>:null}
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
      <Text style={styles.onsite_text}>{I18n.t("confirm_success")}</Text>
    </TouchableOpacity>

    
  </View>
  </ScrollView>
  );
}
