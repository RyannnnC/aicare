import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch } from 'react-native';
import {styles} from '../providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import {data} from './commentData';

export default function Comment() {
  const comments = data.map((item) => {
    return (
      <View style={styles.commentCard}>
        <View style={{flexDirection: 'row', marginTop:5, marginBottom:5, marginLeft:5, marginRight:5}}>
          <Image
            style = {styles.commentPerson}
            source={require('../../images/providerImg/person_img2.png')}
          />
          <View>
            <Text>{item.name}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text>{item.time}</Text>
              <Text> ★ ★ ★ ★ ★ </Text>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.commentTag}>
          <Text style={{fontSize:14, color:'#333333'}}>服务热情</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.commentTag}>
          <Text style={{fontSize:14, color:'#333333'}}>做事专业</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.commentTag}>
          <Text style={{fontSize:14, color:'#333333'}}>细致认真</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  });
  return (
    <View style={{justifyContent: "center", alignItems: "center" }}>
      <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
        <View style={styles.commentContainer1}>
          <View style={{flexDirection: 'row', marginTop:15}}>
            <Image
              style = {styles.commentIcon}
              source={require('../../images/providerImg/account_icon_like_white.png')}
            />
            <Text style={{fontSize:14, fontWeight: '400', color: '#FFFFFF',marginLeft:10}}>满意度</Text>
          </View>
          <Text style={{fontSize:18, fontWeight: '600', color: '#FFFFFF'}}>4.9</Text>
        </View>

        <View style={styles.commentContainer2}>
          <View style={{flexDirection: 'row', marginTop:15}}>
            <Image
              style = {styles.commentIcon}
              source={require('../../images/providerImg/account_icon_comment_white.png')}
              />
              <Text style={{fontSize:14, fontWeight: '400', color: '#FFFFFF', marginLeft:10}}>总评价</Text>
          </View>
          <Text style={{fontSize:18, fontWeight: '600', color: '#FFFFFF'}}>220</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
        <Text style={{fontSize:16, fontWeight: '500', color: '#333333'}}>最新评价       </Text>
        <Text style={{fontSize:16, fontWeight: '500', color: '#333333'}}>          全部</Text>
        <Image
          style = {styles.commentIcon}
          source={require('../../images/providerImg/account_icon_calender.png')}
        />
      </View>
      {comments}
    </View>
  );
}
