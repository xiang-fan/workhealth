import React, {useEffect} from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { isTablet } from 'react-native-device-info';

import { logout } from '../../../actions/auth';

import images from '../../../configs/images';

import HeaderButton from '../../../components/headerButton';

import commonStyles from './styles/common';
import tabletStyles from './styles/tabletStyles';
import mobileStyles from './styles/mobileStyles';
import CheckHistory from '../../../components/checkHistory';
import PassHistory from '../../../components/passHistory';
import {
  clearPass, clearUserHistory,
  clearUsername,
  getHistoryByPass,
  getHistoryByUsername, getUserScreeningHistory, saveSelectUser,
} from '../../../actions/history';
import UsernameHistory from '../../../components/usernameHistory';
import * as routes from '../../../constants/routes';
import { strings } from '../../../I18n';

function HomeScreen(props) {
  const { logout, navigation, fetchingHistoryUsers, fetchingHistoryPass } = props;
  const [pass, setPass] = React.useState('');
  const [username, setUsername] = React.useState('');


  const style = {
    ...commonStyles,
    ...(isTablet() ? tabletStyles : mobileStyles)
  };
  useEffect(() => {
    props.clearUserHistory()
    return props.clearUserHistory
  }, []);

  const showLogoutAlert = () =>
    Alert.alert(
      strings('alert.title'),
      strings('alert.message'),
      [
        {
          text: strings('buttons.cancel'), onPress: () => {
          },
        },
        {text: strings('buttons.confirm'), style: 'destructive', onPress: () => logout()},
      ],
      {cancelable: true},
    );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerRight: () => (
        <HeaderButton iconSource={images.logout} onPress={showLogoutAlert} />
      )
    });
  }, [navigation]);

  const checkPass = React.useCallback(() => {
    props.getHistoryByPass(pass);
  }, [pass]);

  const clearPass = React.useCallback(() => {
    setPass('');
    props.clearPass();
  }, [setPass, props.clearPass]);

  const checkUsername = React.useCallback(() => {
    props.getHistoryByUsername(username);
  }, [username]);

  const clearUsername = React.useCallback(() => {
    setUsername('');
    props.clearUsername();
  }, [setUsername, props.clearUsername]);

  const selectUser = (user) => {
    props.getUserScreeningHistory(user)
    props.saveSelectUser(user)
  }

  useEffect(() => {
    props.userScreeningHistory !== null && navigation.navigate(routes.USER_HISTORY_SCREEN)
  }, [props.userScreeningHistory])

  return (
    <ScrollView style={style.container}>
      <CheckHistory
        progress={fetchingHistoryPass}
        buttonText={strings('buttons.checkPass')}
        label={strings('placeholder.enterPass')}
        history={props.passHistory}
        value={pass}
        onChange={setPass}
        search={checkPass}
        clear={clearPass}
        content={props.passHistory && <PassHistory {...props.passHistory} />}
      />
      <View style={style.userNameContent}>
        <CheckHistory
          progress={fetchingHistoryUsers}
          buttonText={strings('buttons.checkUsername')}
          label={strings('placeholder.enterUsername')}
          history={props.usersHistory}
          value={username}
          onChange={setUsername}
          search={checkUsername}
          clear={clearUsername}
          content={props.usersHistory && <UsernameHistory action={selectUser} data={props.usersHistory.users} />}
        />
      </View>
    </ScrollView>
  );
}

const mapStateToProps = ({ history: { passHistory, usersHistory, fetchingHistoryPass, fetchingHistoryUsers, userScreeningHistory } }) => ({
  passHistory,
  usersHistory,
  fetchingHistoryUsers,
  fetchingHistoryPass,
  userScreeningHistory
});

const mapDispatchToProps = {
  logout,
  getHistoryByPass,
  getHistoryByUsername,
  clearPass,
  clearUsername,
  getUserScreeningHistory,
  saveSelectUser,
  clearUserHistory
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
