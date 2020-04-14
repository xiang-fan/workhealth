import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e0e7ff',
    backgroundColor: 'rgba(224,231,255,0.2)',
    marginVertical: 5,
  },
  status: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
});
