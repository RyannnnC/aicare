import React ,{Component}from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput } from 'react-native';
import {styles} from '../providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import DataContext from '../../providerContext';
import I18n from '../switchLanguage';

export default class HealthServiceType extends Component {
  state={
    buttons: [
      { value:'1',name:'全科问诊',status: 1},
      { value:'2',name:'牙科问诊',status: 1},
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
    <SafeAreaView style={{ flex:1 ,backgroundColor:'white',alignItems:'center'}}>
      <View style={{width:'85%'}}>
      <View style={{flexDirection: 'row', marginTop:30, marginBottom:10}}>
      <Image
        style = {styles.smallIconImg}
        source={require('../../images/providerImg/account_icon_profile_normal.png')}
      />
      <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('chooseType')}</Text>
      </View>
      <View style={{flexDirection: 'row',flexWrap: "wrap", marginTop:10, marginBottom:10}}>
      <TouchableOpacity style={{
        backgroundColor:this.state.buttons[0].status==1?'#FF7E67':'transparent',
        borderWidth: 1,
        borderColor: this.state.buttons[0].status==1?'white':'black',
        height:30,
        width:'auto',
        marginTop:5,
        marginBottom:5,
        marginRight: 20,
        borderRadius:10,
        paddingLeft:15,
        paddingRight:15,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={()=>this.changeColor(0)}>
        <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[0].status==1?'#FFFFFF': '#999999' }}>{I18n.t('gpfull')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
        backgroundColor:this.state.buttons[1].status==1?'#FF7E67':'transparent',
        borderWidth: 1,
        borderColor: this.state.buttons[1].status==1?'white':'black',
        height:30,
        width:'auto',
        marginTop:5,
        marginBottom:5,
        marginRight: 20,
        borderRadius:10,
        paddingLeft:15,
        paddingRight:15,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={()=>this.changeColor(1)}>
        <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[1].status==1?'#FFFFFF': '#999999' }}>{I18n.t('denfull')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
        backgroundColor:this.state.buttons[2].status==1?'#FF7E67':'transparent',
        borderWidth: 1,
        borderColor: this.state.buttons[2].status==1?'white':'black',
        height:30,
        width:'auto',
        marginTop:5,
        marginBottom:5,
        marginRight: 20,
        borderRadius:10,
        paddingLeft:15,
        paddingRight:15,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={()=>this.changeColor(2)}>
        <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[2].status==1?'#FFFFFF': '#999999' }}>{I18n.t('psyfull')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
        backgroundColor:this.state.buttons[3].status==1?'#FF7E67':'transparent',
        borderWidth: 1,
        borderColor: this.state.buttons[3].status==1?'white':'black',
        height:30,
        width:'auto',
        marginTop:5,
        marginBottom:5,
        marginRight: 20,
        borderRadius:10,
        paddingLeft:15,
        paddingRight:15,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={()=>this.changeColor(3)}>
        <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[3].status==1?'#FFFFFF': '#999999' }}>{I18n.t('chifull')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
        backgroundColor:this.state.buttons[4].status==1?'#FF7E67':'transparent',
        borderWidth: 1,
        borderColor: this.state.buttons[4].status==1?'white':'black',
        height:30,
        width:'auto',
        marginTop:5,
        marginBottom:5,
        marginRight: 20,
        borderRadius:10,
        paddingLeft:15,
        paddingRight:15,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={()=>this.changeColor(4)}>
        <Text style={{ fontSize:12, fontWeight: '300', color:this.state.buttons[4].status==1?'#FFFFFF': '#999999' }}>{I18n.t('pedfull')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
        backgroundColor:this.state.buttons[5].status==1?'#FF7E67':'transparent',
        borderWidth: 1,
        borderColor: this.state.buttons[5].status==1?'white':'black',
        height:30,
        width:'auto',
        marginTop:5,
        marginBottom:5,
        marginRight: 20,
        borderRadius:10,
        paddingLeft:15,
        paddingRight:15,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={()=>this.changeColor(5)}>
        <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[5].status==1?'#FFFFFF': '#999999' }}>{I18n.t('phyfull')}</Text>
      </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.resumeButton} onPress={() => {
        this.context.action.changeserviceclass(this.state.buttons);
        this.props.navigation.pop();}}>
        <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>{I18n.t('confirmation')}</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );}
}
HealthServiceType.contextType = DataContext;
