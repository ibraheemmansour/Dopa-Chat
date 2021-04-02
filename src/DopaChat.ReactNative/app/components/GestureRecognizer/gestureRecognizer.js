'use strict';

import React, { PureComponent } from 'react';
import { View, PanResponder } from 'react-native';

export const swipeDirections = {
  SWIPE_UP: 'SWIPE_UP',
  SWIPE_DOWN: 'SWIPE_DOWN',
  SWIPE_LEFT: 'SWIPE_LEFT',
  SWIPE_RIGHT: 'SWIPE_RIGHT'
};

const swipeConfig = {
  velocityThreshold: 0.1,
  directionalOffsetThreshold: 80
};

function isValidSwipe(velocity, velocityThreshold, directionalOffset, directionalOffsetThreshold) {
  return Math.abs(velocity) > velocityThreshold && Math.abs(directionalOffset) < directionalOffsetThreshold;
}

class GestureRecognizer extends PureComponent {

  constructor(props, context) {
    super(props, context);
    this.swipeConfig = Object.assign(swipeConfig, props.config);
  }

  componentWillReceiveProps(props) {
    this.swipeConfig = Object.assign(swipeConfig, props.config);
  }

  componentWillMount() {
    const responderEnd = this._handlePanResponderEnd.bind(this);
    const shouldSetResponder = this._handleShouldSetPanResponder.bind(this);
    this._panResponder = PanResponder.create({ //stop JS beautify collapse
      onStartShouldSetPanResponder: shouldSetResponder,
      onMoveShouldSetPanResponder: shouldSetResponder,
      onPanResponderRelease: responderEnd,
      onPanResponderTerminate: responderEnd
    });
  }

  _handlePanResponderEnd(evt, gestureState) {
    if (this._gestureIsClick(gestureState)) {
      const { onClick } = this.props;
      onClick();
    }
    else {
      const swipeDirection = this._getSwipeDirection(gestureState);
      this._triggerSwipeHandlers(swipeDirection, gestureState);
    }
  }

  _handleShouldSetPanResponder(evt, gestureState) {
    return evt.nativeEvent.touches.length === 1;
  }

  _gestureIsClick(gestureState) {
    return Math.abs(gestureState.dx) < 5  && Math.abs(gestureState.dy) < 5;
  }

  _triggerSwipeHandlers(swipeDirection, gestureState) {
    const {onSwipe, onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight} = this.props;
    const {SWIPE_LEFT, SWIPE_RIGHT, SWIPE_UP, SWIPE_DOWN} = swipeDirections;
    onSwipe && onSwipe(swipeDirection, gestureState);
    switch (swipeDirection) {
      case SWIPE_LEFT:
        onSwipeLeft && onSwipeLeft(gestureState);
        break;
      case SWIPE_RIGHT:
        onSwipeRight && onSwipeRight(gestureState);
        break;
      case SWIPE_UP:
        onSwipeUp && onSwipeUp(gestureState);
        break;
      case SWIPE_DOWN:
        onSwipeDown && onSwipeDown(gestureState);
        break;
    }
  }

  _getSwipeDirection(gestureState) {
    const {SWIPE_LEFT, SWIPE_RIGHT, SWIPE_UP, SWIPE_DOWN} = swipeDirections;
    const {dx, dy} = gestureState;
    if (this._isValidHorizontalSwipe(gestureState)) {
      return (dx > 0)
        ? SWIPE_RIGHT
        : SWIPE_LEFT;
    } else if (this._isValidVerticalSwipe(gestureState)) {
      return (dy > 0)
        ? SWIPE_DOWN
        : SWIPE_UP;
    }
    return null;
  }

  _isValidHorizontalSwipe(gestureState) {
    const {vx, dy} = gestureState;
    const {velocityThreshold, directionalOffsetThreshold} = this.swipeConfig;
    return isValidSwipe(vx, velocityThreshold, dy, directionalOffsetThreshold);
  }

  _isValidVerticalSwipe(gestureState) {
    const {vy, dx} = gestureState;
    const {velocityThreshold, directionalOffsetThreshold} = this.swipeConfig;
    return isValidSwipe(vy, velocityThreshold, dx, directionalOffsetThreshold);
  }

  render() {
    return (
      <View {...this.props} {...this._panResponder.panHandlers}>
      </View>);
  }
};

export default GestureRecognizer;