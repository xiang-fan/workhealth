import React, { PureComponent } from 'react';
import {clearAuthFail, loginUser} from './actions';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import Logo from "../../../images/logo.png";
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createForm } from 'rc-form';
import {selectAuthError} from "./selectors";
import styles from './Login.module.scss';

class Login extends PureComponent {

  login = e => {
    const { form, login } = this.props;
    e.preventDefault();
    form.validateFields(err => {
      if (!err) {
        login(form.getFieldsValue());
      }
    });
  };

  onInputChange = () => {
    const { errorData, onClearAuthFail  } = this.props;
    if (errorData !== null ) {
      onClearAuthFail();
    }
  }

  render() {
    const { form, errorData } = this.props;

    return (
      <section className={styles.wrapper}>
        <form onSubmit={this.login} className={styles.form}>
          <div className={styles.logoWrapper}>
            <img className={styles.logoImg} src={Logo} alt="Logo" />
          </div>
          <p className={styles.inputTitle}><FontAwesomeIcon icon={faUser} /> Username</p>
          {form.getFieldDecorator('username', {
            initialValue: '',
          })(
            <input
              className={styles.basicInput}
              onChange={this.onInputChange}
              placeholder="Username" 
              type="text"
            />
          )}
          <p className={styles.inputTitle}><FontAwesomeIcon icon={faKey} /> Password</p>
          {form.getFieldDecorator('password', {
            initialValue: '',
          })(
            <input
              className={styles.basicInput}
              onChange={this.onInputChange}
              placeholder="Password"
              type="password"
            />
          )}
          {errorData && errorData !== null &&
            <p className={styles.errorText}>Wrong Username or Password</p>
          }
          <button className={styles.loginBtn}>Submit</button>
          <Link to='/about' className={styles.aboutLink}>About</Link>
        </form>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: credentials => dispatch(loginUser(credentials)),
  onClearAuthFail: () => dispatch(clearAuthFail()),
});

const mapStateToProps = state => ({
  errorData: selectAuthError(state),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  createForm(),
)(Login);
