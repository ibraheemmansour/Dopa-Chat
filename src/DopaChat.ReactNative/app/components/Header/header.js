import React, { PureComponent } from 'react';
import { View, Image } from 'react-native';

import { getVersion } from 'react-native-device-info';

import Images from '../../config/images';
import Settings from '../../config/settings';

import Label from '../Label.js';

import Styles from './styles';

class Header extends PureComponent {
  render() {
    return (
      <View style={Styles.UpperView}>
        <Image style={Styles.GroupedLogo} source={Images.Logo} />
        <Label style={Styles.Version} font={Settings.FONTS.HelveticaNeueThin}>v{getVersion()}</Label>
      </View>
    );
  }
};

export default Header;
