import React from 'react'
import moment from 'moment'
import styles from './SelfScreeningTemplate.module.scss'

const TIME_FORMAT = 'MMMM Do YYYY'

export default ({
  questions = [], 
  time = moment().format(TIME_FORMAT), 
  userName, 
  passCode, 
  result 
}) => (
  <div className={styles.template}>
  <div className={styles['head-container']}>
    {time && (
      <span className={styles['head-container__time']}>
        <b>Time/Date:​</b> {time}
      </span>
     )}
    {userName && (
      <span className={styles['head-container__user-name']}>
        <b>Username:​</b> {userName}
      </span>
    )}
  </div>
  <h1>Self-screening results</h1> 
  {passCode && (
    <h2>Pass: {passCode}</h2>
  )}
  {result && (
     <h2>Result:​ 
       <mark className={passCode ? styles['result-value'] : styles['result-disabled']}>
          {result}
       </mark>
     </h2>
  )}
  {Array.isArray(questions) && (
    <div>
      <h2>Q&amp;A:</h2>
      <ol>
        {questions.map( ({question, answer}) =>(
          <li key={`${question}${answer}`}>
            {question}:{' '}
            <b>{answer}</b>
          </li> 
        ) )}
      </ol>
    </div>
  )}
  </div>
)