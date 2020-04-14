import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  content: {
    width: '100%',
    height: 600,
    position: 'absolute',
    top: '10%',
    right: 0,
  },
  popup: {
    backgroundColor: 'white',
    width: '90%',
    height: '40%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 10,
    position: 'absolute',
    top: '25%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '$stylishBlue',
    alignSelf: 'flex-start',
    marginHorizontal: 25
  },
  negative : {
    color: '$warningRed',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  positive : {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16
  },
  cancelButton: {
    width: '35%',
    marginEnd: 15,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '$stylishBlue'
  },
  textButton: {
    color: '$stylishBlue'
  },
  pass: {
    width: '85%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e0e7ff',
    backgroundColor: 'rgba(224,231,255,0.2)',
    marginBottom: 20,
    paddingVertical: 5,
    paddingStart: 10,
    fontSize: 16
  }
});
