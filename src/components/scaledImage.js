import React, { Component } from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';

export default class ScaledImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const {width, height, source} = this.props;
    const imageWidth = Image.resolveAssetSource(source).width;
    const imageHeight = Image.resolveAssetSource(source).height;
    if (width && !height) {
      this.setState({
        width: width,
        height: imageHeight * (width / imageWidth)
      });
    } else if (!width && height) {
      this.setState({
        width: imageWidth * (height / imageHeight),
        height: height
      });
    } else {
      this.setState({ width: imageWidth, height: imageHeight });
    }
  }

  render() {
    const {source} = this.props;
    const {width,height} = this.state;
    return (
      <Image
        source={source}
        style={{width: width, height: height}}
      />
    );
  }
}

ScaledImage.propTypes = {
  source: PropTypes.oneOfType([
    PropTypes.shape({
      uri: PropTypes.string,
      headers: PropTypes.objectOf(PropTypes.string)
    }),
    PropTypes.number,
    PropTypes.arrayOf(
      PropTypes.shape({
        uri: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        headers: PropTypes.objectOf(PropTypes.string)
      })
    )
  ]).isRequired,
  height: PropTypes.number,
  width: PropTypes.number
};

ScaledImage.defaultProps = {
  height: null,
  width: null
};
