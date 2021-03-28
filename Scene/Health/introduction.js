import React ,{Component}from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput } from 'react-native';
import {styles} from '../providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import DataContext from '../../providerContext';

export default class Introduction extends Component {
  state={
    intro:'',
  }
  render() {
  return (
    <SafeAreaView style={{ flex:1, alignItems: "center",backgroundColor:'white' }}>
      <View style={{flexDirection: 'row', marginTop:30, marginBottom:10}}>
      <Image
        style = {styles.smallIconImg}
        source={require('../../images/providerImg/account_icon_profile_normal.png')}
      />
      <Text style={{ fontSize:16, fontWeight: '400' }}>详情填写</Text>
      </View>

      <View style={{width:315, height:120,borderWidth:1, borderColor:'#bbbbbb',borderRadius:11}}>
        <TextInput style={{width:275,height:60,marginTop:15,marginLeft:20,marginRight:20}}
          placeholder={this.context.intro}
          onChangeText={(text) => {this.setState({ intro: text})}}
          multiline={true}
        />
      </View>
      <View style={{width:'75%',marginTop:40}}>
      <TouchableOpacity style={styles.resumeButton} onPress={() => {
        this.context.action.changeintro(this.state.intro)
        this.props.navigation.navigate('机构信息')}}>
        <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>确认</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );}
}
Introduction.contextType = DataContext;
