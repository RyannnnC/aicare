import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,} from 'react-native';
//import {styles} from '../style';
//import Navigator from './routes/homeStack';

const Welcome = ({ navigation }) => {
  const alertHandler= () => {
    Alert.alert('function unimplemented')
  }
  const goToConsumer= () => {
    navigation.navigate('登陆')
  }

  return (
   <View style={{
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
   }}>
     <Image
       source={require('../images/login.png')}
       style = {{
        width:375,
        height:375,
      }}
     />
     <View style={{
    width: 220,
    height: 70,
    textAlign: 'center',
    }}>
      <Text style={{ color: '#68B0AB', fontSize: 20, fontWeight: '600'}}>AICare</Text>
      <Text style={{fontWeight: '600', fontSize: 20}}>您的远程医疗护理好帮手</Text>
     </View>
     <TouchableOpacity style={{
    backgroundColor: '#8FD7D3',
    padding:10,
    width:280,
    marginTop:60,
    height:45,
    alignItems: 'center',
    borderRadius:25,
  }} onPress={goToConsumer}>
       <Text style={{
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  }}>我是消费者</Text>
     </TouchableOpacity>
     <TouchableOpacity style={{
    backgroundColor: '#FDB0A8',
    padding:10,
    width:280,
    marginTop:30,
    height:45,
    alignItems: 'center',
    borderRadius:25,
  }} onPress={alertHandler}>
       <Text style={{
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  }}>我是服务者</Text>
     </TouchableOpacity>
     <Image
       source={require('../images/logo1.png')}
       style = {{
        marginTop:70,
        width:120,
        height:32,
      }}
      />
   </View>
 );
}

export default Welcome;