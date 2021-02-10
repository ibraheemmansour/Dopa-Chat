import React, { PureComponent } from 'react';
import { View, Image, KeyboardAvoidingView, ScrollView, BackHandler, TouchableHighlight } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getVersion } from 'react-native-device-info';

import Settings from '../../config/settings.js';
import Colors from '../../config/colors.js';
import Images from '../../config/images.js';

import Label from '../../components/Label';

import { setLoadingAction } from '../../redux/actions/globalActions';

import Styles from './styles.js';

class Home extends PureComponent {
  constructor (props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {
    this.props.dispatchSetLoadingAction(false);
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    BackHandler.exitApp();
    return true;
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: Colors.BackgroundColor, paddingTop: Settings.WindowHeight / 120 }}>
        <View>
          <KeyboardAvoidingView keyboardVerticalOffset={30} behavior="position">
            <View style={Styles.UpperView}>
              <Image style={Styles.GroupedLogo} source={Images.Logo} />
              <Label style={Styles.Version} font={Settings.FONTS.HelveticaNeueThin}>{getVersion()}</Label>
            </View>
            <View style={Styles.MiddleContainer}>
              <Label font={Settings.FONTS.HelveticaNeueBold} style={[Styles.LoginButtonText]}>HOME</Label>
            </View>
          </KeyboardAvoidingView>
        </View>        
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatchSetLoadingAction: (showHide) => dispatch(setLoadingAction(showHide))
}, dispatch)

export default connect(null, mapDispatchToProps)(Home);