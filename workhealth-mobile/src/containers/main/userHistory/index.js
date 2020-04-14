import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import HistoryCard from '../../../components/historyCard';
import { isTablet } from 'react-native-device-info';
import commonStyles from './styles/common'
import tabletStyles from './styles/tabletStyles'
import mobileStyles from './styles/mobileStyles'
import { strings } from '../../../I18n';

function UserHistoryScreen(props) {
  const {navigation, userScreeningHistory, selectedUser} = props;

  const style = {
    ...commonStyles,
    ...(isTablet() ? tabletStyles : mobileStyles)
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerBackTitleVisible: false,
    });
  }, [navigation]);

  const header = () => (
    <View style={style.listHeader}>
      <Text style={style.dataContainer}>{strings('description.date')}</Text>
      <Text style={style.passContainer}>{strings('description.pass')}</Text>
      <Text style={style.statusContainer}>{strings('description.status')}</Text>
    </View>
  )

  return (
    <View style={style.container}>
      <View>
        <Text style={style.text}>{strings('description.personHistory', {person:selectedUser.username})}</Text>
        <Text style={style.text}>{strings('description.personalId', {id: selectedUser.personalId})}</Text>
      </View>
      <View style={style.list}>
        <FlatList
          data={ userScreeningHistory }
          keyExtractor={ (i, index) => String(index) }
          ListEmptyComponent={() => <Text style={style.emptyText}>{strings('errors.noHistory')}</Text>}
          ListHeaderComponent={() => userScreeningHistory.length > 0 && header()}
          renderItem={ ({item, index}) => (
            <HistoryCard
              data={item}
            />
          )}
        />
      </View>
    </View>
  );
}

const mapStateToProps = ({history:{userScreeningHistory, selectedUser}}) => ({
  userScreeningHistory,
  selectedUser
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(UserHistoryScreen);
