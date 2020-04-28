import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Dialog, {SlideAnimation, DialogContent} from 'react-native-popup-dialog';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import IconEntypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import Chatview from '../screens/Chatview';
import ConfirmScreen from '../screens/ConfirmScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import StartUpScreen from '../screens/StartUpScreen';
import IntroScreen from '../screens/IntroScreen';
import OnboardingSix from '../screens/OnboardingSix';
import OnboardingSeven from '../screens/OnboardingSeven';
import Onboardingten from '../screens/Onboardingten';
import Onboardingnine from '../screens/Onboardingnine';
import Onboardingeight from '../screens/Onboardingeight';
import NotificationScreen from '../screens/NotificationScreen';
import GroupChatScreen from '../screens/GroupChatScreen';
import AddEventScreen from '../screens/AddEventScreen';
import BulkEventsScreen from '../screens/BulkEventsScreen';
import {AppStyles} from '../AppStyles';
const StackNavigatorOptions = {
  initialRouteName: 'OnboardingStack',
  headerMode: 'none',
};
const AddPopUp = props => {
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <Dialog
        visible={!visible}
        dialogAnimation={
          new SlideAnimation({
            initialValue: 0, // optional
            slideFrom: 'bottom', // optional
            useNativeDriver: true, // optional
          })
        }>
        <DialogContent>
          <TouchableOpacity>
            <Text>testing data</Text>
          </TouchableOpacity>
        </DialogContent>
      </Dialog>
    </View>
  );
};
const BottomTabs = createMaterialBottomTabNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        showIcon: true,
        tabBarIcon: ({tintColor}) => (
          <IconEntypo name="home" size={25} color={tintColor} />
        ),
      },
    },

    Chatview: {
      screen: Chatview,
      navigationOptions: {
        showIcon: true,
        tabBarIcon: ({tintColor}) => (
          <IconMaterial name="chat" size={25} color={tintColor} />
        ),
      },
    },

    AddPopUp: {
      screen: AddPopUp,
      navigationOptions: {
        showIcon: true,
        showLabel: false,
        tabBarIcon: ({tintColor}) => (
          <IconMaterial name="plus-circle" size={25} color="#F6502B" />
        ),
      },
    },

    NotificationScreen: {
      screen: NotificationScreen,
      navigationOptions: {
        showIcon: true,
        tabBarIcon: ({tintColor}) => (
          <Ionicons name="ios-notifications" size={25} color={tintColor} />
        ),
      },
    },

    GroupChatScreen: {
      screen: GroupChatScreen,
      navigationOptions: {
        showIcon: true,
        tabBarIcon: ({tintColor}) => (
          <FontAwesome name="layer-group" size={25} color={tintColor} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      scrollEnabled: true,
      activeTintColor: '#fff',
      // inactiveTintColor: color.SEA,

      style: {
        backgroundColor: '#fff',
      },
      tabStyle: {
        backgroundColor: '#fff',
      },
    },
  },
);

const OnboardingStack = createStackNavigator(
  {
    IntroScreen: {screen: IntroScreen},
    OnboardingSix: {screen: OnboardingSix},
    OnboardingSeven: {screen: OnboardingSeven},
    Onboardingeight: {screen: Onboardingeight},
    Onboardingnine: {screen: Onboardingnine},
    Onboardingten: {screen: Onboardingten},
    BulkEventsScreen: {screen: BulkEventsScreen},
    // Login: {screen: LoginScreen},
    // Signup: {screen: SignupScreen},
    Home: {screen: BottomTabs},
    // Chatview: {screen: Chatview},
    // Confirm: {screen: ConfirmScreen},
  },
  {
    initialRouteName: 'Home',
    headerMode: null,
  },
);

const RootNavigator = createStackNavigator(
  {
    StartUpScreen: {screen: StartUpScreen},
    OnboardingStack: {screen: OnboardingStack},
  },
  StackNavigatorOptions,
);

const AppNavigator = createAppContainer(RootNavigator);
export default AppNavigator;
