import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50
  },
  dataContainer: {
    width: '43%',
    textAlign: 'center'
  },
  passContainer: {
    width: '32%',
    textAlign: 'center'
  },
  statusContainer: {
    width: '25%',
    textAlign: 'center'
  },
  listContainer: {
    marginTop: 20,
    flex: 1
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 20,
    marginVertical: 40
  },
  userNameContent: {
    marginTop: 50,
    width: '100%'
  }
});
