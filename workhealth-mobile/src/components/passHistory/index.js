import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import moment from 'moment';
import { strings } from '../../I18n';

function PassHistory(props) {
  let content;
  if (props.valid) {
    let status = props.status === 'passed';
    content = (
      <>
        <Text style={status ? styles.positive : styles.notValid}>
          {strings(status ? 'description.passedValid' : 'description.passedNotValid')}
        </Text>
        <View
          style={styles.content}>
          <View>
            <Text>{props.username}</Text>
            {status && <Text style={{marginTop: 10}}>{props.personalId}</Text>}
          </View>
          <Text style={!status && {color: 'red'}}>{moment(props.date).format('hh:mm / LL')}</Text>
        </View>
      </>
    );
  } else {
    content = (
      <Text style={styles.notValid}>{strings('description.passedNotValid')}</Text>
    );
  }

  return <View style={styles.container}>{content}</View>;
}

export default PassHistory;
