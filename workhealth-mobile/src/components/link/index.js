import React from 'react';
import {View, Text, Image, Linking, TouchableOpacity} from 'react-native';
import styles from './styles';
import { strings } from '../../I18n';

function Link(props) {
  const {value, imageSource, containerStyle} = props;
  return (
    <TouchableOpacity
      onPress={() => {
        if (!value) return;
        const url = `https://${value}`;
        if (Linking.canOpenURL(url)) {
          Linking.openURL(url).catch(err => alert(err));
        } else {
          alert(strings('errors.cantOpenLink'));
        }
      }}
      style={[
        styles.contetn,
        containerStyle,
      ]}>
      <Image
        source={imageSource}
        style={styles.image}
      />
      <Text
        style={styles.text}>
        {value}
      </Text>
    </TouchableOpacity>
  );
}

export default Link;
