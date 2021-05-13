import React, { Component } from 'react';
import { Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import DataContext from "../../consumerContext";
class Pay extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.dataPolling = setInterval(
      () => {
        this.getAITraining();
      },
      3000);
  }

  componentWillUnmount() {
    clearInterval(this.dataPolling);
  }

  getAITraining=()=>{
    //console.log('轮询测试 '+new Date())
      let url2 = "http://"+this.context.url+"/aicare-customer-api/customer/pay/checkresult?orderId="+this.props.route.params.orderId;
      
              fetch(url2,{
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
              }})
              .then((response) => response.json())
              .then((json) => {
                if (json.code == 0) {
                  //console.log(json.sysDeptInfo);
                  //this.setState({clinics:json.sysDeptInfo})
                  //this.setState({loading:false})
                  //Alert.alert('查询成功');
                  console.log(json.data.payResult);
                  if(json.data.payResult=="SUCCESS"){
                    this.props.navigation.navigate("teleSuccess")
                  }if(json.data.payResult=="PAY_FAIL"){
                    Alert.alert("支付失败","请检查您的账户余额是否足够以及卡信息是否填写正确并重新支付。",[{ text: "确认", onPress: () => {this.props.navigation.navigate("teleConfirm")}
                  }]
                    )                  
                  }
                } else {
                  console.log("network issue")
                }
              }).catch(error => console.warn(error));

    //
  }

  render() {
    this.webview = null;
    return <WebView style={{marginTop:0}}
    /*onShouldStartLoadWithRequest={(request) => {
      // Only allow navigating within this website
      return request.url.startsWith('alipay');
    }}*/
    ref={(ref) => (this.webview = ref)}
    /*onShouldStartLoadWithRequest={(event)=>{
        let reqUrl =event.url;
        if(reqUrl.indexOf("alipay://alipayclient")>-1 || reqUrl.indexOf("alipays://alipayclient")>-1) {
            let  strUrl = reqUrl.replace("alipays", "aicarehealthau");
            Linking.openURL(strUrl);
            return false; //这一行是新加入了，必须加，如果不加，就返回不了app
        }
        return true;
    }}*/
    onNavigationStateChange={(newNavState) => {
      // Keep track of going back navigation within component
      //console.log(newNavState.url);
      /*if (newNavState.url=="http://3.104.87.14:8085/aicare-customer-api/pay.html"){
        
        this.webview.stopLoading();
        this.props.navigation.navigate("teleSuccess")
    }*/
    /*if (newNavState.url.startsWith("https://mpay.royalpay.com.au/api/v1.0/rpaypmt_svc/deductions/")){
        
        this.webview.stopLoading();
        Alert.alert("支付失败","请检查您的账户余额是否足够以及卡信息是否填写正确并重新支付。",[{ text: "确认", onPress: () => {this.props.navigation.navigate("teleConfirm")}
      }]
        )
        //this.props.navigation.navigate("teleconfirm")
    }*/
      /*if (newNavState.url.includes('?message=success')) {
        this.webview.stopLoading();
        // maybe close this view?
      }*/
      if (newNavState.url.includes('?errors=true')) {
        this.webview.stopLoading();
        this.props.navigation.navigate("teleConfirm")
      }
      /*const { url } = newNavState;
      if (!url) return;
      
      if (url.includes('?message=success')) {
        this.webview.stopLoading();
        // maybe close this view?
      }*/
    }}
    //redirect=http://3.104.87.14:8085/aicare-customer-api/pay.html&directpay=true
    source={{ uri: this.props.route.params.url }} />;
  }
}
Pay.contextType = DataContext;

export default Pay;