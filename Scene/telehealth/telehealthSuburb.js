import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switcth,TextInput} from 'react-native';
import { Checkbox } from 'react-native-paper';
import styles from "../../style"
import { StackActions } from '@react-navigation/native';

export default function teleSuburb({navigation}) {
    const alertHandler= () => {
      Alert.alert('function unimplemented')
    }
    const goToClinic= () => {
        navigation.navigate("telehealthClinic")
    }
    const goBack= () => {
      navigation.dispatch(StackActions.pop(1))
    }
    const [checked1, setChecked1] = React.useState(false);
    const [checked2, setChecked2] = React.useState(false);
    
    return (
      <View style={{ flex:1, justifyContent: "center", alignItems: "center" ,paddingTop: 40,backgroundColor:"white"}}>
        <View style={{flexDirection: 'row',marginTop:-140}}>
            <TouchableOpacity onPress={goBack}>
            <Image
            style = {{width:35,
                height:35,
                marginTop:-150,
                marginLeft:-145,}}
            source={require('../../images/icon/2/Arrow_left.png')}
            />
            </TouchableOpacity>
            <Text style={{
              fontSize:16,

              marginTop:-150}}>远程医疗</Text>
          </View>

        <Image
            style = {{
              height:100,
              width:400,
              marginTop:-65,
            }}
            source = {require('../../images/telehealth_icon/service_img.png')}
        />
        
        <View style={{flexDirection: 'row', marginBottom: 15}}>
          <Image
          style={{width:25,height:25,marginTop:40,marginLeft:-135}}
          source={require('../../images/telehealth_icon/address.png')}
          />
          <Text style={{marginTop:40,fontSize:18,marginLeft:5}}>地址选择</Text>
          
         
        </View>
        <View style={{flexDirection: 'row', marginBottom: 5,marginTop:20,marginLeft:-160}}>
          <Text>区/Suburb</Text>
          <Checkbox
            status={checked1 ? 'checked' : 'unchecked'}
            onPress={() => {
            setChecked1(!checked1);
            setChecked2(false);
            }}
          />
        </View>
        {checked1?<TextInput placeholder={"请输入区"} style = {{height: 35,
        width: 300,
        borderBottomColor: '#999999',
        borderBottomWidth:1,
        marginLeft:26,
        borderColor:"#EEEEEE"}}>
        </TextInput>:null}
        <View style={{flexDirection: 'row', marginBottom: 5,marginLeft:-115,marginTop:30}}>
          <Text>区编码/Postcode</Text>
          <Checkbox
            status={checked2 ? 'checked' : 'unchecked'}
            onPress={() => {
            setChecked1(false);
            setChecked2(!checked2);
            }}
          />
        </View>

        {checked2?<TextInput placeholder={"请输入区编号"} style = {{height: 35,
        width: 300,
        borderBottomColor: '#999999',
        borderBottomWidth:1,
        marginLeft:26,
        marginBottom:30,
        borderColor:"#EEEEEE"}}>
        </TextInput>:null}
        
        <TouchableOpacity style={{
        backgroundColor:'#8FD7D3',
        padding:10,
        width:220,
        marginLeft:35,
        marginTop:40,
        height:45,
        alignItems: 'center',
        borderRadius:25,
        }}
        onPress={goToClinic}>
        <Text style={{
          color: 'white',
          }}>确定</Text>
        </TouchableOpacity>
      </View>
    );
  }

