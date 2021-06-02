import React, { useState } from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switcth,TextInput,ScrollView,Modal} from 'react-native';
import { CheckBox } from 'react-native-elements';
import {styles} from "../../style"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { StackActions } from '@react-navigation/native';
//import RNPickerSelect from 'react-native-picker-select';
import {Picker} from '@react-native-picker/picker';
export default function teleSuburb({route,navigation}) {
    const alertHandler= () => {
      Alert.alert('function unimplemented')
    }
    const { doctype} = route.params;

    const goToClinic= () => {
        navigation.navigate("telehealthClinic",{return:type,type:checked1,doctype:doctype,state:selectedType})
    }
    const goBack= () => {
      navigation.dispatch(StackActions.pop(1))
    }
    const [checked1, setChecked1] = React.useState(false);
    const [selectedType, setSelectedType] = React.useState('NSW');
    const [visible,setVisible]=useState(false)
    const [checked2, setChecked2] = React.useState(false);
    const [type,setType]=React.useState("");
    return (
      <KeyboardAwareScrollView contentContainerStyle={{flex:1,backgroundColor:"white"}} style={{backgroundColor:"white"}}>
      <View style={{ flex:1, justifyContent: "center", alignItems: "center" ,backgroundColor:"white"}}>
        <View style={{flexDirection: 'row',marginTop:-55}}>
            <TouchableOpacity onPress={goBack}>
            <Image
            style = {{width:35,
                height:35,
                marginTop:-153,
                marginLeft:-120,}}
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
          style={{width:25,height:25,marginTop:40,marginLeft:-95}}
          source={require('../../images/telehealth_icon/address.png')}
          />
          <Text style={{marginTop:40,fontSize:18,marginLeft:5}}>地址选择(单选)</Text>
          
         
        </View>
        <View style={{flexDirection: 'row', marginBottom: 5,marginTop:20,marginLeft:40}}>
          <Text>区/Suburb</Text>
          <CheckBox
            checked={checked1 }
            checkedColor='#FF8570'
            uncheckedIcon='circle-thin'
            checkedIcon='check-circle'
            size={33}
            containerStyle={{marginTop:-14,marginLeft:170}}
            onPress={() => {
            setChecked1(!checked1);
            setChecked2(false);
            console.log(doctype);


            }}
          />
          
        </View>
        
        <View style={{flexDirection: 'row', marginBottom: 5,marginLeft:40,marginTop:30}}>
          <Text>区编码/Postcode</Text>
          <CheckBox
            checked={checked2 }
            checkedColor='#FF8570'
            uncheckedIcon='circle-thin'
            checkedIcon='check-circle'
            containerStyle={{marginTop:-14,marginLeft:120}}
            size={33}
            onPress={() => {
            setChecked1(false);
            setChecked2(!checked2);
            

            }}
          />
        </View>
        {checked1?<View>
          <View style={{marginLeft:25,width: 300, height: 50, marginBottom: 0, alignItems: "center", flexDirection: 'row',}}>
        <View style={{marginTop:25}}>
        {/*<RNPickerSelect
        //fixAndroidTouchableBug={true}
        useNativeAndroidPickerStyle={false}

        placeholder={{ label: '请点击选择州', value: '请选择州' }}
        onValueChange={(value) => {setSelectedType(value);console.log(value)}}
        defaultValue={""}
        items={[
            { label: 'NSW', value: 'NSW' },
            { label: 'ACT', value: 'ACT' },
            { label: 'QLD', value: 'QLD' },
            { label: 'NT', value: 'NT' },
            { label: 'SA', value: 'SA' },
            { label: 'TAS', value: 'TAS' },
            { label: 'VIC', value: 'VIC' },
            { label: 'WA', value: 'WA' },


        ]}
      />*/}
      <TouchableOpacity style={{
      borderWidth:0.8,
    padding:8,
    width:300,
    marginTop:0,
    height:35,

    marginLeft:0,
    alignItems: 'center',
    borderRadius:25,}} onPress={()=>setVisible(true)}>
    <Text>{selectedType.length==0?"点击选择州":selectedType}</Text>
    </TouchableOpacity>
    </View>
    </View>  
        <View style={{marginTop:30}}>
          <TextInput placeholder={"请输入区"} style = {{height: 35,
        width: 300,
        borderBottomColor: '#999999',
        borderBottomWidth:1,
        marginLeft:26,
        borderColor:"#EEEEEE"}}
        textAlign={'center'}
        onChangeText={(text)=>{setType(text)}}>
        </TextInput>

        
        </View>
        <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(false)
        }}
      >
      <View style={{marginTop:200,backgroundColor:"#F7FAFA",borderRadius:40,shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 12,
},
shadowOpacity: 0.58,
shadowRadius: 16.00,

elevation: 24,}}>
  
    <View style={{flexDirection:"row"}}>
    <TouchableOpacity onPress={() =>{ setVisible(false);//user.action.changeOrgId(0);
    //user.action.changeDocId(0);
    //user.action.changeSchedule([]);

          }} style={{marginRight:20,marginLeft:30}}>
      <Image
        style = {styles.arrow_image}
        source={require('../../images/icon/2/Arrow_left.png')}
      />
    </TouchableOpacity>
    <View style={{marginLeft:40}}>
    <Text style = {{
    fontSize:17,
    marginTop:20,
    marginLeft:40,}}>州选择</Text>
    </View>
    </View>
    
    <View style={{backgroundColor:"#F7FAFA"}}>
    <View style={{flexDirection:"row"}}>
    <Text style={{marginTop:90,marginLeft:70,fontWeight:"500",fontSize:15}}>您所在的州是:</Text>
    <Picker 
      style={{  
        width: 100,  
        color: 'white',  
        justifyContent: 'center',marginLeft:20  }}
  selectedValue={selectedType}
  onValueChange={(itemValue, itemIndex) =>
    setSelectedType(itemValue)
  }>
  <Picker.Item label="NSW" value="NSW" />
  <Picker.Item label="VIC" value="VIC" />
  <Picker.Item label="QLD" value="QLD" />
  <Picker.Item label="ACT" value="ACT" />
  <Picker.Item label="NT" value="NT" />
  <Picker.Item label="SA" value="SA" />
  <Picker.Item label="TAS" value="TAS" />
  <Picker.Item label="WA" value="WA" />

