import React ,{Component}from 'react';
import { Text, View, TouchableOpacity,ScrollView,SafeAreaView,TextInput,ActivityIndicator } from 'react-native';
import {styles} from '../providerStyle';
import DataContext from '../../providerContext';
import I18n from '../switchLanguage';

export default class Enotes3 extends Component {
    constructor(props) {
      super(props);
      this.state={
      pressed:false,
      pressed1:false,
      complaint:'',
      doctorComment:'',
      id:null,
      medicine:[],
      times:0,
      name:'',
      usage:'',
      }
    }
  async componentDidMount(){
    this.setState({
      id:this.props.route.params.id,
      complaint:this.props.route.params.patientComplaint});
  }

  addMedicine(){
    medicine.push({

    })
  }
  saveReport() {
    let url = 'http://'
    +this.context.url
    +'/aicare-business-api/business/medical-report/save';
      fetch(url,{
        method: 'POST',
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
      },
        body: JSON.stringify({
          customerUserId : this.state.id,
          customerUserInfoId : 1,
          diagnosisTitle : "report_001",
          type : "远程医疗",
          patientComment : this.state.complaint,
          doctorComment : this.state.doctorComment,
          clinicalConditions : "MAD",
      })
      })
      .then((response) => response.json())
      .then((json) => {
        if (json.code === 0) {
          console.log(json);
        } else {
          console.log(json.msg)
        }
      })
      .then(() => {this.props.navigation.navigate('预约')})
      .catch(error => console.warn(error));
  }

  /*  <View style={{flexDirection: 'row', marginBottom:10}}>
          <Text style={{ fontSize:18, fontWeight: '500' }}>{I18n.t('diagnosisSuggestion')}</Text>
        </View>
        <View style={{width:'100%', height:150,borderWidth:1, borderColor:'#bbbbbb',borderRadius:11}}>
          <TextInput style={{width:'90%',height:60,marginTop:15,marginLeft:20,marginRight:20}}
            placeholder={this.context.intro}
            value={this.state.doctorComment}
            onChangeText={(text) => {this.setState({doctorComment:text})}}
            multiline={true}
          />
        </View>*/

  render() {
    if (this.state.isLoading){
      return(
     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
         <ActivityIndicator size="large" color="#00ff00"  />
      </View>
    )
    }else {
    return (
    <SafeAreaView style={{ flex:1, justifyContent: "center", alignItems: "center" ,backgroundColor:"white"}}>
      <View style={{height:'90%',width:'90%',flexDirection:'row',justifyContent: "center", alignItems: "center"}}>
        <ScrollView style={{height:'90%',width:'50%',borderRightWidth:1}}>
          {this.state.medicine.length>0 ? medicine
          :
            <View style={{alignItems:'center',justifyContent:'center',width:'90%',height:100,borderRadius:10,backgroundColor:'#EBEBEB'}}>
              <Text>暂无药品，请添加</Text>
            </View>
          }
        </ScrollView>
        <View style={{height:'90%',width:'50%',alignItems:'center'}}>
          <View style={{width:'90%',flexDirection:'row',marginBottom:'5%'}}>
            <Text>药品名称</Text>
            <TextInput
            style={{width:'70%',borderWidth:1}}
            placeholder='请输入药名'
            value={this.state.name}
            onChangeText={(text) => {this.setState({name:text})}}/>
          </View>
          <View style={{width:'90%',flexDirection:'row',marginBottom:'5%'}}>
            <Text>用法用量</Text>
            <TextInput
            style={{width:'70%',borderWidth:1}}
            placeholder='请输入'
            value={this.state.usage}
            onChangeText={(text) => {this.setState({usage:text})}}/>
          </View>
          <View style={{width:'90%',flexDirection:'row',marginBottom:'5%'}}>
            <Text>重复次数</Text>
            <TextInput
              style={{width:'20%',borderWidth:1}}
              value={this.state.times.toString()}
              keyboardType='numeric'
              onChangeText={(text) => {this.setState({times:text})}}
            />
            <Text>次</Text>
          </View>
          <View  style={{ height:'15%', width:'80%',justifyContent: "center", alignItems: "center"}}>
            <TouchableOpacity style={{
              width: '100%',
              height: 40,
              marginTop: 10,
              marginBottom:20,
              backgroundColor: '#68B0AB',
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: "center",}} onPress={() => {this.addMedicine()}}>
              <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>{I18n.t('confirm')}</Text>
            </TouchableOpacity>
          </View>  
        </View>
        </View>
          <View  style={{ height:'10%', width:'80%',justifyContent: "center", alignItems: "center"}}>
            <TouchableOpacity style={{
              width: '100%',
              height: 40,
              marginTop: 10,
              marginBottom:20,
              backgroundColor: '#68B0AB',
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: "center",}} onPress={() => {this.saveReport()}}>
              <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>{I18n.t('nextStep')}</Text>
            </TouchableOpacity>
          </View>  
    </SafeAreaView>
  );}}
}
Enotes3.contextType = DataContext;
