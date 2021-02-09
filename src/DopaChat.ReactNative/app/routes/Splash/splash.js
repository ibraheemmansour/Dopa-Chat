import React, { Component } from 'react';
import { View, Image } from 'react-native';

import Settings from '../../config/settings.js';
import Colors from '../../config/colors.js';
import Images from '../../config/images.js';
import Label from '../../components/Label.js';

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
      <View renderToHardwareTextureAndroid={true} style={Styles.Container}>
        <View style={{flex: 2, justifyContent: 'center', paddingTop: Settings.WindowHeight / 6}}>
          <Image style={Styles.GroupedLogo} source={Images.Logo} />
        </View>
        <View style={{flex: 0, justifyContent: 'flex-end', paddingBottom: Settings.WindowHeight / 6}}>
          <Label style={{fontSize: 14, color: Colors.DopaGreen, textAlign: 'center', width: Settings.WindowWidth / 1.2}}>Chat to raise your Dopamine levels, the chemical specific for happiness</Label>
        </View>
      </View>
    );
  }
}
