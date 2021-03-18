import React, { PureComponent } from 'react';
import { View, Image, KeyboardAvoidingView, ScrollView, FlatList, BackHandler, TouchableHighlight, Alert } from 'react-native';
import { Picker } from "@react-native-community/picker";
import CheckBox from '@react-native-community/checkbox';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getVersion } from 'react-native-device-info';
import _ from 'lodash';

import Settings from '../../config/settings.js';
import Colors from '../../config/colors.js';
import Images from '../../config/images.js';
import { searchPeople, getUser, getCities, getKeywords } from '../../config/client.js';

import Countries from '../../data/countries.json';

import Label from '../../components/Label';

import { setLoadingAction } from '../../redux/actions/globalActions';

import Styles from './styles.js';

class Home extends PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      user: {
        id: 5,
        firstName: null,
        lastName: null,
        nickname: null,
        email: null,
        description: null,
        languages: null,
        keywords: null,
        cityId: null,
        country: null
      },
      countries: [],
      selected_country: null,
      cities: [],
      selected_city: null,
      keywords: [],
      people: []
    }
  }

  async componentDidMount() {
    this.props.dispatchSetLoadingAction(false);
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    this.populateCountries();
    await this.getUser();
  }

  handleBackPress = () => {
    BackHandler.exitApp();
    return true;
  }

  async getUser() {
    this.props.dispatchSetLoadingAction(true);
    let app = this;
    await this.props.dispatchGetUserAction(this.state.user.id, function (user_data, error, response) {
      if (user_data) {
        app.setState({ selected_country: user_data.country, user: user_data });
        app.getSelectedCountryCities(user_data.country);
      }
      else {
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
    this.setState({ countries: countries });
  }

  async getSelectedCountryCities(country) {
    let app = this;
    await this.props.dispatchGetCitiesAction(country, function (cities_data, error, response) {
      if (cities_data) {
        let cities = [];
        cities_data.forEach(city =>
        {
          cities.push(<Picker.Item key={city.Id} label={city.CityName} value={city.Id}/>);
        });
        app.setState({ cities: cities, selected_country: country, selected_city: app.state.user.cityId });
        app.populateKeywords();
      }
      else {
        Alert.alert('Connection Error', 'An error has occured, please try again.', [{ text: 'OK' }], { cancelable: true });
      }
    });    
  }

  async populateKeywords() {
    let app = this;
    await this.props.dispatchGetKeywordsAction(function (keywords_data, error, response) {
      app.props.dispatchSetLoadingAction(false);
      if (keywords_data == null) {
        Alert.alert('Connection Error', 'An error has occured, please try again.', [{ text: 'OK' }], { cancelable: true });
      }
      else if (keywords_data.length > 0 && app.state.user.keywords != null) {
        let keywords = [];
        keywords_data.forEach(keyword => {
          app.state.user.keywords.split(',').forEach(element => {
            if (keyword.id == element) {
                keywords.push({ id: keyword.id, title: keyword.title, value: true });
              }
            });
          });
          app.setState({ keywords: keywords });
        }     
    });    
  }

  checkboxChange(id) {
    let keywords = _.cloneDeep(this.state.keywords);
    keywords.forEach(keyword => {
      if (keyword.id == id)
      {
        keyword.value = !keyword.value;
      }
    });
    this.setState({ keywords: keywords });
  }

  async searchPeople() {
    let app = this;
    app.props.dispatchSetLoadingAction(true);
    app.setState({ people: [] });

    var searchQuery = { 
      id: this.state.user.id,
      country: this.state.selected_country,
      city: this.state.selected_city,
      keywords: this.state.keywords.filter(keyword => { return keyword.value == true })
    };

    await this.props.dispatchSearchPeopleAction(searchQuery, function (data, error, response) {
      app.props.dispatchSetLoadingAction(false);
      if (data) {
        if (data.length > 0)
        {
          app.setState({ people: data });
        } else {
          Alert.alert('No Results', 'There are no people matching your search criteria.', [{ text: 'OK' }], { cancelable: true });
        }
      }
      else {
        console.log(error);
      }
    });
  }

  onClickPerson(person) {
    console.log(person);
  }

  renderCountries() {
    return (
      <View>
        <Label style={Styles.UsernamePretext} font={Settings.FONTS.HelveticaNeueBold}>COUNTRY</Label>
        <Picker selectedValue={this.state.selected_country} style={{ backgroundColor: Colors.White, borderColor: Colors.DopaGreen, borderWidth: 5, width: Settings.WindowWidth / 3, height: 50 }} onValueChange={(itemValue, itemIndex) => console.log("Country: " + itemValue)}>
          {this.state.countries}
        </Picker>
      </View>
    )
  }

  renderCities() {
    return (
      <View>
        <Label style={Styles.UsernamePretext} font={Settings.FONTS.HelveticaNeueBold}>CITY</Label>
        <Picker selectedValue={this.state.selected_city} style={{ backgroundColor: Colors.White, borderColor: Colors.DopaGreen, borderWidth: 5, width: Settings.WindowWidth / 3, height: 50 }} onValueChange={(itemValue, itemIndex) => console.log(itemValue)}>
          {this.state.cities}
        </Picker>
      </View>
    )
  }

  renderSelectedKeywords() {
    let keywords = [];
    this.state.keywords.forEach(keyword => {
      keywords.push(
        <View style={{flexDirection: 'row'}}>
          <CheckBox key={keyword.id} value={keyword.value} onValueChange={(itemValue, itemIndex) => this.checkboxChange(keyword.id)} style={Styles.Checkbox}/>
          <Label font={Settings.FONTS.HelveticaNeueBold}>{keyword.title}</Label>
        </View>
      );
    });
    return (
      <View>
        <View style={Styles.Separator}></View>
        <Label style={Styles.UsernamePretext} font={Settings.FONTS.HelveticaNeueBold}>KEYWORDS</Label>
        {keywords}
      </View>
    );
  }

  renderPeople() {
    return (
      <FlatList data={this.state.people} keyExtractor={(item, index) => "person_" + index} numColumns = {3}
         renderItem={(person) => (
           <TouchableHighlight style={[Styles.PersonTouchable]} onPress={() => this.onClickPerson(person.item)} underlayColor="transparent">
            <View>
               <View style={[Styles.PersonContainer]}>
                 <Label style={[Styles.PersonTitle]}>{person.item.firstName} {person.item.lastName}</Label>
               </View>
             </View>
           </TouchableHighlight>
         )}
       />
    )
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.BackgroundColor, paddingTop: Settings.WindowHeight / 120 }}>
        <KeyboardAvoidingView keyboardVerticalOffset={30} behavior="position">
          <View style={Styles.UpperView}>
            <Image style={Styles.GroupedLogo} source={Images.Logo} />
            <Label style={Styles.Version} font={Settings.FONTS.HelveticaNeueThin}>{getVersion()}</Label>
          </View>
          <View style={Styles.MiddleContainer}>
            <Label style={Styles.Title} font={Settings.FONTS.HelveticaNeueMedium}>Matching</Label>
            <View>
              <View style={Styles.CredentialSeparator}></View>
              <View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  {this.renderCountries()}
                  {this.renderCities()}
                </View>
              </View>
            </View>
            {this.renderSelectedKeywords()}              
          </View>
          <View style={{ alignItems: 'center', marginTop: Settings.WindowHeight / 50, marginBottom: Settings.WindowHeight / 50 }}>
            <TouchableHighlight onPress={() => this.searchPeople()} onLongPress={() => this.searchPeople()} style={Styles.LoginButton} underlayColor={Colors.DopaGreen} >
              <Label font={Settings.FONTS.HelveticaNeueBold} style={[Styles.LoginButtonText]}>Search</Label>
            </TouchableHighlight>
          </View>
          {this.renderPeople()}
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatchGetUserAction: getUser,
  dispatchGetCitiesAction: getCities,
  dispatchGetKeywordsAction: getKeywords,
  dispatchSearchPeopleAction: searchPeople,
  dispatchSetLoadingAction: (showHide) => dispatch(setLoadingAction(showHide))
}, dispatch)

export default connect(null, mapDispatchToProps)(Home);