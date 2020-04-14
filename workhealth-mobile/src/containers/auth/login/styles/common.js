import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    marginVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputMargin: {
    marginVertical: 10,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '7%',
  },
  errorText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
  },
  touchableArea: {
    padding: 20
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },
  aboutText: {
    fontSize: 18,
    fontWeight:'500'
  }
});
