import React from 'react';
import { TextInput, View, Text, Image, TouchableOpacity } from 'react-native';
import images from '../../configs/images';

import styles from './styles';

function Input(props) {
  const {
    secure = false,
    label,
    text,
    placeholder,
    onChange,
    containerStyle,
    autoCapitalize,
    keyboardType
  } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      <Text
        style={styles.text}>
        {label}
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onChangeText={onChange}
          value={text}
          secureTextEntry={secure}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          editable={props.editable}
        />
        {props.onClear && <TouchableOpacity style={styles.closeButton} onPress={props.onClear}>
          <Image source={images.close} style={styles.closeImage} />
        </TouchableOpacity>}
      </View>
    </View>
  );
}

export default Input;
