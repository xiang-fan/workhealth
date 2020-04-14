import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    width: '40%',
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    height: '45%'
  },
  textContainer: {
    height: '20%'
  },
  buttonContainer: {
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
