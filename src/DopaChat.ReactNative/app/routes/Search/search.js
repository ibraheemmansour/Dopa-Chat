import React, { PureComponent } from 'react';
import { View, Image, Switch, FlatList, SafeAreaView, RefreshControl, ScrollView, BackHandler, ActivityIndicator, TouchableHighlight, Alert } from 'react-native';
import { Picker } from "@react-native-community/picker";

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

import { store } from '../../redux/store/store';
import Label from '../../components/Label';

import { setLoadingAction } from '../../redux/actions/globalActions';

import Styles from './styles';
import GlobalStyles from '../../config/globalstyles.js';

class Search extends PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      user: store.getState().loginReducer.user,
      showResults: false,
      showLocation: true,
      isReady: false,
      isRefreshing: false,
      countries: [],
      selected_country: store.getState().loginReducer.user.country,
      cities: [],
      selected_city: store.getState().loginReducer.user.city,
      people: []
    }
  }

  async componentDidMount() {
    this.props.dispatchSetLoadingAction(false);
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    this.getSelectedCountryCities(this.state.selected_country, this.state.selected_city);
    this.populateKeywords();
    this.populateCountries();
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

  populateKeywords(data) {
    let user = {...this.state.user};
    let keywords = {};
    Object.entries(data == undefined ? user.keywords : data).forEach(keyword => {
      keywords[keyword[0]] = { title: keyword[1], isSelected: true};
    });
    user.keywords = keywords;
    this.setState({ user: user });
  }

  populateCountries() {
    let countries = [];
    Countries.forEach(country =>
    {
      countries.push(<Picker.Item key={country.code} label={country.name} value={country.code}/>);
    });
    this.setState({ countries: countries, isReady: true });
  }

  async getSelectedCountryCities(country, city) {
    let app = this;
    await this.props.dispatchGetCitiesAction(country, function (cities_data, error, response) {
      if (cities_data) {
        let cities = [];
        cities_data.forEach(city =>
        {
          cities.push(<Picker.Item key={city.Id} label={city.CityName} value={city.Id}/>);
        });
        app.setState({ cities: cities, selected_country: country, selected_city: city == undefined ? cities_data[0].Id : city });
      }
      else {
        app.props.dispatchSetLoadingAction(false);
        Alert.alert('Connection Error', 'An error has occured, please try again.', [{ text: 'OK' }], { cancelable: true });
      }
    });    
  }

  selectKeyword(id) {
    let keywords = {...this.state.user.keywords};
    Object.entries(keywords).forEach(keyword => {
      if (keyword[0] == id)
      {
        keyword[1].isSelected = !keyword[1].isSelected;
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

  async onRefresh() {
    let app = this;
    await this.props.dispatchGetUserAction(this.state.user.nickname, function (data, error, response) {
      app.props.dispatchSetLoadingAction(false);
      if (data) {
        app.setState({ user: data, isRefreshing: false });
        app.populateKeywords(data.keywords.split(","));
      }
      else {
        app.props.dispatchSetLoadingAction(false);
        Alert.alert('Unknown Error', 'An unknown error occured during refresh. Please try again.', [{ text: 'OK' }], { cancelable: true });
        console.log(error);
      }
    });
  }

  async searchPeople() {
    let app = this;
    app.props.dispatchSetLoadingAction(true);

    var searchQuery = { 
      id: this.state.user.id,
      showLocation: this.state.showLocation,
      country: this.state.selected_country,
      city: this.state.selected_city,
      keywords: []
    };

    Object.entries(this.state.user.keywords).forEach(keyword => {
      if (keyword[1].isSelected) {
        searchQuery.keywords.push({id: keyword[0], title: keyword[1].title});
      }
    });

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
              <Label font={Settings.FONTS.HelveticaNeueBold} style={[Styles.DopaChatButtonText, {fontWeight: 'bold'}]}>Dopa</Label>
              <Label font={Settings.FONTS.HelveticaNeueBold} style={[Styles.DopaChatButtonText]}>Chat</Label>
            </View>
          </TouchableHighlight>
          {/* <TouchableHighlight onPress={() => this.setState({ showResults: false })} onLongPress={() => this.setState({ showResults: false })} style={Styles.DopaChatButton} underlayColor={Colors.DopaGreen} >
            <View style={{flexDirection: 'row'}}>
              <Label font={Settings.FONTS.HelveticaNeueBold} style={[Styles.DopaChatButtonText]}>Back</Label>
            </View>
          </TouchableHighlight> */}
        </View>
      </View>
    );
  }

  renderCountries() {
    return (
      <View>
        <Label style={GlobalStyles.Subtitle} font={Settings.FONTS.HelveticaNeueBold}>Country</Label>
        <View style={GlobalStyles.PickerContainer}>
          <Picker selectedValue={this.state.selected_country} style={[GlobalStyles.Picker, Styles.Picker]} onValueChange={(itemValue, itemIndex) => this.onCountryChange(itemValue)}>
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
          <Picker selectedValue={this.state.selected_city} style={Styles.Picker} onValueChange={(itemValue, itemIndex) => this.onCityChange(itemValue)}>
            {this.state.cities}
          </Picker>
        </View>
      </View>
    )
  }

  renderKeywords() {
    return (
      <FlatList data={Object.entries(this.state.user.keywords)} keyExtractor={(item, index) => "keyword_" + index} numColumns = {0}
        renderItem={(keyword, index) => (
          <TouchableHighlight style={{ padding: 10, backgroundColor: keyword.item[1].isSelected ? Colors.Gray6 : Colors.Transparent, marginBottom: 10 }} onPress={() => this.selectKeyword(keyword.item[0])} onLongPress={() => this.selectKeyword(keyword.item[0])} underlayColor={Colors.Transparent} >
            <View key={keyword} style={{justifyContent: 'center'}}>
              <Label font={Settings.FONTS.HelveticaNeueBold}>▸  {keyword.item[1].title} </Label>
            </View>
          </TouchableHighlight>
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
              <Label style={GlobalStyles.Subtitle} font={Settings.FONTS.HelveticaNeueBold}>Show Location</Label>
              <Switch trackColor={{ false: Colors.Gray3, true: Colors.DopaGreen }} thumbColor={this.state.showLocation ? Colors.DopaGreenLight : Colors.White}
              ios_backgroundColor="#3e3e3e" onValueChange={val => this.setState({ showLocation: val })} value={this.state.showLocation} />
            </View>
            { this.state.showLocation && 
              (<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                {this.renderCountries()}
                {this.renderCities()}
              </View> )
            }
            { !this.state.showLocation && 
              <Label style={GlobalStyles.Info} font={Settings.FONTS.HelveticaNeueBold}>When locations are turned off, the search results will be global.</Label>
            }
            <View>
              <View style={GlobalStyles.Separator}></View>
              <Label style={GlobalStyles.Subtitle} font={Settings.FONTS.HelveticaNeueBold}>Keywords</Label>
              {this.renderKeywords()}       
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

  renderBusyIndicator() {
    return (
      <ActivityIndicator style={{ marginTop: Settings.WindowHeight / 50 }} animating={true} size={Settings.IsTablet ? "large" : "small"} color={Colors.DopaGreen} />
    )
  }

  render() {
    return (
      <View style={GlobalStyles.Container}>
        <View style={GlobalStyles.UpperView}>
          <Image style={GlobalStyles.GroupedLogo} source={Images.Logo} />
          <Label style={GlobalStyles.Version} font={Settings.FONTS.HelveticaNeueThin}>v{getVersion()}</Label>
        </View>
        <ScrollView refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={() => this.onRefresh()}></RefreshControl>} >
          { this.state.showResults ? this.renderResults() : this.state.isReady ? this.renderSearch() : this.renderBusyIndicator() }
        </ScrollView>
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