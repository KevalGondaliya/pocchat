import React from 'react';
import {Component} from 'react';
import {View, KeyboardAvoidingView, Platform} from 'react-native';
import {Transition} from 'react-navigation-fluid-transitions';
import {reduxForm, Field, SubmissionError} from 'redux-form';
import {Form, Button, Text} from 'native-base';
import {connect} from 'react-redux';
import {confirm, resend} from '../actions';
import styles from './styles';
import InputItem from '../components/InputItem';
import PrimaryButton from '../components/PrimaryButton';
import Header from '../components/Header';
import TopStatusBar from '../components/TopStatusBar';
class ConfirmScreen extends Component {
  onSubmit(values) {
    if (values.verifyCode === undefined || values.verifyCode === '') {
      throw new SubmissionError({
        email: 'Please Input Verification Code !',
      });
    }
    this.props.confirm(values, this.props.password, this.props.navigation);
  }
  onResend(values) {
    this.props.resend(values);
  }

  renderError(error) {
    if (error === undefined || error === null || error === '') {
      return <View />;
    }
    return <Text style={{color: 'red'}}>{error}</Text>;
  }

  render() {
    const {error, confirmError, resendError, handleSubmit} = this.props;
    return (
      <View style={styles.container}>
        <TopStatusBar />
        <Header name={'Confirm Account'} {...this.props} isBack={true} />
        <KeyboardAvoidingView
          style={styles.maincontainer}
          behavior={Platform.OS == 'ios' ? 'padding' : null}>
          <Form style={{alignSelf: 'stretch'}}>
            <Field
              name={'username'}
              component={InputItem}
              label="Username"
              editable={false}
            />
            <Field
              name={'verifyCode'}
              component={InputItem}
              label="Verify Code"
            />
          </Form>
          <Transition shared="authSubmitButton">
            <PrimaryButton
              onPress={this.props.handleSubmit(this.onSubmit.bind(this))}
              loading={this.props.loading}
              text="Confirm"
            />
          </Transition>
          {this.renderError(error)}
          {this.renderError(confirmError)}
          <Text style={styles.noticeLabelStyle}>
            Have you not received E-mail?
          </Text>
          <Button
            bordered
            style={styles.singupButtonStyle}
            onPress={handleSubmit(this.onResend.bind(this))}>
            <Text style={styles.singupButtonLabelStyle}>Resend E-mail</Text>
          </Button>
          {this.renderError(resendError)}
          {this.props.resendSuccess && (
            <Text style={{color: 'green'}}>
              E-mail will be sent immediately.
            </Text>
          )}
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  confirmError: state.auth.confirmError,
  resendSuccess: state.auth.resendSuccess,
  resendError: state.auth.resendError,
  password: state.auth.password,
  loading: state.auth.loading,
});

const connected = connect(
  mapStateToProps,
  {confirm, resend},
)(ConfirmScreen);
export default reduxForm({form: 'signIn'})(connected);
