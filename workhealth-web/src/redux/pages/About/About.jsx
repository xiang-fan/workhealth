import { ABOUT_TITLE } from '../../../constants/constants';
import HqoLogo from "../../../images/hqologo.png";
import KandaLogo from "../../../images/kanda_logo.svg";
import { Layout } from '../../../components';
import React from 'react';
import SofttecoLogo from "../../../images/softteco_logo.svg";
import { browserHistory } from '../../../browserHistory';
import styles from './About.module.scss';

const softtecoLink = 'https://softteco.com/';
const kandaLink = 'https://kandasoft.com';
const hqoLink = 'https://hqo.co';

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
      <img src={HqoLogo} height="37px" alt="Softteco"/>
      <a target="_blank" href={hqoLink} rel="noopener noreferrer">www.hqo.co</a>
    </section>
  </Layout>
);

export default About;
