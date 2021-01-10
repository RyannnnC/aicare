import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity } from 'react-native';
import {styles} from '../style';
//import Navigator from './routes/homeStack';

const ProviderType = ({navigation}) => {
  const alertHandler= () => {
    Alert.alert('function unimplemented')
  }
  const goToHome= () => {
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../images/big.png')}
        style = {styles.img}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.consumerWrapper} onPress={goToHome}>
          <Text style={styles.buttonText}>上门服务</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.providerWrapper} onPress={alertHandler}>
          <Text style={styles.buttonText}>远程医疗</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deliveryWrapper} onPress={alertHandler}>
          <Text style={styles.buttonText}>外卖配送</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require('../images/logo.png')}
        style = {styles.img2}
      />
    </View>
  );
}
 export default ProviderType;
