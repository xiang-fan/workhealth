import React from 'react';
import { Text, TouchableOpacity, View, Image, FlatList } from 'react-native';
import images from '../../configs/images';
import styles from './styles'

function UsernameHistory({action, data}) {
  const userItem = (item) => (
    <TouchableOpacity
      onPress={() => action(item)}
      style={styles.container}>
      <Text>{item.username}</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text>{item.personalId}</Text>
        <Image source={images.back} style={styles.image} resizeMode={'contain'}/>
      </View>
    </TouchableOpacity>
  )
  return (
    <View style={{width: '100%'}}>
      <FlatList
        data={ data }
        keyExtractor={ (i, index) => String(index) }
        renderItem={ ({item, index}) => userItem(item)}
      />
    </View>
  );
}

export default UsernameHistory;
