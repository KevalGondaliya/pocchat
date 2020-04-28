import React, {Component} from 'react';
import {StyleSheet, View, KeyboardAvoidingView, Platform} from 'react-native';
import {AppStyles} from '../AppStyles';
import {connect} from 'react-redux';
import {signUp} from '../actions';
import {reduxForm, Field, SubmissionError} from 'redux-form';
import {validateEmail} from '../utils/Validator';
import PrimaryButton from '../components/PrimaryButton';
import {Form, Text} from 'native-base';
import {Transition} from 'react-navigation-fluid-transitions';
import InputItem from '../components/InputItem';
import Header from '../components/Header';
import TopStatusBar from '../components/TopStatusBar';
import {API, graphqlOperation} from 'aws-amplify';
const validate = values => {
  const error = {};
  error.username = '';
  error.email = '';
  error.password = '';
  var un = values.username;
  var em = values.email;
  var pw = values.password;
  var pwc = values.passwordConfirm;
  if (values.username === undefined) {
    un = '';
  }
  if (values.email === undefined) {
    em = '';
  }
  if (values.password === undefined) {
    pw = '';
  }
  if (values.passwordConfirm === undefined) {
    pwc = '';
  }
  if (un.length > 15 && un !== '') {
    error.username = 'Username must be less than 15 char';
  }
  if (pw.length < 8 && pw !== '') {
    error.password = 'Password is too short';
  }
  if (pw !== pwc) {
    error.passwordConfirm = 'Password is not matched';
  }
  if (em !== '' && validateEmail(em) === false) {
    error.email = 'Email format is invalid!';
  }
  return error;
};

const AddUser = `
mutation ($username: String!) {
  createUser(input: {
    username: $username
  }) {
    id username
  }
}
`;
class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      User: [],
    };
  }
  onSubmit(values) {
    if (values.username === undefined || values.username === '') {
      throw new SubmissionError({
        username: 'Please Input Username',
      });
    }
    if (values.email === undefined || values.email === '') {
      throw new SubmissionError({
        email: 'Please Input E-mail Address',
      });
    }
    if (values.password === undefined || values.password === '') {
      throw new SubmissionError({
        password: 'Please Input Password',
      });
    }
    const user = {
      username: values.username,
    };

    const users = [...this.state.User, user];
    API.graphql(graphqlOperation(AddUser, user));
    this.props.signUp(values, this.props.navigation);
  }

  renderError(error) {
    if (error === undefined || error === null || error === '') {
      return <View />;
    }
    return <Text style={{color: 'red'}}>{error}</Text>;
  }

  render() {
    const {error, signUpError} = this.props;
    return (
      <View style={styles.container}>
        <TopStatusBar />
        <Header name={'Sign Up'} {...this.props} isBack={true} />
        <KeyboardAvoidingView
          style={styles.maincontainer}
          behavior={Platform.OS == 'ios' ? 'padding' : null}>
          <Form style={{alignSelf: 'stretch'}}>
            <Field name={'username'} component={InputItem} label="Username" />
            <Field name={'email'} component={InputItem} label="E-mail" />
            <Field
              name={'password'}
              component={InputItem}
              label="Password"
              secureTextEntry
            />
            <Field
              name={'passwordConfirm'}
              component={InputItem}
              label="Password Comfirm"
              secureTextEntry
            />
          </Form>
          <View>
            <Transition shared="authSubmitButton">
              <View>
                <PrimaryButton
                  onPress={this.props.handleSubmit(this.onSubmit.bind(this))}
                  loading={this.props.loading}
                  text="Sign Up"
                />
              </View>
            </Transition>
          </View>

          {this.renderError(error)}
          {this.renderError(signUpError)}
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    color: AppStyles.color.tint,
    marginTop: 20,
    marginBottom: 20,
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
    marginTop: 10,
  },
  leftTitle: {
    alignSelf: 'stretch',
    textAlign: 'left',
    marginLeft: 20,
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
  facebookContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },
  facebookText: {
    color: AppStyles.color.white,
  },
});

const mapStateToProps = state => ({
  user: state.auth.user,
  signUpError: state.auth.signUpError,
  loading: state.auth.loading,
});

const connected = connect(
  mapStateToProps,
  {signUp},
)(SignupScreen);
export default reduxForm({form: 'signIn', validate})(connected);
