import { CAN_NOT_VISIT_WORK, CAN_VISIT_WORK, USER_TITLE } from '../../../constants/constants';
import React, { Component } from 'react';

import { API_BASE_ADDRESS } from '../../../api/api';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { Layout } from '../../../components';
import SelfScreeningTemplate from '../../../components/PdfBlanks/SelfScreeningTemplate/SelfScreeningTemplate';
import api from '../../../api';
import { compose } from 'recompose';
import confirmBtn from '../../../images/confirmBtn.png';
import { connect } from 'react-redux';
import declineBtn from '../../../images/declineBtn.png';
import moment from 'moment';
import pdfGenerator from '../../../utils/pdfGenerator';
import { styles } from './styles';
import { withStyles } from '@material-ui/styles';

const TIME_FORMAT = 'MMMM Do YYYY'

class Main extends Component {
    state ={
        history: [],
        questionnaire: [],
        isTestStarted: false,
        questions: [],
        questionIndex: 0,
        isModalOpen: false,
        isFailedTest: false,
        code: 0,
        isTableModal: false
    }

    onGettingQuestionnaire = () => {
        api.user.getQuestionnaire()
        .then(res => this.setState({ questions: res}))
        .catch(res => console.log(res))
    }

    onCheckAnswers = (answers) => {
        const data = answers.map(answer => ({
            id: answer.id,
            answer: answer.answered
        }))
        const convertArrayToObject = (array) => {
            const initialValue = {};
            return array.reduce((obj, item) => {
              return {
                ...obj,
                [item['id'].toString()]: item.answer.toString(),
              };
            }, initialValue);
          };
        const convertedData = convertArrayToObject(data);
        api.user.checkAnswers(convertedData)
        .then(res => {
            this.onScreeningHistory(res.status);
            }
        )
        .catch(res => console.log(res));
    }

    onScreeningHistory = (status) => {
        api.user.screeningHistory().then((res) => {
            this.setState({
                isFailedTest: status === "failed",
                isTestStarted: false,
                isModalOpen: true,
                history: res
            });
            console.log(res);
        })
    }

    onInitialScreeningHistory = () => {
        api.user.screeningHistory().then(res => this.setState({
            history: res
        }));
    }

    componentDidMount() {
        this.onInitialScreeningHistory();
        this.onGettingQuestionnaire();
    }

    testClicked(questionIndex, answer) {
        
        const question = this.state.questions[questionIndex];
        question.answered = answer;
        const newQuestions = [
            ...this.state.questions.slice(0, questionIndex),
            question,
            ...this.state.questions.slice(questionIndex + 1)
        ];
        if (questionIndex < (this.state.questions.length - 1)) {
            this.setState({
                questions: newQuestions,
                questionIndex: this.state.questionIndex + 1
            })
        } else {
            this.onCheckAnswers(newQuestions);
        }
    }

    closeModal() {
        this.setState({
            isModalOpen: false, 
            isFailedTest: false,
            questionIndex: 0,
            isTableModal: false,
            code: 0
        })
    }

    tableRowClicked(item) {
        const test = this.state.history.find(itemC => itemC.pass === item.pass);
        api.user.getUserResult(test && test.id).then(res => {
            this.setState({
                code: item.status? item.pass : 0,
                isTableModal: true,
                isModalOpen: true,
                questionnaire: res.questionnaire
            })
            console.log(item);
        
            // pdfProps = {
            //     questions: res.questionnaire.map(question => ({
            //         question: question.question,
            //         answer: question.answer ? 'Yes': 'No'
            //     })),
            //     userName: this.props.userName,
            //     passCode: res.pass,
            //     result: res.pass ? CAN_VISIT_WORK : CAN_NOT_VISIT_WORK,
            //     time: moment(res.createdAt).format(TIME_FORMAT)
            // };
            // pdfGenerator(
            //     SelfScreeningTemplate, 
            //     {filename: 'SelfScreening.pdf'},
            //     pdfProps
            // );
            console.log(res);
        })
    }

