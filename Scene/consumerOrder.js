import React,{ useState,setState }from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch } from 'react-native';
import {styles} from '../style';
import { StackActions } from '@react-navigation/native';
import DataContext from '../consumerContext';
import call from 'react-native-phone-call'

const args = {
  number: '0403555432', // String value with the number to call
  prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
}

export default function Consumer({navigation}) {
  
  const [isEnabled, setIsEnabled] = useState(false);

  const gotoInfo= () => {
    navigation.navigate('consumerInfo')
  }
  const makecall=()=>{
    call(args).catch(console.error)
  }
  const goBack= () => {
    navigation.dispatch(StackActions.pop(1))
  }

  return (
    <DataContext.Consumer>
    {(state)  => (
    <View style={styles.container}>
    <TouchableOpacity onPress = {goBack}>
      <Image
        style = {styles.arrow_image}
        source={require('../images/icon/2/Arrow_left.png')}
      />
    </TouchableOpacity>

    <Text style = {styles.service}>服务详情</Text>
    <Image
      style = {styles.choice}
      source = {require('../images/icon/2/choice.png')}
    />

    <TouchableOpacity style={styles.onsite_wrapper}>
      <Text style={styles.onsite_text}>上门做饭</Text>
    </TouchableOpacity>

    <Text style={styles.caption}>口味可自行挑选，一餐1-5道菜。</Text>
    <View style ={styles.switch_container}>
      <Switch style={styles.tick1}
          onValueChange={() => { state.action.changesupply(true);setIsEnabled(previousState => !previousState);
          }}
          value={isEnabled}
        />
      <Text style={styles.switch_text}>如需额外购买食材将收取$20。</Text>
    </View>

    <TouchableOpacity style={styles.clean_wrapper}>
      <Text style={styles.onsite_text}>上门清洁</Text>
    </TouchableOpacity>
    <Text style={styles.caption2}>包括地面，门窗，垃圾清洁等。</Text>

    <TouchableOpacity style={styles.care_wrapper}>
      <Text style={styles.onsite_text}>照顾老/幼</Text>
    </TouchableOpacity>
    <Text style={styles.caption2}>日常生活料理等。</Text>

    <View style ={styles.comment_container}>
      <Image style={styles.comment}
          source = {require('../images/icon/2/comment.png')}
        />
      <TouchableOpacity >
      <Image style = {styles.comment_image}
        source= {require('../images/icon/2/Arrow_right.png')}
      />
    </TouchableOpacity>
    </View>
    <TouchableOpacity onPress={makecall}>
            <Image
                style={{width:60,height:60,position:"absolute",borderRadius:30,bottom:5,right:-170}}
                source = {require("../images/mobile_icon.png")}
            />
    </TouchableOpacity>
    <Image style = {styles.comments}
        source={require('../images/icon/2/comments.png')}
    />
    <Image style = {styles.bottom}
        source={require('../images/icon/2/bottom.png')}
    />
    <TouchableOpacity style={styles.next_wrapper} onPress ={gotoInfo}>
      <Text style={styles.onsite_text}>下一步</Text>
    </TouchableOpacity>

    <Image style = {styles.contact}
      source = {require('../images/icon/1/contact.png')}
    />
  </View>
  )}
  </DataContext.Consumer>

  );
}
