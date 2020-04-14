import React from 'react';
import { View, Modal, Text } from 'react-native';
import Button from '../button';
import commonStyles from './styles/common';
import { isTablet } from 'react-native-device-info';
import tabletStyles from './styles/tabletStyles';
import mobileStyles from './styles/mobileStyles';
import { strings } from '../../I18n';

function ShareModal({closeModal, shareContent, visible, pass}) {
  const message = strings(pass?.status === 'passed' ? 'description.positive' : 'description.negative');
  const style = {
    ...commonStyles,
    ...(isTablet() ? tabletStyles : mobileStyles)
  };
  return (
    <Modal
      animationType={ 'fade' }
      transparent={ true }
      onRequestClose={ closeModal }
      visible={ visible }>
      <View style={ style.modalContainer }>
        <View style={ style.content }>
          <View style={ style.popup }>
            <Text style={style.title}>Done!</Text>
            <Text style={pass?.status !== 'passed' ? style.negative : style.positive}>{message}</Text>
            {pass?.status === 'passed' && <Text style={style.pass}>{`${pass.pass}`}</Text>}
            <View style={{flexDirection: 'row'}}>
              <Button
                onPress={closeModal}
                text={strings('buttons.close')}
                textStyle={style.textButton}
                containerStyle={style.cancelButton}/>
              <Button
                onPress={shareContent}
                text={strings('buttons.share')}
                containerStyle={{width: '35%', marginStart: 15}}/>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default ShareModal;
