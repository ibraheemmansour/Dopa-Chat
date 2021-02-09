import React, { Component } from 'react';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store/store';

import BusyIndicator from './components/BusyIndicator/index';
import ConditionalNavigator from '../ConditionalNavigator';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConditionalNavigator />
          <BusyIndicator />
        </PersistGate>
      </Provider>
    )
  }
}