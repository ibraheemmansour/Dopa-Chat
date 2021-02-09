import React, { PureComponent } from 'react';
import { Text } from 'react-native';

import Settings from '../config/settings.js';

export default class Label extends PureComponent {
  render() {
    return (
      <Text style={[this.props.font ? {fontFamily: this.props.font} : {fontFamily: Settings.FONTS.arial}, this.props.style]}>{this.props.children}</Text>
    );
  }
}
