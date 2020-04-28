import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ListView from 'deprecated-react-native-listview';
import {AppStyles} from '../AppStyles';
import {API, graphqlOperation} from 'aws-amplify';
import TopStatusBar from '../components/TopStatusBar';
const {width, height} = Dimensions.get('window');
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
import {
  createMessage,
  createConvoLink,
  createConversation,
} from '../graphql/mutations';
import * as queries from '../graphql/queries';
import * as subscriptions from '../graphql/subscriptions';

const EachMsg = props => {
  console.log('Each Message', props);
  if (props.userLoginId === props.messageUserId) {
    return (
      <View style={styles.eachMsg}>
        <View style={styles.msgBlock}>
          <Text style={styles.msgTxt}>{props.content}</Text>
          <Text style={{alignSelf: 'flex-end'}}>{props.lastSeen}</Text>
        </View>
      </View>
    );
  }
  return (
    <View>
      <View style={styles.rightMsg}>
        <View style={styles.rightBlock}>
          <Text style={styles.rightTxt}>{props.content}</Text>
          <Text style={{alignSelf: 'flex-end'}}> {props.lastSeen}</Text>
        </View>
      </View>
    </View>
  );
};

class Chatview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows([]),
      msg: '',
      username: '',
      userId: '',
      messageconvoid: '',
      convoResponse: [],
      userLoginId: '',
      userProfileName: '',
      messageList: [],
    };
    this.send = this.send.bind(this);
    this.reply = this.reply.bind(this);
  }
  async componentWillUnmount() {
    if (this.subscriptionsNewMessage) {
      console.log('Unsubcribe ..');
      this.subscriptionsNewMessage.unsubscribe();
    }
  }
  getLastMessageDate = dateStr => {
    let date = new Date(dateStr);
    console.log('date', date);

    var seconds = Math.floor((new Date() - date) / 1000);
    console.log(seconds);
    var interval = Math.floor(seconds / 31536000);
    console.log(seconds);

    if (interval == 0) {
      console.log('Message date:', this.formatAMPM(date));
      return this.formatAMPM(date);
    } else if (interval == 1) {
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
  async attchSub() {
    this.subscription = API.graphql(
      graphqlOperation(subscriptions.onCreateMessage),
    ).subscribe({
      next: mesagedata => {
        const newMessage = mesagedata.value.data.onCreateMessage;
        console.log('Login userID ', this.state.userLoginId);
        console.log('other user id ', this.state.userId);
        if (newMessage.messageConversationId === this.state.messageconvoid) {
          console.log('************** sub message start');
          console.log('new Message', newMessage);
          this.state.messageList.unshift(newMessage);
          this.setState({
            dataSource: ds.cloneWithRows(this.state.messageList),
            msg: '',
          });
          console.log(
            '************** sub message end',
            this.state.dataSource,
            this.state.msg,
          );
        }
      },
    });
  }
  async componentDidMount() {
    this.attchSub();
    const loginname = await AsyncStorage.getItem('loginname');
    console.log('=== Username', loginname);
    this.setState({
      userProfileName: loginname,
    });
    AsyncStorage.getItem('users').then(users => {
      let Users = JSON.parse(users);
      console.log('Users id', Users);
      if (Users.conversationId && Users.conversationId.length > 0) {
        this.setState(
          {
            userId: Users.id,
            username: Users.username,
            messageconvoid: Users.conversationId,
          },
          () => {
            this.loadMessageList();
          },
        );
      } else {
        console.log('something else');
        this.setState(
          {
            userId: Users.id,
            username: Users.username,
          },
          () => {
            this.createConver();
          },
        );
      }
    });

    this.convoLink();
  }

  async convoLink() {
    const login = await AsyncStorage.getItem('login');
    console.log('=== login', login);
    this.setState({
      userLoginId: login,
    });
    console.log('UserLoginiD', this.state.userLoginId);
  }

  getNextMessageList = async token => {
    const listMessages = await API.graphql(
      graphqlOperation(queries.listMessages, {
        filter: {
          messageConversationId: {
            eq: this.state.messageconvoid,
          },
        },
        limit: 1000,
        nextToken: token || null,
      }),
    );
    console.log('getMessageList', listMessages);
    if (token) {
      console.log('token', token);
      this.getNextMessageList(listMessages.data.listMessages.nextToken);
    } else {
    }
    console.log('listMessages with next token', listMessages);
  };
  loadMessageList = async () => {
    console.log('+++++ fetching last message ++++++++++++++++++');
    const listMessages = await API.graphql(
      graphqlOperation(queries.listMessages, {
        filter: {
          messageConversationId: {
            eq: this.state.messageconvoid,
          },
        },
      }),
    );

    console.log('listMessages', listMessages);
    this.getNextMessageList(listMessages.data.listMessages.nextToken);

    if (
      listMessages.data.listMessages.items &&
      listMessages.data.listMessages.items.length > 0
    ) {
      console.log(
        'Message Conversation Id : ',
        listMessages.data.listMessages.items,
      );
      // conversation.push(...listMessages.data.listMessages.items)
      console.log(
        'Total recent message found',
        listMessages.data.listMessages.items.length,
      );
      console.log('********************** Message  *******************');
      console.log(
        'Message Conversation Id : ',
        listMessages.data.listMessages.items[0].messageConversationId,
      );
      console.log(
        'Message User Id : ',
        listMessages.data.listMessages.items[0].messageUserId,
      );
      console.log(
        'Message  : ',
        listMessages.data.listMessages.items[0].content,
      );
      console.log('********************** Message  *******************');
      this.setState({
        dataSource: ds.cloneWithRows(
          listMessages.data.listMessages.items.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          ),
        ),
        messageList: listMessages.data.listMessages.items,
      });
    } else {
      console.log('No Message found....');
    }
    console.log('+++++ fetching success message ++++++++++++++++++');
  };

  createConver = async () => {
    console.log('create createConversation');
    const convo = {
      name: this.state.username,
      isPrivate: false,
      type: 'User',
    };
    console.log('convo', convo);

    API.graphql(
      graphqlOperation(createConversation, {
        input: convo,
      }),
    ).then(async convoResponse => {
      console.log(
        'create conversation',
        convoResponse.data.createConversation.id,
      );
      this.setState(
        {
          messageconvoid: convoResponse.data.createConversation.id,
        },
        () => {
          this.createConvo();
        },
      );
    });
    console.log('success a createConversation ');
  };
  createConvo = async () => {
    console.log('create convolink');
    const createconvodetails = {
      isPrivate: true,
      name: this.state.username,
      status: false,
      convoLinkUserId: this.state.userId,
      convoLinkConversationId: this.state.messageconvoid,
    };
    console.log('create convo link', createconvodetails);
    const newconvo = await API.graphql(
      graphqlOperation(createConvoLink, {
        input: createconvodetails,
      }),
    );
    console.log('new convo', newconvo);
    const loginUser = await AsyncStorage.getItem('login');
    const createUserDeatils = {
      isPrivate: true,
      name: this.state.userProfileName,
      status: false,
      convoLinkUserId: loginUser,
      convoLinkConversationId: this.state.messageconvoid,
    };
    console.log('create convo link', createUserDeatils);
    const newConvoUser = await API.graphql(
      graphqlOperation(createConvoLink, {
        input: createUserDeatils,
      }),
    );
    console.log('new convo', newConvoUser);
    console.log('success a inserting convo link');
  };

  convo() {
    this.convoLink();
  }

  reply() {}

  send = async () => {
    console.log('this.state.userProfileName', this.state.userProfileName);
    const message = {
      content: this.state.msg,
      createdAt: new Date(),
      chatbot: true,
      isChild: true,
      isSent: true,
      messageUserId: this.state.userId,
      messageUserName: this.state.userProfileName,
      messageConversationId: this.state.messageconvoid,
    };
    console.log('=== message', message);
    API.graphql(
      graphqlOperation(createMessage, {
        input: message,
      }),
    );
    console.log('insert a message');
    if (this.state.msg.length > 0) {
      this.setState({
        msg: '',
      });
    }
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <TopStatusBar />
        <View style={styles.header}>
          <View style={styles.left}>
            <TouchableOpacity
              onPress={() => {
                if (this.subscriptionsNewMessage) {
                  this.subscriptionsNewMessage.unsubscribe();
                }
                this.props.navigation.goBack();
              }}>
              <Icon
                name="arrow-back"
                color="#fff"
                size={23}
                style={{paddingLeft: 10}}
              />
            </TouchableOpacity>
            <>
              <Image source={{uri: this.props.image}} style={styles.userPic} />
            </>
            <>
              <Text style={styles.chatlabeltext}>{this.state.username}</Text>
            </>
          </View>
        </View>

        <ListView
          enableEmptySections
          noScroll
          renderScrollComponent={props => (
            <InvertibleScrollView {...props} inverted />
          )}
          dataSource={this.state.dataSource}
          contentContainerStyle={{justifyContent: 'flex-end'}}
          renderRow={rowData => (
            <EachMsg
              {...rowData}
              image={this.props.image}
              userLoginId={this.state.userLoginId}
              lastSeen={this.getLastMessageDate(rowData.createdAt)}
            />
          )}
          style={{flex: 1}}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Type a message"
          returnKeyType="send"
          autoCapitalize="none"
          onSubmitEditing={() => this.send()}
          value={this.state.msg}
          onChangeText={msg => this.setState({msg})}
        />
      </View>
    );
  }
}

export default Chatview;

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width,
    height,
  },

  chatlabeltext: {
    color: '#fff',
    marginLeft: 10,
    fontSize: AppStyles.fontSize.medium,
  },
  header: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: AppStyles.color.tint,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
  },
  chatTitle: {
    color: '#fff',
    fontWeight: '600',
    margin: 10,
    fontSize: 15,
  },
  chatImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
  },
  input: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 10,
    height: 40,
    width: width - 20,
    backgroundColor: '#fff',
    margin: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  eachMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
  },
  rightMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
    alignSelf: 'flex-end',
  },
  userPic: {
    height: 40,
    width: 40,
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
  },
  msgBlock: {
    width: 120,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    padding: 5,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  rightBlock: {
    width: 150,
    borderRadius: 5,
    backgroundColor: '#F5F5DC',
    padding: 5,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  msgTxt: {
    fontSize: 15,
    color: 'black',
    fontWeight: '600',
  },
  rightTxt: {
    fontSize: 15,
    color: 'black',
    fontWeight: '600',
  },
});
