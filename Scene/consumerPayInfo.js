import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity, TextInput } from 'react-native';
import {styles} from '../style';
import { Checkbox } from 'react-native-paper';
import { StackActions } from '@react-navigation/native';
import DataContext from "../consumerContext"
export default function ConsumerPayInfo({navigation}) {
  const goBack= () => {
    navigation.dispatch(StackActions.pop(1))
  }
  const gotoSuccess= () => {
    navigation.navigate("consumerPaySuccess")
  }  
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);
  
  return (
    <DataContext.Consumer>
    {(state)  => (
    <View style={styles.container}>
    <TouchableOpacity onPress = {goBack}>
      <Image
        style = {styles.arrow_image}
        source={require('../images/icon/2/Arrow_left.png')}
      />
    </TouchableOpacity>

    <Text style = {styles.service}>订单支付</Text>
    <Image style = {styles.address_image}
        source= {require('../images/icon/3/money.png')}
      />
    
    <View style ={styles.comment_container}>
      {/*this need to be automatically shown instead of hard code but where 
      can we store these states?*/}
      <Text>服务*{state.total_time}小时           </Text>
      <Text>${state.total_time*40}</Text>
    </View>
    {state.extra_supply?<View style ={styles.comment_container}>
      {/*this need to be automatically shown instead of hard code but where 
      can we store these states?*/}
      <Text>食材购买服务费       </Text>
      <Text>$20</Text>
      
    </View>:null}

    <View style ={styles.comment_container}>
      {/*this need to be automatically shown instead of hard code but where 
      can we store these states?*/}
      <Text>GST                 </Text>
      <Text>${0.2*(state.total_time*40+(state.extra_supply?20:0))}</Text>
    </View>
    <View style ={styles.comment_container}>
      {/*this need to be automatically shown instead of hard code but where 
      can we store these states?*/}
      <Text>总费用              </Text>
      <Text>{state.total_time*40 + (state.extra_supply?20:0) + 0.2*(state.total_time*40+(state.extra_supply?20:0))}</Text>
      
    </View>
    
    <Image style = {styles.address_image}
        source= {require('../images/icon/3/payment.png')}
      />
    <View style ={styles.comment_container}>
      <Image style = {styles.wechat_image}
        source= {require('../images/icon/3/wechat.png')}
      />
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
      <Image style = {styles.wechat_image}
        source= {require('../images/icon/3/alipay.png')}
      />
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
      <Image style = {styles.wechat_image}
        source= {require('../images/icon/3/mastercard.png')}
      />
      <Checkbox
      status={checked3 ? 'checked' : 'unchecked'}
      onPress={() => {
        setChecked1(false);
        setChecked2(false);
        setChecked3(!checked3);
      }}
    />
    </View>
    {checked3?<View style = {styles.container}>
      <View style ={styles.comment_container}>
        <TextInput style = {styles.time}
          placeholder="姓名"
        />
        <TextInput style = {styles.time}
          placeholder="到期日期"
        />
      </View> 
      <TextInput style = {styles.account}
          placeholder="卡号"
      />
      <TextInput style = {styles.account}
          placeholder="CVV"
      />
      <Text>请您确认所有信息无误后点击确认，支付完成后我们将发送短信向您确认订单。</Text>
    <TouchableOpacity style={styles.next_wrapper} onPress = {gotoSuccess}>
      {/*this need to manually calculated */}
      <Text style={styles.onsite_text}>确认支付$198</Text>
    </TouchableOpacity>
    </View>: null}


    <Image style = {styles.bottom}
        source={require('../images/icon/3/bottom3.png')}
    />
    

    <Image style = {styles.contact}
      source = {require('../images/icon/1/contact.png')}
    />
  </View>
  )}
  </DataContext.Consumer>
  );
}
