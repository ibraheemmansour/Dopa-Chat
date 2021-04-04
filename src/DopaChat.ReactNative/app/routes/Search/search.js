import React, { PureComponent } from 'react';
import { View, Image, Switch, FlatList, BackHandler, TouchableHighlight, Alert } from 'react-native';
import { Picker } from "@react-native-community/picker";
import CheckBox from '@react-native-community/checkbox';

import { bindActionCreators } from 'redux';
import Carousel from 'react-native-snap-carousel';
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

import Styles from './styles';
import GlobalStyles from '../../config/globalstyles.js';

class Search extends PureComponent {
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
      showResults: false,
      showLocation: true,
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
      if (keywords_data == null) {
        app.props.dispatchSetLoadingAction(false);
        Alert.alert('Connection Error', 'An error has occured, please try again.', [{ text: 'OK' }], { cancelable: true });
      }
      else if (keywords_data.length > 0 && app.state.user.keywords != null) {
        let keywords = [];
        keywords_data.forEach(keyword => {
          app.state.user.keywords.split(',').forEach(element => {
            if (keyword.id == element) {
                keywords.push({ key: keyword.id, id: keyword.id, title: keyword.title, value: true });
              }
            });
          });
          app.setState({ keywords: keywords });
          app.props.dispatchSetLoadingAction(false);
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
          app.setState({ people: data, showResults: true });
        } else {
          Alert.alert('No Results', 'There are no people matching your search criteria.', [{ text: 'OK' }], { cancelable: true });
        }
      }
      else {
        console.log(error);
      }
    });
  }

  renderResultSelectedKeywords(person) {
    let keywords = person.keywords.split(',');
    return (
    <FlatList data={keywords} keyExtractor={(item, index) => "keyword_" + index} numColumns = {2}
      renderItem={(keyword, index) => (
        <Label font={Settings.FONTS.HelveticaNeueBold}>{keyword.item}</Label>
      )}
    />
    )
  }

  renderPerson = ({item, index}) => {
    return (
      <TouchableHighlight underlayColor={Colors.Transparent}>
        <View style={[Styles.PersonContainer]}>
          <Label font={Settings.FONTS.HelveticaNeueBold} style={{ fontSize: Settings.IsTablet ? 23 : 21 }}>{item.nickname}</Label>
          <Label style={Styles.SubTitleText} font={Settings.FONTS.HelveticaNeueMedium}>Keywords</Label>
          {this.renderResultSelectedKeywords(item)}
          <Label style={Styles.SubTitleText} font={Settings.FONTS.HelveticaNeueMedium}>Description</Label>
          <View style={Styles.DescriptionContainer}>
            <Label style={{ textAlign: 'justify' }} font={Settings.FONTS.HelveticaNeueMedium}>{item.description}</Label>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  renderResults() {
    return (
      <View>
        <View>
          <Label style={GlobalStyles.PageTitle} font={Settings.FONTS.HelveticaNeueMedium}>Results</Label>
          <Carousel ref={(c) => { this._carousel = c; }} data={this.state.people} renderItem={this.renderPerson} 
           sliderWidth={Settings.WindowWidth} itemWidth={Settings.WindowWidth / 1.3} />
        </View>
        <View style={{ flex: 1, marginBottom: Settings.WindowHeight / 15, alignItems: 'center', justifyContent: 'flex-end' }}>
          <TouchableHighlight onPress={() => this.chat()} onLongPress={() => this.createAccount()} style={Styles.ChatButton} underlayColor={Colors.DopaGreen} >
            <View style={{flexDirection: 'row'}}>
              <Label font={Settings.FONTS.HelveticaNeueBold} style={[Styles.ChatButtonText, {fontWeight: 'bold'}]}>Dopa </Label>
              <Label font={Settings.FONTS.HelveticaNeueBold} style={[Styles.ChatButtonText]}>Chat</Label>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  renderCountries() {
    return (
      <View>
        <Label style={GlobalStyles.TextFieldPretext} font={Settings.FONTS.HelveticaNeueBold}>Country</Label>
        <Picker selectedValue={this.state.selected_country} style={{ backgroundColor: Colors.White, borderColor: Colors.DopaGreen, borderWidth: 5, width: Settings.WindowWidth / 3, height: 50 }} onValueChange={(itemValue, itemIndex) => console.log("Country: " + itemValue)}>
          {this.state.countries}
        </Picker>
      </View>
    )
  }

  renderCities() {
    return (
      <View>
        <Label style={GlobalStyles.TextFieldPretext} font={Settings.FONTS.HelveticaNeueBold}>City</Label>
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
    return keywords;
  }

  renderSearch() {
    return (
      <View>
        <View style={Styles.MiddleContainer}>
        <Label style={GlobalStyles.PageTitle} font={Settings.FONTS.HelveticaNeueMedium}>Matching</Label>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Label style={[GlobalStyles.TextFieldPretext, { marginBottom: 10 }]} font={Settings.FONTS.HelveticaNeueBold}>Show Location</Label>
          <Switch trackColor={{ false: Colors.Gray3, true: Colors.DopaGreen }} thumbColor={this.state.showLocation ? Colors.DopaGreenLight : Colors.White}
          ios_backgroundColor="#3e3e3e" onValueChange={val => this.setState({ showLocation: val })} value={this.state.showLocation} />
        </View>
        { this.state.showLocation && 
          (<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {this.renderCountries()}
            {this.renderCities()}
          </View> )
        }
        <View>
          <View style={GlobalStyles.Separator}></View>
          <Label style={GlobalStyles.TextFieldPretext} font={Settings.FONTS.HelveticaNeueBold}>Keywords</Label>
          {this.renderSelectedKeywords()}       
        </View>
      </View>          
      <View style={{ flex: 1, marginBottom: Settings.WindowHeight / 15, alignItems: 'center', justifyContent: 'flex-end' }}>
        <TouchableHighlight onPress={() => this.searchPeople()} onLongPress={() => this.searchPeople()} style={Styles.LoginButton} underlayColor={Colors.DopaGreen} >
          <Label font={Settings.FONTS.HelveticaNeueBold} style={[Styles.LoginButtonText]}>Search</Label>
        </TouchableHighlight>
      </View>
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
        { this.state.showResults ? this.renderResults() : this.renderSearch() }
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

export default connect(null, mapDispatchToProps)(Search);