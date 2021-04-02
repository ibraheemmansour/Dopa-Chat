import React, { PureComponent } from 'react';
import { View, Image, FlatList, BackHandler, TouchableHighlight } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getVersion } from 'react-native-device-info';
import _ from 'lodash';

import Settings from '../../config/settings.js';
import Colors from '../../config/colors.js';
import Images from '../../config/images.js';
import { searchPeople, getUser, getCities, getKeywords } from '../../config/client.js';

import Label from '../../components/Label';

import { setLoadingAction } from '../../redux/actions/globalActions';

import Styles from './styles.js';

class Home extends PureComponent {
  constructor (props) {
    super(props);
    console.log(props);
    console.log(this);
    this.state = {
      people: [{"id":1009,"firstName":"Reem","lastName":"Mansour","nickname":"reem1992","password":"root","email":"reem@cc.com","description":"I'm an alci","languages":"en","keywords":"Performance Anxiety","country":"LB","cityId":1422847713},{"id":1011,"firstName":"Fahed","lastName":"Geagea","nickname":"fahed1990","password":"root","email":"fahed@lf.com","description":"Ana fene2e. Fuck me I hate my fucking life, i want to kill everybody and drink their blood and shit on their graves and piss on their corpses. I want to fuck their corpses and impale them on my pepe.","languages":"en","keywords":"Performance Anxiety,Insomnia,Depression,Border Line Disorder, Beirut 2020 Port Explosion","country":"LB","cityId":1422847713},{"id":1012,"firstName":"Hoda","lastName":"Ghamlouch","nickname":"mazen_1966","password":"root","email":"hoda@fouani.com","description":"Help me! I want to fuck everything that moves.","languages":"en","keywords":"Performance Anxiety","country":"LB","cityId":1422847713}],
      selectedPersonIndex: 0
    }
  }

  async componentDidMount() {
    this.props.dispatchSetLoadingAction(false);
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    BackHandler.exitApp();
    return true;
  }

  swipe(direction) {
    let index = this.state.selectedPersonIndex;
    if (direction == "left" && this.state.selectedPersonIndex > 0) {
      this.setState({ selectedPersonIndex: --index });
    } 
    else if (direction == "right" && this.state.selectedPersonIndex < this.state.people.length - 1) {
      this.setState({ selectedPersonIndex: ++index });
    }
  }

  chat() {

  }

  renderSelectedKeywords() {
    let keywords = this.state.people[this.state.selectedPersonIndex].keywords.split(',');
    return (
    <FlatList data={keywords} keyExtractor={(item, index) => "keyword_" + index} numColumns = {2}
         renderItem={(keyword) => (
          <View style={{backgroundColor: Colors.Gray2, marginLeft: 10, marginBottom: 10}}>
            <Label font={Settings.FONTS.HelveticaNeueBold}>{keyword.item}</Label>
          </View>
         )}
       />
     )
  }

  renderDescription() {
    let person = this.state.people[this.state.selectedPersonIndex];
    return (
      <View style={Styles.Description}>
        <Label style={{ textAlign: 'justify' }} font={Settings.FONTS.HelveticaNeueMedium}>{person.description}</Label>
      </View>
    )
  }

  renderSwiper() {
    return (
        <View style={Styles.RemoteControlContainer}>           
           <View style={Styles.RemoteControlRow}>
            <TouchableHighlight underlayColor={Colors.Transparent} onPress={() => this.swipe("left")} style={Styles.SwiperInnerBodyLefty}>
              <Image source={Images.ArrowH} style={{ transform: [{rotate: '180deg'}], marginRight: Settings.WindowWidth / 72, width: 33, height: 189 }}/>
            </TouchableHighlight>
            <TouchableHighlight underlayColor={Colors.Transparent}>
              <View style={[Styles.SwiperInnerBody]}>
                <Label font={Settings.FONTS.HelveticaNeueBold} style={{ width: 200, position: 'absolute', zIndex: 99, paddingTop: 15, paddingLeft: 10, fontSize: Settings.IsTablet ? 23 : 21 }}>{this.state.people[this.state.selectedPersonIndex].nickname}</Label>
              </View>
            </TouchableHighlight>
            <TouchableHighlight underlayColor={Colors.Transparent} onPress={() => this.swipe("right")}>
              <Image source={Images.ArrowH} style={{ marginLeft: Settings.WindowWidth / 72, width: 33, height: 189 }}/>
            </TouchableHighlight>
           </View>
        </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.BackgroundColor, paddingTop: Settings.WindowHeight / 120 }}>
        <View style={Styles.UpperView}>
          <Image style={Styles.GroupedLogo} source={Images.Logo} />
          <Label style={Styles.Version} font={Settings.FONTS.HelveticaNeueThin}>{getVersion()}</Label>
        </View>
        <View style={Styles.MiddleContainer}>
          <Label style={Styles.Title} font={Settings.FONTS.HelveticaNeueMedium}>Results</Label>
          <View style={Styles.OnTop}>
            {this.renderSelectedKeywords()}
            {this.renderDescription()}
           </View>
          {this.renderSwiper()}
          <View style={Styles.ChatButtonContainter}>
            <TouchableHighlight onPress={() => this.chat()} onLongPress={() => this.createAccount()} style={Styles.ChatButton} underlayColor={Colors.DopaGreen} >
              <Label font={Settings.FONTS.HelveticaNeueBold} style={[Styles.ChatButtonText]}>Chat</Label>
            </TouchableHighlight>
          </View>
        </View>
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