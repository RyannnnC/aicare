import React ,{Component}from 'react';
import { Text,  View,  Image,TouchableOpacity,SafeAreaView } from 'react-native';
import {styles} from '../providerStyle';
import DataContext from '../../providerContext';
import I18n from '../switchLanguage';

export default class Mlan extends Component {
  state={
    buttons: [
        { value:'1',name:'普通话',status: 0},
        { value:'2',name:'英语',status: 0},
        { value:'3',name:'粤语',status: 0},
        { value:'4',name:'法语',status: 0},
        { value:'5',name:'德语',status: 0},
        { value:'6',name:'俄语',status: 0},
    ],
  };

  componentDidMount ()  {
    if (this.context.mlan.length>0) {
        for (let i=0;i<this.context.mlan.length;i++) {
          for (let j=0;j<this.state.buttons.length;j++){
            if(this.context.mlan[i].value == this.state.buttons[j].value) {
              let but = this.state.buttons;
              but[j].status = this.context.mlan[i].status;
              this.setState({buttons: but});
            }
          }
        }
    }
  }

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
    <View style={{flexDirection: 'row',marginTop:30, marginBottom:10}}>
    <Image
      style = {styles.smallIconImg}
      source={require('../../images/providerImg/account_icon_profile_normal.png')}
    />
    <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('chooseLanguage')}</Text>
    </View>
    <View style={{flexDirection: 'row',flexWrap:'wrap', marginTop:10, marginBottom:10}}>
    <TouchableOpacity style={{
      backgroundColor:this.state.buttons[0].status==1?'#FF7E67':'transparent',
      borderWidth: 1,
      borderColor:this.state.buttons[0].status==1?'white':'black',
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
      <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[0].status==1?'#FFFFFF': '#999999'}}>{I18n.t('mandarin')}</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{
      backgroundColor:this.state.buttons[1].status==1?'#FF7E67':'transparent',
      borderWidth: 1,
      borderColor:this.state.buttons[1].status==1?'white':'black',
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
      <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[1].status==1?'#FFFFFF': '#999999' }}>{I18n.t('english')}</Text>
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
      marginRight: 20,
      borderRadius:10,
      alignItems: 'center',
      justifyContent: 'center',
    }}
    onPress={()=>this.changeColor(2)}>
      <Text style={{ fontSize:12, fontWeight: '300', color:this.state.buttons[2].status==1?'#FFFFFF': '#999999' }}>{I18n.t('cantonese')}</Text>
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
      marginRight: 20,
      borderRadius:10,
      alignItems: 'center',
      justifyContent: 'center',
    }}
    onPress={()=>this.changeColor(3)}>
      <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[3].status==1?'#FFFFFF': '#999999' }}>{I18n.t('french')}</Text>
    </TouchableOpacity>
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
      marginRight: 20,
      borderRadius:10,
      alignItems: 'center',
      justifyContent: 'center',
    }}
    onPress={()=>this.changeColor(4)}>
      <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[4].status==1?'#FFFFFF': '#999999' }}>{I18n.t('thai')}</Text>
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
      marginRight: 20,
      borderRadius:10,
      alignItems: 'center',
      justifyContent: 'center',
    }}
    onPress={()=>this.changeColor(5)}>
      <Text style={{ fontSize:12, fontWeight: '300', color: this.state.buttons[5].status==1?'#FFFFFF': '#999999' }}>{I18n.t('german')}</Text>
    </TouchableOpacity>
    </View>
    <TouchableOpacity style={styles.resumeButton} onPress={() => {
      this.context.action.changemlan(this.state.buttons);
      this.props.navigation.pop();
      console.log(this.context.languages);}}>
      <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>{I18n.t('confirmation')}</Text>
    </TouchableOpacity>
      </View>
    </SafeAreaView>
  );}
}
Mlan.contextType = DataContext;
