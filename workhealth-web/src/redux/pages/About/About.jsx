import React from 'react';

import { browserHistory } from '../../../browserHistory';
import { Layout } from '../../../components';
import { ABOUT_TITLE } from '../../../constants/constants';
import KandaLogo from "../../../images/kanda_logo.svg";
import SofttecoLogo from "../../../images/softteco_logo.svg";
import styles from './About.module.scss';

const softtecoLink = 'https://softteco.com/';
const kandaLink = 'https://kandasoft.com';

const About = () => (
  <Layout
    leftBar
    action={browserHistory.goBack}
    showLogout={false}
    title={ABOUT_TITLE}
  >
    <section className={styles.wrapper}>
      <h2>Created & Developed by</h2>
      <img src={KandaLogo} height="44px" alt="Kanda software"/>
      <a target="_blank" href={kandaLink} rel="noopener noreferrer">www.kandasoft.com</a>
      <img src={SofttecoLogo} height="37px" alt="Softteco"/>
      <a target="_blank" href={softtecoLink} rel="noopener noreferrer">www.softteco.com</a>
    </section>
  </Layout>
);

export default About;
