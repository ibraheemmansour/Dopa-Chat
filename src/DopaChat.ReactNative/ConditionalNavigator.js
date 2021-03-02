import React, { Component } from 'react';
import { View } from 'react-native';

import { createAppContainer, StackActions, NavigationActions } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { logoutAction } from './app/redux/actions/loginActions';

import Settings from './app/config/settings.js';

import SplashScreen from './app/routes/Splash';
import LoginScreen from './app/routes/Login';
import CreateAccountScreen from './app/routes/CreateAccount';
import HomeScreen from './app/routes/Home';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ConditionalNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigatorInitialized: false
    }
  }

  componentDidMount() {
    this.AppNavigator = createAppContainer(this.getStackNavigator());
  }

  getInitialRouteName() {
    if (new Date(this.props.expiry) < (new Date())) {
      return Settings.ScreenNames.CreateAccount;
    }
    
    return Settings.ScreenNames.Home;
  }

  getStackNavigator() {
    const StackNavigator = createStackNavigator({
      SplashScreen: {
        screen: SplashScreen,
        navigationOptions: {
          headerShown: false
        }
      },
      LoginScreen: {
        screen: LoginScreen,
        navigationOptions: {
          headerShown: false
        }
      },
      CreateAccountScreen: {
        screen: CreateAccountScreen,
        navigationOptions: {
          headerShown: false
        }
      },
      HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
          headerShown: false
        }
      },
    }, {
      initialRouteName: Settings.ScreenNames.SplashScreen,
      initialRouteParams: {
        screen: this.getInitialRouteName()
      },
      navigationOptions: {
        gesturesEnabled: false,
      }
    });

    this.setState({ navigatorInitialized: true });
    return StackNavigator;
  }

  render() {
    if (this.AppNavigator != null) {
      let AppNavigator = this.AppNavigator;
      return (<AppNavigator />)
    } else {
      return (<View></View>)
    }
  }
}

const mapStateToProps = (state) => {
  return {
    expiry: state.loginReducer.expiry
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatchLogoutAction: () => dispatch(logoutAction())
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ConditionalNavigator);