import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    marginHorizontal: 10,
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: '$stylishBlue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {width: 20, height: 20, resizeMode: 'contain'}
});
