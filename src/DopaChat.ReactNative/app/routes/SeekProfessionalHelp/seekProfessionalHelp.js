import React, { PureComponent } from 'react';
import { View, Image, KeyboardAvoidingView, Switch, FlatList, BackHandler, TouchableHighlight, Alert } from 'react-native';
import { Picker } from "@react-native-community/picker";
import CheckBox from '@react-native-community/checkbox';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getVersion } from 'react-native-device-info';
import _ from 'lodash';

import Settings from '../../config/settings.js';
import Colors from '../../config/colors.js';
import Images from '../../config/images.js';
import { getAssistants } from '../../config/client.js';

import Countries from '../../data/countries.json';

import Label from '../../components/Label';

import { setLoadingAction } from '../../redux/actions/globalActions';

import Styles from './styles.js';
import GlobalStyles from '../../config/globalstyles.js';

class SeekProfessionalHelp extends PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      assistants: []
    }
  }

  async componentDidMount() {
    this.props.dispatchSetLoadingAction(false);
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    await this.getAssistants();
  }

  handleBackPress = () => {
    BackHandler.exitApp();
    return true;
  }

  async getAssistants() {
    this.props.dispatchSetLoadingAction(true);
    let app = this;
    await this.props.dispatchGetAssistantsByCityAction(1004251962, function (data, error, response) {
      if (data) {
        app.setState({ assistants: data });
        app.props.dispatchSetLoadingAction(false);
      }
      else {
        app.props.dispatchSetLoadingAction(false);
        Alert.alert('Connection Error', 'An error has occured, please try again.', [{ text: 'OK' }], { cancelable: true });
      }
    });  
  }

  renderAssistants() {
    return (
    <FlatList data={this.state.assistants} keyExtractor={(item, index) => "assistant_" + index} numColumns = {1} showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false} renderItem={(assistant, index) => (
        <View style={{ backgroundColor: Colors.White, padding: 10, marginBottom: Settings.WindowHeight / 30 }}>
          <Label font={Settings.FONTS.HelveticaNeueBold}>{assistant.item.Name}</Label>
          <Label font={Settings.FONTS.HelveticaNeueBold}>{assistant.item.Address}</Label>
        </View>
      )}
    />
    )
  }

  render() {
    return (
      <View style={GlobalStyles.Container}>
        <View style={GlobalStyles.UpperView}>
          <Image style={GlobalStyles.GroupedLogo} source={Images.Logo} />
          <Label style={GlobalStyles.Version} font={Settings.FONTS.HelveticaNeueThin}>v{getVersion()}</Label>
        </View>
        <View style={Styles.MiddleContainer}>
          <Label style={GlobalStyles.PageTitle} font={Settings.FONTS.HelveticaNeueMedium}>Seek Professional Help</Label>
          {this.renderAssistants()}
        </View>          
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatchGetAssistantsByCityAction: getAssistants,
  dispatchSetLoadingAction: (showHide) => dispatch(setLoadingAction(showHide)),
}, dispatch)

export default connect(null, mapDispatchToProps)(SeekProfessionalHelp);