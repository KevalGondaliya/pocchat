import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import HeaderPcker from '../components/HeaderPicker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

export default class Onboardingeight extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <HeaderPcker name={'Create Single Event'} />
        <Text style={styles.eventtext}>Guests</Text>
        <View style={styles.maincontainer}>
          <View style={styles.secondcontainer}>
            <View style={styles.suncontainer}>
              <Text style={styles.nameevent}>0</Text>
              <Text style={styles.subtitle}>People Invited</Text>
            </View>
            <View style={{alignSelf: 'center', right: 5, position: 'absolute'}}>
              <EvilIcons name="user" size={50} color={'#ccc'} />
            </View>
          </View>
        </View>
        <Text style={styles.eventtext}>Tasks</Text>
        <View style={styles.maincontainer}>
          <View style={styles.secondcontainer}>
            <View style={styles.suncontainer}>
              <Text style={styles.nameevent}>4</Text>
              <Text style={styles.subtitle}>Tasks Created</Text>
            </View>
            <View style={{alignSelf: 'center', right: 5, position: 'absolute'}}>
              <AntDesign name="caretright" size={20} color={'#ccc'} />
            </View>
          </View>
        </View>
        <View style={styles.bottomcontainer}>
          <View style={styles.bottomsubcontainer}>
            <Text style={styles.bottomtextcontainer}>
              Who lucky enough to get the
            </Text>
            <Text style={styles.bottomsubtextcontainer}>
              invite?Any tasks for those folks?
            </Text>
          </View>
          <TouchableOpacity
            style={styles.subbottomcontainer}
            onPress={() => {
              this.props.navigation.navigate('Onboardingnine');
            }}>
            <Text style={{color: '#F6502B'}}>Next:</Text>
            <Text style={{color: '#F6502B'}}>Music & Images</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottomcontainer: {
    backgroundColor: 'black',
    flex: 1,
  },

  bottomsubtextcontainer: {
    color: '#fff',
    fontSize: 16,
    alignSelf: 'center',
    bottom: 20,
  },

  subbottomcontainer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 15,
  },

  bottomtextcontainer: {
    marginVertical: 30,
    color: '#fff',
    fontSize: 16,
  },

  bottomsubcontainer: {
    flexDirection: 'column',
    alignSelf: 'center',
  },

  eventtext: {
    marginTop: 10,
    paddingHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 14,
  },

  maincontainer: {
    backgroundColor: 'white',
    padding: 15,
    marginTop: 10,
  },

  secondcontainer: {
    flexDirection: 'row',
  },

  suncontainer: {
    flexDirection: 'column',
    alignSelf: 'center',
    flex: 0.3,
  },

  subcontainer: {
    flexDirection: 'column',
    alignSelf: 'center',
    flex: 0.8,
  },

  nameevent: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  imagecontainer: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  event: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
