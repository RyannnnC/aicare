import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switcth,TextInput,ScrollView} from 'react-native';
import { CheckBox } from 'react-native-elements';
//import styles from "../../style"
import { StackActions } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

export default function changeSuburb({route,navigation}) {
    const alertHandler= () => {
      Alert.alert('function unimplemented')
    }
    const { docType,id} = route.params;
    const [selectedType, setSelectedType] = React.useState();

    const goToClinic= () => {
        navigation.navigate("changeClinic",{return:type,type:checked1,doctype:docType,id:id})
    }
    const goBack= () => {
      navigation.dispatch(StackActions.pop(1))
    }
    const [checked1, setChecked1] = React.useState(false);
    const [checked2, setChecked2] = React.useState(false);
    const [type,setType]=React.useState("");
    return (
      <ScrollView style={{ flex:1,backgroundColor:"white",}}>
      <View style={{ flex:1, justifyContent: "center", alignItems: "center" ,paddingTop: 50,backgroundColor:"white"}}>
        <View style={{flexDirection: 'row',marginTop:120}}>
            <TouchableOpacity onPress={goBack}>
            <Image
            style = {{width:25,
                height:25,
                marginTop:-150,
                marginLeft:-130,}}
            source={require('../../images/icon/2/Arrow_left.png')}
            />
            </TouchableOpacity>
            <Text style={{
              fontSize:16,

              marginTop:-150}}>区域选择</Text>
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
            //console.log(doctype);


            }}
          />
          
        </View>
        {checked1?<View><TextInput placeholder={"请输入区"} style = {{height: 35,
        width: 300,
        borderBottomColor: '#999999',
        borderBottomWidth:1,
        marginLeft:26,
        borderColor:"#EEEEEE"}}
        onChangeText={(text)=>{setType(text)}}>
        </TextInput>
        </View>
        :null}
      
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

        {checked2?<TextInput placeholder={"请输入区编号"} style = {{height: 35,
        width: 300,
        borderBottomColor: '#999999',
        borderBottomWidth:1,
        marginLeft:26,
        marginBottom:30,
        borderColor:"#EEEEEE"}}
        onChangeText={(text)=>{setType(text)}}>
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
      </ScrollView>
    );
  }

