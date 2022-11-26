import * as React from 'react';
import {Container} from 'native-base';
import {GroupByDictWord} from '../utils/DBHelper';
import DisplayGroupedPartOfSpeech from './DisplayGroupedPartOfSpeech';
import {exactStyles, similarStyles} from './DisplayGroupedDataStyles';
import DictItemCard from './DictItemCard';

export type DisplayGroupedDataProps = {
  groupedData: GroupByDictWord;
  isExactResults: boolean;
  renderHeading?: () => React.ReactNode;
};

export default function DisplayGroupedData(props: DisplayGroupedDataProps) {
  const {groupedData, isExactResults, renderHeading = () => null} = props;
  const {enList, enMap} = groupedData;
  const groupedNode = [];
  const boxStyles = isExactResults
    ? exactStyles.boxStyles
    : similarStyles.boxStyles;

  for (let key of enList) {
    let enWord = key;
    groupedNode.push(
      <DictItemCard key={key} enWord={enWord} isExactResults={isExactResults}>
        <DisplayGroupedPartOfSpeech
          groupedPOfSMap={enMap.get(key)}
          isExactResults={isExactResults}
        />
      </DictItemCard>,
    );
  }
  const heading = enList.size ? renderHeading() : null;
  return (
    <Container {...boxStyles}>
      {heading}
      {groupedNode}
    </Container>
  );
}
