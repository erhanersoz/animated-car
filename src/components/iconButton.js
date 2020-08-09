import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class IconButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { style, iconName, iconColor, disabled, onPress } = this.props;
    return (
      <TouchableOpacity disabled={disabled} onPress={onPress} style={[{paddingHorizontal:20},style]}>
        <Icon
          name={iconName}
          color={ disabled ? '#bbb' : iconColor  }
          size={50}
        />
      </TouchableOpacity>
    );
  }
}

IconButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  disabled: PropTypes.bool,
  onPress: PropTypes.func
};

IconButton.defaultProps = {
  iconColor: '#000',
  disabled: false,
  onPress: null
};
