import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch } from 'react-native';
import {styles} from '../style';


const  ConsumerIcon= ({navigation}) => {
  const goToOrder= () => {
    navigation.navigate('consumerOrder')
  }

  const alertHandler= () => {
    Alert.alert('此功能还未完善')
  }

  return (
    <View style={styles.container}>
    <Image
      style = {styles.topping_image}
      source={require('../images/icon/1/topping.png')}
    />
    

    <Text style = {styles.service}>请选择服务类型</Text>
    <Image
      style = {styles.choice}
      source = {require('../images/icon/2/choice.png')}
    />

    <TouchableOpacity onPress = {goToOrder}>
      <Image
        style = {styles.button_image}
        source = {require('../images/icon/1/store_image.png')}
      />
    </TouchableOpacity>

    <TouchableOpacity onPress = {alertHandler}>
      <Image
        style = {styles.button_image}
        source = {require('../images/icon/1/booking_image.png')}
      />
    </TouchableOpacity>

    <TouchableOpacity onPress = {alertHandler}>
      <Image
        style = {styles.button_image}
        source = {require('../images/icon/1/delivery_image.png')}
      />
    </TouchableOpacity>


    

    <Image style = {styles.contact}
      source = {require('../images/icon/1/contact.png')}
    />
  </View>
  );
}
export default ConsumerIcon;