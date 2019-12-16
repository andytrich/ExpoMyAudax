import { createStackNavigator } from 'react-navigation-stack';
import LoginComponent from '../screens/Login';

export const AuthStack = createStackNavigator({ Login: LoginComponent }, { headerMode: 'none' });