import React from 'react';
import { Text, View, Image,SafeAreaView,ScrollView,TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import {styles} from '../providerStyle';
import {data} from './data';

export default function ProcessingOrder() {
  const orders = data.map((item) => {
    return (
      <View style={styles.card}>
        <Text>{item.name}</Text>
        <Text>{item.address}</Text>
        <Text>{item.time}</Text>
        <Text>{item.price}</Text>
        <View style={{flexDirection: 'row-reverse'}}>
          <TouchableOpacity style={styles.orderButton2}>
          <Text style={{fontSize:14, color:'#FAFAFA'}}>开始</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  });

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ScrollView style={{ flex: 1}}>
        {orders}
      </ScrollView>
    </SafeAreaView>
  );
}
