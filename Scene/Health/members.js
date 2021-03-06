import React ,{Component}from 'react';
import { Alert,Text, View, Image,SafeAreaView,ScrollView,TouchableOpacity,Modal } from 'react-native';
import { SearchBar } from 'react-native-elements';
import {styles} from '../providerStyle';
import {doctors} from './doctors';
import DateSelect from "./dateSelect";
import Category from "./category";

export default class Members extends Component {
    constructor(props) {
      super(props);
      this.state={
        buttons: [],
      };
    }


  componentDidMount = () => {
    console.log("set buttons work")
  }


  render () {
    if (doctors.length >0) {
    const docs = doctors.map((item) => {
      return (
        <View style={styles.doctorHolder} key={item.id}>
          <Image
            style = {{width: 40, height:40,marginRight:15}}
            source = {item.img}
          />
          <View>
            <Text style={{fontSize:14, color:'#333333', fontWeight: '500'}}>{item.name}</Text>
            <Text style={{fontSize:12, color:'#666666', fontWeight: '400'}}>{item.description}</Text>
          </View>
          <TouchableOpacity style={{marginLeft:68, marginRight:10}} onPress={() => {Alert.alert('功能尚未开放')}}>
            <Image
              style = {{width: 25, height:25}}
              source = {require('../../images/providerImg/account_icon_edit.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {Alert.alert('功能尚未开放')}}>
            <Image
              style = {{width: 25, height:25}}
              source = {require('../../images/providerImg/account_icon_delete.png')}
            />
          </TouchableOpacity>
        </View>
      )
    })
    return (
      <SafeAreaView style={{ flex:1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity style={{borderWidth:1,backgroundColor:'#ECF4F3',marginTop:20,width:315,height:70,marginLeft:30,marginRight:30,justifyContent: "center", alignItems: "center"}}>
          <Text style={{ color: '#68B0AB', fontSize: 18, fontWeight: '400'}}>添加新成员</Text>
        </TouchableOpacity>
        <View style={{alignItems:'flex-start',marginTop:30,marginBottom:6}}>
          <Text style={{ color: '#333333', fontSize: 18, fontWeight: '400'}}>我的成员</Text>
        </View>
        <View style={{flexDirection:'row'}}>
        <ScrollView horizontal={true}>
          <TouchableOpacity style={{borderWidth:1,borderRadius:10,backgroundColor:'#FF816B',width:100,height:35,marginLeft:20,marginRight:20,justifyContent: "center", alignItems: "center"}}>
            <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '400'}}>全部（24）</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderWidth:1,borderRadius:10,width:100,height:35,marginLeft:20,marginRight:20,justifyContent: "center", alignItems: "center"}}>
            <Text style={{ color: '#333333', fontSize: 18, fontWeight: '400'}}>全科（12）</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderWidth:1,borderRadius:10,width:100,height:35,marginLeft:20,marginRight:20,justifyContent: "center", alignItems: "center"}}>
            <Text style={{ color: '#333333', fontSize: 18, fontWeight: '400'}}>儿科（4）</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderWidth:1,borderRadius:10,width:100,height:35,marginLeft:20,marginRight:20,justifyContent: "center", alignItems: "center"}}>
            <Text style={{ color: '#333333', fontSize: 18, fontWeight: '400'}}>牙科（6）</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderWidth:1,borderRadius:10,width:100,height:35,marginLeft:20,marginRight:20,justifyContent: "center", alignItems: "center"}}>
            <Text style={{ color: '#333333', fontSize: 18, fontWeight: '400'}}>心理（2）</Text>
          </TouchableOpacity>
        </ScrollView>
        </View>
        <SearchBar
        placeholder="搜索医生..."
        containerStyle= {{width: 315,height: 40,backgroundColor: '#ffffff',borderRadius: 16,marginBottom:20}}
        inputContainerStyle= {{width: 300,height: 30,backgroundColor: '#ffffff',borderRadius: 16}}
        inputStyle={{width: 290,height: 30,backgroundColor: '#ffffff',borderRadius: 16}}/>
        <ScrollView style={{flex:1}}>
          {docs}
        </ScrollView>
      </SafeAreaView>
    )} else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        style = {styles.finishImg}
        source = {require('../../images/providerImg/order_img_empty_inprogress1.png')}
      />
     <Text style={{ color: '#333333', fontSize: 16, fontWeight: '400'}}>您还没有新订单哦，快去接取吧！</Text>
     </View>
    )
  }
  }
}
