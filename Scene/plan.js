import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch } from 'react-native';
import {styles} from './providerStyle';

export default function Plan() {
  const alertHandler= () => {
    Alert.alert('function unimplemented')
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text> Plan page!</Text>
    </View>
  );
}
