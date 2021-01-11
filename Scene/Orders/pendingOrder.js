import React from 'react';
import { Text, View, Image,SafeAreaView,ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import {styles} from '../providerStyle';
import {data} from './data';

export default function PendingOrder() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>pending Page</Text>
    </SafeAreaView>
  );
}
