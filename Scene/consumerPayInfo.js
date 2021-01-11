import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity, TextInput } from 'react-native';
import {styles} from '../style';
import { Checkbox } from 'react-native-paper';
import { StackActions } from '@react-navigation/native';

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
      <Text>服务*3小时           </Text>
      <Text>$160</Text>
    </View>
    <View style ={styles.comment_container}>
      {/*this need to be automatically shown instead of hard code but where 
      can we store these states?*/}
      <Text>食材购买服务费       </Text>
      <Text>$20</Text>
      
    </View>

    <View style ={styles.comment_container}>
      {/*this need to be automatically shown instead of hard code but where 
      can we store these states?*/}
      <Text>GST                 </Text>
      <Text>$18</Text>

    </View>
    <View style ={styles.comment_container}>
      {/*this need to be automatically shown instead of hard code but where 
      can we store these states?*/}
      <Text>总费用              </Text>
      <Text>$198</Text>
      
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
        setChecked2(!checked2);
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
  );
}
