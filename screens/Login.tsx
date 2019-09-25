import * as React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { Login, LoginSchema } from '../models/login';
import { AudaxService } from '../services/apiAudax';
import { NavigationInjectedProps } from 'react-navigation';
import * as SecureStore from 'expo-secure-store';
import { Item, Input, Label, Button, Container, Content } from 'native-base';
import { Formik} from 'formik';
import HeaderComponent from './Header';
import FooterComponent from './Footer';

export interface LoginProps {
}

export interface LoginState {
  loggedIn : boolean
}

export default class LoginComponent extends React.Component<NavigationInjectedProps<{}> & LoginProps, LoginState> {
  
    constructor(props: NavigationInjectedProps<{}> & LoginProps) {     
    super(props);
    this.state = {
      loggedIn : false
    };
  }

   login() {
    let customerDetails = new Login();
/*     customerDetails.membershipNumber = 17370;
    customerDetails.password = 'xr9hng'; */
    AudaxService.login(customerDetails).then((data)=>{ 
      this.setState({loggedIn : data});
      SecureStore.setItemAsync("AudaxPassword", customerDetails.password);
      SecureStore.setItemAsync("AudaxUser", customerDetails.membershipNumber.toString());
      this.props.navigation.push('Home')
    });
  }

  getMember() {
    AudaxService.myRides().then((rides)=>{
        console.log(rides);
      })
}
  onSubmit=(values: {membershipNumber: number, password: string})=>{
    let customerDetails = new Login();
    customerDetails.membershipNumber = values.membershipNumber;
    customerDetails.password = values.password;
    AudaxService.login(customerDetails).then((data)=>{ 
      this.setState({loggedIn : data});
      if (data){
      SecureStore.setItemAsync("AudaxPassword", customerDetails.password);
      SecureStore.setItemAsync("AudaxUser", customerDetails.membershipNumber.toString());
      this.props.navigation.navigate('MembersHome');
      }
      else
      {
        alert("Login details are incorrect, please try again")
      }
    });
  }


  public render() {
    return (
      <Container style={{marginTop:25}}>
        <HeaderComponent></HeaderComponent>
        <Content>
          <Formik initialValues={{membershipNumber: 0,
              password: ''}} validationSchema={LoginSchema} onSubmit={this.onSubmit}>
            {({ handleChange , handleSubmit, values, errors, touched }) => (
            <View style={{  flex: 1, justifyContent: 'center', marginTop:110}}>
              <View>
                <Text>{errors.membershipNumber}</Text>
                <Text>{errors.password}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'center', alignItems:'flex-start', alignContent:'flex-start'}}>
                <Label style={{width:180, height:30}}>Membership Number</Label>
                <Item rounded style={{width:150, height:30}}>
                  <Input placeholder='Membership Number' onChangeText={handleChange('membershipNumber')}
                    value={values.membershipNumber.toString()} />
                </Item>                
              </View>
              <View style={{flexDirection:'row', justifyContent:'center', alignItems:'flex-start', alignContent:'flex-start'}}>
                <Label style={{width:180, height:30}}>Password</Label>
                <Item rounded style={{width:150, height:30}}>
                  <Input placeholder='Password' secureTextEntry={true} onChangeText={handleChange('password')}
                    value={values.password} />                  
                </Item>
              </View>
              <View style={{flexDirection:'row',justifyContent: 'center', paddingTop:10}}>
                <Button style={{width:80, borderRadius:10, justifyContent: 'center'}} onPress={handleSubmit}><Text style={{color:'white', fontWeight:'bold', fontSize:18}}>Sign In</Text></Button>
              </View>
            </View>
            )}
          </Formik>
        </Content>
        <FooterComponent navigation={this.props.navigation}></FooterComponent>
      </Container>
    );
  }
}
