import React ,{Component}from 'react';
import { Dimensions, Text, Button, View, Alert, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput } from 'react-native';
import {styles} from '../providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import DataContext from '../../providerContext';

export default class Languages extends Component {
  state={
    buttons: [
        { value:'1',name:'普通话',status: 1},
        { value:'2',name:'英语',status: 1},
        { value:'3',name:'粤语',status: 0},
        { value:'4',name:'法语',status: 0},
        { value:'5',name:'德语',status: 0},
        { value:'6',name:'俄语',status: 0},
    ],
  };

  changeColor(index){
    let but = this.state.buttons;
    if(but[index].status == 0){
       but[index].status = 1;
       this.setState({buttons: but});
    } else {
      but[index].status = 0;
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
        backgroundColor:this.state.buttons[0].status==1?'#FF7E67':'transparent',
        borderWidth: 1,
        borderColor:this.state.buttons[0].status==1?'white':'black',
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
        <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[0].status==1?'#FFFFFF': '#999999'}}>普通话</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
        backgroundColor:this.state.buttons[1].status==1?'#FF7E67':'transparent',
        borderWidth: 1,
        borderColor:this.state.buttons[1].status==1?'white':'black',
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
        <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[1].status==1?'#FFFFFF': '#999999' }}>粤语</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
        backgroundColor:this.state.buttons[2].status==1?'#FF7E67':'transparent',
        borderWidth: 1,
        borderColor:this.state.buttons[2].status==1?'white':'black',
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
        <Text style={{ fontSize:12, fontWeight: '300', color:this.state.buttons[2].status==1?'#FFFFFF': '#999999' }}>英语</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
        backgroundColor:this.state.buttons[3].status==1?'#FF7E67':'transparent',
        borderWidth: 1,
        borderColor:this.state.buttons[3].status==1?'white':'black',
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
        <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[3].status==1?'#FFFFFF': '#999999' }}>法语</Text>
      </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
      <TouchableOpacity style={{
        backgroundColor:this.state.buttons[4].status==1?'#FF7E67':'transparent',
        borderWidth: 1,
        borderColor:this.state.buttons[4].status==1?'white':'black',
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
        <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[4].status==1?'#FFFFFF': '#999999' }}>泰语</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
        backgroundColor:this.state.buttons[5].status==1?'#FF7E67':'transparent',
        borderWidth: 1,
        borderColor:this.state.buttons[5].status==1?'white':'black',
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
        <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[5].status==1?'#FFFFFF': '#999999' }}>德语</Text>
      </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.resumeButton} onPress={() => {
        this.context.action.changelanguage(this.state.buttons);
        this.props.navigation.navigate('机构信息');
        console.log(this.context.languages);}}>
        <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>确认</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );}
}
Languages.contextType = DataContext;
