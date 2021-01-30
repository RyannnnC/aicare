import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch,TextInput } from 'react-native';
import {styles} from '../../style';
import { StackActions } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';

class Setting extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        message: false,
        gps: false,
        //might need async storage to store this in the later stage
        language: '中文',
      };

    }
    messageSwitch = (value) => {
        this.setState({message: value})
     }
    gpsSwitch = (value) => {
        this.setState({gps: value})
    }

    render(){
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress = {() =>{
            this.props.navigation.dispatch(StackActions.pop(1))}}>
                <Image
                style = {styles.arrow_image}
                source={require('../../images/icon/2/Arrow_left.png')}
                />
            </TouchableOpacity>

            <Text style = {styles.service}>我的设置</Text>
            <Image style = {styles.address_image}
                source= {require('../../images/setting.png')}
            />
            <View style={{ width: 300, height: 50, marginBottom: 20, alignItems: "center", flexDirection: 'row'}}>
            <Text style={{ fontSize:16, fontWeight: '400' }}>消息通知</Text>
            <Switch
                onValueChange={this.messageSwitch}
                value={this.state.message}
            />
            </View>

            <View style={{ width: 300, height: 50, marginBottom: 20, alignItems: "center", flexDirection: 'row'}}>                <Text style={{ fontSize:16, fontWeight: '400' }}>地理位置访问</Text>
                <Switch
                    onValueChange={this.gpsSwitch}
                    value={this.state.gps}
                />
            </View>
            <View style={{ width: 300, height: 50, marginBottom: 20, alignItems: "center", flexDirection: 'row'}}>
                <Text>语言设置  </Text>
                <Picker
                selectedValue={this.state.language}
                style={{height: 50, width: 100}}
                onValueChange={(itemValue, itemIndex) =>
                this.setState({language: itemValue})
                 }>
                    <Picker.Item label="中文" value="中文" />
                    <Picker.Item label="English" value="English" />
                    <Picker.Item label="日本語" value="日本語" />

                </Picker>
            </View>
            <View style={{ width: 300, height: 50, marginBottom: 20, alignItems: "center", flexDirection: 'row'}}>
                <Text>联系我们  </Text>
                <Text>+61 0403555431</Text>
            </View>
            <TouchableOpacity style={styles.next_wrapper} onPress ={() =>{
            this.props.navigation.dispatch(StackActions.pop(1))}}>
                <Text style={styles.onsite_text}>确认</Text>
            </TouchableOpacity>
        </View>
    );
    }
}

export default Setting;
