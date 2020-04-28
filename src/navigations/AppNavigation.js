import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
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
const StackNavigatorOptions = {
  initialRouteName: 'OnboardingStack',
  headerMode: 'none',
};

const OnboardingStack = createStackNavigator(
  {
    IntroScreen: {screen: IntroScreen},
    OnboardingSix: {screen: OnboardingSix},
    OnboardingSeven: {screen: OnboardingSeven},
    Onboardingeight: {screen: Onboardingeight},
    Onboardingnine: {screen: Onboardingnine},
    Onboardingten: {screen: Onboardingten},
    // Login: {screen: LoginScreen},
    // Signup: {screen: SignupScreen},
    Home: {screen: HomeScreen},
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
