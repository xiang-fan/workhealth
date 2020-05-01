import * as moment from 'moment';

import { ADMIN_TITLE, CAN_VISIT_WORK, PASS_NOT_VALID } from '../../../constants/constants';
import { CustomModal, Layout, UserHistory } from '../../../components';
import React, { PureComponent } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input } from 'antd';
import api from '../../../api';
import { compose } from 'recompose';
import { createForm } from 'rc-form';
import { faUserShield } from '@fortawesome/free-solid-svg-icons'
import styles from './AdminMain.module.scss';

const { Search } = Input;
class AdminMain extends PureComponent {
  state = {
    isDisabledNameButton: false,
    isDisabledPassButton: false,
    isLoadingNameButton: false,
    isLoadingPassButton: false,
    isShowHistory: false,
    currentUserName: '',
    currentUserPersonalId: null,
    passInfo: null,
    users: null,
    userHistory: [],
  }

  getUserByPass = e => {
    e.preventDefault()
    const { form } = this.props;
    const { pass } = form.getFieldsValue();

    this.setState({ isLoadingPassButton: true });
    api.admin.getScreeningHistoryByPass(pass)
      .then(res => {
        console.log(res)
        const passInfo = res.screeningHistory[0];
        this.setState({
          isDisabledPassButton: true,
          isLoadingPassButton: false,
          passInfo,
        })
      })
      .catch(() => this.setState({ isLoadingPassButton: false, passInfo: undefined }))
  }

  getUserByName = e => {
    e.preventDefault()
    const { form } = this.props;
    const { name } = form.getFieldsValue();

    this.setState({ isLoadingNameButton: true });
    api.admin.getScreeningHistoryByName(name)
      .then(res => this.setState({
        isDisabledNameButton: true,
        isLoadingNameButton: false,
        users: res.users && res.users.length > 0 ? res.users : undefined,
      }))
      .catch(() => this.setState({ isLoadingNameButton: false, users: undefined }))
  }

  getUserHistory = (id, name, personalId) => {
    api.admin.getUserHisory(id)
      .then(res => {
        const userHistory = res.screeningHistory;
        this.setState({ 
          currentUserName: name,
          currentUserPersonalId: personalId,
          isShowHistory: true,
          userHistory,
         })
      })
      .catch(res => console.log(res))
  }

  handlePassChange = e =>
    e.target.value === '' && this.setState({ isDisabledPassButton: false });

  handleNameChange = e =>
    e.target.value === '' && this.setState({ isDisabledNameButton: false });

  onCloseModal = () => this.setState({ isShowHistory: false });

  render() {
    const { 
      currentUserName,
      currentUserPersonalId,
      isDisabledNameButton,
      isDisabledPassButton,
      isLoadingNameButton,
      isLoadingPassButton,
      isShowHistory,
      passInfo,
      users,
      userHistory
    } = this.state;
    const { form } = this.props;
    const isValidPass = passInfo && moment(passInfo.createdAt).format('D') === moment().format('D');

    return (
      <>
        <Layout title={ADMIN_TITLE}>
          <section className={styles.wrapper}>
            <form className={styles.inputForm}>
              <label className={styles.inputLabel}>
              <h2><FontAwesomeIcon icon={faUserShield} /> Security Administration</h2>
                <br></br>
                <span>Check employee pass</span >
                {form.getFieldDecorator('pass', {
                  initialValue: '',
                })(
                  <Search
                    className={styles.basicInput}
                    placeholder="" 
                    type="number"
                    allowClear
                    onChange={this.handlePassChange}
                    loading={isLoadingPassButton}
                  />
                )}
              </label>
              <button onClick={this.getUserByPass} disabled={isDisabledPassButton}>Check pass</button>
            </form>
            {passInfo && 
              <div className={styles.passInfo}>
                <h3 className={`${styles.passTitle} ${!isValidPass ? styles.passError : ''}`}>
                  {isValidPass ? CAN_VISIT_WORK : PASS_NOT_VALID}
                </h3>
                <div className={styles.passInfoBottom}>
                  <div className={styles.passInfoBottomWrapper}>
                    <span>{passInfo.User.username}</span>
                    <span>{passInfo.User.personalId}</span>
                  </div>
                  <time className={`${!isValidPass ? styles.passError : ''}`}>
                    {moment(passInfo.createdAt).format('hh:mm A / MMMM DD.YYYY')}
                  </time>
                </div>
              </div>
            }
            {passInfo !== null && !passInfo && <p className={styles.passNotFound}>No such pass</p>}
            <form className={styles.inputForm}>
              <label className={styles.inputLabel}>
                <span>Search employee name</span>
                {form.getFieldDecorator('name', {
                  initialValue: '',
                })(
                  <Search
                    className={styles.basicInput}
                    placeholder="" 
                    type="text"
                    allowClear
                    onChange={this.handleNameChange}
                    loading={isLoadingNameButton}
                  />
                )}
              </label>
              <button onClick={this.getUserByName} disabled={isDisabledNameButton}>Check Username</button>
            </form>
            {users &&
              <ul className={styles.listNamesWrap}>
                {users.map(({ id, username, personalId }) => (
                  <li className={styles.nameItem} key={id}>
                    <button  onClick={() => this.getUserHistory(id, username, personalId)}>
                        <div className={styles.buttonWrapper}>
                            <span>{username}</span>
                            <span>{personalId}</span>
                        </div>
                    </button>
                    <span className={styles.backLink} />
                  </li>
                ))}
              </ul>
            }
            {users !== null && !users && <p className={styles.passNotFound}>No such users</p>}
          </section>
        </Layout>
        <CustomModal
          visible={isShowHistory}
          className={styles.modalWrap}
        >
          <UserHistory 
            history={userHistory} 
            onCloseModal={this.onCloseModal} 
            name={currentUserName}
            personalId={currentUserPersonalId}
          />
        </CustomModal>
      </>
    )
  }
}

export default compose(
  createForm(),
)(AdminMain);
