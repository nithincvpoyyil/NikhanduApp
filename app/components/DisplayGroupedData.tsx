import * as React from 'react';
import {Box, Container, Fab, SunIcon, Text} from 'native-base';
import {GroupByDictWord} from '../utils/DBHelper';
import DisplayGroupedPartOfSpeech from './DisplayGroupedPartOfSpeech';
import {exactStyles, similarStyles} from './DisplayGroupedDataStyles';

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
    ? exactStyles.boxStyles
    : similarStyles.boxStyles;

  const enWordStyles = isExactResults
    ? exactStyles.enWordStyles
    : similarStyles.enWordStyles;

  const enItemStyles = isExactResults
    ? exactStyles.enItemStyles
    : similarStyles.enItemStyles;

  for (let key of enList) {
    let enWord = isExactResults ? key : `${index}.  ${key}`;
    groupedNode.push(
      <Box key={key} {...enItemStyles}>
        <Box {...enWordStyles}>{enWord}</Box>
        <DisplayGroupedPartOfSpeech groupedPOfSMap={enMap.get(key)} />
      </Box>,
    );
    index++;
  }
  const heading = enList.size ? renderHeading() : null;
  return (
    <Container {...boxStyles}>
      {heading}
      {groupedNode}
      <Box position="relative">
        <Fab
          placement="bottom-right"
          icon={<SunIcon />}
          label={
            <Text color="white" fontSize="sm">
              BUTTON
            </Text>
          }
        />
      </Box>
    </Container>
  );
}
