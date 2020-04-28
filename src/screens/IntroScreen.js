import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Swiper from '../components/Swiper';

export default class IntroScreen extends Component {
  render() {
    return (
      <Swiper navigation={this.props.navigation}>
        <View style={styles.slide}>
          <Icon name="md-lock" {...iconStyles} />
          <Text style={styles.header}>Secure Data</Text>
          <Text style={styles.text}>
             Your pics.Your life.As private as  you  want and owned  and controlled  by you
          </Text>
        </View>

        <View style={styles.slide}>
          <Icon name="md-share" {...iconStyles} />
          <Text style={styles.header}>Bringing Everone Together</Text>
          <Text style={styles.text}>
            Make plans, invite friedns , share the sights and sounds with those
            who can't be there. UrTime brings everyone together.
          </Text>
        </View>

        <View style={styles.slide}>
        <AntDesign name="calendar" {...iconStyles} />
          <Text style={styles.header}>Make Life Easier</Text>
          <Text style={styles.text}>
            Easily manage all the different events and groups in your life -
            work, family, school, social and where you need to be and bring - so
            you can get on which enjoying.
          </Text>
        </View>

        <View>
          <TouchableOpacity onPress={
            () => { 
            this.props.navigation.navigate('OnboardingSix') 
          }} style={styles.slide}>
         <AntDesign name="banckward" {...iconStyles} />
          <Text style={styles.header}>Reminisce</Text>
          <Text style={styles.text}>
            Look back and remember the 21st birthday with friend. Listen to the
            music from your Engagement Party.
          </Text>
          <Text style={styles.text}>
            With UrTime ,Share and relive memories with those closet to you.
          </Text>
          </TouchableOpacity>
         
        </View>
      </Swiper>
    );
  }
}
const iconStyles = {
  size: 40,
  color: '#FFFFFF',
};
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 140,
  },

  header: {
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    fontSize: 35,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },

  text: {
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    fontSize: 18,
    marginHorizontal: 36,
    textAlign: 'center',
  },
});
