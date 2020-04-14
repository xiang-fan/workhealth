import React, { useState, useCallback } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { isTablet } from 'react-native-device-info';

import { login } from '../../../actions/auth';
import images from '../../../configs/images';
import Input from '../../../components/input';
import Button from '../../../components/button';
import { createBasicAuthenticationToken } from '../../../utils/auth';

import commonStyles from './styles/common';
import tabletStyles from './styles/tabletStyles';
import mobileStyles from './styles/mobileStyles';
import * as routes from '../../../constants/routes';
import { strings } from '../../../I18n';

const ERROR_MESSAGES = {
  401: strings('errors.wrongCreads')
};

function LoginScreen(props) {

  const style = {
    ...commonStyles,
    ...(isTablet() ? tabletStyles : mobileStyles)
  };

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const login = useCallback(() => {
    props.login(createBasicAuthenticationToken(userName, password))
  }, [userName, password]);

  let errorMessage = '';
  if (props.errorCode) {
    errorMessage = ERROR_MESSAGES[props.errorCode] || strings('errors.unknown');
  }

  const showAboutScreen = () => props.navigation.navigate(routes.ABOUT_SCREEN);

  return (
    <ScrollView
      style={style.screenContainer}
      contentContainerStyle={style.contentContainer}
      keyboardShouldPersistTaps={'handled'}
      bounces={false}>
      <View
        style={style.imageContainer}>
        <Image
          source={images.logo}
          style={style.image}
          resizeMode={'contain'}
        />
      </View>
      <View style={style.userForm}>
        <Input
          label={strings('placeholder.username')}
          placeholder={strings('placeholder.username')}
          autoCapitalize={'none'}
          text={userName}
          onChange={input => setUserName(input)}
          containerStyle={style.inputMargin}
        />
        <Input
          label={strings('placeholder.password')}
          placeholder={strings('placeholder.password')}
          text={password}
          onChange={input => setPassword(input)}
          containerStyle={style.inputMargin}
          secure={true}
        />
        <Text style={style.errorText}>{errorMessage}</Text>
      </View>
      <View style={style.buttonContainer}>
        <Button
          fetching={props.fetching}
          text={strings('buttons.login')}
          onPress={login}
          containerStyle={style.inputMargin}
        />
      </View>
      <View style={style.screenContainer}>
        <TouchableOpacity
          onPress={showAboutScreen}
          style={style.touchableArea}>
          <View style={style.underline}>
            <Text style={style.aboutText}>{strings('description.about')}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const mapStateToProps = ({ auth: { fetchingLogin, errorCode } }) => ({
  fetching: fetchingLogin,
  errorCode,
});

const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
