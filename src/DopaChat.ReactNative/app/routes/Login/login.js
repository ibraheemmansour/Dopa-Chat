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

class Login extends PureComponent {
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
              <Label style={Styles.MainTitle} font={Settings.FONTS.HelveticaNeueThin}>Login</Label>
              <Label style={Styles.UsernamePretext} font={Settings.FONTS.HelveticaNeueBold}>USERNAME</Label>
              <TextInput autoCapitalize="none" onSubmitEditing={Keyboard.dismiss} onChange={(e) => this.onUsernameChange(e)} style={[Styles.TextInput]}>
                {`${this.state.username}`}
              </TextInput>
              <View style={Styles.CredentialSeparator}></View>
              <View style={Styles.PasswordPretextArea}>
                <Label style={Styles.PasswordPretext} font={Settings.FONTS.HelveticaNeueBold}>PASSWORD</Label>
              </View>
              <TextInput autoCapitalize="none" secureTextEntry={true} onSubmitEditing={Keyboard.dismiss} onChange={(e) => this.onPasswordChange(e)} style={[Styles.TextInput, Styles.Password]}>
                {`${this.state.password}`}
              </TextInput>
              <View style={Styles.LoginButtonContainter}>
                <TouchableHighlight onPress={() => this.login()} onLongPress={() => this.login()} style={Styles.LoginButton} underlayColor={Colors.DopaGreen} >
                  <Label font={Settings.FONTS.HelveticaNeueBold} style={[Styles.LoginButtonText]}>Sign In</Label>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.createAccount()} onLongPress={() => this.createAccount()} style={Styles.LoginButton} underlayColor={Colors.DopaGreen} >
                  <Label font={Settings.FONTS.HelveticaNeueBold} style={[Styles.LoginButtonText]}>Create Account</Label>
                </TouchableHighlight>
              </View>
            </View>
          </KeyboardAvoidingView>
          <View style={{width: Settings.WindowWidth, paddingTop: Settings.WindowHeight / 40, alignContent: 'center', justifyContent: 'center'}}>
            <Label style={Styles.FootNote}>Our aim is simplicity and easy-use, few steps towards your mental relief.</Label>
            <Label style={Styles.FootNote}>In DopaChat, you can chat to raise your Dopamine levels, the chemical specific for happiness. This platform allows you to connect with others who share your feelings, traumas or anxieties in a secure and private environment.</Label>
            <Label style={[Styles.FootNote, {marginTop: Settings.WindowHeight / 40 }]}>Disclaimer, this platform does not replace professional help. If you suffer from any mental illnesses, consult a professional.</Label>
          </View>
        </View>        
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatchLoginAction: login,
  dispatchSetLoadingAction: (showHide) => dispatch(setLoadingAction(showHide))
}, dispatch)

export default connect(null, mapDispatchToProps)(Login);