</Picker>
</View>
<TouchableOpacity style={{width: 150,
   height: 40,
   marginTop: 30,
   marginLeft:135,
   borderRadius: 20,
   borderWidth:0.8,
   alignItems: 'center',
   justifyContent: "center",}} onPress={()=>setVisible(false)}>
            <Text style={{ fontSize:16, fontWeight: '400', }}>确认</Text>
          </TouchableOpacity>
        </View>
        
        <View style={{height:20}}/>
        </View>
      </Modal>
      <TouchableOpacity style={{
        backgroundColor:'#8FD7D3',
        padding:10,
        width:220,
        marginLeft:50,
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
        </View>:null}
        {checked2?<View><TextInput placeholder={"请输入区编号"} style = {{height: 35,
        width: 300,
        borderBottomColor: '#999999',
        borderBottomWidth:1,
        marginLeft:26,
        marginBottom:30,
        borderColor:"#EEEEEE"}}
        onChangeText={(text)=>{setType(text)}}>
        </TextInput>
        <TouchableOpacity style={{
          backgroundColor:'#8FD7D3',
          padding:10,
          width:220,
          marginLeft:50,
          marginTop:40,
          height:45,
          alignItems: 'center',
          borderRadius:25,
          }}
          onPress={goToClinic}>
          <Text style={{
            color: 'white',
            }}>确定</Text>
          </TouchableOpacity></View>
        :null}
        {checked1||checked2?null:
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
        onPress={()=>navigation.navigate("telehealthClinic",{return:"",type:true,doctype:doctype,state:"NSW"})}>

        <Text style={{
          color: 'white',
          }}>查看全部诊所</Text>
        </TouchableOpacity>
        }
      </View>
      </KeyboardAwareScrollView>
    );
  }

