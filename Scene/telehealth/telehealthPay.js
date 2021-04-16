import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity, TextInput,Switch,ScrollView } from 'react-native';
import {styles} from '../../style';
import { CheckBox } from 'react-native-elements';
import { StackActions } from '@react-navigation/native';
//import DataContext from "../consumerContext"
import call from 'react-native-phone-call'

const args = {
  number: '0403555432', // String value with the number to call
  prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
}
//import { Checkbox } from 'react-native-paper/lib/typescript/components/Checkbox/Checkbox';
//mport { grey100 } from 'react-native-paper/lib/typescript/styles/colors';
export default function TelePay({navigation,route}) {
  const goBack= () => {
    navigation.dispatch(StackActions.pop(1))
  }
  const { scheduleId,date,doctype,address,docName,startTime,endTime } = route.params;
  const makecall=()=>{
    call(args).catch(console.error)
  }
  const gotoSuccess= () => {
    var type = "";
    if (checked1){
      type = "Medicare"
    }else if(checked2){
      type = "私人保险"
    }else {
      type = "None"
    }
            console.log(doctype);

    navigation.navigate("teleConfirm",{content:content,scheduleId:scheduleId,type:type,date:date,doctype:doctype,address:address,docName:docName,startTime:startTime,endTime:endTime})
  }  
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);
  var content ={name:"",mobile:"",number:"",date:"",serial:""};
  return (

    <ScrollView style={{backgroundColor:"white"}}>

    <View style={styles.container}>
    <View style={{flexDirection:'row',marginTop:-15,marginLeft:-140}}>
    <TouchableOpacity onPress = {goBack} style={{marginRight:60}}>
      <Image
        style = {styles.arrow_image}
        source={require('../../images/icon/2/Arrow_left.png')}
      />
    </TouchableOpacity>
    
    <Text style = {{    color:'black',
    fontSize:17,
    marginTop:20,
    marginLeft:40,}}>费用报销</Text>
    </View>
    <View style={{marginTop:20,marginLeft:-170}}>
    <Image style = {{width:132,
    height:33,
    marginTop:40,
    marginLeft:10,}}
        source= {require('../../images/insurance.png')}
      />
    </View>
    <View style={{marginTop:-15}}></View>
    <View style ={styles.comment_container}>
      <Text style={{fontSize:16,marginLeft:33}}>Medicare</Text>

    <CheckBox
            checked={checked1 }
            checkedColor='#FF8570'
            uncheckedIcon='circle-thin'
            checkedIcon='check-circle'
            size={33}
            containerStyle={{marginTop:-14,marginLeft:163}}
            onPress={() => {
            setChecked1(!checked1);
            setChecked2(false);
            setChecked3(false);
            }}
          />
    </View>
    <View style={{marginTop:-15}}></View>

    <View style ={styles.comment_container}>
      <Text style={{fontSize:16,marginLeft:32}}>Bupa/Medibank/OSHC/其他</Text>
      <CheckBox
            checked={checked2 }
            checkedColor='#FF8570'
            uncheckedIcon='circle-thin'
            checkedIcon='check-circle'
            size={33}
            containerStyle={{marginTop:-14,marginLeft:0}}
            onPress={() => {
            setChecked1(false);
            setChecked2(!checked2);
            setChecked3(false);
            }}
          />
    </View>
    <View style={{marginTop:-15}}></View>

    <View style ={styles.comment_container}>
      <Text style={{fontSize:16,marginLeft:31}}>自费</Text>
      <CheckBox
            checked={checked3 }
            checkedColor='#FF8570'
            uncheckedIcon='circle-thin'
            checkedIcon='check-circle'
            size={33}
            containerStyle={{marginTop:-14,marginLeft:206}}
            onPress={() => {
            setChecked1(false);
            setChecked2(false);
            setChecked3(!checked3);
            }}
          />
    </View>
    
    {checked1?<View style = {styles.container}>
        <View style={{marginTop:-15}}></View>
        <View style={{flexDirection:"row"}}>
        <Image style = {{width:20,
        height:20,
        marginTop:2,
        marginLeft:0,}}
        source= {require('../../images/telehealth_icon/service_icon_info.png')}/>
        <Text style={{color:"#999999"}}> 持有medicare的用户在支持bulk billing</Text>
        </View>
        <Text style={{color:"#999999",marginLeft:-90,marginBottom:20}}> 的诊所看诊可全额报销。</Text>

        <TextInput style = {styles.account}
          placeholder="持卡人姓名"
          onChangeText={(text)=>content.name=text}
        />
        <View style={{flexDirection:"row"}}>
        <TextInput style = {{height: 35,
    width: 130,
    borderBottomColor: '#999999',
    marginLeft:3,
    borderBottomWidth:1,}}
          onChangeText={(text)=>content.date=text}

          placeholder="到期日期 mm/yy"
        />
      <TextInput style = {{height: 35,
    width: 130,
    marginLeft:40,
    borderBottomColor: '#999999',
    borderBottomWidth:1,}}
          placeholder="序列号"
          onChangeText={(text)=>content.serial=text}

      />
      </View>
      <TextInput style = {styles.account}
          placeholder="卡号"
          onChangeText={(text)=>content.number=text}

      />
    <View style={{marginLeft:-80}}> 
    <View style={{marginTop:50}}></View>

    <TouchableOpacity style={styles.next_wrapper} onPress = {gotoSuccess}>
      {/*this need to manually calculated */}
      <Text style={styles.onsite_text}>下一步</Text>
    </TouchableOpacity>
    </View>
    </View>: null}
    {checked2?<View style = {styles.container}>
        <View style={{flexDirection:"row"}}>
        <Image style = {{width:20,
        height:20,
        marginTop:2,
        marginLeft:0,}}
        source= {require('../../images/telehealth_icon/service_icon_info.png')}/>
        <Text style={{color:"#999999"}}> 若持有私人保险，您可以按照正常程序</Text>
        </View>
        <Text style={{color:"#999999",marginLeft:-55,marginBottom:20}}> 向您的医保卡公司申请报销。</Text>
        
      <TextInput style = {styles.account}
          placeholder="保险人姓名"
          onChangeText={(text)=>content.name=text}

      />
      <TextInput style = {styles.account}
          placeholder="保险号码(Policy Number)"
          onChangeText={(text)=>content.number=text}
      />
    <View style={{marginLeft:-80}}> 
    <View style={{marginTop:50}}></View>
    <TouchableOpacity style={styles.next_wrapper} onPress = {gotoSuccess}>
      {/*this need to manually calculated */}
      <Text style={styles.onsite_text}>下一步</Text>
    </TouchableOpacity>
    </View>
    </View>: null}
    {checked3?<View style = {styles.container}>
      
        
    <View style={{flexDirection:"row"}}>
        <Image style = {{width:20,
        height:20,
        marginTop:2,
        marginLeft:10,}}
        source= {require('../../images/telehealth_icon/service_icon_info.png')}/>
        <Text style={{color:"#999999"}}> 若未持有保险，您无法享有诊金报销。</Text>
        </View>
    <View style={{marginLeft:-80}}> 
    <View style={{marginTop:50}}></View>

    <TouchableOpacity style={styles.next_wrapper} onPress = {gotoSuccess}>
      {/*this need to manually calculated */}
      <Text style={styles.onsite_text}>下一步</Text>
    </TouchableOpacity>
    </View>
    </View>: null}

    <TouchableOpacity onPress={makecall}>
            <Image
                style={{width:60,height:60,borderRadius:20,marginBottom:20,marginLeft:280,marginTop:50}}
                source = {require("../../images/mobile_icon.png")}
            />
    </TouchableOpacity>
    <View style={{marginTop:160}}></View>
    <Image style = {styles.contact}
      source = {require('../../images/icon/1/contact.png')}
    />
  
  </View>
  
  </ScrollView>

  )}

