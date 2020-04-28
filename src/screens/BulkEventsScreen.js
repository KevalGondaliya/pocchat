/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
  FlatList,
} from 'react-native';
import {AppStyles} from '../AppStyles';
import Header from '../components/Header';
import TopStatusBar from '../components/TopStatusBar';
import Icon from 'react-native-vector-icons/EvilIcons';
import IconAntd from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';

const SoccerArray = [
  {
    img: require('../../assets/image/7.png'),
    title: 'Soccer Practice',
    date: 'Thu, Aug 30',
    location: 'High Scholl Filed',
  },
  {
    img: require('../../assets/image/7.png'),
    title: 'Soccer Practice',
    date: 'Tue, Sep 7',
    location: 'High Scholl Filed',
  },
  {
    img: require('../../assets/image/7.png'),
    title: 'Soccer Practice',
    date: 'Thu, Sep 9',
    location: 'High Scholl Filed',
  },
  {
    img: require('../../assets/image/7.png'),
    title: 'Soccer Practice',
    date: 'Tue, Sep 13',
    location: 'High Scholl Filed',
  },
  {
    img: require('../../assets/image/7.png'),
    title: 'Soccer Practice',
    date: 'Thu, Sep 15',
    location: 'High Scholl Filed',
  },
];
const BulkEventsScreen = () => {
  return (
    <View style={styles.container}>
      <TopStatusBar />
      <ScrollView>
        <View style={styles.headerCaption}>
          <Text
            style={{
              color: '#FFF',
              position: 'absolute',
              marginHorizontal: 40,
              bottom: 50,
              fontSize: 16,
            }}>
            Invited by Olivia Burgess
          </Text>
        </View>
        <View style={styles.NextEventList}>
          <View style={styles.eventDetail}>
            <Text style={styles.eventTitle}>Soccer Parent Events</Text>
            <View style={{flexDirection: 'row'}}>
              <Icon
                name="calendar"
                color="#F6502B"
                size={20}
                style={{position: 'absolute', top: 5}}
              />
              <Text style={styles.eventDate}>14 Events</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon
                name="location"
                color="#F6502B"
                size={20}
                style={{position: 'absolute', top: 5}}
              />
              <Text style={styles.eventLocation}>Multiple Times</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon
                name="clock"
                color="#F6502B"
                size={20}
                style={{position: 'absolute', top: 5}}
              />
              <Text style={styles.eventLocation}>Multiple Locations</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 35,
            marginVertical: 10,
          }}>
          <IconAntd
            name="checkcircle"
            color={AppStyles.color.filterTitle}
            size={20}
            style={{position: 'absolute'}}
          />
          <View style={{flexDirection: 'row'}}>
            <Text style={{paddingLeft: 30, color: '#8a8a8a', fontSize: 16}}>
              No Conflicts{' '}
            </Text>
            <Text
              style={{paddingHorizontal: 8, color: '#8a8a8a', fontSize: 16}}>
              | calendar
            </Text>
          </View>
        </View>
        <View>
          <FlatList
            data={SoccerArray}
            renderItem={({item}) => (
              <View
                style={{
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  height: 200,
                  borderBottomWidth: 1,
                  borderBottomColor: '#f2f2f2',
                }}>
                <Image
                  source={item.img}
                  style={{margin: 25, width: 120, height: 120}}
                />
                <View>
                  <Text
                    style={{marginTop: 30, fontSize: 20, fontWeight: 'main'}}>
                    {item.title}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      name="location"
                      color="#F6502B"
                      size={20}
                      style={{position: 'absolute', top: 7}}
                    />
                    <Text style={styles.eventLocation}>{item.date}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      name="location"
                      color="#F6502B"
                      size={20}
                      style={{position: 'absolute', top: 7}}
                    />
                    <Text style={styles.eventLocation}>{item.location}</Text>
                  </View>
                  <View
                    style={{
                      width: deviceWidth / 3.7,
                      flexDirection: 'row',
                      paddingHorizontal: 10,
                      position: 'absolute',
                      alignSelf: 'center',
                      top: 280,
                    }}>
                    <View
                      style={{
                        backgroundColor: '#39d567',
                        borderRadius: 25,
                        padding: 15,
                        bottom: 155,
                        marginRight: 10,
                      }}>
                      <TouchableOpacity>
                        <Ionicons
                          name="md-checkmark"
                          size={20}
                          style={{paddingHorizontal: 3}}
                          color={AppStyles.color.white}
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        backgroundColor: '#F6502B',
                        borderRadius: 25,
                        padding: 15,
                        bottom: 155,
                      }}>
                      <TouchableOpacity>
                        <IconEntypo
                          name="cross"
                          size={20}
                          color={AppStyles.color.white}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              backgroundColor: '#39d567',
              borderRadius: 50,
              padding: 20,
              width: 180,
              marginVertical: 30,
              marginHorizontal: 18,
              alignSelf: 'flex-start',
            }}>
            <TouchableOpacity>
              <Text style={{color: '#FFF', textAlign: 'center', fontSize: 20}}>
                Accept All
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: '#F6502B',
              borderRadius: 50,
              padding: 20,
              width: 180,
              marginVertical: 30,
              marginHorizontal: 18,
              alignSelf: 'flex-end',
            }}>
            <TouchableOpacity>
              <Text style={{color: '#FFF', textAlign: 'center', fontSize: 20}}>
                Decline All
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppStyles.color.background,
    flex: 1,
  },
  title: {
    fontFamily: AppStyles.fontName.bold,
    fontWeight: 'bold',
    color: AppStyles.color.title,
    fontSize: 25,
  },
  detailViewEvent: {
    width: deviceWidth / 1.1,
    backgroundColor: AppStyles.color.white,
  },
  upcomingEventButton: {
    width: deviceWidth / 3,
    flexDirection: 'row',
    padding: 7,
    borderRadius: 25,
    backgroundColor: '#e2e2e2',
  },
  eventDetail: {
    width: deviceWidth / 1.4,
    position: 'absolute',
    right: 0,
    bottom: 0,
    marginHorizontal: 45,
    padding: 12,
  },
  viewAllEventsAtyle1: {
    margin: 30,
    backgroundColor: AppStyles.color.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    width: deviceWidth / 1.2,
    height: deviceHeight / 7,
    paddingHorizontal: 30,
    position: 'relative',
    borderRadius: 5,
    borderBottomWidth: 1,
  },
  upcommingEventStyle: {
    backgroundColor: AppStyles.color.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    width: deviceWidth / 1.2,
    height: deviceHeight / 7,
    paddingHorizontal: 30,
    position: 'relative',
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: AppStyles.color.filterTitle,
  },
  NextEventList: {
    backgroundColor: AppStyles.color.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    width: deviceWidth / 1.2,
    height: deviceHeight / 5.5,
    paddingHorizontal: 30,
    marginVertical: 10,
    bottom: 50,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    zIndex: 9999,
    elevation: 3,
    borderRadius: 5,
  },
  cardImage: {
    width: 116,
    height: 116,
    position: 'absolute',
    left: 0,
  },
  eventTitle: {
    fontFamily: AppStyles.fontName.bold,
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 3,
  },
  eventDate: {
    paddingHorizontal: 25,
    fontFamily: AppStyles.fontName.main,
    fontSize: 16,
    paddingVertical: 3,
  },
  eventLocation: {
    paddingHorizontal: 25,
    fontFamily: AppStyles.fontName.main,
    fontSize: 16,
    paddingVertical: 3,
  },
  activityindicatorstyle: {
    alignSelf: 'center',
    marginTop: 10,
  },
  userPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 5,
  },
  headerCaption: {
    height: deviceHeight / 3.5,
    backgroundColor: '#F6502B',
  },
  captionStyle: {
    color: '#FFF',
    fontSize: 36,
    fontFamily: AppStyles.fontName.bold,
    paddingHorizontal: 40,
    paddingTop: 25,
  },
  captionDate: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: AppStyles.fontName.main,
    paddingHorizontal: 40,
  },
  input: {
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
    marginVertical: 10,
  },

  tudo: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  name: {fontSize: 16},
  description: {color: 'rgba(0, 0, 0, .5)'},

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#f7f7f7',
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 15,
  },
  time: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: '#666',
    fontSize: 12,
  },
});

const mapStateToProps = state => ({
  signOutError: state.auth.signOutError,
});
export default BulkEventsScreen;
