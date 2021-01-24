/*import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch } from 'react-native';
import {styles} from '../providerStyle';
//import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';


const AccountMain = ({navigation}) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ width: 300, height: 50, marginBottom: 20, alignItems: "center", flexDirection: 'row'}}>
        <Image
          style = {styles.personIcon}
          source = {require('../../images/providerImg/home_img_person1.png')}
        />
        <View>
        <Text style={{ fontSize:20, fontWeight: '600' }}>林女士</Text>
        <Text style={{ fontSize:14, fontWeight: '300' }}>657416708xy@gmail.com</Text>
        </View>
      </View>
      <View style ={styles.benefit}>
        <Text style={{ fontSize:20, fontWeight: '600', color: 'white' }}>月收入   $ 756   总余额  $100</Text>
      </View>
      <View style={styles.accountBar}>
      <TouchableOpacity style={{marginLeft: 40, marginRight: 20}} >
        <Image
          style = {styles.iconImg}
          source={require('../../images/providerImg/account_icon_profile.png')}
        />
        <Text style={{ fontSize:14, fontWeight: '300' }}>简历</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{marginLeft: 25, marginRight: 20}} >
        <Image
          style = {styles.iconImg}
          source={require('../../images/providerImg/account_icon_order.png')}
        />
        <Text style={{ fontSize:14, fontWeight: '300' }}>订单</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{marginLeft: 25, marginRight: 20}}>
        <Image
          style = {styles.iconImg}
          source={require('../../images/providerImg/account_icon_money.png')}
        />
        <Text style={{ fontSize:14, fontWeight: '300' }}>收益</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{marginLeft: 25, marginRight: 40}} >
        <Image
          style = {styles.iconImg}
          source={require('../../images/providerImg/account_icon_comment.png')}
        />
        <Text style={{ fontSize:14, fontWeight: '300' }}>评价</Text>
      </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.profileBar} >
        <Image
          style = {styles.smallIconImg}
          source={require('../../images/providerImg/singup_icon_name.png')}
        />
        <Text style={{ fontSize:18, fontWeight: '400' }}>账户信息</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileBar} >
        <Image
          style = {styles.smallIconImg}
          source={require('../../images/providerImg/signup_icon_pswd.png')}
        />
        <Text style={{ fontSize:18, fontWeight: '400' }}>修改密码</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileBar} >
        <Image
          style = {styles.smallIconImg}
          source={require('../../images/providerImg/account_icon_setting.png')}
        />
        <Text style={{ fontSize:18, fontWeight: '400' }}>我的设置</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileBar} >
        <Image
          style = {styles.smallIconImg}
          source={require('../../images/providerImg/account_icon_logout.png')}
        />
        <Text style={{ fontSize:18, fontWeight: '400' }}>退出登录</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', alignItems: "center" }}>
        <Image
          source={require('../../images/logo.png')}
          style = {{width:85, height:30}}
        />
        <Text style={{fontSize:12, color:'#68B0AB'}}>+61 0403555432</Text>
       </View>
    </View>
  );
}

export default AccountMain;

