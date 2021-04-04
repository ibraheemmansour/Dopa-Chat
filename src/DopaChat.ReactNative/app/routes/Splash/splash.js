import React, { Component } from 'react';
import { View, Image } from 'react-native';

import Settings from '../../config/settings.js';
import Images from '../../config/images.js';
import Label from '../../components/Label.js';
import GlobalStyles from '../../config/globalstyles.js';

import Styles from './styles.js';

export default class Splash extends Component {
  componentDidMount() {
    let app = this;
    if (app.props.navigation.state.params.screen != null) {
      setTimeout(function () { app.props.navigation.navigate(app.props.navigation.state.params.screen) }, Settings.SplashScreenTime);
    }
  }

  render() {
    return (
      <View renderToHardwareTextureAndroid={true} style={Styles.MainContainer}>
        <View style={Styles.LogoContainer}>
          <Image style={Styles.GroupedLogo} source={Images.Logo} />          
        </View>
        <View style={Styles.MessageContainer}>
          <Label style={Styles.Message}>Chat to raise your Dopamine levels, the chemical specific for happiness</Label>
        </View>
      </View>
    );
  }
}
