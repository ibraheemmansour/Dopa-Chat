import React, { PureComponent } from 'react';
import { Keyboard, View, Image, Alert, SafeAreaView, ScrollView, Switch, TextInput, BackHandler, FlatList, TouchableHighlight } from 'react-native';
import { Picker } from "@react-native-community/picker";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getVersion } from 'react-native-device-info';
import _ from 'lodash';

import Settings from '../../config/settings.js';
import Colors from '../../config/colors.js';
import Images from '../../config/images.js';
import { updateAccount, getCities, getKeywords } from '../../config/client.js';

import Languages from '../../data/languages.json';
import Countries from '../../data/countries.json';

import Label from '../../components/Label';

import { store } from '../../redux/store/store';
import { setLoadingAction } from '../../redux/actions/globalActions';

import Styles from './styles.js';
import GlobalStyles from '../../config/globalstyles.js';

class Profile extends PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      user: store.getState().loginReducer.user,
      isEdit: false,
      passwordConfirm: store.getState().loginReducer.user.password,
      showLocations: true,
      keywords: [],
      languages: [],
      countries: [],
      selected_country: store.getState().loginReducer.user.country,
      cities: [],
      selected_city: store.getState().loginReducer.user.city,
    }
  }

  componentDidMount() {
    this.props.dispatchSetLoadingAction(false);
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    this.getSelectedCountryCities(this.state.selected_country);
    this.populateKeywords();
    this.populateLanguages(Languages);
    this.populateCountries();
  }

  handleBackPress = () => {
    this.state.isEdit ? this.setState({ isEdit: false }) : BackHandler.exitApp();
    return true;
  }

  async populateKeywords() {
    this.props.dispatchSetLoadingAction(true);
    let app = this;
    await this.props.dispatchGetKeywordsAction(function (keywords_data, error, response) {
      if (keywords_data) {
        let keywords = [];
        keywords.push(<Picker.Item key={null} label="Select keyword" value={null}/>);
        keywords_data.forEach(keyword =>
        {
          const found = Object.entries(app.state.user.keywords).find(element => element[0] == keyword.id);
          if (!found) {
            keywords.push(<Picker.Item key={keyword.id} label={keyword.title} value={keyword.id}/>);
          }
        });
        app.setState({ keywords: keywords });
      }
      else {
        app.props.dispatchSetLoadingAction(false);
        Alert.alert('Connection Error', 'An error has occured, please try again.', [{ text: 'OK' }], { cancelable: true });
      }
    });    
  }

  populateCountries() {
    let countries = [];
    Countries.forEach(country =>
    {
      countries.push(<Picker.Item key={country.code} label={country.name} value={country.code}/>);
    });
    this.setState({ countries: countries }, () => {
      this.props.dispatchSetLoadingAction(false);
    });
  }

  populateLanguages(data) {
    if (this.state.user?.languages != null) {
      let languages = [], userLanguages = this.state.user.languages.split(",");
      languages.push(<Picker.Item key={null} label="Select language" value={null}/>);
      data.forEach(language =>
      {
        const found = userLanguages.find(element => element == language.code);
        if (!found) {
          languages.push(<Picker.Item key={language.code} label={language.name} value={language.code}/>);
        }
      });

      this.setState({ languages: languages });
    }
  }

  isFormValid() {
    if (this.state.user.password == "" || this.state.user.password == null
    || this.state.passwordConfirm == "" || this.state.passwordConfirm == null 
    || this.state.user.firstName == "" || this.state.user.lastName == "" || this.state.user.firstName == null || this.state.user.lastName == null
    || this.state.user.languages == null || this.state.user.city == null || Object.entries(this.state.user.keywords).length == 0) {
      Alert.alert('Missing field', 'Make sure all fields are entered.', [{ text: 'OK' }], { cancelable: true });
      this.props.dispatchSetLoadingAction(false);
      return false;
    } else {
      return true;
    }
  }

  async save() {
    this.props.dispatchSetLoadingAction(true);
    if (!this.isFormValid()) {
      Alert.alert('Field missing', 'Make sure all fields are entered.', [{ text: 'OK' }], { cancelable: true });
      this.props.dispatchSetLoadingAction(false);
      return;
    }

    var user = { 
      nickname: this.state.user.nickname,
      password: this.state.user.password,
      firstName: this.state.user.firstName,
      lastName: this.state.user.lastName,
      description: this.state.user.description,
      languages: this.state.user.languages,
      keywords: Object.entries(this.state.user.keywords).map(keyword => keyword[0]).join(","),
      country: this.state.user.country,
      cityId: this.state.user.city
    };

    let app = this;
    await this.props.dispatchUpdateAccountAction(user, function (data, error, response) {
      app.props.dispatchSetLoadingAction(false);
      if (data) {
        app.setState({ isEdit: false });
        Alert.alert('Success', 'User has been updated successfully.', [{ text: 'OK' }], { cancelable: true });
      } else {
        Alert.alert('Bad Request', 'Unknown error has occured.', [{ text: 'OK' }], { cancelable: true });
      }
      app.props.dispatchSetLoadingAction(false);
    });
  }

  onUsernameChange(e) {
    this.setState({ username: e.nativeEvent.text });
  }

  onPasswordChange(e) {
    let user = {...this.state.user};
    user.password = e.nativeEvent.text;
    this.setState({ user: user });
  }

  onPasswordConfirmChange(e) {
    this.setState({ passwordConfirm: e.nativeEvent.text });
  }

  onFirstNameChange(e) {
    let user = {...this.state.user};
    user.firstName = e.nativeEvent.text;
    this.setState({ user: user });
  }

  onLastNameChange(e) {
    let user = {...this.state.user};
    user.lastName = e.nativeEvent.text;
    this.setState({ user: user });
  }

  onDescriptionChange(e) {
    let user = {...this.state.user};
    user.description = e.nativeEvent.text;
    this.setState({ user: user });
  }

  async getSelectedCountryCities(country) {
    this.setState({ selected_country: country });
    let app = this;
    this.props.dispatchGetCitiesAction(country, function (cities_data, error, response) {
      if (cities_data) {
        let cities = [];
        cities_data.forEach(city =>
        {
          cities.push(<Picker.Item key={city.Id} label={city.CityName} value={city.Id}/>);
        });
        app.setState({ cities: cities });
      }
      else {
        Alert.alert('Connection Error', 'An error has occured, please try again.', [{ text: 'OK' }], { cancelable: true });
      }
    });    
  }

  getLanguageName(code) {
    const found = Languages.find(element => element.code == code);
    
    if (found) {
      return found.name;
    }

    return code;
  }

  getLanguageCode(name) {
    const found = Languages.find(element => element.name == name);
    
    if (found) {
      return found.code;
    }

    return name;
  }

  getCountryName(code) {
    const found = Countries.find(element => element.code == code);
    
    if (found) {
      return found.name;
    }

    return code;
  }

  selectLanguage(code) {
    if (code != null) {
      let user = {...this.state.user};
      user.languages += ("," + code);
      let languages = _.cloneDeep(this.state.languages);
      var removed = _.remove(languages, function(n) { return n.key !== code });
      this.setState({ languages: removed, user: user })
    }
  }

  selectKeyword(keyword) {
    if (keyword != null) {
      let keywords = _.cloneDeep(this.state.keywords);
      let user = {...this.state.user};
      const found = keywords.find(element => element.props.value == keyword);
      if (found) {
        user.keywords[found.props.value] = found.props.label;
        var removed = _.remove(keywords, function(n) { return n.key !== keyword });
        this.setState({ keywords: removed, user: user })
      }
    }
  }
  
  removeKeyword(item) {
    if (Object.entries(this.state.user.keywords).length != 1)
    {
      let user = {...this.state.user};
      delete user.keywords[item.item[0]];
      let keywords = _.cloneDeep(this.state.keywords);
      keywords.push(<Picker.Item key={item.item[0]} label={item.item[1]} value={item.item[0]}/>);
      this.setState({ keywords: keywords, user: user })
    }
    else {
      Alert.alert('', 'Cannot remove keyword. At least one keyword should be selected.', [{ text: 'OK' }], { cancelable: true });
    }   
  }

  removeLanguage(item) {
    if (this.state.user.languages.split(",").length != 1)
    {
      let code = this.getLanguageCode(item.item);
      let user = {...this.state.user};
      user.languages = user.languages.replace("," + code, "");
      user.languages = user.languages.replace(code + ",", "");
      user.languages = user.languages.replace(code, "");
      let languages = _.cloneDeep(this.state.languages);
      const found = Languages.find(element => element.code == code);
      if (found) {
        languages.push(<Picker.Item key={code} label={found.name} value={code}/>);
      }
      this.setState({ languages: languages, user: user })
    } else {
      Alert.alert('', 'Cannot remove language. At least one language should be selected.', [{ text: 'OK' }], { cancelable: true });
    }
  }

  renderCountries() {
    return (
      <View>
        <Label style={GlobalStyles.Subtitle} font={Settings.FONTS.HelveticaNeueBold}>Country</Label>
        <View style={GlobalStyles.PickerContainer}>
          <Picker selectedValue={this.state.selected_country} style={[GlobalStyles.Picker, { width: Settings.WindowWidth / 2.5 }]} onValueChange={(itemValue, itemIndex) => this.getSelectedCountryCities(itemValue)}>
            {this.state.countries}
          </Picker>
        </View>
      </View>
    )
  }

  renderCities() {
    return (
      <View>
        <Label style={GlobalStyles.Subtitle} font={Settings.FONTS.HelveticaNeueBold}>City</Label>
        <View style={GlobalStyles.PickerContainer}>
          <Picker selectedValue={this.state.selected_city} style={[GlobalStyles.Picker, { width: Settings.WindowWidth / 2.5 }]} onValueChange={(itemValue, itemIndex) => this.setState({ selected_city: itemValue })}>
            {this.state.cities}
          </Picker>
        </View>
      </View>
    )
  }

  renderEditDescription() {
    return (
      <View style={Styles.TextAreaContainer}>
        <Label style={GlobalStyles.Subtitle} font={Settings.FONTS.HelveticaNeueBold}>Description</Label>
        <Label style={GlobalStyles.Info}>Describe your problem in 50 words to familiarize the people you match with your problem.</Label>
        <TextInput autoCapitalize="none" multiline onSubmitEditing={Keyboard.dismiss} onChange={(e) => this.onDescriptionChange(e)} style={[GlobalStyles.TextInput, Styles.TextArea]}>
          {`${this.state.user.description}`}
        </TextInput>
      </View>
    )
  }

  renderLanguages() {
    let langauges = [];
    this.state.user.languages?.split(',').forEach(l => {
      langauges.push(this.getLanguageName(l));
    });

    return (
      <View style={Styles.Separator}>
        <Label style={GlobalStyles.Subtitle} font={Settings.FONTS.HelveticaNeueBold}>Languages</Label>
        <SafeAreaView>
          { this.state.isEdit && (
            <View>
              <Label style={GlobalStyles.Info}>Choose the langauges that you can speak.</Label>
              <View style={[GlobalStyles.PickerContainer, { marginBottom: 15 }]}>
                <Picker selectedValue={null} style={GlobalStyles.Picker} onValueChange={(itemValue, itemIndex) => itemValue != null ? this.selectLanguage(itemValue) : null}>
                  {this.state.languages}
                </Picker>
              </View>
            </View>
           ) }
           { this.state.isEdit && (<Label style={GlobalStyles.Subtitle}>Selected Languages: </Label>   ) }
            <FlatList data={langauges} keyExtractor={(item, index) => "language_" + index} numColumns = {0}
              renderItem={(language, index) => (
                <View style={[Styles.FlatListItemContainer, { marginBottom: this.state.isEdit ? 15 : 0 }]}>
                  <Label font={Settings.FONTS.HelveticaNeueBold}> ▸  {language.item}</Label>
                  { this.state.isEdit && (
                    <TouchableHighlight onPress={() => this.removeLanguage(language)} onLongPress={() => this.removeLanguage(language)} style={{ justifyContent: 'center', alignItems: 'center', width: 20, height: 20, borderRadius: 50, backgroundColor: Colors.Red }} underlayColor={Colors.Transparent} >
                      <Label style={{ color: Colors.White, fontWeight: 'bold' }}>X</Label>
                    </TouchableHighlight>
                   ) }
                </View>
              )}
            />
             { this.state.isEdit && langauges.length == 0 && (
               <Label style={[GlobalStyles.Info, { marginBottom: 10 }]}>No selected languages</Label>   
             ) }
        </SafeAreaView>
      </View>      
    )
  }

  renderEditProfile() {
    return (
      <View>
        <View style={Styles.Separator}>
          <Label style={GlobalStyles.Subtitle} font={Settings.FONTS.HelveticaNeueBold}>Username</Label>
          <TextInput editable={false} autoCapitalize="none" onSubmitEditing={Keyboard.dismiss} onChange={(e) => this.onUsernameChange(e)} style={GlobalStyles.TextInput}>
            {`${this.state.user.nickname}`}
          </TextInput>
        </View>
        <View style={Styles.Separator}>
          <Label style={GlobalStyles.Subtitle} font={Settings.FONTS.HelveticaNeueBold}>First Name</Label>
          <TextInput autoCapitalize="none" onSubmitEditing={Keyboard.dismiss} onChange={(e) => this.onFirstNameChange(e)} style={GlobalStyles.TextInput}>
            {`${this.state.user.firstName}`}
          </TextInput>
        </View>
        <View style={Styles.Separator}>
          <Label style={GlobalStyles.Subtitle} font={Settings.FONTS.HelveticaNeueBold}>Last Name</Label>
          <TextInput autoCapitalize="none" onSubmitEditing={Keyboard.dismiss} onChange={(e) => this.onLastNameChange(e)} style={GlobalStyles.TextInput}>
            {`${this.state.user.lastName}`}
          </TextInput>
        </View>
        <View style={Styles.Separator}>
          <Label style={GlobalStyles.Subtitle} font={Settings.FONTS.HelveticaNeueBold}>Password</Label>
          <TextInput autoCapitalize="none" secureTextEntry={true} onSubmitEditing={Keyboard.dismiss} onChange={(e) => this.onPasswordChange(e)} style={[GlobalStyles.TextInput, Styles.Password]}>
            {`${this.state.user.password}`}
          </TextInput>
          <TextInput autoCapitalize="none" secureTextEntry={true} onSubmitEditing={Keyboard.dismiss} onChange={(e) => this.onPasswordConfirmChange(e)} style={[{marginTop: 10}, GlobalStyles.TextInput, Styles.Password]}>
            {`${this.state.passwordConfirm}`}
          </TextInput>
        </View>
        {this.renderLanguages()}
        <View style={[Styles.ShowLocation, { marginTop: -10 }]}>
          <Label style={GlobalStyles.Subtitle}>Show Location</Label>
          <Switch style={{ marginBottom: 6, marginLeft: 10 }} trackColor={{ false: Colors.Gray3, true: Colors.DopaGreen }} thumbColor={this.state.showLocations ? Colors.DopaGreenLight : Colors.White}
          ios_backgroundColor="#3e3e3e" onValueChange={val => this.setState({ showLocations: val })} value={this.state.showLocations} />
        </View>
        { this.state.showLocations ? (
          <View style={GlobalStyles.Separator}>
            <View style={Styles.LocationContainer}>
              {this.renderCountries()}
              {this.renderCities()}
            </View>
          </View>
        ) : (
          <Label style={GlobalStyles.Info}>When locations are turned off, the search results will be global.</Label>
         )
        }
        {this.renderKeywords()}
        <View style={Styles.LoginButtonContainter}>
          <TouchableHighlight onPress={() => this.save()} onLongPress={() => this.save()} style={Styles.LoginButton} underlayColor={Colors.DopaGreen} >
            <Label font={Settings.FONTS.HelveticaNeueBold} style={Styles.LoginButtonText}>Save</Label>
          </TouchableHighlight>
        </View>           
      </View>
    )
  }

  renderAvatar() {
    return (
      <View style={Styles.AvatarContainer}>
        <View style={Styles.AvatarTextContainer}>
          <Label style={[Styles.Label, { color: Colors.White }]} font={Settings.FONTS.HelveticaNeueBold}>AVATAR</Label>
        </View>
        <View>
          <View style={Styles.NameContainer}>
            <Label style={Styles.Label} font={Settings.FONTS.HelveticaNeueBold}>{this.state.user.firstName} {this.state.user.lastName}</Label>
            <TouchableHighlight onPress={() => this.setState({ isEdit: true })} onLongPress={() => this.setState({ isEdit: true })} underlayColor={Colors.Transparent} >
              <Image style={Styles.Pencil} source={Images.Edit} />
            </TouchableHighlight>
          </View>
          <Label style={Styles.Label} font={Settings.FONTS.HelveticaNeueBold}>#{this.state.user.nickname}</Label>
        </View>
      </View>
    )
  }

  renderLocation() {
    return (
      <View style={Styles.Separator}>
        <Label style={GlobalStyles.Subtitle} font={Settings.FONTS.HelveticaNeueBold}>Location</Label>
        <View style={{flexDirection: 'row'}}>
          <Label font={Settings.FONTS.HelveticaNeueBold}>{this.state.user.cityName}, </Label>
          <Label font={Settings.FONTS.HelveticaNeueBold}>{this.getCountryName(this.state.user.country)}</Label>
        </View>
      </View>
    )
  }
  
  renderKeywords() {
    return (
      <View style={Styles.Separator}>
          <Label style={GlobalStyles.Subtitle} font={Settings.FONTS.HelveticaNeueBold}>Keywords</Label>
          { this.state.isEdit && (
            <View>
              <Label style={GlobalStyles.Info}>Add key words related to your problem. These words will be used for the matching process.</Label>
              <View style={[GlobalStyles.PickerContainer, { marginBottom: 15 }]}>
                <Picker selectedValue={null} style={GlobalStyles.Picker} onValueChange={(itemValue, itemIndex) => itemValue != null ? this.selectKeyword(itemValue) : null}>
                  {this.state.keywords}
                </Picker>
              </View>
            </View>
          ) }
        <SafeAreaView>
         { this.state.isEdit && (<Label style={GlobalStyles.Subtitle}>Selected Keywords: </Label>) }
          <FlatList data={Object.entries(this.state.user.keywords)} keyExtractor={(item, index) => "keyword_" + index} numColumns={0}
            renderItem={(keyword, index) => (
              <View style={[Styles.FlatListItemContainer, { marginBottom: this.state.isEdit ? 15 : 0 }]}>
                <Label font={Settings.FONTS.HelveticaNeueBold}> ▸  {keyword.item[1]} </Label>
                { this.state.isEdit && (
                  <TouchableHighlight onPress={() => this.removeKeyword(keyword)} onLongPress={() => this.removeKeyword(keyword)} style={{ justifyContent: 'center', alignItems: 'center', width: 20, height: 20, borderRadius: 50, backgroundColor: Colors.Red }} underlayColor={Colors.Transparent} >
                    <Label style={{ color: Colors.White, fontWeight: 'bold' }}>X</Label>
                  </TouchableHighlight>
                ) }
              </View>
            )}
          />
        </SafeAreaView>
      </View>
    )
  }

  renderDescription() {
    return (
      <View style={Styles.TextAreaContainer} >
        <Label style={GlobalStyles.Subtitle} font={Settings.FONTS.HelveticaNeueBold}>Description</Label>
        <Label style={[GlobalStyles.TextInput, Styles.TextArea, { backgroundColor: Colors.Gray1 }]}>{this.state.user.description}</Label>
      </View>
    )
  }

  renderProfile() {
    return (
      <View>
        {this.renderAvatar()}
        {this.renderLanguages()}
        {this.renderLocation()}
        {this.renderKeywords()}
        {this.renderDescription()}        
      </View>
    )
  }

  render() {
    return (
      <View style={GlobalStyles.Container}>
        <View style={GlobalStyles.UpperView}>
          <Image style={GlobalStyles.GroupedLogo} source={Images.Logo} />
          <Label style={GlobalStyles.Version} font={Settings.FONTS.HelveticaNeueThin}>v{getVersion()}</Label>
        </View>
        <ScrollView>
          <View style={Styles.MiddleContainer}>
            <Label style={GlobalStyles.PageTitle} font={Settings.FONTS.HelveticaNeueMedium}>Profile</Label>
            { this.state.user != null ? (this.state.isEdit ? this.renderEditProfile() : this.renderProfile()) : null }
          </View>
        </ScrollView>
      </View>      
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatchGetCitiesAction: getCities,
  dispatchGetKeywordsAction: getKeywords,
  dispatchUpdateAccountAction: updateAccount,
  dispatchSetLoadingAction: (showHide) => dispatch(setLoadingAction(showHide))
}, dispatch)

export default connect(null, mapDispatchToProps)(Profile);