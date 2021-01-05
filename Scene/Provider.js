import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch } from 'react-native';
import {styles} from './providerStyle';

export default function Provider() {
  const alertHandler= () => {
    Alert.alert('function unimplemented')
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>请选择服务类型</Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={alertHandler}>
        <Image
          style = {styles.store}
          source = {require('../images/Store.png')}
          />
        <Text style={styles.buttonText}>上门服务</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer2} onPress={alertHandler}>
        <Image
          style = {styles.store}
          source = {require('../images/To-do.png')}
        />
        <Text style={styles.buttonText}>远程医疗</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer3} onPress={alertHandler}>
        <Image
          style = {styles.store}
          source = {require('../images/Banquet.png')}
          />
        <Text style={styles.buttonText}>外卖配送</Text>
      </TouchableOpacity>
      <Image
        style = {styles.img2}
        source = {require('../images/crayon-1317.png')}
        />
    </View>
  );
}
