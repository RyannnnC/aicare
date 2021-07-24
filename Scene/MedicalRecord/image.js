import React ,{Component}from 'react';
import {Modal,ActivityIndicator,ScrollView,Text, View,  Image,TouchableOpacity,SafeAreaView,TextInput } from 'react-native';
import {styles} from '../providerStyle';
import DataContext from '../../providerContext';
import I18n from '../switchLanguage';

export default class ImageList extends Component {
  constructor(props) {
    super(props);
    this.state={
      imageList:[],
    }
  }

  async componentDidMount(){
    this.query()
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

  query() {
    this.setState({isLoading:true})
    let url = 'http://'
    +this.context.url
    +'/aicare-business-api/business/medical-report/get-radiology-report-list'
    +'?customerUserInfoId='+ this.props.route.params.customerUserInfoId;
    fetch(url,{
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'sso-auth-token': this.context.token,
      'sso-refresh-token': this.context.refresh_token,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Headers': 'content-type, sso-auth-token',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE',
    }})
    .then((response) => response.json())
    .then((json) => {
      this.setState({isLoading:false})
      if (json.code === 0) {
        this.setState({
          imageList:json.radiologyReportList
        })
      } else if (json.code == 10011) {
        this.loggedin(json.msg)
      } else {
        alert(json.msg)
      }
    })
    .catch(error => console.warn(error));
  }

  render() {
    if (this.state.isLoading){
      return(
     <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor:'rgb(51,51,51)' }}>
         <ActivityIndicator size="large" color="white"  />
      </View>
    )}else {
      return (
    <SafeAreaView style={{ flex:1,height:'100%', justifyContent: "center", alignItems: "center" , backgroundColor:'rgb(51,51,51)'}}>
      <ScrollView style={{ flex:1, width:'90%',height:'100%',backgroundColor:'white'}}
      contentContainerStyle={{alignItems:'center'}}>
      <View style={{width:'90%',flexDirection: 'row',marginTop:'2%'}}>
        <Text style={{ marginLeft:'1%',fontSize:22, fontWeight: '600' ,color: 'rgb(32,191,195)'}}>{I18n.t('rRList')}</Text>
      </View>
      <View style={{width:'90%',marginTop:'1%'}}>
      {this.state.imageList.length>0 ?
        this.state.imageList.map((item)=>(
          <View key={item.appointmentId} style={{width:'90%',padding:'2%',margin:'1%'}}>
            <View style={{width:'90%',flexDirection: 'row',marginTop:'1%'}}>
              <View style={{width:'5%'}}>
                <Image
                  style = {{width:17,height:17}}
                  source = {require('../../images/providerImg/dzbl-B8.png')}
                />
              </View>
              <View style={{width:'25%'}}>
                <Text style={{ fontSize:17, fontWeight: '400' }}>{item.dateOfCommit!=null && item.dateOfCommit}</Text>
              </View>
              <View style={{width:'70%'}}>
                <Text style={{ fontSize:16, fontWeight: '400' }}>{item.examinationRequired}</Text>
              </View>
            </View>
          </View>
        ))
      :
      <View>
        <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('none')}</Text>
      </View>
      }
      </View>
      </ScrollView>
    </SafeAreaView>
  )}}
}
ImageList.contextType = DataContext;
