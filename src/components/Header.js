import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {AppStyles} from '../AppStyles';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function Header(props) {
  return (
    <SafeAreaView style={{}}>
      <View style={styles.container}>
        <View style={styles.headerStyle}>
          <View style={styles.profileImg}>
            <Image source={props.profileImg} style={styles.headerLogo} />
          </View>
          <View style={styles.logoStyle}>
            <Image source={props.headerLogo} style={styles.headerLogo} />
          </View>
          <View style={styles.menustyle}>
            <Image source={props.menu} style={styles.headerLogo} />
          </View>
        </View>
        {/* <View style={{width: 50, flexDirection: 'row'}}>
          {props.isBack ? (
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={{width: 70, paddingHorizontal: 10}}>
              <Ionicons name="ios-arrow-round-back" size={40} color="white" />
            </TouchableOpacity>
          ) : null}
        </View> */}
        {/*         
        {props.showRightIcon ? (
          <TouchableOpacity
            onPress={() => {
              Alert.alert('Poc-Chat', 'Are you sure you want to Logout?', [
                {
                  text: 'Cancel',
                  onPress: () => null,
                  style: 'cancel',
                },
                {text: 'YES', onPress: () => props.signOut(props.navigation)},
              ]);
            }}
            style={{flex: 0.1}}>
            <SimpleLineIcons name="logout" size={20} color="white" />
          </TouchableOpacity>
        ) : (
          <View />
        )} */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: deviceWidth / 1,
    flexDirection: 'row',
    height: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
    backgroundColor: AppStyles.color.white,
  },
  icon: {height: 20, width: 20, resizeMode: 'contain', marginHorizontal: 10},
  txt: {
    fontSize: AppStyles.fontSize.content,
    color: 'white',
  },
  profileImg: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    right: 0,
    left: 0,
    width: deviceWidth / 1,
    paddingHorizontal: 15,
    position: 'absolute',
  },
  logoStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    left: 0,
    width: deviceWidth / 1,
    position: 'absolute',
    paddingHorizontal: 5,
  },
  menustyle: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    right: 0,
    left: 0,
    width: deviceWidth / 1,
    position: 'absolute',
    paddingHorizontal: 15,
  },
  headerStyle: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  headerLogo: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginBottom: 30,
  },
});
