import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {reduxForm, Field, SubmissionError} from 'redux-form';
import {Transition} from 'react-navigation-fluid-transitions';
import {Form, Text} from 'native-base';
import {connect} from 'react-redux';
import {signIn} from '../actions';
import InputItem from '../components/InputItem';
import PrimaryButton from '../components/PrimaryButton';
import {AppStyles} from '../AppStyles';
import {Auth} from 'aws-amplify';

import aws_exports from '../../aws-exports';
const {width} = Dimensions.get('window');
Auth.configure({
  ...aws_exports,
});
class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSubmit = values => {
    if (values.username === undefined || values.username === '') {
      throw new SubmissionError({
        username: 'Please Enter UserName',
      });
    }
    if (values.password === undefined || values.password === '') {
      throw new SubmissionError({
        password: 'Please Enter Password',
      });
    }
    this.props.signIn(values, this.props.navigation);
  };

  renderError(error) {
    if (error === undefined || error === null || error === '') {
      return <View />;
    }
    return <Text style={{color: 'red'}}>{error}</Text>;
  }

  render() {
    const {error, signInError} = this.props;

    return (
      <View style={styles.container}>
        <Text style={[styles.title, styles.leftTitle]}>Sign In</Text>
        <KeyboardAvoidingView
          style={styles.maincontainer}
          behavior={Platform.OS == 'ios' ? 'padding' : null}>
          <Form style={{alignSelf: 'stretch'}}>
            <Field name={'username'} component={InputItem} label="Username" />
            <Field
              name={'password'}
              component={InputItem}
              label="Password"
              secureTextEntry
            />
          </Form>
          <View>
            <Transition shared="authSubmitButton">
              <View>
                <PrimaryButton
                  onPress={this.props.handleSubmit(this.onSubmit.bind(this))}
                  loading={this.props.loading}
                  text="Sign In"
                />
              </View>
            </Transition>
          </View>

          {this.renderError(error)}
          {this.renderError(signInError)}
        </KeyboardAvoidingView>
        <>
          <Text style={styles.labelcontainer}>Do you have account?</Text>
          <>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Signup')}>
              <Text style={styles.signupcontainer}>Sign Up</Text>
            </TouchableOpacity>
          </>
        </>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    padding: 10,
  },

  labelcontainer: {
    color: '#ABB8C3',
    alignSelf: 'center',
    marginTop: 15,
  },

  signupcontainer: {
    color: '#ABB8C3',
    alignSelf: 'center',
    marginTop: 15,
  },

  maincontainer: {
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 20,
    shadowColor: '#aaa',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 3,
  },
  or: {
    fontFamily: AppStyles.fontName.main,
    color: 'black',
    marginTop: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: AppStyles.fontSize.content,
    fontWeight: 'bold',
    color: AppStyles.color.tint,
    marginTop: 20,
    marginBottom: 20,
  },
  leftTitle: {
    alignSelf: 'center',
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text,
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },
  loginText: {
    color: AppStyles.color.white,
  },
  placeholder: {
    fontFamily: AppStyles.fontName.text,
    color: 'red',
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main,
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text,
  },

  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 30,
  },
  offlineText: {color: '#fff'},
});

const mapStateToProps = state => ({
  user: state.auth.user,
  signInError: state.auth.signInError,
  loading: state.auth.loading,
  username: state.auth.username,
  password: state.auth.password,
});

const connected = connect(
  mapStateToProps,
  {signIn},
)(LoginScreen);
export default reduxForm({form: 'signIn'})(connected);
