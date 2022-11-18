import * as React from 'react';
import {OlamDBItem} from '../utils/DBHelper';
import PartOfSpeechCard from './PartOfSpeechCard';

export default function DisplayGroupedPartOfSpeech(props: {
  groupedPOfSMap: Map<string, OlamDBItem[]>;
  isExactResults: boolean;
}) {
  const {groupedPOfSMap, isExactResults} = props;
  let items = [];
  for (let [key, valueList] of groupedPOfSMap) {
    items.push(
      <PartOfSpeechCard
        key={key}
        partOfSpeech={key}
        items={valueList}
        isExactResults={isExactResults}
      />,
    );
  }
  return <>{items}</>;
}
