import * as React from 'react';
import { View, StyleSheet, Text, AsyncStorage, TextInput } from 'react-native';
import { Login, LoginSchema } from '../models/login';
import { AudaxService } from '../services/apiAudax';
import { NavigationInjectedProps } from 'react-navigation';
import * as SecureStore from 'expo-secure-store';
import { Grid, Item, Input, Label, Button } from 'native-base';
import { Col, Row } from 'react-native-easy-grid';
import { Formik} from 'formik';

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
    //customerDetails.login = 'Login';
    customerDetails.membershipNumber = 17370;
    customerDetails.password = 'xr9hng';
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

  logOut() {
    AudaxService.logoff()
      .then((response)=> {
        AsyncStorage.removeItem("AudaxPassword");
        AsyncStorage.removeItem("AudaxUser");
        this.setState({loggedIn : false});
        console.log('Logged off in service ' + response.toString());
      })
      .catch((error)=> {
        this.setState({loggedIn : false});
        console.log(error);
      });
  }

  onSubmit(){

  };

  public render() {
    return (
      <Grid>
        <Col style={{width:10, backgroundColor:'blue'}}></Col>
      <Col style={{width:10,backgroundColor:'pink'}}>
      <Row></Row>
      <Row>
      <Formik initialValues={{membershipNumber: 999,
              password: ''}}
              validationSchema={LoginSchema}
              onSubmit={this.onSubmit}>
                    {props => (
      <View>
        <Item inlineLabel>
          <Label>Membership Number</Label>
          <Input placeholder='Membership Number' onChangeText={props.handleChange('membershipNumber')}
          onBlur={props.handleBlur('membershipNumber')}
          value={props.values.membershipNumber.toString()}/>
        </Item>
        <Item inlineLabel>
          <Label>Password</Label>
          <Input placeholder='Passsword' secureTextEntry={true} onChangeText={props.handleChange('password')}
          onBlur={props.handleBlur('password')}
          value={props.values.password}/>
        </Item>
        <Button onPress={props.handleSubmit} title="Submit" />
      </View>
    )}
      </Formik>
      </Row>
      <Row></Row>
      </Col>
      <Col style={{width:10, backgroundColor:'blue'}}></Col>
      </Grid>
        
    );
  }
}

/* <View style={{paddingTop:50}}>
<Text>Login Component</Text>
<Button testID='LoginButton' onPress={()=>{this.login()}} title="Login"></Button>
<Button onPress={()=>{this.getMember()}} title="Member"></Button>
<Button onPress={()=>{this.logOut()}} title="Logout"></Button>
<Button onPress={()=>{this.props.navigation.push('Details')}} title="Details"></Button>
<Button onPress={()=>{this.props.navigation.push('MyRides')}} title="MyRides"></Button>   
<Text>The state is : {this.state.loggedIn.toString()} *</Text>        
</View> */