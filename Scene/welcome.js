import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity, SafeAreaView } from 'react-native';
import {styles} from '../style';
//import Navigator from './routes/homeStack';
import I18n from './switchLanguage';

const Welcome = ({ navigation }) => {
  const alertHandler= () => {
    Alert.alert('function unimplemented')
  }
  const goToProvider= () => {
    navigation.navigate('登陆')
  }

  return (
   <SafeAreaView style={styles.container}>
     <Image
       source={require('../images/providerImg/launchpage_img_1.png')}
       style = {styles.img}
     />
     <View style={{marginTop:33,width:'60%',height: 70,justifyContent:'center',alignItems: "center"}}>
      <Text style={{ color: '#68B0AB', fontSize: 20, fontWeight: '600'}}>AICare</Text>
      <Text style={{fontWeight: '600', fontSize: 20,marginTop:5}}>您的远程医疗护理好帮手</Text>
     </View>
     <View style={{alignItems: "center",width:'75%' }}>
     <TouchableOpacity style={styles.consumerWrapper} onPress={alertHandler}>
       <Text style={styles.buttonText}>{I18n.t('consumer')}</Text>
     </TouchableOpacity>
     <TouchableOpacity style={styles.providerWrapper} onPress={goToProvider}>
       <Text style={styles.buttonText}>{I18n.t('provider')}</Text>
     </TouchableOpacity>
     </View>
     <Image
       source={require('../images/logo.png')}
       style = {styles.img2}
      />
   </SafeAreaView>
 );
}

export default Welcome;
