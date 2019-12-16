import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { AppStack } from './appStack';
import AuthLoadingComponent from '../screens/AuthLoading';
import { AuthStack } from './authStack';

export const Main = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingComponent,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'App',
    }
  )
);