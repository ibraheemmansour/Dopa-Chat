import React, { PureComponent } from 'react';
import { View, Image, BackHandler } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getVersion } from 'react-native-device-info';
import _ from 'lodash';

import Settings from '../../config/settings.js';
import Images from '../../config/images.js';

import Label from '../../components/Label';

import { setLoadingAction } from '../../redux/actions/globalActions';

import Styles from './styles';
import GlobalStyles from '../../config/globalstyles.js';

class Account extends PureComponent {
  constructor (props) {
    super(props);

    this.state = {
    }
  }

  async componentDidMount() {
    this.props.dispatchSetLoadingAction(false);
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    BackHandler.exitApp();
    return true;
  }

  render() {
    return (
      <View style={GlobalStyles.Container}>
        <View style={GlobalStyles.UpperView}>
          <Image style={GlobalStyles.GroupedLogo} source={Images.Logo} />
          <Label style={GlobalStyles.Version} font={Settings.FONTS.HelveticaNeueThin}>v{getVersion()}</Label>
        </View>
        <View style={Styles.MiddleContainer}>
          <Label style={GlobalStyles.PageTitle} font={Settings.FONTS.HelveticaNeueMedium}>Account</Label>
        </View>          
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatchSetLoadingAction: (showHide) => dispatch(setLoadingAction(showHide))
}, dispatch)

export default connect(null, mapDispatchToProps)(Account);