    downloadPdf(isTableModal) {
        let pdfProps;
        if (isTableModal) {
            const test = this.state.history.find(item => item.pass === this.state.code);
            api.user.getUserResult(test && test.id)
        .then(res => {
            pdfProps = {
                questions: res.questionnaire.map(question => ({
                    question: question.question,
                    answer: question.answer ? 'Yes': 'No'
                })),
                userName: this.props.userName,
                passCode: res.pass,
                result: res.pass ? CAN_VISIT_WORK : CAN_NOT_VISIT_WORK,
                time: moment(res.createdAt).format(TIME_FORMAT)
            };
            pdfGenerator(
                SelfScreeningTemplate, 
                {filename: 'SelfScreening.pdf'},
                pdfProps
            );
        })
        .catch(res => console.log(res))
        } else {
            pdfProps = {
                questions: this.state.questions.map(question => ({
                    question: question.text,
                    answer: question.answered ? 'Yes': 'No'
                })),
                userName: this.props.userName,
                passCode: this.state.isFailedTest ? null : this.state.history[0] && this.state.history[0].pass,
                result: this.state.isFailedTest ? CAN_NOT_VISIT_WORK: CAN_VISIT_WORK,
            }
            pdfGenerator(
                SelfScreeningTemplate, 
                {filename: 'SelfScreening.pdf'},
                pdfProps
            );
        }
        this.setState({
            isModalOpen: false,
            isFailedTest: false,
            questionIndex: 0,
            isTableModal: false,
            code: 0
        });
    }
    
