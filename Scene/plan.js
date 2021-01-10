import React from 'react';
import { Text, View, Image,SafeAreaView,ScrollView } from 'react-native';
import {styles} from './providerStyle';
import {data} from './Orders/data';

export default function Plan() {
  const orders = data.map((item) => {
    return (
      <View style={styles.plans}>
        <Text>{item.time}</Text>
        <Text>{item.name}</Text>
        <Text>{item.address}</Text>
      </View>
    )
  });
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Image
      style = {styles.img4}
      source = {require('../images/crayon-892.png')}
      />
    <Text>进行中</Text>
    <ScrollView>
      {orders}
    </ScrollView>
    </SafeAreaView>
  );
}
