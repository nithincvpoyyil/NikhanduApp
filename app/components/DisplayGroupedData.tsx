import * as React from 'react';
import {GroupByDictWord} from '../utils/DBHelper';
import DisplayGroupedPartOfSpeech from './DisplayGroupedPartOfSpeech';
import DictItemCard from './DictItemCard';
import {Phonetics} from '../utils/Phonetics';

export type DisplayGroupedDataProps = {
  groupedData: GroupByDictWord;
  isExactResults: boolean;
};

export default function DisplayGroupedData(props: DisplayGroupedDataProps) {
  const {groupedData, isExactResults} = props;
  const {enList, enMap} = groupedData;
  const groupedNode = [];

  for (let key of enList) {
    let enWord = key;
    let mlPhonetics = Phonetics[enWord] || '';
    groupedNode.push(
      <DictItemCard
        key={key}
        enWord={enWord}
        mlPhonetics={mlPhonetics}
        isExactResults={isExactResults}>
        <DisplayGroupedPartOfSpeech
          groupedPOfSMap={enMap.get(key)}
          isExactResults={isExactResults}
        />
      </DictItemCard>,
    );
  }
  return <>{groupedNode}</>;
}
