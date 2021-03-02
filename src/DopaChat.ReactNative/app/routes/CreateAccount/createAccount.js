import React, { PureComponent } from 'react';
import { Keyboard, View, Image, Alert, Switch, KeyboardAvoidingView, ScrollView, TextInput, BackHandler, TouchableHighlight } from 'react-native';
import { Picker } from "@react-native-community/picker";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getVersion } from 'react-native-device-info';
import Icon from 'react-native-vector-icons/Feather';

import Settings from '../../config/settings.js';
import Colors from '../../config/colors.js';
import Images from '../../config/images.js';
import { createAccount, getCities } from '../../config/client.js';

import Languages from '../../data/languages.json';
import Countries from '../../data/countries.json';

import Label from '../../components/Label';

import { setLoadingAction } from '../../redux/actions/globalActions';

import Styles from './styles.js';

class CreateAccount extends PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      username: "ibraheem1992",
      password: "root",
      passwordConfirm: "root",
      firstName: "Ibraheem",
      lastName: "Mansour",
      city: 'saida',
      description: "Fuck this country",
      showLocations: false,
      languages: [],
      selected_language: 'en',
      countries: [],
      selected_country: null,
      cities: [],
      selected_city: null
    }
  }

  componentDidMount() {
    this.props.dispatchSetLoadingAction(false);
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    this.populateLanguages();
    this.populateCountries();
  }

  handleBackPress = () => {
    BackHandler.exitApp();
    return true;
  }

  populateLanguages() {
    let languages = [];
    Languages.forEach(language =>
    {
      languages.push(<Picker.Item key={language.code} label={language.name} value={language.code}/>);
    });
    this.setState({ languages: languages });
  }

  populateCountries() {
    let countries = [];
    Countries.forEach(country =>
    {
      countries.push(<Picker.Item key={country.code} label={country.name} value={country.code}/>);
    });
    this.setState({ countries: countries });
  }

  async createAccount() {
    this.props.dispatchSetLoadingAction(true);
    if (this.state.username == "" || this.state.password == "" || this.state.username == null || this.state.password == null) {
      Alert.alert('Field missing', 'Make sure all fields are entered.', [{ text: 'OK' }], { cancelable: true });
      this.props.dispatchSetLoadingAction(false);
      return;
    }

    let app = this;
    this.props.dispatchCreateAccountAction(this.state.username, this.state.password, this.state.firstName, this.state.lastName, this.state.description, function (data, error, response) {
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

  onPasswordConfirmChange(e) {
    this.setState({ passwordConfirm: e.nativeEvent.text });
  }

  onFirstNameChange(e) {
    this.setState({ firstName: e.nativeEvent.text });
  }

  onLastNameChange(e) {
    this.setState({ lastName: e.nativeEvent.text });
  }

  onDescriptionChange(e) {
    this.setState({ description: e.nativeEvent.text });
  }

  async selectCountry(country) {
    console.log(country);
    this.props.dispatchSetLoadingAction(true);
    let app = this;
    this.props.dispatchGetCitiesAction(country, function (data, error, response) {
      app.props.dispatchSetLoadingAction(false);
      if (data) {
        // let cities = [];
        // country.forEach(country =>
        // {
        //   countries.push(<Picker.Item key={country.code} label={country.name} value={country.code}/>);
        // });
        // this.setState({ countries: countries });
      }
      else {
        Alert.alert('Connection Error', 'An error has occured, please try again.', [{ text: 'OK' }], { cancelable: true });
      }
    });    
  }

  renderLanguages() {
    return (
      <View>
        <Label style={Styles.UsernamePretext} font={Settings.FONTS.HelveticaNeueBold}>LANGUAGE</Label>
        <Picker selectedValue={this.state.selected_language} style={{ backgroundColor: Colors.White, borderColor: Colors.DopaGreen, borderWidth: 5, height: 50 }} onValueChange={(itemValue, itemIndex) => this.setState({ selected_language: itemValue })}>
          {this.state.languages}
        </Picker>
      </View>
    )
  }

  renderCountries() {
    return (
      <View>
        <Label style={Styles.UsernamePretext} font={Settings.FONTS.HelveticaNeueBold}>COUNTRY</Label>
        <Picker selectedValue={this.state.selected_country} style={{ backgroundColor: Colors.White, borderColor: Colors.DopaGreen, borderWidth: 5, width: Settings.WindowWidth / 3, height: 50 }} onValueChange={(itemValue, itemIndex) => this.selectCountry(itemValue)}>
          {this.state.countries}
        </Picker>
      </View>
    )
  }

  renderCities() {
    return (
      <View>
        <Label style={Styles.UsernamePretext} font={Settings.FONTS.HelveticaNeueBold}>CITY</Label>
        <Picker selectedValue={this.state.selected_city} style={{ backgroundColor: Colors.White, borderColor: Colors.DopaGreen, borderWidth: 5, width: Settings.WindowWidth / 3, height: 50 }} onValueChange={(itemValue, itemIndex) => this.setState({ selected_city: itemValue })}>
          {this.state.cities}
        </Picker>
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: Colors.BackgroundColor, paddingTop: Settings.WindowHeight / 320 }}>
        <View>
          <View style={Styles.UpperView}>
            <Image style={Styles.GroupedLogo} source={Images.Logo} />
            <Label style={Styles.Version} font={Settings.FONTS.HelveticaNeueThin}>{getVersion()}</Label>
          </View>
          <View style={Styles.MiddleContainer}>
            <Label style={Styles.MainTitle} font={Settings.FONTS.HelveticaNeueThin}>REGISTER</Label>
            <View>
              <Label style={Styles.UsernamePretext} font={Settings.FONTS.HelveticaNeueBold}>USERNAME</Label>
              <TextInput autoCapitalize="none" onSubmitEditing={Keyboard.dismiss} onChange={(e) => this.onUsernameChange(e)} style={[Styles.TextInput]}>
                {`${this.state.username}`}
              </TextInput>
            </View>
            <View style={Styles.CredentialSeparator}></View>
            <View>
              <Label style={Styles.UsernamePretext} font={Settings.FONTS.HelveticaNeueBold}>FIRST NAME</Label>
              <TextInput autoCapitalize="none" onSubmitEditing={Keyboard.dismiss} onChange={(e) => this.onFirstNameChange(e)} style={[Styles.TextInput]}>
                {`${this.state.firstName}`}
              </TextInput>
            </View>
            <View style={Styles.CredentialSeparator}></View>
            <View>
              <Label style={Styles.UsernamePretext} font={Settings.FONTS.HelveticaNeueBold}>LAST NAME</Label>
              <TextInput autoCapitalize="none" onSubmitEditing={Keyboard.dismiss} onChange={(e) => this.onLastNameChange(e)} style={[Styles.TextInput]}>
                {`${this.state.lastName}`}
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
              <TextInput autoCapitalize="none" secureTextEntry={true} onSubmitEditing={Keyboard.dismiss} onChange={(e) => this.onPasswordConfirmChange(e)} style={[{marginTop: 10}, Styles.TextInput, Styles.Password]}>
                {`${this.state.passwordConfirm}`}
              </TextInput>
            </View>
            <View style={Styles.CredentialSeparator}></View>
            {this.renderLanguages()}
            <Switch trackColor={{ false: "#767577", true: "#81b0ff" }} thumbColor={this.state.showLocations ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e" onValueChange={val => this.setState({ showLocations: val })} value={this.state.showLocations}
            />
            { this.state.showLocations &&
              <View>
                <View style={Styles.CredentialSeparator}></View>
                <View>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    {this.renderCountries()}
                    {this.renderCities()}
                  </View>
                </View>
              </View>
            }
            <View style={Styles.CredentialSeparator}></View>
            <View style={Styles.TextAreaContainer} >
              <Label style={Styles.UsernamePretext} font={Settings.FONTS.HelveticaNeueBold}>DESCRIPTION</Label>
              <TextInput autoCapitalize="none" multiline onSubmitEditing={Keyboard.dismiss} onChange={(e) => this.onDescriptionChange(e)} style={[Styles.TextInput, Styles.TextArea]}>
                {`${this.state.description}`}
              </TextInput>
            </View>
            <View style={Styles.CredentialSeparator}></View>
            <View style={Styles.LoginButtonContainter}>
              <TouchableHighlight onPress={() => this.createAccount()} onLongPress={() => this.createAccount()} style={Styles.LoginButton} underlayColor={Colors.DopaGreen} >
                <Label font={Settings.FONTS.HelveticaNeueBold} style={[Styles.LoginButtonText]}>Create Account</Label>
              </TouchableHighlight>
            </View>           
            </View>
          </View>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatchGetCitiesAction: getCities,
  dispatchCreateAccountAction: createAccount,
  dispatchSetLoadingAction: (showHide) => dispatch(setLoadingAction(showHide))
}, dispatch)

export default connect(null, mapDispatchToProps)(CreateAccount);