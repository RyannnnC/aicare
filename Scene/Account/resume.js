import React ,{Component}from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput } from 'react-native';
import {styles} from '../providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';

export default class Resume extends Component {
  state={
    buttons: [
        { backgroundColor: 'transparent',borderWidth: 1,fontColor: '#999999', pressed: false, },
        { backgroundColor: 'transparent',borderWidth: 1,fontColor: '#999999', pressed: false, },
        { backgroundColor: 'transparent',borderWidth: 1,fontColor: '#999999', pressed: false, },
        { backgroundColor: 'transparent',borderWidth: 1,fontColor: '#999999', pressed: false, },
        { backgroundColor: 'transparent',borderWidth: 1,fontColor: '#999999', pressed: false, },
        { backgroundColor: 'transparent',borderWidth: 1,fontColor: '#999999', pressed: false, },
        { backgroundColor: 'transparent',borderWidth: 1,fontColor: '#999999', pressed: false, },
    ]

  };

  changeColor(index){
    let but = this.state.buttons;
    if(!but[index].pressed){
       but[index].pressed = true;
       but[index].backgroundColor = '#FF7E67';
       but[index].borderWidth = 0;
       but[index].fontColor = '#FFFFFF';
       this.setState({buttons: but});
    } else {
      but[index].pressed = false;
      but[index].backgroundColor = 'transparent';
      but[index].borderWidth = 1;
      but[index].fontColor = '#999999';
      this.setState({buttons: but});
    }
  }

