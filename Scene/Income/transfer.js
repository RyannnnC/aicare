import React from 'react';
import { Text, View, Image,ScrollView,TouchableOpacity, Alert,SafeAreaView} from 'react-native';
import {styles} from '../providerStyle';
import {data} from './incomeData';

const incomes = data.map((item) => {
  return (
    <View style={styles.incomeCard}>
      <View style={{flexDirection: 'row', marginTop:5, marginBottom:5, marginLeft:5, marginRight:5}}>
        <Image
          style = {styles.incomeIcon}
          source={require('../../images/providerImg/person_img2.png')}
        />
        <View>
          <Text>{item.name}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text>{item.time}</Text>
            <Text>+ {item.price}</Text>
          </View>
        </View>
      </View>
    </View>
  )
});

const Transfer = ({navigation}) => {
  return (
    <SafeAreaView style={{ flex:1, justifyContent: "center", alignItems: "center" }}>
      <ScrollView style={{ flex:1,}}>
        {incomes}
      </ScrollView>
      <TouchableOpacity style={styles.resumeButton} onPress={() => navigation.navigate('资金转出')}>
        <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>转出</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
 export default Transfer;
