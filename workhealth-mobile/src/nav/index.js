import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as routes from '../constants/routes';
import { connect } from 'react-redux';

import HomeScreen from '../containers/main/home';
import AdminHomeScreen from '../containers/main/adminHome';
import LoginScreen from '../containers/auth/login';
import AboutScreen from '../containers/main/about';
import QuestionsScreen from '../containers/main/questions';
import UserHistoryScreen from '../containers/main/userHistory';

const Stack = createStackNavigator();

const Navigation = props => {
  const { token } = props;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        { token === null ? (
          <>
            <Stack.Screen
              name={ routes.LOGIN_SCREEN }
              component={ LoginScreen }
              options={ {
                headerShown: false,
                animationTypeForReplace: 'pop',
              } }
            />
            <Stack.Screen name={ routes.ABOUT_SCREEN } component={ AboutScreen }/>
          </>
        ) : (
          <>
            <Stack.Screen
              name={ routes.HOME_SCREEN }
              component={ props.userRole === 'user' ?
                HomeScreen :
                AdminHomeScreen
              }
            />
            <Stack.Screen name={ routes.QUESTIONS_SCREEN } component={ QuestionsScreen }/>
            <Stack.Screen name={ routes.USER_HISTORY_SCREEN } component={ UserHistoryScreen }/>
          </>
        ) }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = ({ auth: { token, userRole } }) => ({
  token, userRole
});

export default connect(mapStateToProps, null)(Navigation);
