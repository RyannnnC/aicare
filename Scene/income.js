import React from 'react';
import { Text, View, Image,SafeAreaView,ScrollView,TouchableOpacity, Alert} from 'react-native';
import {styles} from './providerStyle';
import {data} from './Orders/data';

export default function Income() {
  const alertHandler= () => {
    Alert.alert('function unimplemented')
  }
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Image
      style = {styles.img4}
      source = {require('../images/crayon-892.png')}
      />
    <Text>数据统计</Text>
    <View style={styles.buttons}>
      <TouchableOpacity style={styles.buttonContainer} onPress={alertHandler}>
        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '600'}}>$100</Text>
        <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600'}}>总余额</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer2} onPress={alertHandler}>
        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '600'}}>$500</Text>
        <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600'}}>本月转出</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer3} onPress={alertHandler}>
        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '600'}}>$756</Text>
        <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600'}}>本月收入</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}
