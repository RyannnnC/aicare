import React ,{Component}from 'react';
import { Text,  View,  Image,TouchableOpacity,SafeAreaView,TextInput } from 'react-native';
import {styles} from '../providerStyle';

export default class OtherStores extends Component {

  render() {
  return (
    <SafeAreaView style={{ flex:1, alignItems: "center" }}>
      <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
      <Image
        style = {styles.smallIconImg}
        source={require('../../images/providerImg/account_icon_profile_normal.png')}
      />
      <Text style={{ fontSize:16, fontWeight: '400' }}>分支机构1</Text>
      <TouchableOpacity style={{ marginTop: 5,marginBottom: 5,marginLeft:180}}>
        <Image
          style = {styles.smallAddImg}
          source={require('../../images/providerImg/account_icon_add.png')}
        />
      </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
        <Text style={{ fontSize:16, fontWeight: '400' }}>名称</Text>
        <TextInput style={styles.resumeInput} placeholder= "Kingsford养老院"/>
      </View>
      <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
        <Text style={{ fontSize:16, fontWeight: '400' }}>电话</Text>
        <TextInput style={styles.resumeInput} placeholder= "0403571833"/>
      </View>
      <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
        <Text style={{ fontSize:16, fontWeight: '400' }}>地址</Text>
        <TextInput style={styles.resumeInput} placeholder= "1001/1 Mooltan Avanue, Macquarie Park"/>
      </View>
      <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
        <Text style={{ fontSize:16, fontWeight: '400' }}>编码</Text>
        <TextInput
          style={styles.resumeInput1}
          placeholder= "2113"
          onChangeText={(text) => {this.state.changepostcode(text)}}
        />
        <Text style={{ fontSize:16, fontWeight: '400' }}>州</Text>
        <TextInput
          style={styles.resumeInput1}
          onChangeText={(text) => {this.state.changestate(text)}}
          placeholder= "NSW"/>
      </View>
      <TouchableOpacity style={styles.resumeButton}>
        <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>确认</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );}
}
