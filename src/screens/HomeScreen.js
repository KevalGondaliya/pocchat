/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  AsyncStorage,
  BackHandler,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {AppStyles} from '../AppStyles';
import {API, graphqlOperation} from 'aws-amplify';
import {connect} from 'react-redux';
import Header from '../components/Header';
import {signOut} from '../actions';
import TopStatusBar from '../components/TopStatusBar';
import Searchbar from '../components/Searchbar/Searchbar';
import * as queries from '../graphql/queries';
import _ from 'lodash';
import * as subscriptions from '../graphql/subscriptions';
import BulkEventsScreen from '../screens/BulkEventsScreen';
import moment from 'moment';
const nextEvent = [
  {
    image: require('../../assets/image/2.png'),
    title: 'Road Trip - Big Sur',
    date: 'Tomorrow, Aug 29',
    location: "Emily's House",
  },
];

const upComingEvent = [
  {
    image: require('../../assets/image/9.png'),
    title: "Olivia's Spectacular 28th Birthday Party",
    date: 'Aug 30 - Aug 29',
    location: "Olivia's House",
  },
  {
    image: require('../../assets/image/3.png'),
    title: 'LA City Art Museum Party',
    date: 'sat, sep 2',
    location: 'La City Art Museum',
  },
];

const viewAllEvent = [
  {
    image: require('../../assets/image/4.png'),
    title: 'Soccer Parents Events',
    events: '14 Events',
    email: 'Invited by Olivia Burgess',
  },
  {
    image: require('../../assets/image/2.png'),
    title: 'Road Trip - Big Sur',
    date: 'Thur, Aug 28 - Sun, Aug 31',
    location: "Mellissa's House",
  },
];

const extraEvents = [
  {
    image: require('../../assets/image/4.png'),
    title: 'Lunar Eclipse 2018',
    events: 'Aug 28 - Aug 31',
    location: 'La Observatory',
    email: 'Invited by Olivia Burgess',
  },
  {
    image: require('../../assets/image/5.png'),
    title: 'City Concert',
    date: 'Tues, Sep 14, 2019',
    location: 'Kodak Theatre',
  },
];

const eventType = [
  {type: 1, name: 'Hosted Events'},
  {type: 2, name: 'Guest Events'},
  {type: 3, name: 'Private Events'},
  {type: 4, name: 'Work'},
  {type: 5, name: 'Social'},
  {type: 6, name: 'Family'},
];

class HomeScreen extends React.Component {
  async componentWillUnmount() {
    if (this.subscriptionsNewMessage) {
      console.log('Unsubcribe ..');
      this.subscriptionsNewMessage.unsubscribe();
    }
  }
  async attchSub() {
    this.subscription = API.graphql(
      graphqlOperation(subscriptions.onCreateMessage),
    ).subscribe({
      next: mesagedata => {
        const newMessage = mesagedata.value.data.onCreateMessage;
        console.log('************** home screen sub message start');
        console.log(newMessage.messageConversationId);
        console.log(newMessage.content);
        this.getConvoLinkWithLastMessage();
      },
    });
  }
  static navigationOptions = ({navigation}) => ({
    header: null,
  });

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      users: [],
      visible: false,
      value: '',
      refreshing: false,
      Convonestion: [],
      isModalVisible: false,
      visibleEvent: false,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  upComingEventtoggleModal = () => {
    this.setState({visibleEvent: !this.state.visibleEvent});
  };

  handleBackButtonClick() {
    console.log('Props  Navigation', this.props.navigation);
    if (this.props.navigation.isFocused()) {
      BackHandler.exitApp();
    }
  }

  onChangeText = (key, val) => {
    this.setState({[key]: val});
  };

  onRefresh = async () => {
    this.setState({refreshing: true});
    try {
      const login = await AsyncStorage.getItem('login');
      console.log(login);
      const users = await API.graphql(graphqlOperation(queries.listUsers));
      this.getConvoLinkWithLastMessage();
      this.setState({
        users: users.data.listUsers.items.filter(x => x.id != login),
        refreshing: false,
      });
    } catch (err) {
      this.setState({
        refreshing: false,
      });
    }
  };

