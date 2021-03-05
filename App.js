import React ,{Component}from 'react';
import { Alert,Text, Button, View, Switch, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput } from 'react-native';
//import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';

export default class Signup extends Component {

  sendRequest() {
      let url = 'http://3.104.232.106:8085/aicare-customer-api/customer/user/scheduledetail?'
      +'orgId=30'
      +'&deptId=1' 
      +'&businessEmployerId=1' 
      +'&dayOfWeek=7';
      Alert.alert("hi");
      fetch(url,{
        credentials:"include",
        headers:{"sso-auth-token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTQ3Nzk3MzcsInVzZXJpbmZvIjoie1wiYXBwVHlwZVwiOlwiMVwiLFwiY2xpZW50VHlwZVwiOlwiM1wiLFwiY3JlYXRlQnlcIjpcImtpbVwiLFwiY3JlYXRlVGltZVwiOjE2MTQ2Nzk2ODkwMDAsXCJkZXB0SWRcIjowLFwiZW1haWxcIjpcImtpbXpob25nMjAxN0BnbWFpbC5jb21cIixcImlkXCI6NSxcImxvZ2luTnVtYmVyXCI6MCxcImxvZ2luVGltZVwiOjE2MTQ2Nzk2ODkwMDAsXCJtb2JpbGVcIjpcIjA0MjY4MDQ4OThcIixcInBhc3N3b3JkXCI6XCJjYjdkNWFjNTM2ZjAyZjhjNGZkZGJmYjg3MDcwNTMyZDc4NWM5YTk2Mzg5ZjYwNmUyZDEyNmEwZjliNTNlMmZhXCIsXCJzYWx0XCI6XCJSaEhkcnBVMTlqN1Q5MnJrY2tsclwiLFwic3RhdHVzXCI6MSxcInVwZGF0ZUJ5XCI6MTYxNDY3OTY4OTAwMCxcInVwZGF0ZVRpbWVcIjoxNjE0Njc5Njg5MDAwLFwidXNlcm5hbWVcIjpcImtpbVwifSJ9.S1zazA1yMZFvfpfet2iC9DJe43Zg8B0cY-aRDZkwouc"},
        method: 'GET',
      })
      .then((response) => response.json())
      .then((json)=>console.log(json.page[40]))
  }

  render() {
    return (
      <View style={{ flex:1, justifyContent: "center", alignItems: "center",backgroundColor:'white' }}>
        <Text>test</Text>
        <Button onPress={()=>this.sendRequest()} title="Learn More"
        color="#841584"></Button>
      </View>
  );}
}