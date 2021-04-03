import React ,{Component}from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput } from 'react-native';
import {styles} from '../providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import DataContext from '../../providerContext';

export default class HealthServiceType extends Component {
  state={
    buttons: [
      { value:'1',name:'全科问诊',status: 1},
      { value:'2',name:'眼科问诊',status: 1},
      { value:'3',name:'心理问诊',status: 0},
      { value:'4',name:'中医问诊',status: 0},
      { value:'5',name:'少儿问诊',status: 0},
      { value:'6',name:'康复问诊',status: 0},
    ]
  };

  changeColor(index){
    let but = this.state.buttons;
    if(but[index].status == 0){
       but[index].status= 1
       this.setState({buttons: but});
    } else {
      but[index].status = 0
      this.setState({buttons: but});
    }
  }

  render() {
  return (
    <SafeAreaView style={{ flex:1 ,backgroundColor:'white'}}>
      <View style={{flexDirection: 'row', marginTop:30, marginLeft:30, marginBottom:10}}>
      <Image
        style = {styles.smallIconImg}
        source={require('../../images/providerImg/account_icon_profile_normal.png')}
      />
      <Text style={{ fontSize:16, fontWeight: '400' }}>种类选择</Text>
      </View>
      <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
      <TouchableOpacity style={{
        backgroundColor:this.state.buttons[0].status==1?'#FF7E67':'transparent',
        borderWidth: 1,
        borderColor: this.state.buttons[0].status==1?'white':'black',
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
        <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[0].status==1?'#FFFFFF': '#999999' }}>全科问诊</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
        backgroundColor:this.state.buttons[1].status==1?'#FF7E67':'transparent',
        borderWidth: 1,
        borderColor: this.state.buttons[1].status==1?'white':'black',
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
        <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[1].status==1?'#FFFFFF': '#999999' }}>眼科问诊</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
        backgroundColor:this.state.buttons[2].status==1?'#FF7E67':'transparent',
        borderWidth: 1,
        borderColor: this.state.buttons[2].status==1?'white':'black',
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
        <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[2].status==1?'#FFFFFF': '#999999' }}>心理问诊</Text>
      </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
      <TouchableOpacity style={{
        backgroundColor:this.state.buttons[3].status==1?'#FF7E67':'transparent',
        borderWidth: 1,
        borderColor: this.state.buttons[3].status==1?'white':'black',
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
      onPress={()=>this.changeColor(3)}>
        <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[3].status==1?'#FFFFFF': '#999999' }}>中医问诊</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
        backgroundColor:this.state.buttons[4].status==1?'#FF7E67':'transparent',
        borderWidth: 1,
        borderColor: this.state.buttons[4].status==1?'white':'black',
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
      onPress={()=>this.changeColor(4)}>
        <Text style={{ fontSize:12, fontWeight: '300', color:this.state.buttons[4].status==1?'#FFFFFF': '#999999' }}>少儿问诊</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
        backgroundColor:this.state.buttons[5].status==1?'#FF7E67':'transparent',
        borderWidth: 1,
        borderColor: this.state.buttons[5].status==1?'white':'black',
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
      onPress={()=>this.changeColor(5)}>
        <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[5].status==1?'#FFFFFF': '#999999' }}>康复问诊</Text>
      </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.resumeButton} onPress={() => {
        this.context.action.changeserviceclass(this.state.buttons);
        this.props.navigation.navigate('机构信息');}}>
        <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>确认</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );}
}
HealthServiceType.contextType = DataContext;
