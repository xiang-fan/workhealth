import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react';
import { connect } from 'react-redux';
import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import { logoutUser } from '../../redux/pages/Login/actions';
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
        {showLogout &&
          <button onClick={logoutUser} className={styles.logoutButton}>
          <h2><FontAwesomeIcon icon={faBuilding} /></h2> &nbsp; <h3>{title}</h3>
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
