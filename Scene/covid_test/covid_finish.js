
import React,{useContext} from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch,TextInput,ScrollView } from 'react-native';
import {styles} from '../../style';
import DataContext from "../../consumerContext";
import I18n from "../language"
export default function covid_finish({navigation,route}) {
  const user = useContext(DataContext);

  const goToIcon= () => {
    navigation.navigate('Home')
  }
  //const {} = route.params;

  return (
    <ScrollView style={{backgroundColor:"white"}}>
    <View style={styles.container}>

    <Image style = {{marginTop:50,
    height:360,
    width:315,
    marginLeft:0}}
        source= {user.language=="en"?require("../../images/success_eng.png"):require('../../images/success.png')}
      />
      
    <TouchableOpacity style={{
    backgroundColor:'#8FD7D3',
    padding:10,
    width:220,
    marginLeft:10,
    marginTop:30,
    height:45,
    alignItems: 'center',
    borderRadius:25,
    }} onPress={()=>goToIcon()}>
      <Text style={styles.onsite_text}>{"返回主页"}</Text>
    </TouchableOpacity>

    
  </View>
  </ScrollView>
  );
}
