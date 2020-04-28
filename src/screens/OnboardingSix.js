import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class OnboardingSix extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.labelcontainer}>
          <Text style={styles.text}>Everyone</Text>
          <Text style={styles.text}>Remembers Their</Text>
          <Text style={styles.text}>First</Text>

          <Text style={styles.createeventtext}>
            Create Your First Event Now
          </Text>
          <TouchableOpacity
            style={{alignSelf: 'center'}}
            onPress={() => {
              this.props.navigation.navigate('OnboardingSeven');
            }}>
            <AntDesign name="pluscircle" size={45} color={'#F6502B'} />
          </TouchableOpacity>
        </View>
        <View style={styles.skip}>
          <Text style={styles.skiptext}>Skip</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },

  skip: {
    position: 'absolute',
    bottom: 25,
    alignSelf: 'center',
  },

  skiptext: {
    fontWeight: 'bold',
    color: 'black',
  },
  labelcontainer: {
    position: 'absolute',
    top: 140,
    alignSelf: 'center',
  },
  text: {
    color: '#FB8576',
    fontFamily: 'Avenir',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  createeventtext: {
    marginVertical: 15,
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
