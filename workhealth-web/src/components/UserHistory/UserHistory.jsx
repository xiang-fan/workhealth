import * as moment from 'moment';

import { ADMIN_TITLE } from '../../constants/constants';
import { Layout } from '../index';
import React from 'react';
import styles from './UserHistory.module.scss';

const PASSED = 'passed';

const UserHistory = ({ history = [], name, personalId, onCloseModal }) => (
  <Layout
    leftBar
    action={onCloseModal}
    title={ADMIN_TITLE}
  >
    <div className={styles.name}>
        <p>{`Employee: ${name}`}</p>
        <p>{`Employee id: ${personalId}`}</p>
    </div>
    <ul className={styles.table}>
      <li className={styles.row}>
        <span>Date</span>
        <span>Pass</span>
        <span className={styles.status}>Status</span>
      </li>
      {history.map(({ createdAt, id, pass, status }) => (
        <li className={styles.row} key={id}>
          <span>{moment(createdAt).format('hh:mm A / MMMM DD.YYYY')}</span>
          <span className={styles.pass}>{pass || '######'}</span>
          <span className={`${styles.status} ${status === PASSED ? styles.active : styles.noActive}`}></span>
        </li>
      ))}
    </ul>
  </Layout>
);

export default UserHistory;
