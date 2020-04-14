import React, { useEffect, useState } from 'react';
import { View, Alert, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { isTablet } from 'react-native-device-info';

import { logout } from '../../../actions/auth';

import * as routes from '../../../constants/routes';
import images from '../../../configs/images';

import HeaderButton from '../../../components/headerButton';

import commonStyles from './styles/common';
import tabletStyles from './styles/tabletStyles';
import mobileStyles from './styles/mobileStyles';
import Button from '../../../components/button';
import { clearQuestions, getAnswersByPass, getQuestions } from '../../../actions/questions';
import HistoryCard from '../../../components/historyCard';
import { getCurrentHistory } from '../../../actions/history';
import { generatePDF, shareFile } from '../../../utils/utils';
import ShareModal from '../../../components/shareModal';
import { strings } from '../../../I18n';

function HomeScreen(props) {
  const {logout, navigation, getQuestions, questions, fetching, clearQuestions, getCurrentHistory, currentHistory, userName, questionsResult, getAnswersByPass, answersByPass, personalId} = props;
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [selectPass, setSelectPass] = useState(null);
  const [pdfPath, setPdfPath] = useState('');

  const hideShareModal = () => setShareModalVisible(false);

  const style = {
    ...commonStyles,
    ...(isTablet() ? tabletStyles : mobileStyles)
  };

  useEffect(() =>  {
    clearQuestions()
    return clearQuestions
  }, [])

  useEffect(() => {
      getCurrentHistory()
  }, [questionsResult])

  useEffect(() => {
    pdfPath !== '' && shareFile(pdfPath).then(() => setPdfPath(''))
  }, [pdfPath]);

  useEffect(() => {
    questions.length > 0 && navigation.navigate(routes.QUESTIONS_SCREEN)
  }, [questions]);

  useEffect(() => {
    if (answersByPass !== null && selectPass !== null) {
      setShareModalVisible(true)
      setPdfPath('')
    }
  }, [answersByPass]);

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

  const showQuestionsScreen = () => {
    clearQuestions();
    getQuestions();
    setSelectPass(null)
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerRight: () => (
        <HeaderButton iconSource={ images.logout } onPress={ showLogoutAlert }/>
      ),
    });
  }, [navigation]);

  const sharePdf = () => {
    generatePDF(answersByPass, userName).then(path => setPdfPath(path))
  }

  return (
    <View style={ style.container }>
      <View style={style.description}>
        <Text style={style.title}>{strings('description.helloUser', {userName})}</Text>
        <Text style={style.title}>{strings('description.personalId', {id: personalId})}</Text>
      </View>
      <Button
        fetching={ fetching }
        onPress={ showQuestionsScreen }
        text={ strings('buttons.startScreening') }
      />
      <Text style={style.historyTitle}>{strings('description.screeningHistory')}</Text>
      <View style={style.listContainer}>
        <FlatList
          data={ currentHistory }
          keyExtractor={ (i, index) => String(index) }
          ListHeaderComponent={() => (
            <View style={style.listHeader}>
              <Text style={style.dataContainer}>{strings('description.date')}</Text>
              <Text style={style.passContainer}>{strings('description.pass')}</Text>
              <Text style={style.statusContainer}>{strings('description.status')}</Text>
            </View>
          )}
          renderItem={ ({item, index}) => (
            <HistoryCard
              action={() => {
                getAnswersByPass(item.id)
                setSelectPass(item)
              }}
              data={item}
            />
          )}
        />
      </View>
      <ShareModal
        pass={ selectPass }
        closeModal={ hideShareModal }
        visible={ shareModalVisible }
        shareContent={ sharePdf }
      />
    </View>
  );
}

const mapStateToProps = ({questions: {questions, fetchingQuestions, questionsResult, answersByPass}, history: {currentHistory}, auth: {userName, personalId}}) => ({
  fetching: fetchingQuestions,
  questions,
  currentHistory,
  userName,
  personalId,
  questionsResult,
  answersByPass
});

const mapDispatchToProps = {
  logout,
  getQuestions,
  clearQuestions,
  getCurrentHistory,
  getAnswersByPass
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
