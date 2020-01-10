import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Signin from './pages/signin';
import Config from './pages/config';
import Update from './pages/update';
import Dashboard from './pages/dashboard';
import Dup from './pages/dup';
import Info from './pages/info';
import Logout from './pages/logout';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createBottomTabNavigator(
          {
            Signin,
            Config,
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#FFF',
              inactiveTintColor: 'rgba(255, 255, 255, 0.3)',
              style: {
                backgroundColor: '#464950',
                borderTopColor: '#464950',
              },
            },
          },
        ),
        App: createStackNavigator(
          {
            Dashboard,
            Logout,
            Update,
            Dup,
            Info,
          },
          {
            headerLayoutPreset: 'center',
            defaultNavigationOptions: {
              headerTransparent: true,
              headerTintColor: '#FFF',
              headerLeftContainerStyle: {
                marginLeft: 20,
              },
              headerRightContainerStyle: {
                marginRight: 20,
              },
            },
          },
        ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      },
    ),
  );
