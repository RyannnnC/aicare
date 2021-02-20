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
  const goToAgency= () => {
    navigation.navigate('机构')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../images/login.png')}
        style = {styles.img}
      />
      <View style={styles.welcomeText}>
       <Text style={{ color: '#68B0AB', fontSize: 20, fontWeight: '600'}}>AICare</Text>
       <Text style={{fontWeight: '600', fontSize: 20}}>您的远程医疗护理好帮手</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.consumerWrapper} onPress={goToHome}>
          <Text style={styles.buttonText}>我提供上门护理</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.providerWrapper2} onPress={goToAgency}>
          <Text style={styles.buttonText}>我提供远程医疗</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deliveryWrapper} onPress={alertHandler}>
          <Text style={styles.buttonText}>我提供药品配送</Text>
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
