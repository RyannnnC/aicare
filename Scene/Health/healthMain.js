import React ,{Component} from 'react';
import { Platform,SafeAreaView,ScrollView,Text,View,Image,TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {styles} from '../providerStyle';
import DataContext from "../../providerContext";
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment-timezone';
import I18n from '../switchLanguage';

export default class HealthMain extends Component {
  constructor(props) {
    super(props);
    this.state={
      length:0,
      data:[],
      isLoading:false,
    };
  }


  render () {
    return (
      <SafeAreaView style={{flex:1,backgroundColor:'rgb(51,51,51)',alignItems:'center'}}>
        <View style={{height:'90%',width:'85%',alignItems:'center',justifyContent:'center'}}>
          <View style={{height:'25%',width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <TouchableOpacity
              style={{
                width:'20%',
                height:'90%',
                borderRadius:15,
                margin:'2%',
              }}
              onPress={() => {}}>
              <View style={{
                width:'100%',
                height:'35%',
                backgroundColor:'rgb(33,192,196)',alignItems:'center',justifyContent:'flex-end',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
              }}>
                <Image
                  style={{height:40,width:40}}
                  source={require('../../images/providerImg/mokuai-1-2.png')}
                />
              </View>
              <View style={{
                width:'100%',
                height:'65%',
                backgroundColor:'white',alignItems:'center',justifyContent:'center',
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
              }}>
                <Text>{I18n.t('myPatient')}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width:'20%',
                height:'90%',
                borderRadius:15,
                margin:'2%',
              }}
              onPress={() => this.props.navigation.navigate('预约',{screen:I18n.t('pendingOrder')})}>
              <View style={{
                width:'100%',
                height:'35%',
                backgroundColor:'rgb(33,192,196)',alignItems:'center',justifyContent:'flex-end',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
              }}>
                <Image
                  style={{height:40,width:40}}
                  source={require('../../images/providerImg/mokuai-2-2.png')}
                />
              </View>
              <View style={{
                width:'100%',
                height:'65%',
                backgroundColor:'white',alignItems:'center',justifyContent:'center',
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
              }}>
                <Text>{I18n.t('cal')}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width:'20%',
                height:'90%',
                borderRadius:15,
                margin:'2%',
              }}
              onPress={() => {}}>
              <View style={{
                width:'100%',
                height:'35%',
                backgroundColor:'rgb(33,192,196)',alignItems:'center',justifyContent:'flex-end',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
              }}>
                <Image
                  style={{height:40,width:40}}
                  source={require('../../images/providerImg/mokuai-3-2.png')}
                />
              </View>
              <View style={{
                width:'100%',
                height:'65%',
                backgroundColor:'white',alignItems:'center',justifyContent:'center',
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
              }}>
                <Text>{I18n.t('ehr')}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width:'20%',
                height:'90%',
                borderRadius:15,
                margin:'2%',
              }}
              onPress={() => {}}>
              <View style={{
                width:'100%',
                height:'35%',
                backgroundColor:'rgb(33,192,196)',alignItems:'center',justifyContent:'flex-end',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
              }}>
                <Image
                  style={{height:40,width:40}}
                  source={require('../../images/providerImg/mokuai-4-2.png')}
                />
              </View>
              <View style={{
                width:'100%',
                height:'65%',
                backgroundColor:'white',alignItems:'center',justifyContent:'center',
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
              }}>
                <Text>{I18n.t('ia')}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{height:'25%',width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <TouchableOpacity
              style={{
                width:'20%',
                height:'90%',
                borderRadius:15,
                margin:'2%',
              }}
              onPress={() => this.props.navigation.navigate(I18n.t('myAccount'))}>
              <View style={{
                width:'100%',
                height:'35%',
                backgroundColor:'rgb(33,192,196)',alignItems:'center',justifyContent:'flex-end',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
              }}>
                <Image
                  style={{height:40,width:40}}
                  source={require('../../images/providerImg/mokuai-5-2.png')}
                />
              </View>
              <View style={{
                width:'100%',
                height:'65%',
                backgroundColor:'white',alignItems:'center',justifyContent:'center',
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
              }}>
                <Text>{I18n.t('myAccount')}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width:'20%',
                height:'90%',
                borderRadius:15,
                margin:'2%',
              }}
              onPress={() => {}}>
              <View style={{
                width:'100%',
                height:'35%',
                backgroundColor:'rgb(33,192,196)',alignItems:'center',justifyContent:'flex-end',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
              }}>
                <Image
                  style={{height:40,width:40}}
                  source={require('../../images/providerImg/mokuai-6-2.png')}
                />
              </View>
              <View style={{
                width:'100%',
                height:'65%',
                backgroundColor:'white',alignItems:'center',justifyContent:'center',
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
              }}>
                <Text>{I18n.t('report')}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width:'20%',
                height:'90%',
                borderRadius:15,
                margin:'2%',
              }}
              onPress={() => {}}>
              <View style={{
                width:'100%',
                height:'35%',
                backgroundColor:'rgb(33,192,196)',alignItems:'center',justifyContent:'flex-end',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
              }}>
                <Image
                  style={{height:40,width:40}}
                  source={require('../../images/providerImg/mokuai-7-2.png')}
                />
              </View>
              <View style={{
                width:'100%',
                height:'65%',
                backgroundColor:'white',alignItems:'center',justifyContent:'center',
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
              }}>
                <Text>{I18n.t('vr')}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width:'20%',
                height:'90%',
                borderRadius:15,
                margin:'2%',
              }}
              onPress={() => {}}>
              <View style={{
                width:'100%',
                height:'35%',
                backgroundColor:'rgb(33,192,196)',alignItems:'center',justifyContent:'flex-end',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
              }}>
                <Image
                  style={{height:40,width:40}}
                  source={require('../../images/providerImg/mokuai-8-2.png')}
                />
              </View>
              <View style={{
                width:'100%',
                height:'65%',
                backgroundColor:'white',alignItems:'center',justifyContent:'center',
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
              }}>
                <Text>{I18n.t('claim')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
  )}
}
HealthMain.contextType = DataContext;
