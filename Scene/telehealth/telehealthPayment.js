import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity, TextInput,Switch,ScrollView } from 'react-native';
import {styles} from '../../style';
//import { Checkbox } from 'react-native-paper';
import { StackActions } from '@react-navigation/native';
import DataContext from "../../consumerContext"
import call from 'react-native-phone-call'
import { CheckBox } from 'react-native-elements';

const args = {
  number: '0403555432', // String value with the number to call
  prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
}
//import { Checkbox } from 'react-native-paper/lib/typescript/components/Checkbox/Checkbox';
//mport { grey100 } from 'react-native-paper/lib/typescript/styles/colors';
export default function telehealthPayment({navigation}) {
  const goBack= () => {
    navigation.dispatch(StackActions.pop(1))
  }
  const makecall=()=>{
    call(args).catch(console.error)
  }
  const gotoSuccess= () => {
    
    navigation.navigate("teleSuccess")
  }  
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);
  
  return (
    <DataContext.Consumer>
    {(state)  => (
    <ScrollView style={{ flex:1,backgroundColor:"white"}}>


    <View style={styles.container}>
    <TouchableOpacity onPress = {goBack}>
      <Image
        style = {styles.arrow_image}
        source={require('../../images/icon/2/Arrow_left.png')}
      />
    </TouchableOpacity>

    <Text style = {styles.service}>订单支付</Text>
    <Image style = {styles.address_image}
        source= {require('../../images/icon/3/money.png')}
      />
    
    <View style ={styles.comment_container}>
      {/*this need to be automatically shown instead of hard code but where 
      can we store these states?*/}
      <Text>远程问诊(含税)           </Text>
      <Text>${45}</Text>
    </View>
    

    
    
    <Image style = {styles.address_image}
        source= {require('../../images/icon/3/payment.png')}
      />
    
    <View style ={styles.comment_container}>
      <Image style = {styles.wechat_image}
        source= {require('../../images/icon/3/alipay.png')}
      />
      <CheckBox
            checked={checked2 }
            checkedColor='#FF8570'
            uncheckedIcon='circle-thin'
            checkedIcon='check-circle'
            size={33}
            containerStyle={{marginTop:-14,marginLeft:53}}
            onPress={() => {
            setChecked2(!checked2);
            setChecked3(false);
            }}
          />
     
    </View>
    <View style ={styles.comment_container}>
      <Image style = {styles.wechat_image}
        source= {require('../../images/icon/3/mastercard.png')}
      />
      <CheckBox
            checked={checked3 }
            checkedColor='#FF8570'
            uncheckedIcon='circle-thin'
            checkedIcon='check-circle'
            size={33}
            containerStyle={{marginTop:-14,marginLeft:53}}
            onPress={() => {
            setChecked2(false);
            setChecked3(!checked3);
            }}
          />
    </View>
    <TouchableOpacity onPress={makecall}>
            <Image
                style={{width:60,height:60,borderRadius:30,bottom:-25,right:-190}}
                source = {require("../../images/mobile_icon.png")}
            />
    </TouchableOpacity>
    
    {checked2 || checked3 ?<View style={{marginTop:10,mariginLeft:-30}}>
    <TouchableOpacity style={styles.next_wrapper} onPress = {gotoSuccess}>
      {/*this need to manually calculated */}
      <Text style={styles.onsite_text}>确认支付$45</Text>
    </TouchableOpacity></View>:null}

    <Image style = {styles.bottom}
        source={require('../../images/icon/3/bottom3.png')}
    />
    
    

    <Image style = {styles.contact}
      source = {require('../../images/icon/1/contact.png')}
    />
  </View>
  </ScrollView>

  )}
  </DataContext.Consumer>
  );
}
