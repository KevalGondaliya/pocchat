import React, {Component} from 'react';
import {View, Text, StyleSheet, Switch, TouchableOpacity} from 'react-native';
import HeaderPcker from '../components/HeaderPicker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PrimaryButton from '../components/PrimaryButton';

export default class Onboardingten extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchValue: true,
    };
  }

  toggleSwitch = value => {
    this.setState({switchValue: value});
  };

  componentDidMount() {}

  render() {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <HeaderPcker name={'Create Single Event'} />
        <Text style={styles.eventtext}>Settings</Text>
        <View style={styles.maincontainer}>
          <View style={styles.secondcontainer}>
            <View style={styles.suncontainer}>
              <Text style={styles.nameevent}>Privacy Settings</Text>
            </View>
            <View
              style={{alignSelf: 'center', right: 45, position: 'absolute'}}>
              <Text>All</Text>
            </View>
            <View style={{alignSelf: 'center', right: 5, position: 'absolute'}}>
              <AntDesign name="caretright" size={20} color={'#ccc'} />
            </View>
          </View>
          <View style={styles.bottomline} />
          <View style={styles.secondcontainer}>
            <View style={styles.suncontainer}>
              <Text style={styles.nameevent}>Notifications</Text>
            </View>
            <View
              style={{alignSelf: 'center', right: 45, position: 'absolute'}}>
              <Text>All</Text>
            </View>
            <View style={{alignSelf: 'center', right: 5, position: 'absolute'}}>
              <AntDesign name="caretright" size={20} color={'#ccc'} />
            </View>
          </View>
          <View style={styles.bottomline} />
          <View style={styles.secondcontainer}>
            <View style={styles.suncontainer}>
              <Text style={styles.nameevent}>RSVP</Text>
              <Text style={styles.subtitle}>Ask users to respond</Text>
            </View>
            <View style={{alignSelf: 'center', right: 5, position: 'absolute'}}>
              <Switch
                style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
                onValueChange={this.toggleSwitch}
                value={this.state.switchValue}
              />
            </View>
          </View>
        </View>
        <View style={styles.buttoncontainer}>
          <PrimaryButton text="Send" />
        </View>
        <View style={styles.bottomcontainer}>
          <View style={styles.bottomsubcontainer}>
            <Text style={styles.bottomsubtextcontainer}>
              Lock it down! If you want, set your
            </Text>
            <Text style={styles.bottomCenterLine}>
              security, notification, and RSVP
            </Text>
            <Text style={styles.bottomLastLine}>Settings.</Text>
          </View>
          <TouchableOpacity
            style={styles.subbottomcontainer}
            onPress={() => {
              this.props.navigation.navigate('Home');
            }}>
            <Text style={{color: '#F6502B'}}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  eventtext: {
    marginTop: 20,
    paddingHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 14,
  },
  bottomCenterLine: {
    color: '#fff',
    marginVertical: 5,
    letterSpacing: 1.5,
    fontSize: 16,
    alignSelf: 'center',
  },
  bottomLastLine: {
    color: '#fff',
    marginVertical: 5,
    letterSpacing: 1.5,
    fontSize: 16,
    alignSelf: 'center',
  },
  subbottomcontainer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignSelf: 'center',
  },
  bottomcontainer: {
    backgroundColor: 'black',
    flex: 1,
  },
  bottomsubtextcontainer: {
    color: '#fff',
    marginVertical: 5,
    marginTop: 30,
    paddingHorizontal: 50,
    letterSpacing: 1.5,
    fontSize: 16,
    alignSelf: 'center',
  },

  buttoncontainer: {
    marginVertical: 20,
  },

  maincontainer: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 10,
  },

  nameevent: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  bottomline: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 15,
  },

  secondcontainer: {
    flexDirection: 'row',
  },

  suncontainer: {
    flexDirection: 'column',
  },
});
