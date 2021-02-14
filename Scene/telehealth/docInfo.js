import React,{ useState,setState }from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch,ScrollView,Modal} from 'react-native';
import { Icon } from 'react-native-elements'
import ConsumerDate from "../consumerDate"
import {styles} from '../../style';
import { StackActions } from '@react-navigation/native';
//import call from 'react-native-phone-call'
import { MaterialCommunityIcons, MaterialIcons, Feather } from '@expo/vector-icons';
import DateSelect from "./DateSelect";
const args = {
  number: '0403555432', // String value with the number to call
  prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
}

export default function DocInfo({navigation}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const goInsurance= () => {
    navigation.navigate('telehealthPay')
    setModalVisible(modalVisible=>!modalVisible)
  }
  const makecall=()=>{
    call(args).catch(console.error)
  }
  const goBack= () => {
    navigation.dispatch(StackActions.pop(1))
  }

  return (
    <View style={styles.container}>
    <ScrollView>
    <View style={{flexDirection:'row',marginTop:20,marginLeft:-10}}>
    <TouchableOpacity onPress = {goBack} style={{marginRight:30}}>
      <Image
        style = {styles.arrow_image}
        source={require('../../images/icon/2/Arrow_left.png')}
      />
    </TouchableOpacity>
    
    <Text style = {styles.service}>医生信息</Text>
    <Icon
  onPress={() => { setIsEnabled(isEnabled => !isEnabled,console.log(isEnabled));
  }}
  raised
  name='heart'
  type='font-awesome'
  color={isEnabled?'red':'white'}
  reverseColor="black"
  
  containerStyle={{marginLeft:95}}
  iconStyle={{shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 12,
},
shadowOpacity: 0.58,
shadowRadius: 16.00,

elevation: 24,

    }}
  />
    </View>

     <Image style = {{width:400,height:900}}
      source = {require('../../images/doc_image.png')}
    />
    <TouchableOpacity onPress={makecall}>
            <Image
                style={{width:60,height:60,position:"absolute",borderRadius:30,bottom:5,right:10}}
                source = {require("../../images/mobile_icon.png")}
            />
    </TouchableOpacity>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
      <View style={{marginTop:320,backgroundColor:"#F7FAFA",borderRadius:40,shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 12,
},
shadowOpacity: 0.58,
shadowRadius: 16.00,

elevation: 24,}}>
    <TouchableOpacity onPress={() =>{setModalVisible(!modalVisible);
            //state.action.changetotal(Number(state.end_time.substring(0,2))-Number(state.start_time.substring(0,2))+(Number(state.end_time.substring(3,5))-Number(state.start_time.substring(3,5)))/60);
            //this.props.navigation.dispatch(StackActions.pop(1))}
          }} style={{marginRight:30}}>
      <Image
        style = {styles.arrow_image}
        source={require('../../images/icon/2/Arrow_left.png')}
      />
    </TouchableOpacity>
      <DateSelect/>
      <TouchableOpacity style={styles.next_wrapper} onPress={goInsurance
            //state.action.changetotal(Number(state.end_time.substring(0,2))-Number(state.start_time.substring(0,2))+(Number(state.end_time.substring(3,5))-Number(state.start_time.substring(3,5)))/60);
            //this.props.navigation.dispatch(StackActions.pop(1))}
          }>
          <Text style={styles.onsite_text}>确定</Text>
        </TouchableOpacity>
        <View style={{height:20}}/>
        </View>
      </Modal>
    <TouchableOpacity style={styles.next_wrapper} onPress={() => setModalVisible(modalVisible=>!modalVisible)}>
      <Text style={styles.onsite_text}>预约</Text>
    </TouchableOpacity>
    </ScrollView>
   
  </View>
)}

