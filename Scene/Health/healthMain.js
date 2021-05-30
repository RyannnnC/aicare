import React ,{Component} from 'react';
import { SafeAreaView,ScrollView,Text, Button, View, Alert, Image,TouchableOpacity, FlatList} from 'react-native';
import { SearchBar } from 'react-native-elements';
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

  componentDidMount = () => {
    this.setState({isLoading:true})
    let tp = 1;
    if (this.context.employerId !=null) {
      tp = 2;
    }
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      let url = 'http://'
      +this.context.url
      +'/aicare-business-api/business/appointment/query?status=1'
      + '&type=' + tp;
        fetch(url,{
          method: 'GET',
          mode: 'cors',
          credentials: 'include',
          headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
          'sso-auth-token': this.context.token,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Headers': 'content-type, sso-auth-token',
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE',
        }})
        .then((response) => response.json())
        .then((json) => {
          this.setState({isLoading:false})
          if (json.code === 0) {
            this.setState({data:json.page});
            this.setState({length:json.page.length});
          } else {
            console.log(json.msg)
          }
        }).catch(error => console.warn(error));
    });
  }

  /*  {this.context.employerId != null &&
      <View style={styles.buttons}>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600'}}>{I18n.t('myPatient')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer2}>
        <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600'}}>{I18n.t('myAssistant')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer3}>
        <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600'}}>{I18n.t('emRecord')}</Text>
      </TouchableOpacity>
    </View>
  }*/
  render () {
  var date = moment(new Date()).format('LL');
  let orders;
  if (this.state.data.length >0) {
  orders = this.state.data.map((item,i) => {
    if (i == 0) {
    return(
    <TouchableOpacity key={item.id} style={styles.card2} onPress = {() => this.props.navigation.navigate('预约')}>
    <View style={{width:'80%',marginLeft:'10%'}}>
    <View style={{flexDirection: 'row', marginTop:16, marginBottom:16}}>
      <Image
        style = {{width:40,height:40,marginRight:15}}
        source = {require('../../images/providerImg/home_img_person.png')}
      />
      <View>
        <Text style={{marginTop:4,fontSize:16, color:'#333333', fontWeight: '500'}}>{item.customerRealName}</Text>
        <Text style={{marginTop:1,fontSize:12, color:'#666666', fontWeight: '400'}}>{item.mobile}</Text>
      </View>
    </View>
    <View style={{flexDirection: 'row',paddingBottom: 10}}>
      <View style={{flexDirection: 'row',width:'65%'}}>
      <Image
        style = {{width: 15, height:15 , marginRight:5}}
        source = {require('../../images/providerImg/schedule_icon_time.png')}
        />
      <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>{moment(item.appointDate).format('L').substring(0,5)} {item.startTime&&item.startTime.substring(0,5)}-{item.endTime&&item.endTime.substring(0,5)}</Text>
      </View>
      <View style={{flexDirection: 'row',width:'35%'}}>
      <Image
        style = {{width: 15, height:15, marginRight:5}}
        source = {require('../../images/providerImg/schedule_icon_type.png')}
      />
      <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>{item.deptName}</Text>
      </View>
    </View>
    <View style={{flexDirection: 'row',paddingBottom: 12, borderBottomWidth: 1, borderBottomColor:'#EEEEEE'}}>
      <View style={{flexDirection: 'row',width:'65%'}}>
      <Image
        style = {{width: 15, height:15 , marginRight:5}}
        source = {require('../../images/providerImg/schedule_icon_person.png')}
        />
      <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>{item.businessEmployerName}</Text>
      </View>
      {item.telehealthFlg ==1?
        <View style={{flexDirection: 'row',width:'35%'}}>
        <Image
          style = {{width: 15, height:15,marginRight:5}}
          source = {require('../../images/providerImg/account_icon_video.png')}
        />
        <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>{I18n.t('telehealth')}</Text>
        </View>
      :
      <View style={{flexDirection: 'row',width:'35%'}}>
      <Image
        style = {{width: 15, height:15, marginRight:5}}
        source = {require('../../images/providerImg/schedule_icon_location.png')}
      />
      <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>{I18n.t('onsite')}</Text>
      </View>
      }
    </View>
  </View>
  </TouchableOpacity>
  )}
  })}
  return (
    <SafeAreaView>
    <LinearGradient
    colors={['rgba(250,250,247,0.0)', '#ecf4f3']}
    style={{width:'100%',height:'100%', justifyContent: "center", alignItems: "center"}}>
    <ScrollView style={{ width:'100%',flex:1}}>
      <View style={{ justifyContent: "center", alignItems: "center"}}>
      <View style={{flex:1,width:'88%',marginTop:40,flexDirection: 'row', marginBottom: 15}}>
        <View style={{flex:1,width:'50%',marginLeft:'5%',marginTop:30,}}>
          <Text style={{ color: '#006A71', fontSize: 24, fontWeight: '600'}} >{date}</Text>
          <Text style={{ color: '#333333', fontSize: 16, fontWeight: '400'}}>{I18n.t('numOrder',{num:this.state.length})}</Text>
        </View>
        <Image
          style = {styles.mainImg}
          source = {require('../../images/crayon-1317.png')}
        />
      </View>

    <View>
      <Text style={{ color: '#333333', fontSize: 20, fontWeight: '500'}}>{I18n.t('pOrder')}</Text>
    </View>

    {orders}

    <View>
      <Text style={{ color: '#333333', fontSize: 20, fontWeight: '500'}}>{I18n.t('todayOrder')}</Text>
    </View>
    <TouchableOpacity style={styles.card} onPress = {() => this.props.navigation.navigate('预约')}>
      <View style={{flexDirection: 'row', borderBottomColor:'#EEEEEE',borderBottomWidth:1, marginTop:21, paddingBottom:10}}>
        <View style={{marginLeft:20 }}>
          <Text style={{ color: '#333333', fontSize: 16, fontWeight: '600', marginBottom:5}}>14：00-15：00</Text>
          <Text style={{ color: '#333333', fontSize: 14, fontWeight: '300'}}>您有一项实地预约</Text>
        </View>
      <Image
        style = {styles.img3}
        source = {require('../../images/crayon-892.png')}
        />
      </View>
      <View style={{flexDirection: 'row', marginTop:10}}>
        <Image
          style = {{width: 15, height:15 , marginLeft:25, marginRight:5}}
          source = {require('../../images/providerImg/home_icon_user.png')}
          />
        <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>罗女士</Text>
        <Image
          style = {{width: 15, height:15 , marginLeft:100, marginRight:5}}
          source = {require('../../images/providerImg/home_icon_mobile.png')}
          />
        <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>+61 412345678</Text>
      </View>
    </TouchableOpacity>
    </View>
    </ScrollView>
    </LinearGradient>
    </SafeAreaView>
  );}
}
HealthMain.contextType = DataContext;
