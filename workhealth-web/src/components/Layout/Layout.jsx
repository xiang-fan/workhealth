import React from 'react';
import { connect } from 'react-redux';

import { logoutUser } from '../../redux/pages/Login/actions';
import logoutImage from '../../images/logout.png';
import styles from './Layout.module.scss';

const Layout = ({ 
  action,
  children,
  leftBar = false,
  logoutUser,
  showLogout = true,
  title = false,
}) => (
  <>
    <header className={styles.header}>
      <div className={styles.headerInner}>
        {leftBar &&
          <button onClick={action} className={styles.backLink} />
        }
        <h2>{title}</h2>
        {showLogout &&
          <button onClick={logoutUser} className={styles.logoutButton}>
            <img src={logoutImage} alt="logout"/>
          </button>
        }
      </div>
    </header>
    <section className={styles.wrapper}>    
      {children}
    </section>
  </>
);

const mapDispatchToProps = {
  logoutUser,
};

export default connect(null, mapDispatchToProps)(Layout);
