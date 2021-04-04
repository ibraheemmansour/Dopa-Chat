import React, { PureComponent } from 'react';
import { View, Image, FlatList, BackHandler, TouchableHighlight } from 'react-native';

import Carousel from 'react-native-snap-carousel';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getVersion } from 'react-native-device-info';
import _ from 'lodash';

import Settings from '../../config/settings.js';
import Colors from '../../config/colors.js';
import Images from '../../config/images.js';

import Label from '../../components/Label';

import { setLoadingAction } from '../../redux/actions/globalActions';

import Styles from './styles.js';
import GlobalStyles from '../../config/globalstyles.js';

class Home extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      people: [{"id":1009,"firstName":"Reem","lastName":"Mansour","nickname":"#C223457","password":"root","email":"reem@cc.com","description":"Test test  test  test  test  test  test  test  test  test  test  test","languages":"en","keywords":"Performance Anxiety","country":"LB","cityId":1422847713},{"id":1011,"firstName":"Fahed","lastName":"Geagea","nickname":"#C567233","password":"root","email":"fahed@lf.com","description":"Test test test test test test test test test test test test test test test test test test test test test test test test test test test test.","languages":"en","keywords":"Performance Anxiety,Insomnia,Depression,Border Line Disorder, Drugs, Beirut Port Explosion","country":"LB","cityId":1422847713},{"id":1012,"firstName":"Hoda","lastName":"Ghamlouch","nickname":"#MG33125","password":"root","email":"hoda@fouani.com","description":"Test test test test test test test test test test test test test test.","languages":"en","keywords":"Performance Anxiety","country":"LB","cityId":1422847713}],
    }
  }

  async componentDidMount() {
    this.props.dispatchSetLoadingAction(false);
    //this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    //this.setState({ people: this.props.navigation.state.params.people });
  }

  handleBackPress = () => {
    BackHandler.exitApp();
    return true;
  }

  chat() {

  }

  renderSelectedKeywords(person) {
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
          {this.renderSelectedKeywords(item)}
          <Label style={Styles.SubTitleText} font={Settings.FONTS.HelveticaNeueMedium}>Description</Label>
          <View style={Styles.DescriptionContainer}>
            <Label style={{ textAlign: 'justify' }} font={Settings.FONTS.HelveticaNeueMedium}>{item.description}</Label>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={GlobalStyles.Container}>
        <View style={GlobalStyles.UpperView}>
          <Image style={GlobalStyles.GroupedLogo} source={Images.Logo} />
          <Label style={GlobalStyles.Version} font={Settings.FONTS.HelveticaNeueThin}>v{getVersion()}</Label>
        </View>
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
}

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatchSetLoadingAction: (showHide) => dispatch(setLoadingAction(showHide))
}, dispatch)

export default connect(null, mapDispatchToProps)(Home);