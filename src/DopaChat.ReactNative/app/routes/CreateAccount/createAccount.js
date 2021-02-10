import React, { PureComponent } from 'react';
import { Keyboard, View, Image, Alert, KeyboardAvoidingView, ScrollView, TextInput, BackHandler, TouchableHighlight } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getVersion } from 'react-native-device-info';

import Settings from '../../config/settings.js';
import Colors from '../../config/colors.js';
import Images from '../../config/images.js';
import { login } from '../../config/client.js';

import Label from '../../components/Label';

import { setLoadingAction } from '../../redux/actions/globalActions';

import Styles from './styles.js';

class CreateAccount extends PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      username: "ibraheem1992",
      password: "root"
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

  async login() {
    this.props.dispatchSetLoadingAction(true);
    if (this.state.username == "" || this.state.password == "" || this.state.username == null || this.state.password == null) {
      Alert.alert('Field missing', 'Make sure all fields are entered.', [{ text: 'OK' }], { cancelable: true });
      this.props.dispatchSetLoadingAction(false);
      return;
    }

    let app = this;
    this.props.dispatchLoginAction(this.state.username, this.state.password, function (data, error, response) {
      app.props.dispatchSetLoadingAction(false);
      if (data && data.access_token) {
        app.props.navigation.navigate(Settings.ScreenNames.Home);
      }
      else {
        if (error.includes("400")) {
          Alert.alert('Authentication Error', 'Incorrect credentials.', [{ text: 'OK' }], { cancelable: true });
        } else if (error.includes("404"))  {
          Alert.alert('Authentication Error', 'User not found.', [{ text: 'OK' }], { cancelable: true });
        }
        else {
          Alert.alert('Authentication Error', 'Error occured during login, please try again.', [{ text: 'OK' }], { cancelable: true });
        }
      }
    });
  }

  onUsernameChange(e) {
    this.setState({ username: e.nativeEvent.text });
  }

  onPasswordChange(e) {
    this.setState({ password: e.nativeEvent.text });
  }

  createAccount() {
    this.props.navigation.navigate(Settings.ScreenNames.CreateAccount);
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
              <Label style={Styles.MainTitle} font={Settings.FONTS.HelveticaNeueThin}>CREATE ACCOUNT</Label>
              <View>
                <Label style={Styles.UsernamePretext} font={Settings.FONTS.HelveticaNeueBold}>USERNAME</Label>
                <TextInput autoCapitalize="none" onSubmitEditing={Keyboard.dismiss} onChange={(e) => this.onUsernameChange(e)} style={[Styles.TextInput]}>
                  {`${this.state.username}`}
                </TextInput>
              </View>
              <View style={Styles.CredentialSeparator}></View>
              <View>
                <View style={Styles.PasswordPretextArea}>
                  <Label style={Styles.PasswordPretext} font={Settings.FONTS.HelveticaNeueBold}>PASSWORD</Label>
                </View>
                <TextInput autoCapitalize="none" secureTextEntry={true} onSubmitEditing={Keyboard.dismiss} onChange={(e) => this.onPasswordChange(e)} style={[Styles.TextInput, Styles.Password]}>
                  {`${this.state.password}`}
                </TextInput>
              </View>
              <View style={Styles.CredentialSeparator}></View>
              <View>
                <Label style={Styles.UsernamePretext} font={Settings.FONTS.HelveticaNeueBold}>FIRST NAME</Label>
                <TextInput autoCapitalize="none" onSubmitEditing={Keyboard.dismiss} onChange={(e) => this.onUsernameChange(e)} style={[Styles.TextInput]}>
                  {`${this.state.username}`}
                </TextInput>
              </View>
              <View style={Styles.CredentialSeparator}></View>
              <View>
                <Label style={Styles.UsernamePretext} font={Settings.FONTS.HelveticaNeueBold}>LAST NAME</Label>
                <TextInput autoCapitalize="none" onSubmitEditing={Keyboard.dismiss} onChange={(e) => this.onUsernameChange(e)} style={[Styles.TextInput]}>
                  {`${this.state.username}`}
                </TextInput>
              </View>
              <View style={Styles.CredentialSeparator}></View>
              <View>
                <Label style={Styles.UsernamePretext} font={Settings.FONTS.HelveticaNeueBold}>DESCRIPTION</Label>
                <TextInput autoCapitalize="none" onSubmitEditing={Keyboard.dismiss} onChange={(e) => this.onUsernameChange(e)} style={[Styles.TextInput]}>
                  {`${this.state.username}`}
                </TextInput>
              </View>
              <View style={Styles.LoginButtonContainter}>
                <TouchableHighlight onPress={() => this.createAccount()} onLongPress={() => this.createAccount()} style={Styles.LoginButton} underlayColor={Colors.DopaGreen} >
                  <Label font={Settings.FONTS.HelveticaNeueBold} style={[Styles.LoginButtonText]}>Create Account</Label>
                </TouchableHighlight>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>        
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatchLoginAction: login,
  dispatchSetLoadingAction: (showHide) => dispatch(setLoadingAction(showHide))
}, dispatch)

export default connect(null, mapDispatchToProps)(CreateAccount);