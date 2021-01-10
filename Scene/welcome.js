import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity, SafeAreaView } from 'react-native';
import {styles} from '../style';
//import Navigator from './routes/homeStack';

const Welcome = ({ navigation }) => {
  const alertHandler= () => {
    Alert.alert('function unimplemented')
  }
  const goToProvider= () => {
    navigation.navigate('请选择服务类型')
  }

  return (
   <SafeAreaView style={styles.container}>
     <Image
       source={require('../images/login.png')}
       style = {styles.img}
     />
     <TouchableOpacity style={styles.consumerWrapper} onPress={alertHandler}>
       <Text style={styles.buttonText}>我是消费者</Text>
     </TouchableOpacity>
     <TouchableOpacity style={styles.providerWrapper} onPress={goToProvider}>
       <Text style={styles.buttonText}>我是服务者</Text>
     </TouchableOpacity>
     <Image
       source={require('../images/logo.png')}
       style = {styles.img2}
     />
   </SafeAreaView>
 );
}

export default Welcome;
