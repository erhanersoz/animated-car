import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class IconButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity {...this.props} style={[styles.buttonContainer,this.props.style]}>
        <Icon
          name={this.props.iconName}
          color={ this.props.disabled ? '#bbb' : this.props.iconColor  }
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
};

IconButton.defaultProps = {
  disabled: false,
  iconColor: '#000',
};

const styles = StyleSheet.create({
  buttonContainer:{
    paddingHorizontal:20,
  }
});
