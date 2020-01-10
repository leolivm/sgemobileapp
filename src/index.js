import React from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {StatusBar} from 'react-native';
import './config/ReactotronConfig';
import {store, persistor} from './store';
import NavigationBar from 'react-native-navbar-color';
import App from './App';

export default function Index() {
  NavigationBar.setColor('#464950');
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="light-content" backgroundColor="#33363b" />
        <App />
      </PersistGate>
    </Provider>
  );
}
