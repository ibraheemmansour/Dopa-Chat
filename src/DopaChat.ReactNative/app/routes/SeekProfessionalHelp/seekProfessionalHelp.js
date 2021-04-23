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
    await this.props.dispatchGetAssistantsByCityAction(Settings.User.city, function (data, error, response) {
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

  renderProfilePicture(assistant) {
    if (assistant.item.ProfilePicture != null) {
      return (
        <Image style={{ width: 60, height: 60, borderRadius: 50 }} source={{uri: Settings.ROOT_URI + "Images/" + assistant.item.ProfilePicture }} />   
      )
    }
    else {
      return (
        <View style={{ width: 60, fontSize: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 60, borderRadius: 50, backgroundColor: Colors.Gray0 }}>
           <Label font={Settings.FONTS.HelveticaNeueBold}>A</Label>
           <Label font={Settings.FONTS.HelveticaNeueBold}>B</Label>
        </View>
      )
    }
  }
  renderAssistants() {
    return (
      <FlatList data={this.state.assistants} keyExtractor={(item, index) => "assistant_" + index} numColumns = {1} showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false} renderItem={(assistant, index) => (
          <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: Colors.White, padding: 15, marginBottom: Settings.WindowHeight / 30 }}>
            <View style={{ marginRight: 5, width: 61, height: 61, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.DopaBlack, borderRadius: 50 }}>
              { this.renderProfilePicture(assistant) }
            </View>
            <View style={{ marginLeft: 5 }}>
              <Label font={Settings.FONTS.HelveticaNeueBold}>{assistant.item.Name}</Label>
              <View style={{ flexDirection: 'row' }}>
                <Label style={{ fontWeight: 'bold' }} font={Settings.FONTS.HelveticaNeueBold}>Address: </Label>
                <Label font={Settings.FONTS.HelveticaNeueBold}>{assistant.item.Address}</Label>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Label style={{ fontWeight: 'bold' }} font={Settings.FONTS.HelveticaNeueBold}>Telephone: </Label>
                <Label font={Settings.FONTS.HelveticaNeueBold}>{assistant.item.Telephone}</Label>
              </View>
            </View>
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