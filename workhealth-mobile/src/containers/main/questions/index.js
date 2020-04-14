import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import style from './styles';
import QuestionCard from '../../../components/questionCard';
import { connect } from 'react-redux';
import { getAnswersByPass, postQuestionsAnswers } from '../../../actions/questions';
import ShareModal from '../../../components/shareModal';
import { generatePDF, shareFile } from '../../../utils/utils';

let answers = [];

function QuestionsScreen(props) {
  const {questions, navigation, questionsResult, getAnswersByPass, answersByPass, userName} = props;
  const [index, setIndex] = useState(0);
  const [answersIndex, setAnswersIndex] = useState(0);
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [pdfPath, setPdfPath] = useState('')

  const hideShareModal = () => {
    setShareModalVisible(false);
    navigation.goBack();
  };

  useEffect(() => {
    if (pdfPath !== '' ) {
      shareFile(pdfPath).then(() => {
        setPdfPath('')
        navigation.goBack()
      })
    }
  }, [pdfPath])

  useEffect(() => {
    answersByPass !== null && generatePDF(answersByPass, userName).then(path => setPdfPath(path))
  }, [answersByPass])

  const shareContent = () => {
    getAnswersByPass(questionsResult.id)
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerBackTitleVisible: false,
    });
  }, [navigation]);

  useEffect(() => {
    questionsResult !== null && setShareModalVisible(true);
  }, [questionsResult]);

  useEffect(() => {
    if (answers.length === questions.length) {
      const answer = {};
      answers.map((item, index) => answer[index + 1] = item);
      props.postQuestionsAnswers(answer);
      answers = [];
    }
  }, [answersIndex]);

  const negativeAnswer = () => {
    incIndex(false);
  };

  const positiveAnswer = () => {
    incIndex(true);
  };

  const incIndex = (isPositiveAnswer) => {
    let incIndex = index + 1;
    setAnswersIndex(incIndex);
    answers[answersIndex] = isPositiveAnswer;
    incIndex < questions.length && setIndex(incIndex);
  };

  return (
    <View style={ style.container }>
      <QuestionCard
        data={ questions[index] }
        index={ index }
        total={ questions.length }
        positiveAction={ positiveAnswer }
        negativeAction={ negativeAnswer }
      />
      <ShareModal
        pass={ questionsResult }
        closeModal={ hideShareModal }
        visible={ shareModalVisible }
        shareContent={ shareContent }
      />
    </View>
  );
}

const mapStateToProps = ({questions: {questions, questionsResult, answersByPass}, auth: {userName}}) => ({
  questions,
  questionsResult,
  userName,
  answersByPass
});

const mapDispatchToProps = {
  postQuestionsAnswers,
  getAnswersByPass
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsScreen);
