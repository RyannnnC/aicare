import React,{Component} from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,SafeAreaView } from 'react-native';
import {styles} from '../../style';
import DataContext from "../../providerContext";

export default class Agency extends Component {
  alertHandler ()  {
    Alert.alert('function unimplemented')
  }
  goToHome()  {
    this.context.action.changeHealth(true);
    this.props.navigation.navigate('登陆');
  }

  render() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../images/login.png')}
        style = {styles.img}
      />
      <View style={styles.welcomeText}>
       <Text style={{ color: '#68B0AB', fontSize: 20, fontWeight: '600'}}>AICare</Text>
       <Text style={{fontWeight: '600', fontSize: 20}}>您的远程医疗护理好帮手</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.consumerWrapper} onPress={()=>this.goToHome()}>
          <Text style={styles.buttonText}>我是机构</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deliveryWrapper} onPress={() => this.alertHandler()}>
          <Text style={styles.buttonText}>我是医生</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require('../../images/logo.png')}
        style = {styles.img2}
      />
    </SafeAreaView>
  );}
}
Agency.contextType = DataContext;
