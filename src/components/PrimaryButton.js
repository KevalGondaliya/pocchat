import React from 'react';
import {Button, Text, Spinner} from 'native-base';
import styles from '../components/styles';

export default ({onPress, text, loading, buttonStyle, textStyle}) => {
  if (loading) {
    return (
      <Button
        block
        style={[
          styles.primaryButtonStyle,
          {backgroundColor: '#F6502B'},
          buttonStyle,
        ]}>
        <Spinner color="white" size="small" />
      </Button>
    );
  }
  return (
    <Button
      block
      style={[styles.primaryButtonStyle, buttonStyle]}
      onPress={onPress}>
      <Text style={[styles.primaryButtonLabelStyle, textStyle]}>{text}</Text>
    </Button>
  );
};
