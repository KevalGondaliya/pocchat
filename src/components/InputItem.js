import React from 'react';
import {Item, Input, Label, Text} from 'native-base';
import styles from '../components/styles';

export default (props) => {
  const {
    input,
    label,
    type,
    meta: {touched, error, warning},
    ...inputProps
  } = props;
  var hasError = false;
  if (error !== undefined) {
    hasError = true;
  }
  return (
    <React.Fragment>
      <Item stackedLabel style={styles.inputItemStyle} error={hasError}>
        <Label style={styles.labelStyle}>{label}</Label>
        <Input {...input} {...inputProps} />
      </Item>
      {hasError ? (
        <Text style={{color: 'red', marginTop: 4, marginLeft: 15}}>
          {error}
        </Text>
      ) : (
        <Text />
      )}
    </React.Fragment>
  );
};