    render() {
        const { history, isTestStarted, questions, questionIndex, isModalOpen } = this.state
        const { classes, userName } = this.props;
        const stayAtHome = 'STAY AT HOME OR VISIT YOUR DOCTOR!';
        const youCanGo = 'You can go to the job. Your pass:';
        const imgPath = this.state.questions[this.state.questionIndex] && this.state.questions[this.state.questionIndex].img;
        const imgPathRemovedSlash = (imgPath && imgPath.startsWith('/')) ? imgPath.slice(1) : imgPath;
        const fullPath = `${API_BASE_ADDRESS}${imgPathRemovedSlash}`;
        const question = this.state.questions[this.state.questionIndex] && this.state.questions[this.state.questionIndex].text;
        const screenTable = (
            <Grid container justify="center">
                <Grid item md={12} xs={12}>
                    <div className={classes.header}>
                        <Grid container spacing={0}>
                            <Grid item md={5} xs={7}>
                                <span className={classes.tableItem}>Date</span>
                            </Grid>
                            <Grid item md={5} xs={3}>
                                <span className={classes.tableItemPass}>Pass</span>
                            </Grid>
                            <Grid item md={2} xs={2}>
                                <span className={classes.tableItem}>Status</span>
                            </Grid>
                        </Grid>
                    </div>
                    {history.map((item, index) => (
                    <div className={classes.item} key={index} onClick={() => this.tableRowClicked(item)}>
                        <Grid container spacing={3}>
                        
                            <Grid item md={5} xs={7}>
                                <span className={classes.tableItem}>{moment(item.date).format('hh:mm A / MMMM DD.YYYY')}</span>
                            </Grid>
                            <Grid item md={5} xs={3}>
                                <span className={classes.tableItem}>{item.pass > 0 ? item.pass : '#####'}</span>
                            </Grid>
                            <Grid item md={2} xs={2} className={classes.centeredItem}>
                                <span className={item.status ? classes.greenDot : classes.redDot} />
                            </Grid>
                        </Grid>
                    </div>
                    ))}
                </Grid>    
                {/* item */}
            </Grid>
        )
        return (
        <Layout
            leftBar={isTestStarted}
            action={() => this.setState({
                isTestStarted: false,
                questionIndex: 0,
                })}
            title={USER_TITLE}
        >
        <Container fixed className={classes.container}>
            
            {!this.state.isTestStarted 
            &&(<>
            <Grid container justify="center">
                <Grid item md={12} xs={12}>
                    <div className={classes.helloText}>
                        <h2>Hello {userName}</h2>
                        <h2>Personal id: {this.props.personalId}</h2>
                    </div>
                </Grid>
            </Grid>
            <Grid container justify="center">
                <Grid item md={12} xs={12}>
                    <Button variant="contained" className={classes.downloadButton} onClick={() => this.setState({isTestStarted: true})}>Start self-screening</Button>
                </Grid>
            </Grid>
            <Grid container justify="center">
                <Grid item md={12} xs={12}>
                    <h2 className={classes.screeningTextText}>Self-screening</h2>
                </Grid>
            </Grid>
            {screenTable}
            </>)}
            {this.state.isTestStarted 
            && (<Grid container justify="center">
                    <Grid item md={12} xs={12}>
                        <div className={classes.imgWrapper}>
                            <img className={classes.img} src={fullPath} alt="icon" />
                        </div>
                        <div className={classes.textWrapper}>
                            <div>
                            <p className={classes.questionNumber}>{questionIndex + 1} of {questions.length}</p>
                            <p className={classes.questionText}>{question}</p>
                            </div>
                        </div>
                        <Grid container className={classes.buttonContainer}>
                            <Grid item xs={3} className={classes.testImgWrapper}>
                                <img className={classes.testImg} src={confirmBtn} onClick={() => this.testClicked(questionIndex, true)} alt="confirm button" />
                            </Grid>
                            <Grid item xs={3} className={classes.testImgWrapper}>
                                <img className={classes.testImg} src={declineBtn} onClick={() => this.testClicked(questionIndex, false)} alt="decline button" />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            )}
         
        </Container>
        <Dialog
        open={isModalOpen}
        maxWidth={"xs"}
        >
        {this.state.isTableModal ? (
            <div className={classes.modalWrapper}>
                    {this.state.code ? (
                        <div>
                        <p className={classes.yourPass}>Your pass</p>
                        <p className={classes.passCode}>{this.state.code}</p>
                        </div>
                    ) : <p className={classes.warning}>{stayAtHome}</p>}
                <div className={classes.reportWrapper}>
                    {this.state.questionnaire.map((item, index) => (
                        <div key={index} className={classes.questionnaireList}>
                            <div className={classes.questionName}>{item.question}</div>
                            {item.answer ? (
                                <div className={classes.answerRed}>Yes</div>
                            ) : <div className={classes.answerGreen}>No</div>
                            }
                        </div>
                    ))}
                </div>
                <div className={classes.buttonWrapper}>
                    <Button variant="outlined" className={classes.closeButton} onClick={() => this.closeModal()}>Close</Button>
                    {/* <Button variant="contained" className={classes.downloadButton} onClick={() => this.downloadPdf(this.state.isTableModal)}>Download</Button> */}
                </div>
            </div> 
        ) : (
            <div className={classes.modalWrapper}>
                <DialogTitle className={classes.dialogTitle}><span className={classes.dialogTitleText}>Done!</span></DialogTitle>
                {this.state.isFailedTest ? 
                    <p className={classes.warning}>{stayAtHome}</p> : 
                    <div>
                        <p className={classes.textYouCanGo}>{youCanGo}</p>
                        <p className={classes.passCode}>{history[0] && history[0].pass}</p>
                    </div>
                }
                <div className={classes.buttonWrapper}>
                    <Button variant="outlined" className={classes.closeButton} onClick={() => this.closeModal()}>Close</Button>
                    {/* <Button variant="contained" className={classes.downloadButton} onClick={() => this.downloadPdf(this.state.isTableModal)}>Download</Button> */}
                </div>
            </div> 
        )}    
        </Dialog>   
      </Layout>
        )
    }
}

const mapStateToProps = state => ({
    userName: state.authInfo.userName,
    personalId: state.authInfo.personalId
  });
  
export default compose(
    connect(
        mapStateToProps,
    ),
    withStyles(styles)  
)(Main);