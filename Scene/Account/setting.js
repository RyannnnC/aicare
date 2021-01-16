import React ,{Component}from 'react';
import { Text, Button, View, Switch, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput } from 'react-native';
import {styles} from '../providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';


export default class Setting extends Component {
    constructor() {
      super();
      this.state = {
         message: false,
         gps: false,
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
    <SafeAreaView style={{ flex:1, justifyContent: "center", alignItems: "center" }}>
      <View style={{alignItems: "Left" }}>
        <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
          <Image
            style = {styles.smallIconImg}
            source={require('../../images/providerImg/account_icon_setting.png')}
          />
          <Text style={{ fontSize:18, fontWeight: '500' }}>基本设置</Text>
        </View>

        <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>消息通知</Text>
          <Switch
            onValueChange={this.messageSwitch}
            value={this.state.message}
            />
        </View>

        <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>地理位置访问</Text>
          <Switch
            onValueChange={this.gpsSwitch}
            value={this.state.gps}
            />
        </View>

        <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>语言设置</Text>
          <TextInput style={styles.resumeInput} placeholder= "中文"/>
        </View>
        <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>联系我们</Text>
          <TextInput style={styles.resumeInput} placeholder= "+61 0403555431"/>
        </View>

      </View>
        <TouchableOpacity style={styles.resumeButton}>
          <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>确认</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );}
}
