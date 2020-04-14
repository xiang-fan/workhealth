import React from 'react';
import { View, Text } from 'react-native';
import { isTablet } from 'react-native-device-info';

import images from '../../../configs/images';
import Link from '../../../components/link';

import styles from './styles';
import { strings } from '../../../I18n';

function AboutScreen(props) {
  const { navigation } = props;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: strings('title.about'),
      headerBackTitleVisible: false,
    });
  }, [navigation]);

  return (
    <View
      style={[styles.container, isTablet() ? styles.tabletContainer : null]}>
      <Text style={styles.label}>{strings('description.createdBy')}</Text>
      <Link
        imageSource={images.kandasoft}
        value={strings('links.kandasoft')}
        containerStyle={styles.linkMargin}
      />
      <Link
        imageSource={images.softteco}
        value={strings('links.softteco')}
        containerStyle={styles.linkMargin}
      />
      <Text style={styles.version}>{strings('description.version')}</Text>
    </View>
  );
}

export default AboutScreen;
