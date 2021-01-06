import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {styles} from '../style';
//import Navigator from './routes/homeStack';

export default function Home() {
  const goToConsumer = () => {
    Actions.login()
  }
  const goToProvider = () => {
    Actions.providerMain()
  }
  return (
    <View style={styles.container}>
      <Image
        source={require('../images/big.png')}
        style = {styles.img}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.consumerWrapper} onPress={goToConsumer}>
          <Text style={styles.buttonText}>我是消费者</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.providerWrapper} onPress={goToProvider}>
          <Text style={styles.buttonText}>我是服务者</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require('../images/logo.png')}
        style = {styles.img2}
      />
    </View>
  );
}
