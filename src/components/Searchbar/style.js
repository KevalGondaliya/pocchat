import {StyleSheet, Platform, Dimensions} from 'react-native'
let heightRatio = Dimensions.get('window').height;
let widthRatio = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 5,
    marginTop: heightRatio * 0.03,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
          height: 1,
          width: 1,
        },
      },
      android: {
        elevation: 2,
      },
    }),
  },
  input: {
    flex: 1,
    height: heightRatio * 0.03,
    fontSize: 14,
    padding: 0,
    marginLeft: widthRatio * 0.05,
    margin: 10,
  },

  separator: {
    width: widthRatio * 0.001,
    height: heightRatio * 0.05,
    backgroundColor: '#ccc',
  },
});
