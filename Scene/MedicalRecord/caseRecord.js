import React ,{Component}from 'react';
import { TextInput,Alert,Text, View, Image,SafeAreaView,ScrollView,TouchableOpacity,Modal,ActivityIndicator } from 'react-native';
import { SearchBar } from 'react-native-elements';
import DataContext from '../../providerContext';
import { CheckBox } from 'react-native-elements';
import moment from 'moment';
import I18n from '../switchLanguage';
import FontAwesome5 from '../../node_modules/react-native-vector-icons/FontAwesome5';

export default class CaseRecord extends Component {
    constructor(props) {
      super(props);
      this.state={
        data:[],
        isLoading:false,
        fn:'',
        ln:'',
        mobile:'',
        in:'',
        page: 0,
        tPage:10,
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
      +'/aicare-business-api/business/emr/list'
        fetch(url,{
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
          'sso-auth-token': this.context.token,
          'sso-refresh-token': this.context.refresh_token,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Headers': 'content-type, sso-auth-token',
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE',
        },
          body: JSON.stringify({
            firstName: this.state.fn,
            insuranceNumber: this.state.in,
            lastName: this.state.ln,
            mobile: this.state.mobile,
            limit:'10',
            page: (this.state.page+1).toString()
          })
      })
        .then((response) => response.json())
        .then((json) => {
          this.setState({isLoading:false});
          if (json.code === 0) {
            let data = this.state.data
            for (let i=0;i<json.page.list.length;i++){
              data.push(json.page.list[i])
            }
            this.setState({data:data,tPage:json.page.totalPage,page:json.page.currPage});

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
          <TouchableOpacity  onPress={()=> this.props.navigation.navigate(I18n.t('recordDetail'),{appointmentId:item.appointmentId,customerUserInfoId:item.customerUserInfoId}) } style={{borderColor:'#EEEEEE',borderTopWidth:1,flexDirection:'row',width:'100%',height:50,backgroundColor:'white'}}>
            <View style={{flexDirection:'row',alignItems:'center',width:'20%',paddingLeft:'1%'}}>
              {item.sex == 'Male'?
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
              <Text style={{fontWeight: '400'}}>{item.firstName} {item.lastName}</Text>
            </View>
            <View style={{alignItems:'center',justifyContent:'center',width:'20%'}}>
              <Text style={{fontWeight: '400'}}>{item.sex}</Text>
            </View>
            <View style={{alignItems:'center',justifyContent:'center',width:'20%'}}>
              <Text style={{fontWeight: '400'}}>{item.dateOfBirth!=null && item.dateOfBirth.substring(0,10)}</Text>
            </View>
            <View style={{alignItems:'center',justifyContent:'center',width:'20%'}}>
              <Text style={{fontWeight: '400'}}>{item.mobile}</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',width:'20%'}}>
              <Text style={{fontWeight: '400'}}>{item.insuranceNumber}</Text>
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
            <Text style={{marginRight:'1%'}}>{I18n.t('fn')}</Text>
            <TextInput style={{width:'15%',marginRight:'2%',borderRadius:5,borderWidth:1,borderColor:'black'}}
            value={this.state.fn}
            onChangeText={(text) => {this.setState({fn:text})}}/>
            <Text style={{marginRight:'1%'}}>{I18n.t('ln')}</Text>
            <TextInput style={{width:'15%',marginRight:'2%',borderRadius:5,borderWidth:1,borderColor:'black'}}
            value={this.state.ln}
            onChangeText={(text) => {this.setState({ln:text})}}/>
            <Text style={{marginRight:'1%'}}>{I18n.t('in')}</Text>
            <TextInput style={{width:'15%',marginRight:'2%',borderRadius:5,borderWidth:1,borderColor:'black'}}
            value={this.state.in}
            onChangeText={(text) => {this.setState({in:text})}}/>
            <Text style={{marginRight:'1%'}}>{I18n.t('mobile')}</Text>
            <TextInput style={{width:'15%',marginRight:'2%',borderRadius:5,borderWidth:1,borderColor:'black'}}
            value={this.state.mobile}
            onChangeText={(text) => {this.setState({mobile:text})}}/>
          </View>
          <TouchableOpacity style={{
          width: '20%',
          height: 30,
          backgroundColor: 'rgb(33,192,196)',
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: "center",
          margin:'1%'}} onPress={() => {this.queryOrders()}}>
            <Text style={{ fontSize:16, fontWeight: '500', color: '#ffffff' }}>{I18n.t('search')}</Text>
          </TouchableOpacity>
          <View style={{flexDirection:'row',width:'90%',margin:'2%'}}>
            <FontAwesome5 name="notes-medical" size={30} color='rgb(33,192,196)' />
            <Text style={{marginLeft:'2%',fontSize:24,color:'rgb(33,192,196)',fontWeight: '500'}}>{I18n.t('ehr')}</Text>
          </View>
          <View style={{borderColor:'#EEEEEE',borderTopWidth:1,flexDirection:'row',width:'90%',height:60,backgroundColor:'rgb(222,246,246)'}}>
              <View style={{alignItems:'center',justifyContent:'center',width:'20%'}}>
                <Text style={{fontWeight: '400'}}>{I18n.t('name')}</Text>
              </View>
              <View style={{alignItems:'center',justifyContent:'center',width:'20%'}}>
                <Text style={{fontWeight: '400'}}>{I18n.t('gender')}</Text>
              </View>
              <View style={{alignItems:'center',justifyContent:'center',width:'20%'}}>
                <Text style={{fontWeight: '400'}}>{I18n.t('dateofBirth')}</Text>
              </View>
              <View style={{alignItems:'center',justifyContent:'center',width:'20%'}}>
                <Text style={{fontWeight: '400'}}>{I18n.t('mobile')}</Text>
              </View>
              <View style={{alignItems:'center',justifyContent:'center',width:'20%'}}>
                <Text style={{fontWeight: '400'}}>{I18n.t('in')}</Text>
              </View>
          </View>
          {orders}
        </ScrollView>
        </View>
      </SafeAreaView>
    )
  }}
}
CaseRecord.contextType = DataContext;
