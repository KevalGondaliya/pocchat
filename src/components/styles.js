import {StyleSheet} from 'react-native';
import {AppStyles} from '../AppStyles';

const colors = {
  gray: '#ABB8C3',
  vivid: '#E91E63',
};

export default StyleSheet.create({
  noticeLabelStyle: {
    color: colors.gray,
    marginBottom: 10,
  },
  labelStyle: {
    color: colors.gray,
  },
  inputItemStyle: {
    borderBottomColor: colors.vivid,
  },
  singupButtonStyle: {
    borderColor: colors.vivid,
    marginTop: 10,
  },
  singupButtonLabelStyle: {
    color: colors.vivid,
  },

  primaryButtonStyle: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: '#F6502B',
    borderRadius: AppStyles.borderRadius.small,
    padding: 20,
    marginTop: 10,
    alignSelf: 'center',
  },
  primaryButtonLabelStyle: {
    color: 'white',
  },
  subButtonStyle: {
    borderColor: '#E91E63',
    marginTop: 10,
  },
  subButtonLabelStyle: {
    color: '#E91E63',
  },
});
