import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,SafeAreaView,Switch,ScrollView } from 'react-native';
import {styles} from '../providerStyle';
import {data} from './data';

export default function Order() {
  const orders = data.map((item) => {
    return (
      <View style={styles.card}>
        <Text>{item.name}</Text>
        <Text>{item.address}</Text>
        <Text>{item.time}</Text>
        <Text>{item.price}</Text>
      </View>
    )
  });

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ScrollView>
        {orders}
      </ScrollView>
    </SafeAreaView>
  );
}
