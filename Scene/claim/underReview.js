import React ,{Component}from 'react';
import { TextInput,Alert,Text, View, Image,SafeAreaView,ScrollView,TouchableOpacity,Modal,ActivityIndicator } from 'react-native';
import { SearchBar } from 'react-native-elements';
import DataContext from '../../providerContext';
import { CheckBox } from 'react-native-elements';
import moment from 'moment';
import I18n from '../switchLanguage';

export default class Fail extends Component {
    constructor(props) {
      super(props);
      this.state={
        data:[],
        isLoading:false,
      };
    }

    componentDidMount = () => {
      this.setState({isLoading:true});
      this._unsubscribe = this.props.navigation.addListener('focus', () => {this.queryOrders()});
    }

    componentWillUnmount() {
      this._unsubscribe();
    }

    loggedin(msg) {
      Alert.alert(
        '',
        msg,
        [
          {text: '确定', onPress: () => {this.context.action.logout()}},
        ],
        {
          cancelable: false
        }
      );
    }

    queryOrders() {
      let url = 'http://'
      +this.context.url
      +'/aicare-business-api/business/appointment/query?status=5'
      + '&type=2';
        fetch(url,{
          method: 'GET',
          mode: 'cors',
          credentials: 'include',
          headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
          'sso-auth-token': this.context.token,
          'sso-refresh-token': this.context.refresh_token,
        }})
        .then((response) => response.json())
        .then((json) => {
          this.setState({isLoading:false})
          if (json.code === 0) {
            console.log(json);
            this.setState({data:json.page});
          } else if (json.code == 10011) {
            this.loggedin(json.msg)
          } else {
            console.log(json.msg)
          }
        }).catch(error => console.warn(error));
  }

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
  };

  render () {
    let orders;
    if (this.state.isLoading){
      return(
        <View style={{ flex: 1, backgroundColor:'rgb(51,51,51)', justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="white"  />
        </View>
    )
    }else {
      orders = this.state.data.map((item) => {
        return (
          <View key={item.appointmentId} style={{width:'90%'}}>
          <TouchableOpacity style={{borderColor:'#EEEEEE',borderTopWidth:1,flexDirection:'row',width:'100%',height:50,backgroundColor:'white'}}>
            <View style={{flexDirection:'row',alignItems:'center',width:'20%',paddingLeft:'1%'}}>
              {item.sex == 'M'?
              <Image
                style = {{width:20,height:20,marginRight:5}}
                source = {require('../../images/providerImg/Gender-2.png')}
              />
              :
              <Image
                style = {{width:20,height:20,marginRight:5}}
                source = {require('../../images/providerImg/Gender-1.png')}
              />
              }
              <Text style={{fontWeight: '400'}}>{item.customerRealName}</Text>
            </View>
            <View style={{alignItems:'center',justifyContent:'center',width:'10%'}}>
              <Text style={{fontWeight: '400'}}>{item.sex}</Text>
            </View>
            <View style={{alignItems:'center',justifyContent:'center',width:'15%'}}>
              <Text style={{fontWeight: '400'}}>{item.birthDate!=null && item.birthDate.substring(0,10)}</Text>
            </View>
            <View style={{alignItems:'center',justifyContent:'center',width:'20%'}}>
              <Text style={{fontWeight: '400'}}>{item.mobile}</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',width:'20%'}}>
              <Text style={{fontWeight: '400'}}>{item.cardNumber}</Text>
            </View>
            <View style={{alignItems:'center',justifyContent:'center',width:'15%'}}>
            <TouchableOpacity style={{alignItems:'center',justifyContent:'center',width: 'auto',height:30,paddingLeft:5,paddingRight:5,borderRadius:5,backgroundColor:'rgb(33,192,196)'}}>
              <Text style={{color:'white'}}>{I18n.t('submit')}</Text>
            </TouchableOpacity>
            </View>
          </TouchableOpacity>
          </View>
        )
      })
    return (
      <SafeAreaView style={{ flex: 1,backgroundColor:'rgb(51,51,51)'}}>
        <View style={{width:'100%',height:'100%', backgroundColor:'rgb(51,51,51)',alignItems:'center'}}>
        <ScrollView style={{ flex:1, width:'90%',height:'100%',backgroundColor:'white'}}
        contentContainerStyle={{alignItems:'center'}}
        onScroll={({nativeEvent}) => {
          if (this.isCloseToBottom(nativeEvent)) {
            if (this.state.page < this.state.tPage) {
              this.queryOrders()
            }
          }
        }}>
          <View style={{marginTop:20,flexDirection:'row',height:30,width:'90%'}}>
            <Text style={{marginRight:'1%'}}>{I18n.t('date')}</Text>
            <TextInput style={{width:'15%',marginRight:'2%',borderRadius:5,borderWidth:1,borderColor:'black'}}
            value={this.state.fn}
            onChangeText={(text) => {this.setState({fn:text})}}/>
            <TouchableOpacity style={{
            width: '20%',
            height: 30,
            backgroundColor: 'rgb(33,192,196)',
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: "center"}} onPress={() => {this.queryOrders()}}>
              <Text style={{ fontSize:16, fontWeight: '500', color: '#ffffff' }}>{I18n.t('search')}</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection:'row',width:'90%',margin:'2%'}}>
            <Image
              style = {{width:30,height:30,marginRight:5}}
              source = {require('../../images/providerImg/ICON-7-2.png')}
            />
            <Text style={{marginLeft:'2%',fontSize:24,color:'rgb(33,192,196)',fontWeight: '500'}}>{I18n.t('claim')}</Text>
          </View>
          <View style={{flexDirection:'row',width:'90%'}}>
            <Text style={{fontSize:16,fontWeight: '400'}}>{I18n.t('undermsg',{num:this.state.data.length,money:this.state.data.length*50})}</Text>
          </View>
          <View style={{borderColor:'#EEEEEE',borderTopWidth:1,flexDirection:'row',width:'90%',height:60,backgroundColor:'rgb(222,246,246)'}}>
              <View style={{alignItems:'center',justifyContent:'center',width:'20%'}}>
                <Text style={{fontWeight: '400'}}>{I18n.t('name')}</Text>
              </View>
              <View style={{alignItems:'center',justifyContent:'center',width:'10%'}}>
                <Text style={{fontWeight: '400'}}>{I18n.t('gender')}</Text>
              </View>
              <View style={{alignItems:'center',justifyContent:'center',width:'15%'}}>
                <Text style={{fontWeight: '400'}}>{I18n.t('dateofBirth')}</Text>
              </View>
              <View style={{alignItems:'center',justifyContent:'center',width:'20%'}}>
                <Text style={{fontWeight: '400'}}>{I18n.t('mobile')}</Text>
              </View>
              <View style={{alignItems:'center',justifyContent:'center',width:'20%'}}>
                <Text style={{fontWeight: '400'}}>{I18n.t('in')}</Text>
              </View>
              <View style={{alignItems:'center',justifyContent:'center',width:'15%'}}>
                <Text style={{fontWeight: '400'}}>{I18n.t('operation')}</Text>
              </View>
          </View>
          {orders}
        </ScrollView>
        </View>
      </SafeAreaView>
    )
  }}
}
Fail.contextType = DataContext;
