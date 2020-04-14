import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import images from '../../configs/images';
import style from './styles';

function QuestionButton({isPositiveButton, action}) {
  const icon = isPositiveButton ? images.positiveIcon : images.negativeIcon;
  return (
    <TouchableOpacity
      onPress={ action }
      style={ style.touchableArea }>
      <Image style={ style.image } source={ icon }/>
    </TouchableOpacity>
  );
}

export default QuestionButton;
