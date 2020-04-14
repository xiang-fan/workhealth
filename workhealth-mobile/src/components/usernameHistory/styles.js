import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    justifyContent: 'space-between',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e0e7ff',
    backgroundColor: 'rgba(224,231,255,0.2)',
    marginVertical: 5,
    paddingHorizontal: 20
  },
  image: {
    width: 20,
    height: 20,
    marginLeft: 20
  }
});
