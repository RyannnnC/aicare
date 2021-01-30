import React ,{Component}from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput } from 'react-native';
import {styles} from '../providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';

export default class PersonalTag extends Component {
  state={
    buttons: [
        { backgroundColor: 'transparent',borderWidth: 1,fontColor: '#999999', pressed: false, },
        { backgroundColor: 'transparent',borderWidth: 1,fontColor: '#999999', pressed: false, },
        { backgroundColor: 'transparent',borderWidth: 1,fontColor: '#999999', pressed: false, },
        { backgroundColor: 'transparent',borderWidth: 1,fontColor: '#999999', pressed: false, },
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
      <Text style={{ fontSize:16, fontWeight: '400' }}>简介填写</Text>
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
        <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[0].fontColor }}>粤语</Text>
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
        <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[1].fontColor }}>热情</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
        backgroundColor:this.state.buttons[2].backgroundColor,
        borderWidth: this.state.buttons[2].borderWidth,
        height:30,
        width:'auto',
        paddingLeft:15,
        paddingRight:15,
        marginTop:5,
        marginBottom:5,
        marginLeft: 10,
        marginRight: 10,
        borderRadius:10,
      }}
      onPress={()=>this.changeColor(2)}>
        <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[2].fontColor }}>幽默</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
        backgroundColor:this.state.buttons[3].backgroundColor,
        borderWidth: this.state.buttons[3].borderWidth,
        height:30,
        width:'auto',
        paddingLeft:15,
        paddingRight:15,
        marginTop:5,
        marginBottom:5,
        marginLeft: 10,
        marginRight: 10,
        borderRadius:10,
      }}
      onPress={()=>this.changeColor(3)}>
        <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[3].fontColor }}>为人友善</Text>
      </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
      <TouchableOpacity style={{
        backgroundColor:this.state.buttons[4].backgroundColor,
        borderWidth: this.state.buttons[4].borderWidth,
        height:30,
        width:'auto',
        paddingLeft:15,
        paddingRight:15,
        marginTop:5,
        marginBottom:5,
        marginLeft: 10,
        marginRight: 10,
        borderRadius:10,
      }}
      onPress={()=>this.changeColor(4)}>
        <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[4].fontColor }}>效率高</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
        backgroundColor:this.state.buttons[5].backgroundColor,
        borderWidth: this.state.buttons[5].borderWidth,
        height:30,
        width:'auto',
        paddingLeft:15,
        paddingRight:15,
        marginTop:5,
        marginBottom:5,
        marginLeft: 10,
        marginRight: 10,
        borderRadius:10,
      }}
      onPress={()=>this.changeColor(5)}>
        <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[5].fontColor }}>英语</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
        backgroundColor:this.state.buttons[6].backgroundColor,
        borderWidth: this.state.buttons[6].borderWidth,
        height:30,
        width:'auto',
        paddingLeft:15,
        paddingRight:15,
        marginTop:5,
        marginBottom:5,
        marginLeft: 10,
        marginRight: 10,
        borderRadius:10,
      }}
      onPress={()=>this.changeColor(6)}>
        <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[6].fontColor }}>烹饪</Text>
      </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row' , marginTop:10, marginBottom:10}}>
        <TextInput style={styles.resumeInput} placeholder= "请填写需要添加的简介介绍"/>
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
