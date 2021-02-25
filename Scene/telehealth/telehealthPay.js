import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity, TextInput,Switch,ScrollView } from 'react-native';
import {styles} from '../../style';
import { Checkbox } from 'react-native-paper';
import { StackActions } from '@react-navigation/native';
//import DataContext from "../consumerContext"
import call from 'react-native-phone-call'

const args = {
  number: '0403555432', // String value with the number to call
  prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
}
//import { Checkbox } from 'react-native-paper/lib/typescript/components/Checkbox/Checkbox';
//mport { grey100 } from 'react-native-paper/lib/typescript/styles/colors';
export default function TelePay({navigation}) {
  const goBack= () => {
    navigation.dispatch(StackActions.pop(1))
  }
  const makecall=()=>{
    call(args).catch(console.error)
  }
  const gotoSuccess= () => {
    navigation.navigate("teleConfirm")
  }  
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);
  
  return (

    <ScrollView style={{backgroundColor:"white"}}>

    <View style={styles.container}>
    <View style={{flexDirection:'row',marginTop:20,marginLeft:-140}}>
    <TouchableOpacity onPress = {goBack} style={{marginRight:60}}>
      <Image
        style = {styles.arrow_image}
        source={require('../../images/icon/2/Arrow_left.png')}
      />
    </TouchableOpacity>
    
    <Text style = {styles.service}>保险申报</Text>
    </View>
    <Image style = {styles.address_image}
        source= {require('../../images/insurance.png')}
      />
    
    <View style ={styles.comment_container}>
      <Text>Medicare</Text>
      <Checkbox
      status={checked1 ? 'checked' : 'unchecked'}
      onPress={() => {
        setChecked1(!checked1);
        setChecked2(false);
        setChecked3(false);
      }}
    />
    </View>
    <View style ={styles.comment_container}>
      <Text>Bupa/Medibank/OSHC/其他</Text>
      <Checkbox
      status={checked2 ? 'checked' : 'unchecked'}
      onPress={() => {
        setChecked1(false);
        setChecked2(!checked2);
        setChecked3(false);
      }}
    />
    </View>
    <View style ={styles.comment_container}>
      <Text>无保险</Text>
      <Checkbox
      status={checked3 ? 'checked' : 'unchecked'}
      onPress={() => {
        setChecked1(false);
        setChecked2(false);
        setChecked3(!checked3);
      }}
    />
    </View>
    <TouchableOpacity onPress={makecall}>
            <Image
                style={{width:60,height:60,position:"absolute",borderRadius:30,bottom:-25,right:-190}}
                source = {require("../../images/mobile_icon.png")}
            />
    </TouchableOpacity>
    {checked1?<View style = {styles.container}>
        <Text style={{color:"#999999"}}>通过Medicare，您的诊金可被全部报销。</Text>
        <TextInput style = {styles.account}
          placeholder="姓名"
        />
        <TextInput style = {styles.account}
          placeholder="到期日期"
        />
      <TextInput style = {styles.account}
          placeholder="卡号"
      />
      <TextInput style = {styles.account}
          placeholder="序列号"
      />
      
    <TouchableOpacity style={styles.next_wrapper} onPress = {gotoSuccess}>
      {/*this need to manually calculated */}
      <Text style={styles.onsite_text}>下一步</Text>
    </TouchableOpacity>
    </View>: null}
    {checked2?<View style = {styles.container}>
      <Text style={{color:"#999999"}}>若持有Bupa或Medibank，您的诊金可被全部报销；若持有OSHC，您的诊金可被部分报销。若持有私人保险，您可以按照正常程序向您的医保卡公司申请报销。</Text>
        
      <TextInput style = {styles.account}
          placeholder="保险人姓名"
      />
      <TextInput style = {styles.account}
          placeholder="保险号码(Policy Number)"
      />
      
    <TouchableOpacity style={styles.next_wrapper} onPress = {gotoSuccess}>
      {/*this need to manually calculated */}
      <Text style={styles.onsite_text}>下一步</Text>
    </TouchableOpacity>
    </View>: null}
    {checked3?<View style = {styles.container}>
      
        

    <Text style={{color:"#999999"}}>若未持有保险，您无法享有诊金报销。</Text>
    <TouchableOpacity style={styles.next_wrapper} onPress = {gotoSuccess}>
      {/*this need to manually calculated */}
      <Text style={styles.onsite_text}>下一步</Text>
    </TouchableOpacity>
    </View>: null}

    
    <View style={{marginTop:160}}></View>
    <Image style = {styles.contact}
      source = {require('../../images/icon/1/contact.png')}
    />
  </View>
  </ScrollView>

  )}

