import React ,{Component}from 'react';
import { ActivityIndicator,ScrollView,Text, View,  Image,TouchableOpacity,SafeAreaView,TextInput } from 'react-native';
import {styles} from '../providerStyle';
import DataContext from '../../providerContext';
import moment from 'moment';
import I18n from '../switchLanguage';

export default class Eprescription extends Component {
  constructor(props) {
    super(props);
    this.state={
      medicine:[],
      isLoading:false,
      customerUserInfoId:null,
      page:0,
      tPage:10,
    }
  }

  async componentDidMount(){
    this.setState({isLoading:true})
    if(this.props.route.params.customerUserInfoId != null) {
      this.setState({customerUserInfoId:this.props.route.params.customerUserInfoId});
    }
    this.queryPrescription()
  }

  queryPrescription() {
    let url = 'http://'
    +this.context.url
    +'/aicare-business-api/business/emr/query-emr-pescription'
    fetch(url,{
      method: 'POST',
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
    },
    body: JSON.stringify({
      customerUserInfoId: this.props.route.params.customerUserInfoId,
      limit:'10',
      page: (this.state.page+1).toString()
    })})
    .then((response) => response.json())
    .then((json) => {
      this.setState({isLoading:false})
      if (json.code === 0) {
        this.setState({tPage:json.page.totalPage,page:json.page.currPage});
        for (let i =0; i<json.page.list.length; i++) {
          if (json.page.list[i].prescriptionEntityList != null && json.page.list[i].prescriptionEntityList.length>0) {
            let medicine = this.state.medicine;
            medicine.push(json.page.list[i])
            this.setState({medicine:medicine})
          }
        }
      } else if (json.code == 10011) {
        this.loggedin(json.msg)
      } else {
        alert(json.msg)
      }
    })
    .catch(error => console.warn(error));
  }

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
  };

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
      contentContainerStyle={{alignItems:'center'}}
      onScroll={({nativeEvent}) => {
        if (this.isCloseToBottom(nativeEvent)) {
          if (this.state.page < this.state.tPage) {
            this.queryPrescription()
          }
        }
      }}>
      {this.state.medicine.length>0 ?
        this.state.medicine.map((item)=>(
          <View key={item.appointmentId} style={{width:'90%',borderColor:'rgb(32,191,195)',borderWidth:1,padding:'2%',margin:'1%'}}>
            <View style={{width:'90%',flexDirection: 'row',marginTop:'1%'}}>
              <Text style={{ fontSize:20, fontWeight: '500' }}>{item.serviceClassName}</Text>
            </View>
            <View style={{width:'90%',flexDirection: 'row',marginTop:'1%'}}>
              <View style={{width:'30%'}}>
                <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('date')}: {item.dateOfDiagnosis!=null && moment(item.dateOfDiagnosis).format().substring(0,10)}</Text>
              </View>
              <View style={{width:'30%'}}>
                <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('dt')}: {item.businessEmployerName}</Text>
              </View>
              <View style={{width:'30%'}}>
                <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('cl')}: {item.orgName}</Text>
              </View>
            </View>
            <View style={{width:'90%',borderBottomWidth:1,borderStyle:'dashed',marginTop:'2%'}}/>
            <View style={{width:'90%',flexDirection: 'row',marginTop:'1%'}}>
              <Text style={{ fontSize:20, fontWeight: '500' }}>{I18n.t('prescription')}</Text>
            </View>
            {item.prescriptionEntityList.length>0 &&
              item.prescriptionEntityList.map((i) => (
                <View key={i.id} style={{width:'90%',padding:'2%',marginTop:'1%',marginBottom:'1%',backgroundColor:'#ececec'}}>
                  <Text style={{ color: 'black', fontSize: 21, fontWeight: '600'}}>{i.medicineName} {i.dose}</Text>
                  <Text style={{ color: '#696969', fontSize: 16, fontWeight: '400'}}>{I18n.t('usage')}：{i.medicineUsage}</Text>
                  <Text style={{ color: '#696969', fontSize: 16, fontWeight: '400'}}>{I18n.t('repeattime')}：{i.repetition}</Text>
                </View>
              ))
            }
          </View>
        ))
      :
      <View>
        <Text style={{ fontSize:16, fontWeight: '400' }}>{I18n.t('none')}</Text>
      </View>
      }
      </ScrollView>
    </SafeAreaView>
  )}}
}
Eprescription.contextType = DataContext;
