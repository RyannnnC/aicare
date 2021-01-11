import React from 'react';
import { Text, View, Image,SafeAreaView,ScrollView } from 'react-native';
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
      </View>
    )
  });

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        style = {styles.orderImg}
        source = {require('../../images/crayon-1018.png')}
      />
      <View style={styles.searchBar}>
        <SearchBar
          inputStyle={{backgroundColor: 'white'}}
          containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}
          inputContainerStyle={{backgroundColor: 'white'}}
          placeholder="搜索类型"
          />
      </View>
      <ScrollView style={{ flex: 1}}>
        {orders}
      </ScrollView>
    </SafeAreaView>
  );
}
