import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import HeaderPcker from '../components/HeaderPicker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PrimaryButton from '../components/PrimaryButton';

export default class Onboardingnine extends Component {
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
        <Text style={styles.eventtext}>Music & Images</Text>
        <View style={styles.maincontainer}>
          <View style={styles.secondcontainer}>
            <View style={styles.suncontainer}>
              <Text style={styles.nameevent}>Cover Image</Text>
            </View>
            <View
              style={{
                alignSelf: 'center',
                width: 90,
                height: 90,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderStyle: 'dotted',
                borderRadius: 15,
                borderColor: 'rgb(150,150,150)',
                marginLeft: 60,
              }}>
              <AntDesign name="plus" size={20} color={'#ccc'} />
            </View>
          </View>
        </View>
        <View style={styles.maincontainer}>
          <View style={styles.secondcontainer}>
            <View style={styles.subcontainer}>
              <Text style={styles.event}>0</Text>
              <Text style={styles.imagesevent}>Addtional Images</Text>
            </View>
            <View
              style={{
                alignSelf: 'center',
                width: 90,
                height: 90,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderStyle: 'dotted',
                borderRadius: 15,
                borderColor: 'rgb(150,150,150)',
                marginLeft: 25,
              }}>
              <AntDesign name="plus" size={20} color={'#ccc'} />
            </View>
            <View
              style={{
                alignSelf: 'center',
                width: 90,
                height: 90,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderStyle: 'dotted',
                borderRadius: 15,
                borderColor: 'rgb(150,150,150)',
                marginLeft: 10,
              }}>
              <AntDesign name="plus" size={20} color={'#ccc'} />
            </View>
          </View>
        </View>
        <View style={styles.maincontainer}>
          <View style={styles.secondcontainer}>
            <View style={styles.subcontainer}>
              <Text style={styles.event}>0</Text>
              <Text style={styles.imagesevent}>Songs</Text>
            </View>
            <View
              style={{
                alignSelf: 'center',
                width: 90,
                height: 90,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderStyle: 'dotted',
                borderRadius: 15,
                borderColor: 'rgb(150,150,150)',
                marginLeft: 25,
              }}>
              <AntDesign name="plus" size={20} color={'#ccc'} />
            </View>
            <View
              style={{
                alignSelf: 'center',
                width: 90,
                height: 90,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderStyle: 'dotted',
                borderRadius: 15,
                borderColor: 'rgb(150,150,150)',
                marginLeft: 10,
              }}>
              <AntDesign name="plus" size={20} color={'#ccc'} />
            </View>
          </View>
        </View>
        <View style={styles.bottomcontainer}>
          <View style={styles.bottomsubcontainer}>
            <Text style={styles.bottomtextcontainer}>
              Everyone loves pictures,Oh and music?
            </Text>
            <Text style={styles.bottomsubtextcontainer}>
              Every event needs music, Add some!
            </Text>
          </View>
          <TouchableOpacity
            style={styles.subbottomcontainer}
            onPress={() => {
              this.props.navigation.navigate('Onboardingten');
            }}>
            <Text style={{color: '#F6502B'}}>Next:</Text>
            <Text style={{color: '#F6502B'}}>Settings</Text>
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
    alignSelf: 'center',
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
