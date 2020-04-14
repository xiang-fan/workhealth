import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import style from './styles';
import Moment from 'moment'

function HistoryCard({data, action = null}) {
  const pass = data.pass ? data.pass : '######';
  const backgroundColor = data.pass ? 'green' : 'red';

  return (
    <TouchableOpacity
      onPress={action}
      activeOpacity={action === null ? 1 : 0.5}
      style={style.content}>
      <Text>{Moment(data.createdAt).format('hh:mm / LL')}</Text>
      <Text>{pass}</Text>
      <View style={[style.status, {backgroundColor}]}/>
    </TouchableOpacity>
  );
}

export default HistoryCard;
