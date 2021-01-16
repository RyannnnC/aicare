import React ,{Component}from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput } from 'react-native';
import {styles} from '../providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default class Certificate extends Component {
  state={
    buttons: [
        { backgroundColor: 'transparent',borderWidth: 1,fontColor: '#999999', pressed: false, },
        { backgroundColor: 'transparent',borderWidth: 1,fontColor: '#999999', pressed: false, },
        { backgroundColor: 'transparent',borderWidth: 1,fontColor: '#999999', pressed: false, },
    ]
  };

  changeColor(index){
    let but = this.state.buttons;
    if(!but[index].pressed){
       but[index].pressed = true;
       but[index].backgroundColor = '#FF7E67';
       but[index].borderWidth = 0;
       but[index].fontColor = '#FFFFFF';
       this.setState({buttons: but});
    } else {
      but[index].pressed = false;
      but[index].backgroundColor = 'transparent';
      but[index].borderWidth = 1;
      but[index].fontColor = '#999999';
      this.setState({buttons: but});
    }
  }

  render() {
  return (
    <SafeAreaView style={{ flex:1, alignItems: "center" }}>
      <View style={{flexDirection: 'row', marginTop:10, marginBottom:10, marginLeft:7, marginRight: 7}}>
      <Image
        style = {styles.smallIconImg}
        source={require('../../images/providerImg/account_icon_profile_normal.png')}
      />
      <Text style={{ fontSize:16, fontWeight: '400' }}>待上传</Text>
      </View>
      <TouchableOpacity>
        <Image
          style = {styles.bigIconImg}
          source={require('../../images/providerImg/account_icon_add.png')}
        />
      </TouchableOpacity>
      <View style={{flexDirection: 'row', marginTop:10, marginBottom:10, marginLeft:7, marginRight: 7}}>
      <Image
        style = {styles.smallIconImg}
        source={require('../../images/providerImg/account_icon_profile_normal.png')}
      />
      <Text style={{ fontSize:16, fontWeight: '400' }}>已上传</Text>
      </View>

      <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
      <TouchableOpacity style={{
        flexDirection: 'row',
        backgroundColor:this.state.buttons[0].backgroundColor,
        borderWidth: this.state.buttons[0].borderWidth,
        height:30,
        width:'auto',
        marginTop:5,
        marginBottom:5,
        marginLeft: 10,
        marginRight: 10,
        borderRadius:10,
      }}
      onPress={()=>this.changeColor(0)}>
        <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[0].fontColor }}>个人护理三级证书</Text>
        <AntDesign name="close" size={24} color="black" />
      </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.resumeButton}>
        <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>确认</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );}
}
