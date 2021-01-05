import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, Button, View, Alert } from 'react-native';
import {styles} from './style'

export default function Handler() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button
        onPress={() => Alert.alert('consumer pressed')}
        title="Consumer"
        color="#841584"
      />
      <Button
        onPress={() => Alert.alert('provider pressed')}
        title="Provider"
        color="#841584"
      />
      <StatusBar style="auto" />
    </View>
  );
}
