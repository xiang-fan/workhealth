import React from 'react';
import { View, Image, Text } from 'react-native';
import QuestionButton from '../questionButton';
import { isTablet } from 'react-native-device-info';
import commonStyles from './styles/common';
import tabletStyles from './styles/tabletStyles';
import mobileStyles from './styles/mobileStyles';
import { BASE_URL } from '../../configs';
import { connect } from 'react-redux';
import { getImage } from '../../actions/questions';

function QuestionCard(props) {
  const {index, total, data, positiveAction, negativeAction} = props;
  const [image, setImage] = React.useState('')
  const style = {
    ...commonStyles,
    ...(isTablet() ? tabletStyles : mobileStyles),
  };
  React.useEffect(() => {
    props.getImage(data?.imageUrl + '');
  }, [data])

  React.useEffect(() => {
    if(props.imageBlob !== null) {
      let reader = new FileReader();
      reader.readAsDataURL(props.imageBlob.blob);
      reader.onloadend = () => setImage(reader.result);
    }
  }, [props.imageBlob])
  return (
    <View style={ style.container }>
      <View style={ style.imageContainer }>
        <Image style={ style.imageSize } source={ {uri: image} } resizeMode={ 'contain' }/>
      </View>
      <View style={ style.textContainer }>
        <Text style={ style.counter }>{ `${ index + 1 } of ${ total }` }</Text>
        <Text style={ style.question }>{ data?.question }</Text>
      </View>
      <View style={ style.buttonContainer }>
        <QuestionButton
          action={ positiveAction }
          isPositiveButton={ true }
        />
        <QuestionButton
          action={ negativeAction }
          isPositiveButton={ false }
        />
      </View>
    </View>
  );
}

const mapStateToProps = ({questions: {imageBlob}}) => ({imageBlob})

const mapDispatchToProps = {
  getImage
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);
