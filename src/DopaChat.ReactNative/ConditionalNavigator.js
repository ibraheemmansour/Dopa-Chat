import React, { Component } from 'react';
import { View, Image } from 'react-native';

import { createAppContainer, StackActions, NavigationActions } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { setTabScreenNameAction } from './app/redux/actions/globalActions';
import { logoutAction } from './app/redux/actions/loginActions';

import Settings from './app/config/settings.js';

import SplashScreen from './app/routes/Splash';
import LoginScreen from './app/routes/Login';
import SearchScreen from './app/routes/Search';
import ChatsScreen from './app/routes/Chats';
import AccountScreen from './app/routes/Account';
import LogoutScreen from './app/routes/Logout';
import CreateAccountScreen from './app/routes/CreateAccount';
import SeekProfessionalHelpScreen from './app/routes/SeekProfessionalHelp';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { store } from './app/redux/store/store';
import Images from './app/config/images';
import GlobalStyles from './app/config/globalstyles';
import Colors from './app/config/colors';

class ConditionalNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigatorInitialized: false
    }
  }

  componentDidMount() {
    this.props.dispatchSetTabScreenNameAction(Settings.ScreenNames.Account);
    this.AppNavigator = createAppContainer(this.getStackNavigator());
  }

  getInitialRouteName() {
    if (this.props.expiry == null || new Date(this.props.expiry) < (new Date())) {
      return Settings.ScreenNames.Login;
    }

    Settings.User = store.getState().loginReducer.user;
    return Settings.ScreenNames.Account;
  }

  getStackNavigator() {
    const StackNavigator = createStackNavigator({
      AccountScreen: {
        screen: this.getTabNavigator(),
        navigationOptions: {
          headerShown: false
        }
      },
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
      }
    }, {
      initialRouteName: Settings.ScreenNames.Splash,
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

  getTabNavigator() {
    const TabNavigator = createBottomTabNavigator({
      AccountScreen: {
        screen: AccountScreen,
        navigationOptions: {
          title: "Account",
          tabBarIcon: (options) => !options.focused ? (<Image source={Images.Tab_Account} style={GlobalStyles.TabIcon} />) : (<Image source={Images.Tab_Account_Selected} style={GlobalStyles.TabIcon} />),
          tabBarOnPress: (scene, jumpToIndex) => {
            this.props.dispatchSetTabScreenNameAction(Settings.ScreenNames.Account);
            scene.defaultHandler();
          }
        }
      },
      SearchScreen: {
        screen: SearchScreen,
        navigationOptions: {
          title: "Search",
          tabBarIcon: (options) => !options.focused ? (<Image source={Images.Tab_Search} style={GlobalStyles.TabIcon} />) : (<Image source={Images.Tab_Search_Selected} style={GlobalStyles.TabIcon} />),
          tabBarOnPress: (scene, jumpToIndex) => {
            this.props.dispatchSetTabScreenNameAction(Settings.ScreenNames.Search);
            scene.defaultHandler();
          }
        }
      },     
      ChatsScreen: {
        screen: ChatsScreen,
        navigationOptions: {
          title: "Chats",
          tabBarIcon: (options) => !options.focused ? (<Image source={Images.Tab_Chats} style={GlobalStyles.TabIcon} />) : (<Image source={Images.Tab_Chats_Selected} style={GlobalStyles.TabIcon} />),
          tabBarOnPress: (scene, jumpToIndex) => {
            this.props.dispatchSetTabScreenNameAction(Settings.ScreenNames.Chats);
            scene.defaultHandler();
          }
        }
      },
      SeekProfessionalHelp: {
        screen: SeekProfessionalHelpScreen,
        navigationOptions: {
          title: "Seek Professional Help",
          tabBarIcon: (options) => !options.focused ? (<Image source={Images.Tab_SeekProfessionalHelp} style={GlobalStyles.TabIcon} />) : (<Image source={Images.Tab_SeekProfessionalHelp_Selected} style={GlobalStyles.TabIcon} />),
          tabBarOnPress: (scene, jumpToIndex) => {
            this.props.dispatchSetTabScreenNameAction(Settings.ScreenNames.SeekProfessionalHelp);
            scene.defaultHandler();
          }
        }
      },
      LogoutScreen: {
        screen: LogoutScreen,
        navigationOptions: {
          title: "Logout",
          tabBarIcon: (<Image source={Images.Tab_Logout} style={GlobalStyles.TabIcon} />),
          tabBarOnPress: (scene, jumpToIndex) => {
            this.props.dispatchLogoutAction();
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: Settings.ScreenNames.Login })],
            });
            Settings.User = null;
            scene.navigation.dispatch(resetAction);
          }
        }
      }
    }, {
      tabBarOptions: {
        activeTintColor: Colors.DopaGreen,
        showLabel: false,
        tabStyle: { padding: 0, marginBottom: 16, marginTop: 16 },
        labelStyle: { fontSize: Settings.IsTablet ? 12 : 11, fontFamily: Settings.FONTS.HelveticaNeueBold },
        allowFontScaling: true,
        style: {
          backgroundColor: Colors.Gray2, height: Settings.WindowHeight / 12,
          borderTopWidth: 0,
          ...Platform.select({
            ios: { shadowColor: Colors.Gray0, shadowOffset: { width: 0, height: 1 }, shadowRadius: 10 }
          })
        }
      },
      initialRouteName: Settings.ScreenNames.Account,
      tabBarPosition: "bottom",
      backBehavior: "none"
    });
    return TabNavigator;
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
  dispatchSetTabScreenNameAction: (bool) => dispatch(setTabScreenNameAction(bool)),
  dispatchLogoutAction: () => dispatch(logoutAction())
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ConditionalNavigator);