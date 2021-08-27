import React ,{Component}from 'react';
import { Text, Button, View, Switch, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput } from 'react-native';
import {styles} from '../providerStyle';
import DataContext from "../../providerContext";
import { CheckBox } from 'react-native-elements';

export default class Setting extends Component {
    constructor() {
      super();
      this.state = {
         message: false,
         gps: false,
         pressed:false,
         cn:true,
         en:false,
      }
    }
    messageSwitch = (value) => {
      this.setState({message: value})
    }
    gpsSwitch = (value) => {
      this.setState({gps: value})
    }


  render() {
    return (
    <SafeAreaView style={{ flex:1, alignItems: "center" ,backgroundColor:'white'}}>
      <View style={{alignItems: "flex-start",width:'80%' }}>
        <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
          <Image
            style = {styles.smallIconImg}
            source={require('../../images/providerImg/account_icon_setting.png')}
          />
          <Text style={{ fontSize:18, fontWeight: '500' }}>基本设置</Text>
        </View>

        <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
          <Text style={{ fontSize:16, fontWeight: '400' ,marginRight:211}}>消息通知</Text>
          <Switch
            onValueChange={this.messageSwitch}
            value={this.state.message}
            />
        </View>

        <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
          <Text style={{ fontSize:16, fontWeight: '400' ,marginRight:179}}>地理位置访问</Text>
          <Switch
            onValueChange={this.gpsSwitch}
            value={this.state.gps}
            />
        </View>

        <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>语言设置</Text>
          <TouchableOpacity onPress={() => {this.setState({pressed:!this.state.pressed})}}>
            <AntDesign name="down" size={18} color="black" />
          </TouchableOpacity>
          {this.state.pressed &&
            <View>
              <CheckBox
                center
                title='中文                                '
                iconRight
                checkedIcon='check-circle-o'
                uncheckedIcon='circle-o'
                checkedColor='red'
                containerStyle={{borderWidth:0,backgroundColor:'white'}}
                checked={this.state.cn}
                onPress={() => {this.setState({cn:true,en:false})}}
               />
              <CheckBox
                center
                title='英文                               '
                iconRight
                checkedIcon='check-circle-o'
                uncheckedIcon='circle-o'
                containerStyle={{borderWidth:0, backgroundColor:'white'}}
                checkedColor='red'
                checked={this.state.en}
                onPress={() => {this.setState({cn:false,en:true})}}
               />
            </View>
          }
        </View>

        <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>联系我们</Text>
          <Text style={{ fontSize:14, fontWeight: '500', color:'#999999'}}> +61 421326182</Text>
        </View>
        <TouchableOpacity style={styles.resumeButton}>
          <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>确认</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );}
}
Setting.contextType = DataContext;
