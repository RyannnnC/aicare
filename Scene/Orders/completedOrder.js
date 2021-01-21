import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch } from 'react-native';
import {styles} from '../providerStyle';

const CompletedOrder = ({navigation}) => {
  const alertHandler= () => {
    Alert.alert('function unimplemented')
  }
  const goToOrder= () => {
    navigation.navigate('上门服务')
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        style = {styles.finishImg}
        source = {require('../../images/providerImg/order_img_finish.png')}
        />
       <Text style={{ color: '#333333', fontSize: 16, fontWeight: '400'}}>您还没有完成的订单哦，快去完成吧！</Text>
    </View>
  );
}
 export default CompletedOrder;
