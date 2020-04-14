import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50
  },
  dataContainer: {
    width: '53%',
    textAlign: 'center'
  },
  passContainer: {
    width: '27%',
    textAlign: 'center'
  },
  statusContainer: {
    width: '20%',
    textAlign: 'center'
  },
  listContainer: {
    flex: 1
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 15,
    marginVertical: 5
  },
  historyTitle: {
    alignSelf: 'flex-start',
    fontSize: 18,
    marginTop: 45,
    marginBottom: 20
  },
  description: {
    marginTop: 10,
    marginBottom: 30,
    width: '100%'
  }
});
