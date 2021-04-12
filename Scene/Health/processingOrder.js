import React ,{Component}from 'react';
import { Alert,Text, View, Image,SafeAreaView,ScrollView,TouchableOpacity,Modal,ActivityIndicator } from 'react-native';
import { SearchBar } from 'react-native-elements';
import {styles} from '../providerStyle';
import DateSelect from "./dateSelect";
import Category from "./category";
import DataContext from '../../providerContext';
import CalendarPicker from 'react-native-calendar-picker';
import { CheckBox } from 'react-native-elements';
import moment from 'moment';


export default class ProcessingOrder extends Component {
    constructor(props) {
      super(props);
      this.state={
        data:[],
        time:[],
        date: new Date(),
        isEnabled: false,
        modalVisible: false,
        mdVisible:false,
        mds:[],
        Visible:false,
        selectedId:'',
        selectedDoctor:'',
        timeLoad:false,
        isLoading:true,
      };
      this.onDateChange = this.onDateChange.bind(this);
    }

  /*  {item.insuranceType == 'Medicare' &&
    <View>
    <Text style={{marginBottom:10}}>医保序列: {JSON.parse(item.content).serial}</Text>
    <Text style={{marginBottom:10}}>医保号码: {JSON.parse(item.content).number}</Text>
    </View>
} */
  componentDidMount = () => {
    this.setState({isLoading:true})
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      let url = 'http://3.104.232.106:8084/aicare-business-api/business/appointment/query?status=1';
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
            console.log(json);
            this.setState({data:json.page});
            for(let i=0; i<json.page.length;i++){
              var d= {
                id:json.page[i].id,
                visible:false,
              }
              let t = this.state.mds;
              t.push(d);
              this.setState({mds:t});
            }
          } else {
            console.log(json.msg)
          }
        }).catch(error => console.warn(error));
    });
  }

  setIsEnabled = (value) => {
    this.setState({isEnabled: value})
  }
  setModalVisible = (value) => {
    this.setState({modalVisible: value})
  }
  setMdVisible = (value) => {
    this.setState({mdVisible: value})
  }
  setVisible = (visible) => {
    this.setState({ Visible: visible });
  }
  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
  }

  sendRequest(date){
    this.setState({timeLoad:true})
    let url = 'http://3.104.232.106:8084/aicare-business-api/business/user/scheduledetail?date='
    + date +'&businessEmployerId=' + this.state.selectedDoctor + '&status=0';
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
        this.setState({timeLoad:false});
        if (json.code === 0) {
          console.log(json.msg);
          this.setState({time:json.data});
        } else {
          console.log(json.msg);
        }
      }).catch(error => console.warn(error));
  }

  modify(sid) {
      Alert.alert(
        '提醒',
        '您确定要修改预约至这个时间吗？',
        [
          {text: '确定', onPress: () => {
            let url = 'http://3.104.232.106:8084/aicare-business-api/business/appointment/modify?'
            +'id=' + this.state.selectedId
            +'&scheduleDetailedId=' + sid;
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
              }
              })
              .then((response) => response.json())
              .then((json) => {
                if (json.code === 0) {
                  console.log(json.msg)
                  Alert.alert('修改成功')
                } else {
                  Alert.alert('修改失败')
                  console.log(json.msg)
                }
              }).catch(error => console.warn(error));
          }},
          {text: '取消', onPress: () => console.log('no button clicked'),style: "cancel"},
        ],
        {
          cancelable: false
        }
      );
  }
  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
    let fd = this.formatDate(date);
    this.sendRequest(fd);
  }

  findvis(id) {
    for (let i=0;i<this.state.mds.length;i++) {
      if(this.state.mds[i].id == id) {
        return this.state.mds[i].visible;
      }
    }
  }
  changevis(id,value){
    for (let i=0;i<this.state.mds.length;i++) {
      if(this.state.mds[i].id == id) {
        let t = this.state.mds;
        t[i].visible = value;
        this.setState({mds:t})
      }
    }
  }
  render () {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    let times=[];
    if (this.state.time.length >0) {
    times = this.state.time.map((item) => {
      return (
        <View style={styles.timePick} key={item.id}>
          <TouchableOpacity onPress={() => {this.modify(item.scheduleDetailedId);}}>
            <Text>{item.startTime.substring(0,5)}-{item.endTime.substring(0,5)}</Text>
          </TouchableOpacity>
        </View>
      )
    })}
    let orders;
    if (this.state.isLoading){
      return(
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00ff00"  />
     </View>
    )
    }else {
    if (this.state.data.length > 0) {
    orders = this.state.data.map((item) => {
      return (
        <View>
        <View style={styles.cardHolder} key={item.id}>
        <View style={{flexDirection: 'row'}}>
        <Image
          style = {{width: 18, height:18,marginRight:14}}
          source = {require('../../images/providerImg/order_icon_org.png')}
        />
        <Text style={{fontSize:16, color:'#333333', fontWeight: '400'}}>预约时间 {moment(item.appointDate).format('L').substring(0,5)}  {item.startTime.substring(0,5)}-{item.endTime.substring(0,5)}</Text>
        </View>
        <View style={styles.card3} key={item.id}>
          <View style={{flexDirection: 'row', marginTop:24, marginBottom:21, marginLeft:33}}>
          <TouchableOpacity onPress={()=>this.changevis(item.id,true)}>
          <Image
            style = {{width:40,height:40,marginRight:15}}
            source = {require('../../images/providerImg/home_img_person.png')}
          />
          </TouchableOpacity>
          <View>
            <Text style={{marginTop:4,fontSize:16, color:'#333333', fontWeight: '500'}}>{item.customerRealName}</Text>
            <Text style={{marginTop:1,fontSize:12, color:'#666666', fontWeight: '400'}}>{item.mobile}</Text>
          </View>
            <TouchableOpacity style={styles.orderButton3} onPress={() => {
              this.setMdVisible(!this.state.mdVisible);
              this.setState({selectedId:item.id,selectedDoctor:item.businessEmployerId});
              console.log(this.state.selectedId);
              console.log(this.state.selectedDoctor);
            }}>
              <Text style={{fontSize:14, color:'#FAFAFA'}}>修改</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row',marginBottom:33}}>
            <Image
              style = {{width: 15, height:15 , marginLeft:33, marginRight:5}}
              source = {require('../../images/providerImg/schedule_icon_person.png')}
            />
            <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>{item.businessEmployerName}</Text>
            <Image
              style = {{width: 15, height:15,marginLeft:15, marginRight:5}}
              source = {require('../../images/providerImg/schedule_icon_type.png')}
            />
            <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>{item.deptName}</Text>
            <Image
              style = {{width: 15, height:15,marginLeft:15, marginRight:5}}
              source = {require('../../images/providerImg/schedule_icon_location.png')}
            />
            <Text style={{fontSize:12, color:'#999999', fontWeight: '400'}}>实地预约</Text>
          </View>
        </View>
        </View>
        <Modal
        animationType="slide"
        transparent={true}
        visible={this.findvis(item.id)}
        onRequestClose={() => {
          this.changevis(item.id,false)
        }}
      >
      <View style={{marginTop:250,backgroundColor:"#F7FAFA",borderRadius:40,shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 12,
},
shadowOpacity: 0.58,
shadowRadius: 16.00,

elevation: 24,}}>
    <View style={{flexDirection:"row"}}>
    <TouchableOpacity onPress={() =>{this.changevis(item.id,false)}} style={{marginRight:60,marginLeft:23}}>
      <Image
        style = {styles.arrow_image}
        source={require('../../images/icon/2/Arrow_left.png')}
      />
    </TouchableOpacity>
    </View>
    <ScrollView style={{backgroundColor:"#F7FAFA"}}>
      <View style={{marginLeft:115,marginTop:30}}>
        <Text style={{marginBottom:10}}>患者姓名: {item.customerRealName}</Text>
        <Text style={{marginBottom:10}}>患者电话: {item.mobile}</Text>
        <Text style={{marginBottom:10}}>就诊时间: {moment(item.appointDate).format('L').substring(0,5)}  {item.startTime.substring(0,5)}-{item.endTime.substring(0,5)}</Text>
        <Text style={{marginBottom:10}}>就诊医生: {item.businessEmployerName}</Text>
        <Text style={{marginBottom:10}}>就诊科目: {item.deptName}</Text>
        <Text style={{marginBottom:10}}>就诊地址: {item.orgAddress}</Text>
        <Text style={{marginBottom:10}}>就诊方式: 实地会诊</Text>
        <Text style={{marginBottom:10}}>保险方式: {item.insuranceType}</Text>

      </View>
        <TouchableOpacity style={styles.next_wrapper} onPress={() =>{this.changevis(item.id,false)}}>
          <Text style={styles.onsite_text}>确定</Text>
        </TouchableOpacity>
    </ScrollView>
        <View style={{height:20}}/>
        </View>
      </Modal>
        </View>
      )
    })

    return (
      <SafeAreaView style={{ flex:1, justifyContent: "center", alignItems: "center",backgroundColor:"white" }}>
        <View style={{flexDirection: 'row', marginBottom:21,marginTop:30}}>
          <TouchableOpacity style={{flexDirection: 'row', marginRight:199,marginLeft:30}}
          onPress={()=>{this.setVisible(!this.state.Visible)}}>
            <Text style={{fontSize:13}}>全部</Text>
            <Image
              style = {{width: 13, height:13,marginLeft:5}}
              source = {require('../../images/providerImg/schedule_icon_filter.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection: 'row', marginRight:30}}
          onPress={() => this.setModalVisible(!this.state.modalVisible)}>
            <Text style={{fontSize:13}}>{month}/{date}</Text>
            <Image
              style = {{width: 13, height:13,marginLeft:5}}
              source = {require('../../images/providerImg/schedule_icon_calender.png')}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ flex:1}}>
        <View style={{flexDirection: 'row', marginBottom:20}}>
          <Image
            style = {{width: 40, height:40, marginRight:15}}
            source = {require('../../images/providerImg/service_doctor_img1.png')}
          />
          <Image
            style = {{width: 40, height:40, marginRight:15}}
            source = {require('../../images/providerImg/service_doctor_img2.png')}
          />
          <Image
            style = {{width: 40, height:40, marginRight:15}}
            source = {require('../../images/providerImg/service_doctor_img3.png')}
          />
          <Image
            style = {{width: 40, height:40, marginRight:15}}
            source = {require('../../images/providerImg/service_doctor_img4.png')}
          />
          <Image
            style = {{width: 40, height:40, marginRight:15}}
            source = {require('../../images/providerImg/service_doctor_img5.png')}
          />
          <TouchableOpacity style={{alignItems:'center',justifyContent: "center", width:40,height:40,backgroundColor:'#ecf4f3',borderRadius:50,}}>
          <Text style={{fontSize:14, color:'#006a71'}}>+7</Text>
          </TouchableOpacity>
        </View>
          {orders}
         <Modal
           animationType="slide"
           transparent={true}
           visible={this.state.mdVisible}
           onRequestClose={() => this.setMdVisible(!this.state.mdVisible)}>
           <View style={{marginTop:200,backgroundColor:"#F7FAFA",borderRadius:40,shadowColor: "#000",
           shadowOffset: {
             width: 0,
             height: 12,
           },
           shadowOpacity: 0.58,
           shadowRadius: 16.00,
           elevation: 24,}}>
       <TouchableOpacity onPress={() =>{this.setMdVisible(!this.state.mdVisible)}} style={{marginRight:30}}>
         <Image
           style = {styles.arrow_image}
           source={require('../../images/icon/2/Arrow_left.png')}
         />
       </TouchableOpacity>
       <ScrollView style={{backgroundColor:"#F7FAFA", marginBottom:20}}>
       <View style={{backgroundColor: '#F7FAFA',  alignItems: 'center',justifyContent:'center'}}>
         <Text style = {{ color:'#006A71',fontSize:16}}>修改时间</Text>
         <CalendarPicker
           onDateChange={this.onDateChange}
           previousTitle="上一月"
           nextTitle = "下一月"
           width = {300}
           height = {300}
         />
         <Text style = {{ color:'#006A71',fontSize:16,marginTop:10}}>时间</Text>
         <ScrollView style={{marginTop: 30,maxHeight:100}}>
          <View style ={{alignItems: 'center',justifyContent:'center',flexDirection:'row',flexWrap:'wrap'}}>
          { this.state.timeLoad?
          <View>
            <ActivityIndicator size="large" color="#00ff00"  />
          </View>
         :this.state.time.length>0 ? times :
           <View>
            <Text>这位医生今天没有排班！</Text>
          </View>}
          </View>
         </ScrollView>
       </View>
         <TouchableOpacity style={styles.next_wrapper}>
             <Text style={{color:'white'}}>确定</Text>
        </TouchableOpacity>
       </ScrollView>
        </View>
        <>
        </>
         </Modal>
          <Modal
           animationType="slide"
           transparent={true}
           visible={this.state.modalVisible}
           onRequestClose={() => this.setModalVisible(!this.state.modalVisible)}>
           <View style={{marginTop:200,backgroundColor:"#F7FAFA",borderRadius:40,shadowColor: "#000",
           shadowOffset: {
     	       width: 0,
     	       height: 12,
           },
           shadowOpacity: 0.58,
           shadowRadius: 16.00,
           elevation: 24,}}>
       <TouchableOpacity onPress={() =>{this.setModalVisible(!this.state.modalVisible)}} style={{marginRight:30}}>
         <Image
           style = {styles.arrow_image}
           source={require('../../images/icon/2/Arrow_left.png')}
         />
       </TouchableOpacity>
       <ScrollView style={{backgroundColor:"#F7FAFA", marginBottom:20}}>
         <DateSelect/>
         <View>
         <TouchableOpacity style={styles.next_wrapper}>
             <Text style={{color:'white'}}>确定</Text>
          </TouchableOpacity>
         </View>
        </ScrollView>
        </View>
        <>
        </>
         </Modal>
         <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.Visible}
        onRequestClose={()=>{
          this.setVisible(!this.state.Visible);}
        }
      >
      <View style={{marginTop:370,backgroundColor:"#F7FAFA",borderRadius:40,shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 12,
},
shadowOpacity: 0.58,
shadowRadius: 16.00,

elevation: 24,}}>
    <TouchableOpacity style={{marginRight:30}}  onPress={()=>{
          this.setVisible(!this.state.Visible);}
        }>
      <Image
        style = {styles.arrow_image}
        source={require('../../images/icon/2/Arrow_left.png')}
      />
    </TouchableOpacity>
    <ScrollView style={{backgroundColor:"#F7FAFA",}}>
        <View style={{marginLeft:130,marginBottom:10,marginTop:-15}}>
        <Text style = {styles.service}>类型筛选</Text>
        </View>
        <ScrollView horizontal={true} style={{marginLeft:20,maxHeight:210,paddingTop:5,height:130}}>
          <Category/>
        </ScrollView>
        <TouchableOpacity style={styles.next_wrapper} onPress={()=>{
          this.setVisible(!this.state.Visible);}
        }>
      <Text style={styles.onsite_text}>确定</Text>
    </TouchableOpacity>
    </ScrollView>
        <View style={{height:20}}/>
        </View>
      </Modal>
        </ScrollView>
      </SafeAreaView>
    )} else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" ,backgroundColor:'white'}}>
      <Image
        style = {styles.finishImg}
        source = {require('../../images/providerImg/order_img_empty_inprogress1.png')}
      />
     <Text style={{ color: '#333333', fontSize: 16, fontWeight: '400'}}>您还没有新订单哦，快去接取吧！</Text>
     </View>
    )
  }
  }}
}
ProcessingOrder.contextType = DataContext;
