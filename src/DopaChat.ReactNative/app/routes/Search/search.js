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
    if (this.state.showResults) {
      this.setState( { showResults: false } );
    }
    else {
      BackHandler.exitApp();
    }
    return true;
  }

  async getUser() {
    this.props.dispatchSetLoadingAction(true);
    let app = this;
    await this.props.dispatchGetUserAction(Settings.User.id, function (user_data, error, response) {
      if (user_data) {
        app.setState({ selected_country: user_data.country, user: user_data });
        app.getSelectedCountryCities(user_data.country);
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
        app.setState({ cities: cities, selected_country: country, selected_city: cities_data[0].Id });
        app.populateKeywords();
      }
      else {
        app.props.dispatchSetLoadingAction(false);
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
      else if (keywords_data.length > 0 && Settings.User.keywords != null) {
        let keywords = [];
        keywords_data.forEach(keyword => {
          Settings.User.keywords.split(',').forEach(element => {
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

  chat() {

  }

  async onCountryChange(country) {
    this.setState({ selected_country: country });
    await this.getSelectedCountryCities(country);
  }

  onCityChange(city) {
    this.setState({ selected_city: city });
  }

  async searchPeople() {
    let app = this;
    app.props.dispatchSetLoadingAction(true);

    var searchQuery = { 
      id: Settings.User.id,
      showLocation: this.state.showLocation,
      country: this.state.selected_country,
      city: this.state.selected_city,
      keywords: this.state.keywords.filter(keyword => { return keyword.value == true })
    };

    console.log(searchQuery);

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
        app.props.dispatchSetLoadingAction(false);
        console.log(error);
      }
    });
  }

  renderResultSelectedKeywords(person) {
    let keywords = person.keywords.split(',');
    return (
    <FlatList data={keywords} keyExtractor={(item, index) => "keyword_" + index} numColumns = {2}
      renderItem={(keyword, index) => (
        <Label style={{ paddingRight: 20 }} font={Settings.FONTS.HelveticaNeueBold}>{keyword.item}</Label>
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
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Label style={GlobalStyles.PageTitle} font={Settings.FONTS.HelveticaNeueMedium}>Results</Label>
          <Carousel ref={(c) => { this._carousel = c; }} data={this.state.people} renderItem={this.renderPerson} 
           sliderWidth={Settings.WindowWidth} itemWidth={Settings.WindowWidth / 1.3} />
        </View>
        <View style={[Styles.LowerContainter, { flexDirection: 'row', justifyContent: 'space-around' }]}>
          <TouchableHighlight onPress={() => this.chat()} onLongPress={() => this.createAccount()} style={Styles.DopaChatButton} underlayColor={Colors.DopaGreen} >
            <View style={{flexDirection: 'row'}}>
              <Label font={Settings.FONTS.HelveticaNeueBold} style={[Styles.DopaChatButtonText, {fontWeight: 'bold'}]}>Dopa </Label>
              <Label font={Settings.FONTS.HelveticaNeueBold} style={[Styles.DopaChatButtonText]}>Chat</Label>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.setState({ showResults: false })} onLongPress={() => this.setState({ showResults: false })} style={Styles.DopaChatButton} underlayColor={Colors.DopaGreen} >
            <View style={{flexDirection: 'row'}}>
              <Label font={Settings.FONTS.HelveticaNeueBold} style={[Styles.DopaChatButtonText]}>Back</Label>
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
        <Picker selectedValue={this.state.selected_country} style={Styles.Picker} onValueChange={(itemValue, itemIndex) => this.onCountryChange(itemValue)}>
          {this.state.countries}
        </Picker>
      </View>
    )
  }

  renderCities() {
    return (
      <View>
        <Label style={GlobalStyles.TextFieldPretext} font={Settings.FONTS.HelveticaNeueBold}>City</Label>
        <Picker selectedValue={this.state.selected_city} style={Styles.Picker} onValueChange={(itemValue, itemIndex) => this.onCityChange(itemValue)}>
          {this.state.cities}
        </Picker>
      </View>
    )
  }

  renderSelectedKeywords() {
    return (
      <FlatList data={this.state.keywords} keyExtractor={(item, index) => "keyword_" + index} numColumns = {3}
        renderItem={(keyword, index) => (
          <View key={keyword.id} style={{flexDirection: 'row', alignItems: 'center'}}>
            <CheckBox key={keyword.item.id} value={keyword.item.value} onValueChange={(itemValue, itemIndex) => this.checkboxChange(keyword.item.id)} style={Styles.Checkbox}/>
            <Label font={Settings.FONTS.HelveticaNeueBold}>{keyword.item.title}</Label>
          </View>
        )}
      />
    );
  }

  renderSearch() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
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
        </View>
        <View style={Styles.LowerContainter}>
          <TouchableHighlight onPress={() => this.searchPeople()} onLongPress={() => this.searchPeople()} style={Styles.DopaChatButton} underlayColor={Colors.DopaGreen} >
            <Label font={Settings.FONTS.HelveticaNeueBold} style={[Styles.DopaChatButtonText]}>Search</Label>
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