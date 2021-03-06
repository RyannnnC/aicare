import React ,{Component}from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput } from 'react-native';
import {styles} from '../providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';

export default class Introduction extends Component {
  state: {
    intro:"",
  };

  render() {
  return (
    <SafeAreaView style={{ flex:1, alignItems: "center" }}>
      <View style={{flexDirection: 'row', marginTop:30, marginBottom:10}}>
      <Image
        style = {styles.smallIconImg}
        source={require('../../images/providerImg/account_icon_profile_normal.png')}
      />
      <Text style={{ fontSize:16, fontWeight: '400' }}>详情填写</Text>
      </View>

      <View style={{width:315, height:120,borderWidth:1, borderColor:'#bbbbbb',borderRadius:11}}>
        <TextInput style={{width:275,height:60,marginTop:15,marginLeft:20,marginRight:20}}
          placeholder="Kingsford Clinic 是一家专注于为Kingsford华人社区服务的诊所，我们拥有权威且友善的正规全科及心理医生，是您的最佳选择。"
          onChangeText={(text) => {this.setState({ intro: text})}}
        />
      </View>
      <View style={{marginTop:40}}>
      <TouchableOpacity style={styles.resumeButton}>
        <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>确认</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );}
}
