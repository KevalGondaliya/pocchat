import React from 'react';
import AppNavigator from './src/navigations/AppNavigation';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import Amplify from 'aws-amplify';
import reducers from './src/reducers';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);
const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};
export default App;
