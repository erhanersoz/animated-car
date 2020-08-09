import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import IconButton from "./iconButton";

export default class Joystick extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {style, isWaiting, isDisabled, reset, turnLeft, go, turnRight} = this.props;
    return (
      <View style={style}>
        <IconButton
          iconName={'stop'}
          iconColor={'#b83a1e'}
          disabled={isWaiting}
          onPress={() => reset()}
        />
        <IconButton
          iconName={'rotate-left'}
          disabled={isWaiting}
          onPress={() => turnLeft()}
        />
        <IconButton
          iconName={'arrow-up'}
          disabled={isDisabled || isWaiting}
          onPress={() => go()}
        />
        <IconButton
          iconName={'rotate-right'}
          disabled={isWaiting}
          onPress={() => turnRight()}
        />
        <IconButton
          iconName={'play'}
          disabled={isWaiting}
          iconColor={'#2ea44f'}
        />
      </View>
    );
  }
}

Joystick.propTypes = {
  style: PropTypes.object,
  isWaiting: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  turnLeft: PropTypes.func.isRequired,
  go: PropTypes.func.isRequired,
  turnRight: PropTypes.func.isRequired,
};
