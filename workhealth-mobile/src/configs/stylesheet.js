import EStyleSheet from 'react-native-extended-stylesheet';

const colors = () => ({
  $whiteGrey: '#f3f4f8',
  $stylishBlue: 'rgb(59,118,239)', //#3b76ef
  $warningRed: '#ed4545',
  $greyishGrey: '#b8b9bf',
});

const fonts = () => ({});

const fontSizes = () => ({
  $fs51: '51 * $fontRem',
  $fs36: '36 * $fontRem',
  $fs35: '35 * $fontRem',
  $fs25: '25 * $fontRem',
  $fs24: '24 * $fontRem',
  $fs23: '23 * $fontRem',
  $fs22: '22 * $fontRem',
  $fs21: '21 * $fontRem',
  $fs20: '20 * $fontRem',
  $fs19: '19 * $fontRem',
  $fs18: '18 * $fontRem',
  $fs17: '17 * $fontRem',
  $fs16: '16 * $fontRem',
  $fs15: '15 * $fontRem',
  $fs14: '14 * $fontRem',
  $fs13: '13 * $fontRem',
  $fs12: '12 * $fontRem',
  $fs10: '10 * $fontRem',
});

const defaults = () => ({
  $toolbarHeight: 56,
});

const rems = () => ({
  $fontRem: 1,
});

EStyleSheet.build({
  ...rems(),
  ...colors(),
  ...fonts(),
  ...fontSizes(),
  ...defaults(),
});