  async getConvoLinkWithLastMessage() {
    const login = await AsyncStorage.getItem('login');
    const listConvoLinks = await API.graphql(
      graphqlOperation(queries.listConvoLinks),
    );
    let login_user_listConvoLinks = listConvoLinks.data.listConvoLinks.items
      .filter(x => x.convoLinkUserId == login)
      .map(x => x.convoLinkConversationId);
    let other_user_listConvoLinks = listConvoLinks.data.listConvoLinks.items.filter(
      x =>
        x.convoLinkUserId != login &&
        login_user_listConvoLinks.includes(x.convoLinkConversationId),
    );
    if (other_user_listConvoLinks.length > 0) {
      this.state.users.forEach((item, index) => {
        const ids = other_user_listConvoLinks
          .filter(x => x.convoLinkUserId == item.id)
          .map(x => x.convoLinkConversationId);
        console.log(ids);
        if (ids.length > 0 && ids[0] != null) {
          item.conversationId = ids[0];
        }
      });

      this.setState({users: this.state.users});
      const listMessages = await API.graphql(
        graphqlOperation(queries.listMessages),
      );

      console.log('listMesssages', listMessages);

      if (listMessages.data.listMessages.items.length > 0) {
        const messages = listMessages.data.listMessages.items
          .filter(x =>
            login_user_listConvoLinks.includes(x.messageConversationId),
          )
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        console.log('Message ', messages);
        this.state.users.forEach((item, index) => {
          if (item.conversationId != null) {
            console.log(item.conversationId);
            const ids = messages.filter(
              x => x.messageConversationId == item.conversationId,
            );

            if (ids.length > 0) {
              item.message = ids[0];
            }
          }
        });

        this.setState({users: this.state.users});
      }
    }
  }
  async componentDidMount() {
    this.attchSub();
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    this.setState({
      visible: true,
    });
    try {
      const login = await AsyncStorage.getItem('login');
      const users = await API.graphql(graphqlOperation(queries.listUsers));
      this.getConvoLinkWithLastMessage();
      this.setState({
        users: users.data.listUsers.items.filter(x => x.id != login),
        allUsers: users.data.listUsers.items.filter(x => x.id != login),
        visible: false,
      });
      console.log('Usres List', this.state.users);
    } catch (err) {
      console.log(err);
      this.setState({
        visible: false,
      });
    }
  }

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });
    let fliterUser = this.state.allUsers.filter(function(item) {
      const itemData = `${item.username}`.toLowerCase();
      const textData = text.toLowerCase();
      return itemData.includes(textData);
    });
    this.setState({users: fliterUser});
  };

  getLastMessageDate = dateStr => {
    console.log(dateStr);
    let date = new Date(dateStr);
    var today = moment();
    var yesterday = moment().subtract(1, 'day');

    if (moment(dateStr).isSame(today, 'day')) {
      console.log('Message date:', this.formatAMPM(date));
      return this.formatAMPM(date);
    } else if (moment(dateStr).isSame(yesterday, 'day')) {
      console.log('Message date:', 'Yesterday');
      return 'Yesterday';
    } else {
      var dd = date.getDate();
      var mm = date.getMonth() + 1;

      var yyyy = date.getFullYear();
      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      console.log('Message date:', dd + '/' + mm + '/' + yyyy);
      return dd + '/' + mm + '/' + yyyy;
    }
  };
  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  render() {
    return (
      <View style={styles.container}>
        <TopStatusBar />
        <ScrollView>
          <Header
            headerLogo={require('../../assets/image/logo.png')}
            profileImg={require('../../assets/image/profileImg.png')}
            menu={require('../../assets/image/menu.png')}
            showRightIcon
            {...this.props}
          />
          <View style={styles.headerCaption}>
            <Text style={styles.captionStyle}>Hello</Text>
            <Text style={styles.captionDate}>
              Aug 28, 2019 | 2 New Invitation
            </Text>
            <Text
              style={{
                color: '#FFF',
                position: 'absolute',
                marginHorizontal: 40,
                marginTop: 140,
              }}>
              Next Event
            </Text>
          </View>
          <View style={styles.NextEventList}>
            <Image style={styles.cardImage} source={nextEvent[0].image} />
            <View style={styles.eventDetail}>
              <Text style={styles.eventTitle}>{nextEvent[0].title}</Text>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name="calendar"
                  color="#F6502B"
                  size={20}
                  style={{position: 'absolute', top: 5}}
                />
                <Text style={styles.eventDate}>{nextEvent[0].date}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name="location"
                  color="#F6502B"
                  size={20}
                  style={{position: 'absolute', top: 5}}
                />
                <Text style={styles.eventLocation}>
                  {nextEvent[0].location}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{marginHorizontal: 40, position: 'relative', bottom: 50}}>
            <Modal
              isVisible={this.state.visibleEvent}
              onBackdropPress={() =>
                this.setState({visibleEvent: !this.state.visibleEvent})
              }>
              <View style={{borderRadius: 20}}>
                <FlatList
                  data={eventType}
                  renderItem={({item}) => (
                    <View
                      style={{
                        backgroundColor: '#FFF',
                        padding: 20,
                      }}>
                      <Text>{item.name}</Text>
                    </View>
                  )}
                />
              </View>
            </Modal>
            <TouchableOpacity onPress={this.upComingEventtoggleModal}>
              <View style={styles.upcomingEventButton}>
                <Text style={{color: '#404040'}}>Upcoming Events</Text>
                <Ionicons
                  name="md-arrow-dropdown"
                  color="#404040"
                  size={20}
                  style={{paddingHorizontal: 10, marginTop: 1}}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <Modal
              isVisible={this.state.isModalVisible}
              onBackdropPress={() =>
                this.setState({isModalVisible: !this.state.isModalVisible})
              }>
              <View style={styles.detailViewEvent}>
                <Image
                  style={{alignSelf: 'center', width: 393, height: 200}}
                  source={require('../../assets/image/9.png')}
                />
                <View style={{margin: 20}}>
                  <Text style={{fontSize: 22, fontFamily: 'Roboto'}}>
                    Olivia's Spectacular 28th Birthday Party
                  </Text>
                  <View
                    style={{
                      marginVertical: 10,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Icon
                        name="calendar"
                        color="#F6502B"
                        size={17}
                        style={{position: 'absolute', top: 5}}
                      />
                      <Text style={styles.eventDate}>Tuseday, Aug 2, 2019</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Icon
                        name="clock"
                        color="#F6502B"
                        size={17}
                        style={{position: 'absolute', top: 5}}
                      />
                      <Text style={styles.eventDate}>7:00pm - 10:00pm</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Icon
                        name="location"
                        color="#F6502B"
                        size={17}
                        style={{position: 'absolute', top: 5}}
                      />
                      <Text style={styles.eventDate}>Olivia's House</Text>
                    </View>
                    <View
                      style={{
                        marginTop: 20,
                        borderWidth: 1,
                        backgroundColor: 'red',
                        borderColor: AppStyles.color.background,
                      }}
                    />
                  </View>
                  <View>
                    <Text style={{fontFamily: 'Avenir', fontSize: 18}}>
                      Address
                    </Text>
                    <View style={{marginVertical: 10}}>
                      <Text>11647 San Vicente Bvld</Text>
                      <Text>Los Angeles, CA 90049</Text>
                    </View>
                    <View
                      style={{
                        marginTop: 20,
                        borderWidth: 1,
                        backgroundColor: 'red',
                        borderColor: AppStyles.color.background,
                      }}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontFamily: 'Avenir',
                        fontSize: 18,
                        marginTop: 10,
                      }}>
                      Message
                    </Text>
                    <Text>
                      we'er celebrating Olivia'a arrival on earth 28 years ago!
                      can't wait to see everyone!
                    </Text>
                    <View
                      style={{
                        marginTop: 20,
                        borderWidth: 1,
                        backgroundColor: 'red',
                        borderColor: AppStyles.color.background,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Avenir',
                        fontSize: 16,
                        marginTop: 10,
                      }}>
                      Invited By Olivia Burgess
                    </Text>
                    <View
                      style={{
                        marginTop: 10,
                        backgroundColor: '#6600cc',
                        width: 70,
                        borderRadius: 20,
                      }}>
                      <TouchableOpacity>
                        <Text style={{alignSelf: 'center', color: '#fff'}}>
                          social
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
            <TouchableOpacity onPress={this.toggleModal}>
              <View style={[styles.upcommingEventStyle, {marginBottom: 40}]}>
                <Image
                  style={styles.cardImage}
                  source={upComingEvent[0].image}
                />
                <View style={styles.eventDetail}>
                  <Text style={styles.eventTitle}>
                    {upComingEvent[0].title}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      name="calendar"
                      color="#F6502B"
                      size={20}
                      style={{position: 'absolute', top: 5}}
                    />
                    <Text style={styles.eventDate}>
                      {upComingEvent[0].date}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      name="location"
                      color="#F6502B"
                      size={20}
                      style={{position: 'absolute', top: 5}}
                    />
                    <Text style={styles.eventLocation}>
                      {upComingEvent[0].location}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <View
              style={{
                width: deviceWidth / 1.2,
                alignSelf: 'center',
                position: 'absolute',
                top: 135,
                borderBottomWidth: 1,
                borderBottomColor: '#E8E8E8',
              }}
            />
            <TouchableOpacity>
              <View style={[styles.upcommingEventStyle]}>
                <Image
                  style={styles.cardImage}
                  source={upComingEvent[1].image}
                />
                <View style={styles.eventDetail}>
                  <Text style={styles.eventTitle}>
                    {upComingEvent[1].title}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      name="calendar"
                      color="#F6502B"
                      size={20}
                      style={{position: 'absolute', top: 5}}
                    />
                    <Text style={styles.eventDate}>
                      {upComingEvent[1].date}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      name="location"
                      color="#F6502B"
                      size={20}
                      style={{position: 'absolute', top: 5}}
                    />
                    <Text style={styles.eventLocation}>
                      {upComingEvent[1].location}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 50,
              borderTopWidth: 4,
              borderTopColor: '#F6502B',
              borderBottomWidth: 4,
              borderBottomColor: '#F6502B',
            }}>
            <View style={{backgroundColor: AppStyles.color.background}}>
              <View style={[styles.viewAllEventsAtyle1]}>
                <Image
                  style={styles.cardImage}
                  source={viewAllEvent[0].image}
                />
                <View style={styles.eventDetail}>
                  <Text style={styles.eventTitle}>{viewAllEvent[0].title}</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      name="calendar"
                      color="#F6502B"
                      size={20}
                      style={{position: 'absolute', top: 5}}
                    />
                    <Text style={styles.eventDate}>
                      {viewAllEvent[0].events}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      name="location"
                      color="#F6502B"
                      size={20}
                      style={{position: 'absolute', top: 5}}
                    />
                    <Text style={styles.eventLocation}>
                      {viewAllEvent[0].email}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View
              style={{
                backgroundColor: AppStyles.color.white,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.32,
                shadowRadius: 5.46,

                elevation: 9,
              }}>
              <View style={[styles.viewAllEventsAtyle1]}>
                <Image
                  style={styles.cardImage}
                  source={viewAllEvent[1].image}
                />
                <View style={styles.eventDetail}>
                  <Text style={styles.eventTitle}>{viewAllEvent[1].title}</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      name="calendar"
                      color="#F6502B"
                      size={20}
                      style={{position: 'absolute', top: 5}}
                    />
                    <Text style={styles.eventDate}>{viewAllEvent[1].date}</Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      name="location"
                      color="#F6502B"
                      size={20}
                      style={{position: 'absolute', top: 5}}
                    />
                    <Text style={styles.eventLocation}>
                      {viewAllEvent[1].location}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: '#F6502B',
                  borderRadius: 25,
                  padding: 10,
                  width: 100,
                  bottom: 155,
                  position: 'absolute',
                  alignSelf: 'center',
                }}>
                <TouchableOpacity
                  onPress={this.props.navigation.navigate('BulkEventsScreen')}>
                  <Text style={{color: '#FFF', textAlign: 'center'}}>
                    View All
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
            <View style={{backgroundColor: AppStyles.color.background}}>
              <View style={[styles.viewAllEventsAtyle1]}>
                <Image style={styles.cardImage} source={extraEvents[0].image} />
                <View style={styles.eventDetail}>
                  <Text style={styles.eventTitle}>{extraEvents[0].title}</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      name="calendar"
                      color="#F6502B"
                      size={20}
                      style={{position: 'absolute', top: 5}}
                    />
                    <Text style={styles.eventDate}>
                      {extraEvents[0].events}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      name="location"
                      color="#F6502B"
                      size={20}
                      style={{position: 'absolute', top: 5}}
                    />
                    <Text style={styles.eventLocation}>
                      {extraEvents[0].email}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View
              style={{
                backgroundColor: AppStyles.color.white,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.32,
                shadowRadius: 5.46,

                elevation: 9,
              }}>
              <View style={[styles.viewAllEventsAtyle1]}>
                <Image style={styles.cardImage} source={extraEvents[1].image} />
                <View style={styles.eventDetail}>
                  <Text style={styles.eventTitle}>{extraEvents[1].title}</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      name="calendar"
                      color="#F6502B"
                      size={20}
                      style={{position: 'absolute', top: 5}}
                    />
                    <Text style={styles.eventDate}>{extraEvents[1].date}</Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      name="location"
                      color="#F6502B"
                      size={20}
                      style={{position: 'absolute', top: 5}}
                    />
                    <Text style={styles.eventLocation}>
                      {extraEvents[1].location}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: deviceWidth / 3.7,
                  marginTop: 135,
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  position: 'absolute',
                  alignSelf: 'center',
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
                    <IconEntypo name="cross" color={AppStyles.color.white} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
    width: deviceWidth / 2.1,
    position: 'absolute',
    right: 0,
    marginHorizontal: 30,
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
    height: deviceHeight / 7,
    paddingHorizontal: 30,
    marginVertical: 10,
    position: 'relative',
    bottom: 70,
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
    fontSize: 16,
    paddingVertical: 3,
  },
  eventDate: {
    paddingHorizontal: 25,
    fontFamily: AppStyles.fontName.main,
    fontSize: 14,
    paddingVertical: 3,
  },
  eventLocation: {
    paddingHorizontal: 25,
    fontFamily: AppStyles.fontName.main,
    fontSize: 14,
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

export default connect(
  mapStateToProps,
  {signOut},
)(HomeScreen);
