import React ,{Component}from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput } from 'react-native';
import {styles} from '../providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';

export default class WorkExperience extends Component {
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
    <SafeAreaView style={{ flex:1, alignItems: "Left" }}>
      <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
      <Image
        style = {styles.smallIconImg}
        source={require('../../images/providerImg/account_icon_profile_normal.png')}
      />
      <Text style={{ fontSize:16, fontWeight: '400' }}>证书填写</Text>
      </View>
      <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
      <TouchableOpacity style={{
        backgroundColor:this.state.buttons[0].backgroundColor,
        borderWidth: this.state.buttons[0].borderWidth,
        height:30,
        width:'auto',
        marginTop:5,
        marginBottom:5,
        marginLeft: 10,
        marginRight: 10,
        borderRadius:10,
        paddingLeft:15,
        paddingRight:15,
      }}
      onPress={()=>this.changeColor(0)}>
        <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[0].fontColor }}>个人护理三级证书</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
        backgroundColor:this.state.buttons[1].backgroundColor,
        borderWidth: this.state.buttons[1].borderWidth,
        height:30,
        width:'auto',
        marginTop:5,
        marginBottom:5,
        marginLeft: 10,
        marginRight: 10,
        borderRadius:10,
        paddingLeft:15,
        paddingRight:15,
      }}
      onPress={()=>this.changeColor(1)}>
        <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[1].fontColor }}>养老护理四级证书</Text>
      </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row' , marginTop:10, marginBottom:10}}>
      <TouchableOpacity style={{
        backgroundColor:this.state.buttons[2].backgroundColor,
        borderWidth: this.state.buttons[2].borderWidth,
        height:30,
        width:'auto',
        marginTop:5,
        marginBottom:5,
        marginLeft: 10,
        marginRight: 10,
        borderRadius:10,
        paddingLeft:15,
        paddingRight:15,
      }}
      onPress={()=>this.changeColor(2)}>
        <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[2].fontColor }}>注册护士执照</Text>
      </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row' , marginTop:10, marginBottom:10}}>
        <TextInput style={styles.resumeInput} placeholder= "请填写需要添加的证书名称"/>
        <TouchableOpacity>
          <Image
            style = {styles.smallIconImg}
            source={require('../../images/providerImg/account_icon_add.png')}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.resumeButton}>
        <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>确认</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );}
}
