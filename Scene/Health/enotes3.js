import React ,{Component}from 'react';
import { Image,Alert,Modal,Text, View, TouchableOpacity,ScrollView,SafeAreaView,TextInput,ActivityIndicator } from 'react-native';
import {styles} from '../providerStyle';
import DataContext from '../../providerContext';
import I18n from '../switchLanguage';
import { CheckBox } from 'react-native-elements';

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
      dname:'',
      usage:'',
      visible:false,
      result:[],
      norp:true,
      rp:false,
      mid:null,
      name:'',
      gender:'',
      dob:'',
      mobile:'',
      medicareCard:[],
      language:[],
      userId:null,
      infoId:null,
      medicineUsage:[],
      familyHistory:[],
      chronic:[],
      allergy:[],
      }
    }
  async componentDidMount(){
    this.setState({
      id:this.props.route.params.id,
      complaint:this.props.route.params.patientComplaint});
    if(this.props.route.params.medicine != null) {
      this.setState({medicine:this.props.route.params.medicine});
    }
    this.queryPatient();
  }

  queryPatient() {
    let url = 'http://'
    +this.context.url
    +'/aicare-business-api/business/medical-report/query-medical-info-by-appointment'
    +'?customerAppointmentId='+this.props.route.params.id ;
    fetch(url,{
      method: 'GET',
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
    }})
    .then((response) => response.json())
    .then((json) => {
      if (json.code === 0) {
        this.setState({
          name:json.medicalInfo.firstName + json.medicalInfo.lastName,
          gender:json.medicalInfo.gender,
          dob:json.medicalInfo.dob,
          mobile:json.medicalInfo.mobile,
          medicareCard:json.medicalInfo.medicareCard,
          language:json.medicalInfo.languages,
          userId:json.medicalInfo.customerUserId,
          infoId:json.medicalInfo.customerUserInfoId,
          patientComment:json.medicalInfo.patientComment,
          allergy:json.medicalInfo.allergen,
          medicineUsage:json.medicalInfo.medicineUsage,
          familyHistory:json.medicalInfo.familyHistory,
          chronic:json.medicalInfo.chronic,
        })
       let src = {uri: json.medicalInfo.commentImg,}
       let image = []
       let obj = {source:src}
       image.push(obj)
       this.setState({
          image:image
        })
      } else {
        console.log(json.msg)
      }
    })
    .catch(error => console.warn(error));
  }

  deleteMedicine(id) {
    Alert.alert(
      'Alert',
      'Do you want to delete this Medicine?',
      [
        {text: 'Yes', onPress: () => {
          for(let i =0;i<this.state.medicine.length;i++){
              if(this.state.medicine[i].id === id) {
                let temp = this.state.medicine;
                temp.splice(i,1)
                this.setState({medicine:temp})
              }
          }
        }},
        {text: 'No', onPress: () => console.log('no button clicked'),style: "cancel"},
      ],
      {
        cancelable: false
      }
    );
  }
  addMedicine(){
    if (this.state.dname =='') {
      return false
    }
    if (this.state.usage == '') {
      return false
    }
    if (this.state.rp && this.state.times == 0) {
      return false
    }
    this.state.medicine.push({
      name:this.state.dname,
      usage:this.state.usage,
      times:this.state.times,
      id:this.state.mid,
      isRepeat: this.state.rp ?'1':'0',
    })
    this.setState({
      times:0,
      dname:'',
      usage:'',
      mid:null
    })
    return true
  }

  _onChangeText(text) {
      if (text) {
        this.setState({ dname: text,visible:true })  //实时变化值
        clearTimeout(this.settimeId);       //如搜索的内容变化在1秒之中，可以清除变化前的fetch请求，继而减少fetch请求。但不能中断fetch请求
        this.settimeId = setTimeout(() => {
          let url = 'http://'
          +this.context.url
          +'/aicare-business-api/business/shop/medicinedata?'
          +'enName='+this.state.dname;
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
            }})
            .then((response) => response.json())
            .then((json) => {
              if (json.code === 0) {
                this.setState({result:json.list})
              } else {
                console.log(json.msg)
              }
            })
            .catch(error => console.warn(error));
        }, 500);
      } else {
        this.setState({dname:'',visible:false})
      }
  }
  render() {
    let medicine = []
    if (this.state.medicine.length >0) {
    medicine = this.state.medicine.map((item) => {
      return (
        <View key = {item.id} style={{width:'90%',flexDirection:'row',marginTop:'5%'}}>
          <View style={{justifyContent:'center',width:'100%',padding:'5%',height:120,borderRadius:10,backgroundColor:'#EBEBEB'}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View style={{flexDirection:'row'}}>
                <Image
                  style = {{width:18,height:18}}
                  source={require('../../images/providerImg/cf-04.png')}
                />
                <Text style={{ color: 'rgb(33,192,196)',marginLeft:'1%', fontSize: 18, fontWeight: '600'}}>{item.name}</Text>
              </View>
              <TouchableOpacity onPress={() =>{this.deleteMedicine(item.id)}}>
                <Image
                  style = {{width:16,height:18}}
                  source={require('../../images/providerImg/cf-05.png')}
                />
              </TouchableOpacity>
            </View>
            <Text style={{ color: '#696969', fontSize: 16, fontWeight: '400'}}>{I18n.t('usage')}：{item.usage}</Text>
          </View>
        </View>
      )
    })}
    let result = []
    if (this.state.result.length >0) {
    result = this.state.result.map((item) => {
      let mname
      if (item.norms == null) {
         mname = item.enName
      } else if (item.number == null){
         mname = item.enName + ' ' + item.norms
      } else {
         mname = item.enName + ' ' + item.norms + '*' + item.number
      }
      return (
        <TouchableOpacity key={item.id} style={{alignItems:'center',justifyContent:'center',width:'90%',margin:'1%',height:40,borderRadius:5,backgroundColor:'#EBEBEB'}}
        onPress={() => {this.setState({mid:item.id,dname:mname,visible:false})}}>
          <Text style={{ fontSize: 16, fontWeight: '400'}}>{mname}</Text>
        </TouchableOpacity>
      )
    })}
    if (this.state.isLoading){
      return(
     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
         <ActivityIndicator size="large" color="#00ff00"  />
      </View>
    )
    }else {
    return (
    <SafeAreaView style={{ flex:1, flexDirection:'row',justifyContent: "center", alignItems: "center" ,backgroundColor:'rgb(51,51,51)'}}>
      <View style={{height:'91.5%',width:'65%', alignItems: "center",backgroundColor:'white',borderRadius:5}}>
        <View style={{width:'100%',flexDirection:'row',justifyContent: "center", alignItems: "center",}}>
        <ScrollView style={{flex:1,maxHeight:'80%',width:'50%',borderRightWidth:1}}
        contentContainerStyle={{alignItems:'center'}}>
          {this.state.medicine.length>0 ? medicine
          :
            <View style={{alignItems:'center',justifyContent:'center',width:'90%',height:100,borderRadius:10,backgroundColor:'#EBEBEB'}}>
              <Text style={{fontSize: 16, fontWeight: '400'}}>{I18n.t('nomedi')}</Text>
            </View>
          }
        </ScrollView>
        <View style={{flex:1,marginTop:'10%',height:'90%',width:'50%',alignItems:'center'}}>
          <View style={{width:'90%',flexDirection:'row',marginBottom:'5%'}}>
            <View style={{flexWrap:'wrap',width:'30%',flexDirection:'row'}}>
              <Text style={{fontSize: 16, fontWeight: '400'}}>{I18n.t('mname')}</Text>
            </View>
            <View style={{width:'70%'}}>
              <TextInput
              style={{width:'100%',borderWidth:1,fontSize: 16, fontWeight: '400',marginLeft:'5%'}}
              placeholder={I18n.t('enterName')}
              value={this.state.dname}
              onChangeText={this._onChangeText.bind(this)}/>
              {this.state.visible  &&
                <ScrollView
                  style={{width:'100%',height:'35%',borderWidth:1 ,marginLeft:'5%'}}
                  >
                  {this.state.result.length>0 ? result
                  :
                    <View style={{alignItems:'center',justifyContent:'center',width:'100%',height:30,borderRadius:10}}>
                      <Text>{I18n.t('nores')}</Text>
                    </View>
                  }
                </ScrollView>
              }
            </View>
          </View>

          <View style={{width:'90%',flexDirection:'row',marginBottom:'5%'}}>
            <View style={{flexWrap:'wrap',width:'30%',flexDirection:'row'}}>
              <Text style={{fontSize: 16, fontWeight: '400'}}>{I18n.t('usage')}</Text>
            </View>
            <View style={{width:'70%'}}>
              <TextInput
              style={{width:'100%',borderWidth:1,fontSize: 16, fontWeight: '400',marginLeft:'5%'}}
              value={this.state.usage}
              onChangeText={(text) => {this.setState({usage:text})}}/>

            </View>
          </View>
          <View style={{width:'90%',flexDirection:'row',alignItems:'center'}}>
          <View style={{flexWrap:'wrap',width:'20%',flexDirection:'row'}}>
          <Text style={{fontSize: 16, fontWeight: '400'}}>{I18n.t('repeatyn')}</Text>
          </View>
          <CheckBox
            center
            title={I18n.t('rp')}
            checkedIcon='check-circle-o'
            uncheckedIcon='circle-o'
            checkedColor='red'
            size={20}
            containerStyle={{borderWidth:0,backgroundColor:'white'}}
            checked={this.state.rp}
            onPress={() => {
              this.setState({
                rp: true,
                norp:false,
              })
            }}
           />
           <CheckBox
             center
             title={I18n.t('norp')}
             checkedIcon='check-circle-o'
             uncheckedIcon='circle-o'
             checkedColor='red'
             size={20}
             containerStyle={{borderWidth:0,backgroundColor:'white'}}
             checked={this.state.norp}
             onPress={() => {
               this.setState({
                 rp: false,
                 norp:true,
               })
             }}
            />
          </View>
          {this.state.rp &&
          <View style={{width:'90%',flexDirection:'row',marginBottom:'5%'}}>
            <Text style={{fontSize: 16, fontWeight: '400'}}>{I18n.t('repeattime')}</Text>
            <TextInput
              style={{width:'20%',borderWidth:1,marginLeft:'5%'}}
              value={this.state.times.toString()}
              keyboardType='numeric'
              onChangeText={(text) => {this.setState({times:text})}}
            />
            <Text style={{fontSize: 16, fontWeight: '400',marginLeft:'5%'}}>{I18n.t('times')}</Text>
          </View>
          }
          <View  style={{ height:'15%', width:'80%',justifyContent: "center", alignItems: "center"}}>
            <TouchableOpacity style={{
              width: '100%',
              height: 40,
              marginTop: 10,
              marginBottom:20,
              backgroundColor: 'rgb(33,192,196)',
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: "center",}} onPress={() => {
                if (!this.addMedicine()){
                  alert('Please fill the blanks')
                } else {
                  console.log('ok')
                }
              }}>
              <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>{I18n.t('confirmation')}</Text>
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
              backgroundColor: 'rgb(33,192,196)',
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: "center",}} onPress={() => {
                this.props.navigation.navigate(I18n.t('enote'),{
                  medicine:this.state.medicine})
                }}>
              <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>{I18n.t('nextStep')}</Text>
            </TouchableOpacity>
          </View>
      </View>

      <View style={{width:'30%',borderRadius:5,padding:'2%'}}>
        <ScrollView style={{height:'33%',backgroundColor:'white',borderTopLeftRadius:5,borderTopRightRadius:5,padding:'2%'}}>
          <Text style={{ fontSize:18, fontWeight: '500', color: 'rgb(33,192,196)' }}>{I18n.t('pInfo')}</Text>
          <Text style={{ fontSize:15, fontWeight: '400',marginTop:'2%' }}>{I18n.t('name')}: {this.state.name}</Text>
          <Text style={{ fontSize:15, fontWeight: '400',marginTop:'2%' }}>{I18n.t('gender')}: {this.state.gender}</Text>
          <Text style={{ fontSize:15, fontWeight: '400',marginTop:'2%' }}>{I18n.t('dateofBirth')}: {this.state.dob}</Text>
          <Text style={{ fontSize:15, fontWeight: '400',marginTop:'2%' }}>{I18n.t('mobile')}: {this.state.mobile}</Text>
          <Text style={{ fontSize:16, fontWeight: '500',marginTop:'2%'}}>{I18n.t('mcInfo')}</Text>
          {this.state.medicareCard ?
            this.state.medicareCard.map((item)=>(
              <View key={item.number}>
                <Text style={{ fontSize:15, fontWeight: '400',marginTop:'2%' }}>{I18n.t('insuranceType')}: {item.category}</Text>
                <Text style={{ fontSize:15, fontWeight: '400',marginTop:'2%' }}>{I18n.t('cardNumber')}: {item.number}</Text>
              </View>
            ))
          :
          <View>
            <Text style={{ fontSize:15, fontWeight: '400',marginTop:'2%' }}>{I18n.t('nomcInfo')}</Text>
          </View>
          }
          <View style={{height:10}}/>
        </ScrollView>
        <ScrollView style={{height:'14%',backgroundColor:'white',padding:'3%',marginTop:'2%'}}>
          <Text style={{ fontSize:18, fontWeight: '500', color: 'rgb(33,192,196)' }}>{I18n.t('allergy')}</Text>
          {this.state.allergy ?
            this.state.allergy.map((item)=>(
              <View key={item.id} style={{flexDirection:'row'}}>
                <Text style={{ fontSize:15, fontWeight: '400',marginTop:'2%' }}>{item.allergen}</Text>
              </View>
            ))
          :
          <View>
            <Text style={{ fontSize:15, fontWeight: '400',marginTop:'2%' }}>{I18n.t('none')}</Text>
          </View>
          }
          <View style={{height:10}}/>
        </ScrollView>
        <ScrollView style={{height:'14%',backgroundColor:'white',padding:'3%',marginTop:'2%'}}>
          <Text style={{ fontSize:18, fontWeight: '500', color: 'rgb(33,192,196)' }}>{I18n.t('mediHis')}</Text>
          {this.state.medicineUsage ?
            this.state.medicineUsage.map((item)=>(
              <View key={item.id} style={{flexDirection:'row'}}>
                <Text style={{ fontSize:15, fontWeight: '400',marginTop:'2%' }}>{item.medicine}</Text>
              </View>
            ))
          :
          <View>
            <Text style={{ fontSize:15, fontWeight: '400',marginTop:'2%' }}>{I18n.t('none')}</Text>
          </View>
          }
          <View style={{height:10}}/>
        </ScrollView>
        <ScrollView style={{height:'14%',backgroundColor:'white',padding:'3%',marginTop:'2%'}}>
          <Text style={{ fontSize:18, fontWeight: '500', color: 'rgb(33,192,196)' }}>{I18n.t('famHis')}</Text>
          {this.state.familyHistory?
            this.state.familyHistory.map((item)=>(
              <View key={item.id} style={{flexDirection:'row'}}>
                <Text style={{ fontSize:15, fontWeight: '400',marginTop:'2%' }}>{item.disease}</Text>
              </View>
            ))
          :
          <View>
            <Text style={{ fontSize:15, fontWeight: '400',marginTop:'2%' }}>{I18n.t('none')}</Text>
          </View>
          }
          <View style={{height:10}}/>
        </ScrollView>
        <ScrollView style={{height:'14%',backgroundColor:'white',padding:'3%',borderBottomLeftRadius:5,borderBottomRightRadius:5,marginTop:'2%'}}>
          <Text style={{ fontSize:18, fontWeight: '500', color: 'rgb(33,192,196)' }}>{I18n.t('chronic')}</Text>
          {this.state.chronic?
            this.state.chronic.map((item)=>(
              <View key={item.id} style={{flexDirection:'row'}}>
                <Text style={{ fontSize:15, fontWeight: '400',marginTop:'2%' }}>{item.chronic}</Text>
              </View>
            ))
          :
          <View>
            <Text style={{ fontSize:15, fontWeight: '400',marginTop:'2%' }}>{I18n.t('none')}</Text>
          </View>
          }
          <View style={{height:10}}/>
        </ScrollView>
        <TouchableOpacity style={{
        width: '100%',
        height: '7%',
        borderWidth:2,
        borderColor:'rgb(33,192,196)',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: "center",
        marginTop:'1%'}} onPress={() => {
        this.props.navigation.navigate(I18n.t('recordDetail'),{appointmentId:this.props.route.params.id,customerUserInfoId:this.state.infoId})
        }}>
        <Text style={{ fontSize:16, fontWeight: '500', color: '#ffffff' }}>{I18n.t('personalRecord')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );}}
}
Enotes3.contextType = DataContext;
