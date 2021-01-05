import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity } from 'react-native';
import {styles} from './style';
//import Navigator from './routes/homeStack';

export default function App() {
  const alertHandler = () => {
    Alert.alert('consumer pressed')
  }
  return (
    <View style={styles.container}>
      <Image
        source={require('./images/big.png')}
        style = {styles.img}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.consumerWrapper}>
          <Text>我是消费者</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.providerWrapper}>
          <Text>我是服务者</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require('./images/logo.png')}
        style = {styles.img2}
      />
    </View>
  );
}
