import {Auth, API, graphqlOperation} from 'aws-amplify';
import {AsyncStorage} from 'react-native';
import * as queries from '../graphql/queries';
import {
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNUP_CONFIRM,
  SIGNUP_CONFIRM_SUCCESS,
  SIGNUP_CONFIRM_FAIL,
  RESEND_CODE,
  RESEND_CODE_SUCCESS,
  RESEND_CODE_FAIL,
  SIGNOUT,
  SIGNOUT_SUCCESS,
  SIGNOUT_FAIL,
} from './types';
import Toast from 'react-native-simple-toast';
export const signUp = ({username, email, password}, navigation) => dispatch => {
  dispatch({
    type: SIGNUP,
    payload: {
      username,
      email,
      password,
    },
  });
  Auth.signUp({
    username,
    password,
    attributes: {
      email,
    },
  })
    .then(async user => {
      const usr = {
        username: user.username,
      };
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: user,
      });
      navigation.navigate('Confirm');
      Toast.show('Signup  Successfully');
    })
    .catch(err => {
      dispatch({
        type: SIGNUP_FAIL,
        payload: err,
      });
    });
};

export const confirm = (
  {username, verifyCode},
  password,
  navigation,
) => dispatch => {
  dispatch({
    type: SIGNUP_CONFIRM,
    payload: {
      username,
    },
  });
  Auth.confirmSignUp(username, verifyCode, {
    forceAliasCreation: true,
  })
    .then(data => {
      dispatch({
        type: SIGNUP_CONFIRM_SUCCESS,
        payload: data,
      });
      navigation.navigate('Login');
      Toast.show('Account Confirm  Successfully');
    })
    .catch(err => {
      dispatch({
        type: SIGNUP_CONFIRM_FAIL,
        payload: err,
      });
    });
};

export const signOut = navigation => dispatch => {
  dispatch({
    type: SIGNOUT,
  });
  Auth.signOut()
    .then(() => {
      dispatch({
        type: SIGNOUT_SUCCESS,
      });
      navigation.navigate('Login');
    })
    .catch(err => {
      dispatch({
        type: SIGNOUT_FAIL,
        payload: err,
      });
    });
};

export const resend = ({username}) => dispatch => {
  dispatch({
    type: RESEND_CODE,
  });
  Auth.resendSignUp(username)
    .then(data => {
      dispatch({
        type: RESEND_CODE_SUCCESS,
        payload: data,
      });
      Toast.show('Resend Signup Successfully');
    })
    .catch(err => {
      dispatch({
        type: RESEND_CODE_FAIL,
        payload: err,
      });
    });
};

const _signIn = (username, password, navigation, dispatch) => {
  dispatch({
    type: SIGNIN,
    payload: {
      username,
      password,
    },
  });
  Auth.signIn(username, password)
    .then(async user => {
      console.log('signin', user.username);
      console.log('signin user', user.signInUserSession.idToken.payload.sub);
      let userId = user.signInUserSession.idToken.payload.sub;
      console.log('userId', userId);
      let name = user.username;
      console.log('name', name);
      AsyncStorage.setItem('loginname', name);
      AsyncStorage.setItem('loginUserId', userId);
      try {
        console.log("api call start")
        const users = await API.graphql(graphqlOperation(queries.listUsers), {
          filter: {
            username: {
              eq: name,
            },
          },
        });
        console.log("users list screen" , users)
        if (
          users.data.listUsers.items &&
          users.data.listUsers.items.length > 0
        ) {
          console.log(users.data.listUsers.items);
          const localdata = users.data.listUsers.items.filter(
            x => x.username === user.username,
          );
          let usr;
          if (localdata.length > 0) {
            console.log('*** data', localdata);
            usr = localdata[0];
          }
          console.log('usr.id', usr.id);
          await AsyncStorage.setItem('login', usr.id);
          console.log('signin user table user ', usr);
          console.log(
            'signin user table user saved',
            await AsyncStorage.getItem('login'),
          );
        }
      } catch (errr) {
        console.log(errr);
      }
      dispatch({
        type: SIGNIN_SUCCESS,
        payload: user,
      });
      Toast.show('Login user Successfully');
      navigation.navigate('Home');
    })
    .catch(err => {
      if (err.code === 'UserNotConfirmedException') {
        navigation.navigate('Confirm');
        return;
      }
      dispatch({
        type: SIGNIN_FAIL,
        payload: err,
      });
    });
};

export const signIn = ({username, password}, navigation) => dispatch => {
  _signIn(username, password, navigation, dispatch);
};
