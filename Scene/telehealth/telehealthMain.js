import React,{ useState,setState,useContext,useEffect} from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch,Modal} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { StackActions } from '@react-navigation/native';
import DataContext from "../../consumerContext";

export default function TelehealthrMain({navigation}) {
    user=useContext(DataContext);
    const [modalVisible, setModalVisible] = useState(false);

    const alertHandler= () => {
      Alert.alert('功能还未完善')
    }
    const goToSub= (num) => {
        setModalVisible(false);
        navigation.navigate("telehealthSub",{doctype:num});
        
    }
    const goToRecommend=()=>{
      navigation.navigate("docRecommend",{docList:docList})

    }
    const goToDoc= () => {
      navigation.navigate("docInfo",{queryId:item.employerId,orgId:item.orgId,docId:item.businessUserId,docType:"全科",address:item.orgAddress,docName:item.employerName})
  }
    const [search, setSearch] = React.useState('');
    const [docList, setDocList] = React.useState([]);

    const goBack= () => {
        navigation.dispatch(StackActions.pop(1))
      }
      useEffect(() => {
        let url3 = "http://"+user.url+"/aicare-customer-api/customer/user/getServiceClassAndDoctor";
            fetch(url3,{
              method: 'GET',
              mode: 'cors',
              credentials: 'include',
              headers: {
              'Accept':       'application/json',
              'Content-Type': 'application/json',
              'sso-auth-token': user.token,
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
              'Access-Control-Allow-Headers': 'content-type, sso-auth-token',
              'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE',
            }})
            .then((response) => response.json())
            .then((json) => {
              if (json.code == 0) {
                //this.setState({query:json.page})
                //setLen(json.page.length)
                console.log(json.data.doctorInfoList);
                setDocList(json.data.doctorInfoList);
                //setOrder(json.page);
                //Alert.alert('查询成功');
                //console.log(json.page)
                //console.log("查询成功");
                //console.log(order)
              } else {
                console.log(json.msg);
                //Alert.alert('查询失败');
              }
            }).catch(error => console.warn(error));
        },[])
        /*const splitString=(string)=>{
          let res = string.split(",").map(Number);
          return res;
        }
        const types = doc.serviceClass?splitString(doc.serviceClass).map((item) => {
          return (
            <TouchableOpacity style={styles.resumeTag}>
              <Text style={{ fontSize:12, fontWeight: '300',paddingTop:6 }}>{user.deptType[item]}</Text>
            </TouchableOpacity>
          )
        }):null;*/
    const types = docList?docList.map((item) => {
          return (
            <View style={{shadowColor:"000000",shadowOffset: {
              width: 0,
              height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,

              elevation: 6,
              

              }}>
        <TouchableOpacity style={{backgroundColor:'#FFFFFF',
                          padding:20,
                          paddingBottom:12,
                          width:330,
                         // marginLeft:20,
                          //marginTop:10,
                          //height:125,
                          //alignItems: 'center',
                          marginBottom:10,
                          borderRadius:15,}}
                          onPress={()=>{navigation.navigate("docInfo",{doctype:0,queryId:item.employerId,orgId:item.orgId,docId:item.businessUserId,docType:"全科",address:item.orgAddress,docName:item.employerName})
                        }}>
          <View style={{flexDirection: 'row'}}>

          <Image
            style={{width:75,height:75,marginLeft:20,marginTop:-3}}
            source={item.headPortrait?{uri:item.headPortrait}:require('../../images/telehealth_icon/service_doctor_img1.png')}/>
          </View>
          <Text style={{fontSize:17,marginTop:-78,marginLeft:103}}>{item.employerName}</Text>
          <Text style={{fontSize:12,color:'#999999',marginLeft:102,marginTop:10}}>全科医生-{item.orgName}</Text>
          <View style={{flexDirection: 'row'}}>

          <Image
            style={{width:25,height:25,marginTop:8,marginLeft:98}}
            source={require('../../images/telehealth_icon/stars.png')}/>
          <Text style={{fontSize:12,color:'#999999',marginTop:10}}>5 (1评价)</Text>
          </View>
        </TouchableOpacity>
        
        </View>
          )
    }):null;
    return (
      <ScrollView style={{ flex:1,backgroundColor:"white",}}>
      <View style={{ flex:1, justifyContent: "center", alignItems: "center" ,paddingTop: 40,backgroundColor:"white",marginTop:10}}>
         <View style={{flexDirection: 'row', marginTop:120, marginBottom:10}}>
            <TouchableOpacity onPress={goBack}>
            <Image
            style = {{width:35,
                height:35,
                marginTop:-150,
                marginLeft:-145,}}
            source={require('../../images/icon/2/Arrow_left.png')}
            />
            </TouchableOpacity>
            <Text style={{
              fontSize:16,

              marginTop:-150}}>远程医疗</Text>
          </View>

        <Image
            style = {{height:150,
              width:150,marginTop:-100,marginBottom:30}}
            source = {require('../../images/telehealth_icon/service_telehealth_img.png')}

        />
        {/*<SearchBar
          round
          //searchIcon={{ size: 24 }}
          //onChangeText={(text) => searchFilterFunction(text)}
          //onClear={(text) => searchFilterFunction('')}
          containerStyle={{backgroundColor:'white',width:330,height:38,shadowColor:"000000",marginTop:-5,shadowOffset: {
            width: 0,
            height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,

            elevation: 6,
            borderRadius:25}}
          inputStyle={{color:'black',fontSize:13}}
          inputContainerStyle={{backgroundColor:'white',height:15}}
          lightTheme={true}
          placeholder="搜索种类..."
          onChangeText={search => setSearch(search)}
          
          value={search}
        />*/}
        <View style={{flexDirection: 'row', marginBottom: 15,marginTop:30}}>
          <Text style={{marginLeft:-20,fontSize:18}}>预约种类</Text>
          <TouchableOpacity style={{marginLeft:180,marginTop:5}}  onPress={()=>{
          setModalVisible(modalVisible=>!modalVisible)}}>
            <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize:14,color:"#999999"}}>全部  {'>'}</Text>
            
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={true} style={{marginLeft:20,maxHeight:210,paddingTop:0,height:125}}>
        <View style={{flexDirection: 'row', marginBottom: 45}}>
        <View style={{shadowColor:"000000",shadowOffset: {
	              width: 0,
	              height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,}}>
          <TouchableOpacity style={{backgroundColor:'#FEA495',
                            padding:20,
                            width:80,
                            marginLeft:20,
                            marginTop:10,
                            height:80,
                            alignItems: 'center',
                            borderRadius:25,}}
                            onPress={()=>goToSub(1)}>
          <Image
            style={{width:30,height:30}}
            source = {require('../../images/telehealth_icon/service_telehealth_icon_gp.png')}
          />
          <Text style={{color:'#FFFFFF',marginTop:2}}>全科</Text>

          </TouchableOpacity>
          </View>

          <View style={{shadowColor:"000000",shadowOffset: {
	              width: 0,
	              height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,}}>
          <TouchableOpacity style={{backgroundColor:'#FFFFFF',
                            padding:20,
                            width:80,
                            marginLeft:15,
                            marginTop:10,
                            height:80,
                            alignItems: 'center',
                            borderRadius:25,}}
                            onPress={()=>goToSub(5)}>
          <Image
            style={{width:34,height:30}}
            source = {require('../../images/telehealth_icon/service_telehealth_icon_child.png')}
          />
          <Text style={{color:'#68B0AB',marginTop:2}}>儿科</Text>

          </TouchableOpacity>
          </View>
          <View style={{shadowColor:"000000",shadowOffset: {
	              width: 0,
	              height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,}}>
          <TouchableOpacity style={{backgroundColor:'#FFFFFF',
                            padding:20,
                            width:80,
                            marginLeft:15,
                            marginTop:10,
                            height:80,
                            alignItems: 'center',
                            borderRadius:25,}}
                            onPress={()=>goToSub(3)}>
                            
          <Image
            style={{width:30,height:30}}
            source = {require('../../images/telehealth_icon/service_telehealth_icon_mental.png')}
          />
          <Text style={{color:'#68B0AB',marginTop:2}}>心理</Text>

          </TouchableOpacity>
          </View>
          <View style={{shadowColor:"000000",shadowOffset: {
	              width: 0,
	              height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,}}>
          <TouchableOpacity style={{backgroundColor:'#FFFFFF',
                            padding:20,
                            width:80,
                            marginLeft:15,
                            marginTop:10,
                            height:80,
                            alignItems: 'center',
                            borderRadius:25,}}
                            onPress={()=>goToSub(4)}>
                            
          <Image
            style={{width:30,height:30}}
            source = {require('../../images/中医.png')}
          />
          <Text style={{color:'#68B0AB',marginTop:2}}>中医</Text>

          </TouchableOpacity>
          </View>
          <View style={{shadowColor:"000000",shadowOffset: {
	              width: 0,
	              height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,}}>
          <TouchableOpacity style={{backgroundColor:'#FFFFFF',
                            padding:20,
                            width:80,
                            marginLeft:15,
                            marginTop:10,
                            height:80,
                            alignItems: 'center',
                            borderRadius:25,}}
                            onPress={()=>goToSub(6)}>
                            
          <Image
            style={{width:30,height:30}}
            source = {require('../../images/康复.png')}
          />
          <Text style={{color:'#68B0AB',marginTop:2}}>康复</Text>

          </TouchableOpacity>
          </View>
          <View style={{shadowColor:"000000",shadowOffset: {
	              width: 0,
	              height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,
                }}>
          <TouchableOpacity style={{backgroundColor:'#FFFFFF',
                            padding:20,
                            width:80,
                            marginLeft:15,
                            marginTop:10,
                            height:80,
                            alignItems: 'center',
                            borderRadius:25,
                            }}
                            onPress={()=>goToSub(2)}>
          <Image
            style={{width:30,height:30}}
            source = {require('../../images/telehealth_icon/service_telehealth_icon_dentist.png')}
          />
          <Text style={{color:'#68B0AB',marginTop:2}}>牙医</Text>
          </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
        <View style={{flexDirection: 'row', marginBottom: 15}}>
          <Text style={{marginLeft:-20,fontSize:18}}>名医推荐</Text>
          <TouchableOpacity style={{marginLeft:180,marginTop:5}} onPress={goToRecommend}>
            <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize:14,color:"#999999"}}>全部  {'>'}</Text>
            
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView  style={{marginLeft:5,maxHeight:240,paddingTop:5,paddingLeft:5,height:220,width:350}}>
        {types}
          </ScrollView>
          <Modal
        animationType="slide"
        transparent={true}
        //backgroundColor="#000000"
        visible={modalVisible}
        onRequestClose={()=>{
          setModalVisible(!modalVisible);}
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
    <View style={{flexDirection: 'row'}}>

    <TouchableOpacity style={{marginRight:30}}  onPress={()=>setModalVisible(!modalVisible)}>
      <Image
        style = {{
          width:25,
          height:25,
          marginTop:20,
          marginLeft:20,
        }}
        source={require('../../images/icon/2/Arrow_left.png')}
      />
    </TouchableOpacity>
    <Text style = {{ color:'black',
    fontSize:17,
    marginTop:20,
    marginLeft:90,marginBottom:30}}>全部类型</Text>
    </View>
      <ScrollView style={{backgroundColor:"#F7FAFA",}}>
        
        
        <View style={{flexDirection: 'row', marginBottom: 15}}>
        <View style={{shadowColor:"000000",shadowOffset: {
	              width: 0,
	              height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,}}>
          <TouchableOpacity style={{backgroundColor:'#FEA495',
                            padding:20,
                            width:80,
                            marginLeft:20,
                            marginTop:10,
                            height:80,
                            alignItems: 'center',
                            borderRadius:25,
                            }}
                            onPress={goToSub}
                            >
          <Image
            style={{width:30,height:30}}
            source = {require('../../images/telehealth_icon/service_telehealth_icon_gp.png')}
          />
          <Text style={{color:'#FFFFFF',marginTop:2}}>全科</Text>

          </TouchableOpacity>
          </View>

          <View style={{shadowColor:"000000",shadowOffset: {
	              width: 0,
	              height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,}}>
          <TouchableOpacity style={{backgroundColor:'#FFFFFF',
                            padding:20,
                            width:80,
                            marginLeft:15,
                            marginTop:10,
                            height:80,
                            alignItems: 'center',
                            borderRadius:25,
                            }}
                            onPress={goToSub}
                            >
          <Image
            style={{width:34,height:30}}
            source = {require('../../images/telehealth_icon/service_telehealth_icon_child.png')}
          />
          <Text style={{color:'#68B0AB',marginTop:2}}>儿科</Text>

          </TouchableOpacity>
          </View>
          <View style={{shadowColor:"000000",shadowOffset: {
	              width: 0,
	              height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,}}>
          <TouchableOpacity style={{backgroundColor:'#FFFFFF',
                            padding:20,
                            width:80,
                            marginLeft:15,
                            marginTop:10,
                            height:80,
                            alignItems: 'center',
                            borderRadius:25,
                            }}
                            onPress={goToSub}
                            >
                            
          <Image
            style={{width:30,height:30}}
            source = {require('../../images/telehealth_icon/service_telehealth_icon_mental.png')}
          />
          <Text style={{color:'#68B0AB',marginTop:2}}>心理</Text>

          </TouchableOpacity>
          </View>
          <View style={{shadowColor:"000000",shadowOffset: {
	              width: 0,
	              height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,}}>
          <TouchableOpacity style={{backgroundColor:'#FFFFFF',
                            padding:20,
                            width:80,
                            marginLeft:15,
                            marginTop:10,
                            height:80,
                            alignItems: 'center',
                            borderRadius:25,
                            }}
                            onPress={goToSub}
                            >
                            
          <Image
            style={{width:30,height:30}}
            source = {require('../../images/中医.png')}
          />
          <Text style={{color:'#68B0AB',marginTop:2}}>中医</Text>

          </TouchableOpacity>
          </View>
          
        </View>
        <View style={{flexDirection: 'row', marginBottom: 45}}>

        <View style={{shadowColor:"000000",shadowOffset: {
	              width: 0,
	              height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,}}>
          <TouchableOpacity style={{backgroundColor:'#FFFFFF',
                            padding:20,
                            width:80,
                            marginLeft:15,
                            marginTop:10,
                            height:80,
                            alignItems: 'center',
                            borderRadius:25,
                            }}
                            onPress={goToSub}
                            >
                            
          <Image
            style={{width:30,height:30}}
            source = {require('../../images/康复.png')}
          />
          <Text style={{color:'#68B0AB',marginTop:2}}>康复</Text>

          </TouchableOpacity>
          </View>
          <View style={{shadowColor:"000000",shadowOffset: {
	              width: 0,
	              height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,
                }}>
          <TouchableOpacity style={{backgroundColor:'#FFFFFF',
                            padding:20,
                            width:80,
                            marginLeft:15,
                            marginTop:10,
                            height:80,
                            alignItems: 'center',
                            borderRadius:25,
                            
                            }}
                            onPress={goToSub}
                            
                            >
          <Image
            style={{width:30,height:30}}
            source = {require('../../images/telehealth_icon/service_telehealth_icon_dentist.png')}
          />
          <Text style={{color:'#68B0AB',marginTop:2}}>牙医</Text>
          </TouchableOpacity>
          </View>
          </View>
        

        
    </ScrollView>

        <View style={{height:20}}/>
        </View>
      </Modal>

      </View>
      </ScrollView>
    );
  }
