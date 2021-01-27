import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,SafeAreaView } from 'react-native';
import {styles} from '../style';
//import Navigator from './routes/homeStack';

const ProviderType = ({navigation}) => {
  const alertHandler= () => {
    Alert.alert('function unimplemented')
  }
  const goToHome= () => {
    navigation.navigate('登陆')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../images/login.png')}
        style = {styles.img}
      />
      <View style={styles.welcomeText}>
       <Text style={{ color: '#68B0AB', fontSize: 20, fontWeight: '600'}}>Aged Care</Text>
       <Text style={{fontWeight: '600', fontSize: 20}}>专注与老年人的远程服务</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.consumerWrapper} onPress={goToHome}>
          <Text style={styles.buttonText}>上门服务</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.providerWrapper2} onPress={alertHandler}>
          <Text style={styles.buttonText}>远程医疗</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deliveryWrapper} onPress={alertHandler}>
          <Text style={styles.buttonText}>外卖配送</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require('../images/logo.png')}
        style = {styles.img2}
      />
    </SafeAreaView>
  );
}
 export default ProviderType;
