import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  text: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    color: 'blue',
    fontSize: 16,
  },

  image: {
    height: 45,
    width: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  content: {justifyContent: 'center', alignItems: 'center'}
})
