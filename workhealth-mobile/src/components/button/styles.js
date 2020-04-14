import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 5,
    height: 50,
    backgroundColor: '$stylishBlue'
  },
  disabled: { backgroundColor: '#c0c3ca' },
  text: {color: 'white', fontSize: 18, fontWeight: 'bold'}
});