  render() {

    return (
    <SafeAreaView style={{ flex:1, justifyContent: "center", alignItems: "center" }}>
      <ScrollView style={{ flex: 1 }}>
        <Image style={styles.resumeImg}
          source = {require('../../images/providerImg/home_img_person.png')}
        />
        <View style={{flexDirection: 'row'}}>
          <Image
            style = {styles.smallIconImg}
            source={require('../../images/providerImg/singup_icon_name.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' }}>基本信息</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>姓名</Text>
          <TextInput style={styles.resumeInput} placeholder= "林三"/>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>性别</Text>
          <TextInput style={styles.resumeInput} placeholder= "女"/>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>年龄</Text>
          <TextInput style={styles.resumeInput} placeholder= "35"/>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>电话</Text>
          <TextInput style={styles.resumeInput} placeholder= "0403571833"/>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>地址</Text>
          <TextInput style={styles.resumeInput} placeholder= "1001/1 Mooltan Avanue"/>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>编码</Text>
          <TextInput style={styles.resumeInput1} placeholder= "2113"/>
          <Text style={{ fontSize:16, fontWeight: '400' }}>城市</Text>
          <TextInput style={styles.resumeInput1} placeholder= "悉尼"/>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Image
            style = {styles.smallIconImg}
            source={require('../../images/providerImg/account_icon_profile_normal.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' }}>个人背景</Text>
        </View>
        <View style={{flexDirection: 'row' , marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>最高学历</Text>
          <TextInput style={styles.resumeInput} placeholder= "本科"/>
        </View>
        <View style={{flexDirection: 'row' , marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>工作时长</Text>
          <TextInput style={styles.resumeInput} placeholder= "1年"/>
        </View>
        <View style={{marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>工作经历（选填）</Text>
          <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
            <TextInput style={styles.resumeInput2} placeholder= "曾任Kingsford养老院护工职位一年"/>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('工作经历')}>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize:16, fontWeight: '400' }}>证书执照（选填）</Text>
          <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
            <TouchableOpacity style={styles.resumeTag2}>
              <Text style={{ fontSize:12, fontWeight: '300' }}>护工从业执照</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('证书执照')}>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize:16, fontWeight: '400' }}>个人简介（选填）</Text>
          <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <TouchableOpacity style={styles.resumeTag}>
            <Text style={{ fontSize:12, fontWeight: '300' }}>粤语</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resumeTag}>
            <Text style={{ fontSize:12, fontWeight: '300' }}>英语</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resumeTag}>
            <Text style={{ fontSize:12, fontWeight: '300' }}>烹饪</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('个人简介')}>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
          </TouchableOpacity>
          </View>
          <Text style={{ fontSize:16, fontWeight: '400' }}>证件上传</Text>
          <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <TouchableOpacity style={styles.resumeTag}>
            <Text style={{ fontSize:12, fontWeight: '300' }}>护照.jpg</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('证件上传')}>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
          </TouchableOpacity>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Image
            style = {styles.smallIconImg}
            source={require('../../images/providerImg/account_icon_job.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' }}>工作意向</Text>
        </View>
            <Text style={{ fontSize:16, fontWeight: '400' }}>工作时间</Text>
          <View  style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{
              backgroundColor:this.state.buttons[0].backgroundColor,
              borderWidth: this.state.buttons[0].borderWidth,
              width: 60,
              height: 30,
              borderRadius: 10,
              marginTop: 5,
              marginBottom: 5,
              marginRight: 25,
              textAlign: 'center',
              }}
              onPress={()=>this.changeColor(0)}>
              <Text style={{ fontSize:16, fontWeight: '400', color: this.state.buttons[0].fontColor }}>周一</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 5,marginBottom: 5}}>
              <Image
                style = {styles.smallAddImg}
                source={require('../../images/providerImg/account_icon_add.png')}
              />
            </TouchableOpacity>
          </View>
          <View  style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{
              backgroundColor:this.state.buttons[1].backgroundColor,
              borderWidth: this.state.buttons[1].borderWidth,
              width: 60,
              height: 30,
              borderRadius: 10,
              marginTop: 5,
              marginBottom: 5,
              marginRight: 25,
              textAlign: 'center',
              }}
              onPress={()=>this.changeColor(1)}>
              <Text style={{ fontSize:16, fontWeight: '400', color: this.state.buttons[1].fontColor }}>周二</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 5,marginBottom: 5}}>
              <Image
                style = {styles.smallAddImg}
                source={require('../../images/providerImg/account_icon_add.png')}
              />
            </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{
              backgroundColor:this.state.buttons[2].backgroundColor,
              borderWidth: this.state.buttons[2].borderWidth,
              width: 60,
              height: 30,
              borderRadius: 10,
              marginTop: 5,
              marginBottom: 5,
              marginRight: 25,
              textAlign: 'center',
              }}
              onPress={()=>this.changeColor(2)}>
              <Text style={{ fontSize:16, fontWeight: '400', color: this.state.buttons[2].fontColor }}>周三</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 5,marginBottom: 5}}>
              <Image
                style = {styles.smallAddImg}
                source={require('../../images/providerImg/account_icon_add.png')}
              />
            </TouchableOpacity>
            </View>
            <View  style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{
              backgroundColor:this.state.buttons[3].backgroundColor,
              borderWidth: this.state.buttons[3].borderWidth,
              width: 60,
              height: 30,
              borderRadius: 10,
              marginTop: 5,
              marginBottom: 5,
              marginRight: 25,
              textAlign: 'center',
              }}
              onPress={()=>this.changeColor(3)}>
              <Text style={{ fontSize:16, fontWeight: '400', color: this.state.buttons[3].fontColor }}>周四</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 5,marginBottom: 5}}>
              <Image
                style = {styles.smallAddImg}
                source={require('../../images/providerImg/account_icon_add.png')}
              />
            </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{
              backgroundColor:this.state.buttons[4].backgroundColor,
              borderWidth: this.state.buttons[4].borderWidth,
              width: 60,
              height: 30,
              borderRadius: 10,
              marginTop: 5,
              marginBottom: 5,
              marginRight: 25,
              textAlign: 'center',
              }}
              onPress={()=>this.changeColor(4)}>
              <Text style={{ fontSize:16, fontWeight: '400', color: this.state.buttons[4].fontColor }}>周五</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 5,marginBottom: 5}}>
              <Image
                style = {styles.smallAddImg}
                source={require('../../images/providerImg/account_icon_add.png')}
              />
            </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{
              backgroundColor:this.state.buttons[5].backgroundColor,
              borderWidth: this.state.buttons[5].borderWidth,
              width: 60,
              height: 30,
              borderRadius: 10,
              marginTop: 5,
              marginBottom: 5,
              marginRight: 25,
              textAlign: 'center',
              }}
              onPress={()=>this.changeColor(5)}>
              <Text style={{ fontSize:16, fontWeight: '400', color: this.state.buttons[5].fontColor }}>周六</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 5,marginBottom: 5}}>
              <Image
                style = {styles.smallAddImg}
                source={require('../../images/providerImg/account_icon_add.png')}
              />
            </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{
              backgroundColor:this.state.buttons[6].backgroundColor,
              borderWidth: this.state.buttons[6].borderWidth,
              width: 60,
              height: 30,
              borderRadius: 10,
              marginTop: 5,
              marginBottom: 5,
              marginRight: 25,
              textAlign: 'center',
              }}
              onPress={()=>this.changeColor(6)}>
              <Text style={{ fontSize:16, fontWeight: '400', color: this.state.buttons[6].fontColor }}>周天</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 5,marginBottom: 5}}>
              <Image
                style = {styles.smallAddImg}
                source={require('../../images/providerImg/account_icon_add.png')}
              />
            </TouchableOpacity>
            </View>
            <Text style={{ fontSize:16, fontWeight: '400' }}>服务类型（选填）</Text>
            <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
              <TouchableOpacity style={styles.resumeTag2}>
                <Text style={{ fontSize:12, fontWeight: '300' }}>杂物收纳</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.resumeTag2}>
                <Text style={{ fontSize:12, fontWeight: '300' }}>清扫清洁</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.resumeTag2}>
                <Text style={{ fontSize:12, fontWeight: '300' }}>生活料理</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
              <TouchableOpacity style={styles.resumeTag2}>
                <Text style={{ fontSize:12, fontWeight: '300' }}>上门做饭</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.resumeTag2}>
                <Text style={{ fontSize:12, fontWeight: '300' }}>出门陪同</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('服务类型')}>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
              </TouchableOpacity>
            </View>
        <TouchableOpacity style={styles.resumeButton}>
          <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>保存</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );}
}
