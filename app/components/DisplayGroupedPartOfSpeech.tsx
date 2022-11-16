import * as React from 'react';
import {Text, HStack, Box, Badge} from 'native-base';
import {OlamDBItem, typeMap} from '../utils/DBHelper';

const getPartOfSpeech = (key: string) => {
  return typeMap.has(key || '')
    ? typeMap.get(key || '')
    : typeMap.get('unknown');
};

export function DisplayOlamDBItem(props: {item: OlamDBItem}) {
  const {item} = props;
  return (
    <Box
      paddingTop={'1.5'}
      paddingRight={'3'}
      paddingBottom={'1.5'}
      paddingLeft={'3'}
      key={item._id}
      borderBottomWidth="1"
      marginTop={2}
      height={'auto'}
      overflow="hidden"
      borderColor="coolGray.400"
      borderRadius={'24px'}
      borderWidth="1"
      _text={{fontSize: 'sm', color: 'coolGray.900', bold: true}}>
      {item.malayalam_definition}
    </Box>
  );
}

export function DisplayOlamDBList(props: {itemList: OlamDBItem[]}) {
  const {itemList} = props;
  return (
    <HStack
      space={2}
      padding={'1'}
      justifyContent="flex-start"
      flexWrap={'wrap'}
      width="100%">
      {itemList.map(item => (
        <DisplayOlamDBItem item={item} key={item._id} />
      ))}
    </HStack>
  );
}

export default function DisplayGroupedPartOfSpeech(props: {
  groupedPOfSMap: Map<string, OlamDBItem[]>;
}) {
  const {groupedPOfSMap} = props;
  let items = [];
  for (let [key, valueList] of groupedPOfSMap) {
    let list = (
      <Box
        key={key}
        width="100%"
        borderWidth="1"
        borderColor="transparent"
        padding="10px 10px">
        <Text bold fontSize={'md'}>
          {getPartOfSpeech(key)}
        </Text>
        <DisplayOlamDBList itemList={valueList} />
      </Box>
    );
    items.push(list);
  }
  return <>{items}</>;
}
