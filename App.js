/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import rootReducer from './src/reducers';
import {createStore, applyMiddleware, compose} from 'redux';

import AppNavigator from './src/AppNavigator'


const composedEnhancers = compose(applyMiddleware(thunk));
const store = createStore(rootReducer, {}, composedEnhancers);
const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex:1}}>
      <Provider store={store}>
          <AppNavigator/>
        </Provider>
      </SafeAreaView>
    </>
  );
};



export default App;
