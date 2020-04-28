import {StyleSheet} from 'react-native';

const colors = {
  gray: '#ABB8C3',
  vivid: '#E91E63',
};

export default StyleSheet.create({
  noticeLabelStyle: {
    color: colors.gray,
    marginBottom: 10,
    marginTop: 10,
  },
  labelStyle: {
    color: colors.gray,
  },
  container: {
    flex: 1,
  },
  inputItemStyle: {
    borderBottomColor: colors.vivid,
  },

  maincontainer: {
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 15,
    shadowColor: '#aaa',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 3,
    marginTop: 10,
  },
  singupButtonStyle: {
    borderColor: colors.vivid,
    marginTop: 10,
    width: '45%',
  },
  singupButtonLabelStyle: {
    color: colors.vivid,
  },
});
