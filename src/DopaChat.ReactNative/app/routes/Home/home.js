import React, { Component } from 'react';
import { Keyboard, View, Text, Image, Slider, Button, Alert, ToastAndroid, Modal, TextInput, TouchableHighlight } from 'react-native';

import Settings from '../../config/settings.js';
import Strings from '../../config/strings.js';
import Images from '../../config/images.js';
import Styles from '../../config/globalstyles.js';

export default class Home extends Component {

    constructor (props) {
      super(props);

      this.state = {
      }
    }

    componentWillMount() {
    }

    render() {
      return (
         <View renderToHardwareTextureAndroid={true} style={[Styles.Container]}>
           <Text style={fontSize="13"}>Home</Text>
         </View>
      );
    }
}
