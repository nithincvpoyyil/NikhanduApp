import * as React from 'react';
import {Text, Box} from 'native-base';
import {GroupByDictWord} from '../utils/DBHelper';
import DisplayGroupedPartOfSpeech from './DisplayGroupedPartOfSpeech';

export type DisplayGroupedDataProps = {
  groupedData: GroupByDictWord;
  isExactResults: boolean;
  renderHeading?: () => React.ReactNode;
};

export default function DisplayGroupedData(props: DisplayGroupedDataProps) {
  const {groupedData, isExactResults, renderHeading = () => null} = props;
  const {enList, enMap} = groupedData;
  const groupedNode = [];
  let index = 1;
  const boxStyles = isExactResults
    ? {width: '90%'}
    : {
        width: '90%',
        marginTop: '5',
      };
  const enWordStyles = isExactResults
    ? {fontSize: 'xl', padding: 1.5, bg: 'tertiary.100', bold: true}
    : {fontSize: 'md', padding: 1, bg: 'info.100', bold: true};

  for (let key of enList) {
    let enWord = isExactResults ? key : `${index}. ${key}`;
    const nodeItem = (
      <Box
        key={key}
        width="100%"
        borderWidth={'1'}
        borderColor={'trueGray.200'}
        marginTop="2"
        marginBottom="2">
        <Box>
          <Text {...enWordStyles}>{enWord}</Text>
        </Box>
        <DisplayGroupedPartOfSpeech groupedPOfSMap={enMap.get(key)} />
      </Box>
    );
    groupedNode.push(nodeItem);
    index++;
  }
  const heading = enList.size ? renderHeading() : null;
  return (
    <Box {...boxStyles}>
      {heading}
      {groupedNode}
    </Box>
  );
}
