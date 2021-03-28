import React ,{Component}from 'react';
import { Dimensions, Text, Button, View, Alert, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput } from 'react-native';
import {styles} from '../providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';

export default class Languages extends Component {
  state={
    buttons: [
        { backgroundColor: 'transparent',fontColor: '#999999', pressed: false, borderColor:'black' },
        { backgroundColor: 'transparent',fontColor: '#999999', pressed: false, borderColor:'black' },
        { backgroundColor: 'transparent',fontColor: '#999999', pressed: false, borderColor:'black' },
        { backgroundColor: 'transparent',fontColor: '#999999', pressed: false, borderColor:'black' },
        { backgroundColor: 'transparent',fontColor: '#999999', pressed: false, borderColor:'black' },
        { backgroundColor: 'transparent',fontColor: '#999999', pressed: false, borderColor:'black' },
        { backgroundColor: 'transparent',fontColor: '#999999', pressed: false, borderColor:'black' },
    ],
    tags: {
      tag: '',
      tagsArray: []
    },
  };

  
  changeColor(index){
    let but = this.state.buttons;
    if(!but[index].pressed){
       but[index].pressed = true;
       but[index].backgroundColor = '#FF7E67';
       but[index].borderColor = 'white';
       but[index].fontColor = '#FFFFFF';
       this.setState({buttons: but});
    } else {
      but[index].pressed = false;
      but[index].backgroundColor = 'transparent';
      but[index].borderColor = 'black';
      but[index].fontColor = '#999999';
      this.setState({buttons: but});
    }
  }

  render() {
  return (
    <SafeAreaView style={{ flex:1 ,backgroundColor:'white',alignItems:'center'}}>
      <View style={{width:'85%'}}>
      <View style={{flexDirection: 'row',marginLeft:30,marginTop:30, marginBottom:10}}>
      <Image
        style = {styles.smallIconImg}
        source={require('../../images/providerImg/account_icon_profile_normal.png')}
      />
      <Text style={{ fontSize:16, fontWeight: '400' }}>语言选择</Text>
      </View>
      <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
      <TouchableOpacity style={{
        backgroundColor:this.state.buttons[0].backgroundColor,
        borderWidth: 1,
        borderColor:this.state.buttons[0].borderColor,
        height:30,
        width:'auto',
        marginTop:5,
        marginBottom:5,
        marginLeft: 10,
        marginRight: 10,
        borderRadius:10,
        paddingLeft:15,
        paddingRight:15,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={()=>this.changeColor(0)}>
        <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[0].fontColor }}>普通话</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
        backgroundColor:this.state.buttons[1].backgroundColor,
        borderWidth: 1,
        borderColor:this.state.buttons[1].borderColor,
        height:30,
        width:'auto',
        marginTop:5,
        marginBottom:5,
        marginLeft: 10,
        marginRight: 10,
        borderRadius:10,
        paddingLeft:15,
        paddingRight:15,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={()=>this.changeColor(1)}>
        <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[1].fontColor }}>粤语</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
        backgroundColor:this.state.buttons[2].backgroundColor,
        borderWidth: 1,
        borderColor:this.state.buttons[2].borderColor,
        height:30,
        width:'auto',
        paddingLeft:15,
        paddingRight:15,
        marginTop:5,
        marginBottom:5,
        marginLeft: 10,
        marginRight: 10,
        borderRadius:10,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={()=>this.changeColor(2)}>
        <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[2].fontColor }}>英语</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
        backgroundColor:this.state.buttons[3].backgroundColor,
        borderWidth: 1,
        borderColor:this.state.buttons[3].borderColor,
        height:30,
        width:'auto',
        paddingLeft:15,
        paddingRight:15,
        marginTop:5,
        marginBottom:5,
        marginLeft: 10,
        marginRight: 10,
        borderRadius:10,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={()=>this.changeColor(3)}>
        <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[3].fontColor }}>法语</Text>
      </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
      <TouchableOpacity style={{
        backgroundColor:this.state.buttons[4].backgroundColor,
        borderWidth: 1,
        borderColor:this.state.buttons[4].borderColor,
        height:30,
        width:'auto',
        paddingLeft:15,
        paddingRight:15,
        marginTop:5,
        marginBottom:5,
        marginLeft: 10,
        marginRight: 10,
        borderRadius:10,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={()=>this.changeColor(4)}>
        <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[4].fontColor }}>泰语</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
        backgroundColor:this.state.buttons[5].backgroundColor,
        borderWidth: 1,
        borderColor:this.state.buttons[5].borderColor,
        height:30,
        width:'auto',
        paddingLeft:15,
        paddingRight:15,
        marginTop:5,
        marginBottom:5,
        marginLeft: 10,
        marginRight: 10,
        borderRadius:10,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={()=>this.changeColor(5)}>
        <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[5].fontColor }}>德语</Text>
      </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.resumeButton}>
        <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>确认</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );}
}
