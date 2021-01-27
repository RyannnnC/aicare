import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch } from 'react-native';
import {styles} from '../../style';

const CompletedOrder = ({navigation}) => {
  const alertHandler= () => {
    Alert.alert('function unimplemented')
  }
  /*const goToOrder= () => {
    navigation.navigate('上门服务')
  }
*/
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        style = {styles.finishImg}
        source = {require('../../images/complete_empty.png')}
        />
       <Text style={{ color: '#333333', fontSize: 16, fontWeight: '400'}}>您还没有已完成的订单哦，快去预定吧！</Text>
    </View>
  );
}
 export default CompletedOrder;