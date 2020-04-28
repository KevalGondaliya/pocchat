import React, {Component} from 'react';
import {View} from 'react-native';

export default class StartUpScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      console.log('routing chnges');
      this.props.navigation.navigate('OnboardingStack');
    }, 2500);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F6502B',
        }}
      />
    );
  }
}
