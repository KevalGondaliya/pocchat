import React, {Component} from 'react';
import {View, Text, StyleSheet, Switch, TouchableOpacity} from 'react-native';
import HeaderPcker from '../components/HeaderPicker';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class OnboardingSeven extends Component {
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
        <Text style={styles.eventtext}>Event Details</Text>
        <View style={styles.maincontainer}>
          <Text style={styles.nameevent}>Event Name</Text>
          <View style={styles.bottomline} />
          <View style={styles.secondcontainer}>
            <View style={styles.suncontainer}>
              <Text style={styles.nameevent}>August 2, 2018</Text>
              <Text style={styles.subtitle}>7:00 pm - 10:00 pm</Text>
            </View>
            <View style={{alignSelf: 'center', right: 5, position: 'absolute'}}>
              <AntDesign name="caretright" size={20} color={'#ccc'} />
            </View>
          </View>
          <View style={styles.bottomline} />
          <View style={styles.secondcontainer}>
            <View style={styles.suncontainer}>
              <Text style={styles.nameevent}>Starbucks</Text>
              <Text style={styles.subtitle}>5911Oakland Dr.</Text>
              <Text style={styles.subtitle}>Los Angeles,CA 90210</Text>
            </View>
            <View style={{alignSelf: 'center', right: 5, position: 'absolute'}}>
              <AntDesign name="caretright" size={20} color={'#ccc'} />
            </View>
          </View>
          <View style={styles.bottomline} />
          <View style={styles.secondcontainer}>
            <View style={styles.suncontainer}>
              <Text style={styles.nameevent}>Booking</Text>
              <Text style={styles.subtitle}>Is venue booked?</Text>
            </View>
            <View style={{alignSelf: 'center', right: 5, position: 'absolute'}}>
              <Switch
                style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
                onValueChange={this.toggleSwitch}
                value={this.state.switchValue}
              />
            </View>
          </View>
          <View style={styles.bottomline} />
          <View style={styles.secondcontainer}>
            <View style={styles.suncontainer}>
              <Text style={styles.nameevent}>Message</Text>
              <Text style={styles.subtitle}>Describe this event</Text>
            </View>
            <View style={{alignSelf: 'center', right: 5, position: 'absolute'}}>
              <AntDesign name="caretright" size={20} color={'#ccc'} />
            </View>
          </View>
        </View>
        <View style={styles.bottomcontainer}>
          <View style={styles.bottomsubcontainer}>
            <Text style={styles.bottomtextcontainer}>
              Fill out the key event details.
            </Text>
            <Text style={styles.bottomsubtextcontainer}>What,When,Where?</Text>
          </View>
          <TouchableOpacity
            style={styles.subbottomcontainer}
            onPress={() => {
              this.props.navigation.navigate('Onboardingeight');
            }}>
            <Text style={{color: '#F6502B'}}>Next:</Text>
            <Text style={{color: '#F6502B'}}>Guests</Text>
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

  subbottomcontainer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignSelf: 'center',
  },

  maincontainer: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 10,
  },

  bottomcontainer: {
    backgroundColor: 'black',
    flex: 1,
  },

  bottomsubcontainer: {
    flexDirection: 'column',
    alignSelf: 'center',
  },

  bottomtextcontainer: {
    marginVertical: 30,
    color: '#fff',
    fontSize: 16,
  },

  bottomsubtextcontainer: {
    color: '#fff',
    fontSize: 16,
    alignSelf: 'center',
    bottom: 20,
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

  suntitle: {
    color: '#ccc',
  },

  secondcontainer: {
    flexDirection: 'row',
  },

  suncontainer: {
    flexDirection: 'column',
  },
});
