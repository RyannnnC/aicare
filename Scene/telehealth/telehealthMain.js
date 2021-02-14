import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switcth} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import styles from "../../style";
import { StackActions } from '@react-navigation/native';

export default function TelehealthrMain({navigation}) {
    const alertHandler= () => {
      Alert.alert('function unimplemented')
    }
    const goToSub= () => {
        navigation.navigate("telehealthSub")
    }
    const [search, setSearch] = React.useState('');
    const goBack= () => {
        navigation.dispatch(StackActions.pop(1))
      }
    
    return (
      <View style={{ flex:1, justifyContent: "center", alignItems: "center" ,paddingTop: 40,backgroundColor:"white"}}>
         <View style={{flexDirection: 'row', marginTop:120, marginBottom:10}}>
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
            style = {{height:200,
              width:200,marginTop:-85,marginBottom:30}}
            source = {require('../../images/telehealth_icon/service_telehealth_img.png')}

        />
        <SearchBar
          round
          //searchIcon={{ size: 24 }}
          //onChangeText={(text) => searchFilterFunction(text)}
          //onClear={(text) => searchFilterFunction('')}
          containerStyle={{backgroundColor:'white',width:355,height:40,shadowColor:"000000",shadowOffset: {
            width: 0,
            height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,

            elevation: 6,
            borderRadius:25}}
          inputStyle={{color:'black',fontSize:14}}
          inputContainerStyle={{backgroundColor:'white',height:15}}
          lightTheme={true}
          placeholder="搜索种类..."
          onChangeText={search => setSearch(search)}
          
          value={search}
        />
        <View style={{flexDirection: 'row', marginBottom: 15,marginTop:40}}>
          <Text style={{marginLeft:-170,fontSize:19}}>预约种类</Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 45}}>
        <View style={{shadowColor:"000000",shadowOffset: {
	              width: 0,
	              height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,}}>
          <TouchableOpacity style={{backgroundColor:'#FEA495',
                            padding:20,
                            width:80,
                            marginLeft:20,
                            marginTop:10,
                            height:80,
                            alignItems: 'center',
                            borderRadius:25,}}
                            onPress={goToSub}>
          <Image
            style={{width:30,height:30}}
            source = {require('../../images/telehealth_icon/service_telehealth_icon_gp.png')}
          />
          <Text style={{color:'#FFFFFF',marginTop:2}}>全科</Text>

          </TouchableOpacity>
          </View>

          <View style={{shadowColor:"000000",shadowOffset: {
	              width: 0,
	              height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,}}>
          <TouchableOpacity style={{backgroundColor:'#FFFFFF',
                            padding:20,
                            width:80,
                            marginLeft:15,
                            marginTop:10,
                            height:80,
                            alignItems: 'center',
                            borderRadius:25,}}
                            onPress={goToSub}>
          <Image
            style={{width:30,height:30}}
            source = {require('../../images/telehealth_icon/service_telehealth_icon_dentist.png')}
          />
          <Text style={{color:'#68B0AB',marginTop:2}}>牙科</Text>

          </TouchableOpacity>
          </View>
          <View style={{shadowColor:"000000",shadowOffset: {
	              width: 0,
	              height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,}}>
          <TouchableOpacity style={{backgroundColor:'#FFFFFF',
                            padding:20,
                            width:80,
                            marginLeft:15,
                            marginTop:10,
                            height:80,
                            alignItems: 'center',
                            borderRadius:25,}}
                            onPress={goToSub}>
                            
          <Image
            style={{width:30,height:30}}
            source = {require('../../images/telehealth_icon/service_telehealth_icon_mental.png')}
          />
          <Text style={{color:'#68B0AB',marginTop:2}}>心理</Text>

          </TouchableOpacity>
          </View>
          <View style={{shadowColor:"000000",shadowOffset: {
	              width: 0,
	              height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,
                }}>
          <TouchableOpacity style={{backgroundColor:'#FFFFFF',
                            padding:20,
                            width:80,
                            marginLeft:15,
                            marginTop:10,
                            height:80,
                            alignItems: 'center',
                            borderRadius:25,
                            }}
                            onPress={goToSub}>
          <Image
            style={{width:34,height:30}}
            source = {require('../../images/telehealth_icon/service_telehealth_icon_child.png')}
          />
          <Text style={{color:'#68B0AB',marginTop:2}}>儿科</Text>
          </TouchableOpacity>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 15}}>
          <Text style={{marginLeft:-170,fontSize:19}}>推荐医生</Text>
        </View>
        <ScrollView horizontal={true} style={{marginLeft:40,maxHeight:210}}>
        <View style={{shadowColor:"000000",shadowOffset: {
	              width: 0,
	              height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,
                marginRight:30

                }}>
          <TouchableOpacity style={{backgroundColor:'#FFFFFF',
                            padding:20,
                            width:300,
                           // marginLeft:20,
                            //marginTop:10,
                            height:120,
                            alignItems: 'center',
                            borderRadius:15,}}>
            <View style={{flexDirection: 'row'}}>

            <Image
              style={{width:80,height:80,marginLeft:-120}}
              source={require('../../images/telehealth_icon/service_doctor_img1.png')}/>
            </View>
            <Text style={{fontSize:17,marginTop:-75,marginLeft:40}}>李医生</Text>
            <Text style={{fontSize:12,color:'#999999',marginLeft:38,marginTop:10}}>全科医生</Text>
            <View style={{flexDirection: 'row'}}>

            <Image
              style={{width:25,height:25,marginTop:8,marginLeft:85}}
              source={require('../../images/telehealth_icon/stars.png')}/>
            <Text style={{fontSize:12,color:'#999999',marginTop:10}}>4.9 (120评价)</Text>
            </View>
          </TouchableOpacity>
          
          </View>
          <View style={{shadowColor:"000000",shadowOffset: {
	              width: 0,
	              height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,
                marginRight:30
                }}>
          <TouchableOpacity style={{backgroundColor:'#FFFFFF',
                            padding:20,
                            width:300,
                           // marginLeft:20,
                            //marginTop:10,
                            height:120,
                            alignItems: 'center',
                            borderRadius:15,}}>
            <View style={{flexDirection: 'row'}}>

            <Image
              style={{width:80,height:80,marginLeft:-120}}
              source={require('../../images/telehealth_icon/service_doctor_img2.png')}/>
            </View>
            <Text style={{fontSize:17,marginTop:-75,marginLeft:40}}>王医生</Text>
            <Text style={{fontSize:12,color:'#999999',marginLeft:38,marginTop:10}}>全科医生</Text>
            <View style={{flexDirection: 'row'}}>

            <Image
              style={{width:25,height:25,marginTop:8,marginLeft:85}}
              source={require('../../images/telehealth_icon/stars.png')}/>
            <Text style={{fontSize:12,color:'#999999',marginTop:10}}>4.9 (120评价)</Text>
            </View>
          </TouchableOpacity>
          
          </View>
          </ScrollView>
          <Image style = {{
          width:220,
          height:30,
          marginLeft:30,
          marginTop:-50,
          }}
          source = {require('../../images/icon/1/contact.png')}
          />

      </View>
    );
  }
