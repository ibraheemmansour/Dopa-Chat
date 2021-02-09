import React, { PureComponent } from 'react';
import { View, ActivityIndicator } from 'react-native';

import Overlay from 'react-native-modal-overlay';
import { connect } from 'react-redux';

import GlobalStyles from '../../config/globalstyles.js';
import Settings from '../../config/settings.js';

import Label from '../Label.js';

class BusyIndicator extends PureComponent {
  render() {
    return (
      <Overlay visible={this.props.loading} childrenWrapperStyle={GlobalStyles.OverallWrapperStyle} containerStyle={GlobalStyles.BusyContainer}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Label font={Settings.FONTS.HelveticaNeueBold} style={{ marginBottom: 22, fontSize: 14, color: '#fff' }}>Loading...</Label>
          <ActivityIndicator animating={true} size={Settings.IsTablet ? "large" : "small"} color="#fff" />
        </View>
      </Overlay>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    loading: state.globalReducer.loading
  }
};

export default connect(mapStateToProps)(BusyIndicator);
