import React ,{Component}from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput } from 'react-native';
import {styles} from '../providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import DataContext from '../../providerContext';
import I18n from '../switchLanguage';

export default class Patients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      op:'',
      np:'',
      confirm:'',
    }
  }

  render() {
    return (
      <SafeAreaView style={{flex:1,backgroundColor:'rgb(51,51,51)'}}>
        <View style={{flexDirection:'row',width:'100%',height:'100%',alignItems:'center',justifyContent:'center'}}>
          <Image
            style={{height:'100%',width:'90%'}}
            resizeMode='stretch'
            source={require('../../images/providerImg/fake.png')}
          />
        </View>
      </SafeAreaView>
  );}
}
Patients.contextType = DataContext;
