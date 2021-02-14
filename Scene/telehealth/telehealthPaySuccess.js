
import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch,TextInput } from 'react-native';
import {styles} from '../../style';

export default function TeleSuccess({navigation}) {
  const goToIcon= () => {
    navigation.navigate('Home')
  }
  return (
    <View style={styles.container}>

    <Image style = {{marginTop:40,
    height:400,
    width:300,
    marginLeft:20}}
        source= {require('../../images/telehealth_success.png')}
      />
    
   
    <TouchableOpacity style={{
    backgroundColor:'#8FD7D3',
    padding:10,
    width:220,
    marginLeft:10,
    marginTop:50,
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
  );
}
