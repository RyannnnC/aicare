import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch } from 'react-native';
import {styles} from './providerStyle';

export default function Plan() {
  const alertHandler= () => {
    Alert.alert('function unimplemented')
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Image
      style = {styles.img4}
      source = {require('../images/crayon-892.png')}
      />
    <Text>进行中</Text>
    </View>
  );
}
