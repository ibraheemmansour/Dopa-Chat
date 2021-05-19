import React, { PureComponent } from 'react';
import { View, Image, FlatList, ActivityIndicator, BackHandler, Alert } from 'react-native';
import { Picker } from "@react-native-community/picker";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getVersion } from 'react-native-device-info';
import _ from 'lodash';

import Settings from '../../config/settings.js';
import Colors from '../../config/colors.js';
import Images from '../../config/images.js';
import { getAssistants } from '../../config/client.js';

import Countries from '../../data/countries.json';

import { store } from '../../redux/store/store';
import Label from '../../components/Label';

import { setLoadingAction } from '../../redux/actions/globalActions';

import Styles from './styles.js';
import GlobalStyles from '../../config/globalstyles.js';

class SeekProfessionalHelp extends PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      user: store.getState().loginReducer.user,
      assistants: [],
      countries: [],
      selected_country: null,
      isReady: false,
    }
  }

  async componentDidMount() {
    this.props.dispatchSetLoadingAction(false);
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    let app = this;

    if (this.state.selected_country == null) 
    {
      this.setState({ selected_country: app.state.user.country }, async () => {
        this.populateCountries();
        await this.getAssistants();
      });
    }
  }

  handleBackPress = () => {
    BackHandler.exitApp();
    return true;
  }

  populateCountries() {
    let countries = [];
    Countries.forEach(country =>
    {
      countries.push(<Picker.Item key={country.code} label={country.name} value={country.code}/>);
    });
    this.setState({ countries: countries });
  }

  async getAssistants() {
    let app = this;
    
    await this.props.dispatchGetAssistantsByCountryAction(this.state.selected_country, function (data, error, response) {
      if (data) {
        app.setState({ assistants: data, isReady: true });
      }
      else {
        Alert.alert('Connection Error', 'An error has occured, please try again.', [{ text: 'OK' }], { cancelable: true });
      }
    });  
  }

  async onCountryChange(country) {
    this.setState({ selected_country: country, assistants: [] }, async () => {
      this.setState({ isReady: false });
      await this.getAssistants(country);
    });
  }

  renderCountries() {
    return (
      <View style={GlobalStyles.PickerContainer}>
        <Picker selectedValue={this.state.selected_country} style={GlobalStyles.Picker} onValueChange={(itemValue, itemIndex) => this.onCountryChange(itemValue)}>
          {this.state.countries}
        </Picker>
      </View>
    )
  }

  renderProfilePicture(assistant) {
    if (assistant.item.ProfilePicture != null) {
      return (
        <Image style={{ width: 54, height: 54, borderRadius: 50 }} source={{uri: Settings.ROOT_URI + "Images/" + assistant.item.ProfilePicture }} />   
      )
    }
    else {
      return (
        <View style={{ width: 54, height: 54, fontSize: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 50, backgroundColor: Colors.Gray0 }}>
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
          <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: 15 }}>
            <View style={{ width: 55, height: 55, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.DopaBlack, borderRadius: 50 }}>
              { this.renderProfilePicture(assistant) }
            </View>
            <View style={{ marginLeft: 10 }}>
              <Label style={{ fontSize: 13 }} font={Settings.FONTS.HelveticaNeueBold}>{assistant.item.Name}</Label>
              <View style={{ flexDirection: 'row' }}>
                <Label style={{ fontSize: 13 }} font={Settings.FONTS.HelveticaNeueBold}>{assistant.item.Address} ({assistant.item.CityName})</Label>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Label style={{ fontSize: 13 }} font={Settings.FONTS.HelveticaNeueBold}>{assistant.item.Telephone}</Label>
              </View>
            </View>
          </View>
        )}
      />
    )
  }

  renderNoResults() {
    return (
      <View style={{ marginTop: Settings.WindowHeight / 50 }}>
        <Label font={Settings.FONTS.HelveticaNeueMedium}>No results found.</Label>
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
        <View style={Styles.MiddleContainer}>
          <Label style={GlobalStyles.PageTitle} font={Settings.FONTS.HelveticaNeueMedium}>Seek Professional Help</Label>
          {this.renderCountries()}
          {this.state.assistants.length > 0 ? this.renderAssistants() : this.state.isReady ? this.renderNoResults() : this.renderBusyIndicator() }
        </View>          
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatchGetAssistantsByCountryAction: getAssistants,
  dispatchSetLoadingAction: (showHide) => dispatch(setLoadingAction(showHide)),
}, dispatch)

export default connect(null, mapDispatchToProps)(SeekProfessionalHelp);