import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { PermissionsAndroid, Platform } from 'react-native';
import Moment from 'moment';
import Share from 'react-native-share';

var RNFS = require('react-native-fs');

export const shareFile = async (path) => {
  let res = await RNFS.readFile(path, 'base64');
  const dataUri = `data:application/pdf;base64,${ res }`;
  try {
    await Share.open({
      title: 'Pdf file',
      type: 'application/pdf',
      url: Platform.OS === 'android' ? dataUri : path,
    });
  } catch (e) {
    console.log(e);
  }
};


export const generatePDF = async (data, userName) => {
  let fileName = `${ data.id }_${ Moment().format('HH_MM_DD_MM_YYYY') }`;
  let path = RNFS.ExternalStorageDirectoryPath + `/Documents/${ fileName }.pdf`;

  if (await generateFile(path)) {
    let options = {
      html: generateHtml(data, userName),
      fileName: fileName,
      directory: 'Documents',
    };

    let resPath = await RNHTMLtoPDF.convert(options);
    return resPath.filePath;
  }
};

const generateFile = async (path) => {
  if (Platform.OS === 'android') {
    const garanted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
    if (garanted === PermissionsAndroid.RESULTS.GRANTED) {
      try {
        await RNFS.mkdir(RNFS.ExternalStorageDirectoryPath + `/Documents`);
        await RNFS.writeFile(path, '');
      } catch (e) {
        console.log(e)
      }
      return true;
    }else {
      return false
    }
  } else {
    return true;
  }
};

const generateHtml = (data, userName) => {
  return `
<table border="1" style="height: 19px; width: 100%; border-collapse: collapse; border-style: hidden; border-color: #fff;">
<tbody>
<tr style="height: 19px;">
<td style="width: 50%; height: 19px;">Data/Time: ${ Moment(data.createdAt).format('hh:mm / LL') }</td>
<td style="width: 50%; text-align: right; height: 19px;">Username: ${ userName }</td>
</tr>
</tbody>
</table>
<h1><strong>Self-screening results</strong></h1>
${ renderPassBlock(data.pass) }
<table border="1" style="height: 18px; width: 33.3333%; border-collapse: collapse; border-style: hidden; border-color: #fff;">
<tbody>
<tr style="height: 18px;">
<td style="width: 2.83286%; height: 18px;"><strong>Result:&nbsp;</strong></td>
<td style="width: 30.5005%; height: 18px;"><span style="color: ${ color(data.status) }" data-darkreader-inline-color=""><strong>${ result(data.status) }</strong></span></td>
</tr>
</tbody>
</table>
<h2>Q&amp;A:</h2>
${ questions(data.questionnaire) }
  `;
};

const result = (status) => status === 'passed' ? 'Can visit' : 'Can’t visit';

const color = (status) => status === 'passed' ? '#11c005' : '#ff0e18';

const questions = (questionnaire) => {
  let result = '';
  questionnaire.map((item, index) => {
    result += `<p>${ index + 1 }. ${ item.question } : ${ item.answer ? 'Yes' : 'No' }</p>`;
  });
  return result;
};

const renderPassBlock = (pass) => pass ? `<p><strong>Pass: ${ pass }</strong></p>` : '';
