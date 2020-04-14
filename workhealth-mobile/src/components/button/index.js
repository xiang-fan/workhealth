import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';

import styles from './styles';

function Button(props) {
  const {fetching = false, text, onPress, containerStyle, textStyle} = props;
  return (
    <TouchableOpacity
      onPress={fetching ? null : onPress}
      style={[styles.container, containerStyle, props.disabled ? styles.disabled : {}]}>
      {fetching ? (
        <ActivityIndicator color={'white'} />
      ) : (
        <Text style={[styles.text, textStyle]}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
}

export default Button;
