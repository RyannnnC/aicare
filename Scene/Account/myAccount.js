import React ,{Component}from 'react';
import {ScrollView, Text, View, Image,SafeAreaView,TouchableOpacity,ActivityIndicator } from 'react-native';
import DataContext from '../../providerContext';
import I18n from '../switchLanguage';
import moment from 'moment-timezone';

export default class MyAccount extends Component {
    constructor(props) {
      super(props);
      this.state={
        balance:100,
        week:30,
        month:50,
        total:100,
        list:[]
      };
    }
    componentDidMount(){
      this.query();
      this.queryList();
    }
    query() {
      this.setState({isLoading:true})
      let url = 'http://'
      +this.context.url
      +'/aicare-business-api/business/acount/info'
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
            this.setState({
              week:json.data.weekAcount/100 ,
              month:json.data.monthAcount/100,
              balance:json.data.balanceAcount/100,
              total:json.data.totalAcount/100,
            });

          } else {
            console.log(json.msg)
          }
        }).catch(error => console.warn(error));
    }
    queryList() {
      this.setState({isLoading:true})
      let url = 'http://'
      +this.context.url
      +'/aicare-business-api/business/acount/list'
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
            this.setState({list:json.page.list});
          } else if (json.code == 10011) {
            this.loggedin(json.msg)
          } else {
            console.log(json.msg)
          }
        }).catch(error => console.warn(error));
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
  render () {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    if (this.state.isLoading){
      return(
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00ff00"  />
     </View>
    )
    }else {
      let list;
      if (this.state.list.length > 0) {
        list = this.state.list.map((item) => {
        return (
          <View key={item.id} style={{borderColor:'#EEEEEE',borderBottomWidth:1,flexDirection:'row',width:'100%',height:50,backgroundColor:'white'}}>
            <View style={{flexDirection:'row',alignItems:'center',width:'30%',paddingLeft:'5%'}}>
              <Image
                style = {{width:20,height:20,marginRight:10}}
                source = {require('../../images/providerImg/Gender-2.png')}
              />
              <Text style={{fontWeight: '400'}}>{item.customerRealName}</Text>
            </View>
            <View style={{alignItems:'center',justifyContent:'center',width:'25%'}}>
              <Text style={{fontWeight: '400'}}>{item.appTypeName}</Text>
            </View>
            <View style={{alignItems:'center',justifyContent:'center',width:'25%'}}>
              <Text style={{fontWeight: '400'}}>{moment(item.updatedDate).format('L')}</Text>
            </View>
            <View style={{alignItems:'flex-end',justifyContent:'center',width:'15%',paddingRight:'5%'}}>
              <Text style={{fontWeight: '400'}}>${item.realAmount/100}</Text>
            </View>

          </View>
        )
      })}
    return (
      <SafeAreaView style={{ width:'100%',flex:1,backgroundColor:"white",alignItems: 'center', backgroundColor:'rgb(51,51,51)' }}>
        <View style={{width:'90%',height:'100%',alignItems: 'center', backgroundColor:'white'}}>
        <View style={{flexDirection:'row',width:'95%',marginTop:'5%'}}>
          <View style={{width:'60%',flexDirection:'row'}}>
            <Text style={{ color: 'rgb(32,191,195)',marginLeft:'1%', fontSize: 22, fontWeight: '600'}}>Statistics</Text>
          </View>
          <View style={{width:'40%',flexDirection:'row', justifyContent:'space-between'}}>
            <TouchableOpacity style={{flexDirection:'row',marginRight:'1%'}}>
              <Image
                style = {{width: 28, height:20,marginRight:5}}
                source = {require('../../images/providerImg/yszh-05.png')}
              />
              <Text style={{ fontSize: 20, fontWeight: '500'}}>Credit Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection:'row',marginRight:'3%'}}>
              <Image
                style = {{width: 28, height:20,marginRight:5}}
                source = {require('../../images/providerImg/yszh-06.png')}
              />
              <Text style={{ fontSize: 20, fontWeight: '500'}}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{width:'95%',height:'21%',flexDirection: 'row',justifyContent:'center',alignItems: 'center'}}>
          <TouchableOpacity style={{height:110,width:'23%',marginLeft:'1%',marginRight:'1%',backgroundColor: 'rgb(242,146,130)',
          borderRadius: 15,justifyContent: "center",alignItems: "center"}}>
            <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: '600'}}>{this.state.balance?this.state.balance:0}</Text>
            <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: '600'}}>Balance</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{height:110,width:'23%',marginLeft:'1%',marginRight:'1%',backgroundColor: 'rgb(85,234,238)',
          borderRadius: 15,justifyContent: "center",alignItems: "center"}}>
            <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: '600'}}>{this.state.week?this.state.week:0}</Text>
            <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: '600'}}>Weekly Income</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{height:110,width:'23%',marginLeft:'1%',marginRight:'1%',backgroundColor: 'rgb(58,211,216)',
          borderRadius: 15,justifyContent: "center",alignItems: "center"}}>
            <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: '600'}}>{this.state.month?this.state.month:0}</Text>
            <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: '600'}}>Monthly Income</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{height:110,width:'23%',marginLeft:'1%',marginRight:'1%',backgroundColor: 'rgb(33,192,196)',
          borderRadius: 15,justifyContent: "center",alignItems: "center"}}>
            <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: '600'}}>{this.state.total?this.state.total:0}</Text>
            <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: '600'}}>Total Income</Text>
          </TouchableOpacity>
        </View>
        <View style={{width:'90%',flexDirection: 'row',borderBottomWidth:1,borderColor:'#EEEEEE',marginTop:'3%'}}>
          <TouchableOpacity style={{marginRight:'5%',flexDirection: 'row',}}>
            <Text style={{fontSize:16,fontWeight: '600'}}>{month}/{date}</Text>
            <Image
              style = {{width: 16, height:16,marginLeft:5}}
              source = {require('../../images/providerImg/schedule_icon_calender.png')}
              />
          </TouchableOpacity>
        </View>
        <View style={{borderColor:'#EEEEEE',backgroundColor:'rgb(222,246,246)',borderBottomWidth:1,flexDirection:'row',width:'90%',height:50}}>
          <View style={{flexDirection:'row',alignItems:'center',width:'30%',paddingLeft:'5%'}}>
            <Text style={{fontWeight: '400'}}>{I18n.t('name')}</Text>
          </View>
          <View style={{alignItems:'center',justifyContent:'center',width:'25%'}}>
            <Text style={{fontWeight: '400'}}>{I18n.t('serviceType')}</Text>
          </View>
          <View style={{alignItems:'center',justifyContent:'center',width:'25%'}}>
            <Text style={{fontWeight: '400'}}>{I18n.t('bookingTime')}</Text>
          </View>
          <View style={{alignItems:'flex-end',justifyContent:'center',width:'15%',paddingRight:'5%'}}>
            <Text style={{fontWeight: '400'}}>${I18n.t('amount')}</Text>
          </View>
        </View>
        <ScrollView style={{width:'90%',flex:1}}>
          {list}
        </ScrollView>
       </View>
      </SafeAreaView>
    )
  }}
}
MyAccount.contextType = DataContext;
