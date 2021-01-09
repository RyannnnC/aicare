import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch } from 'react-native';
import {styles} from './providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function Account() {
  const alertHandler= () => {
    Alert.alert('function unimplemented')
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={styles.buttons}>
        <MaterialCommunityIcons name="calendar-text-outline" size={24} color="black" />
        <Text>订单</Text>
        <MaterialCommunityIcons name="comment-multiple-outline" size={24} color="black" />
        <Text>评价</Text>
        <Ionicons name="wallet" size={24} color="black" />
        <Text>流水</Text>
      </View>
    </View>
  );
}
