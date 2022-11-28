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
      bg={'white'}>
      <Text fontSize="sm" color="coolGray.800" selectable>
        {item.malayalam_definition}
      </Text>
    </Box>
  );
}

export default function PartOfSpeechCard(props: {
  partOfSpeech: string;
  items: OlamDBItem[];
  isExactResults: boolean;
}) {
  const {partOfSpeech, items} = props;

  return (
    <Box width="100%" borderWidth="1" borderColor="transparent" mt={2} mb={4}>
      <HStack mb={1}>
        <Badge
          colorScheme="darkBlue"
          _text={{
            color: 'white',
            fontSize: 'md',
          }}
          variant="solid"
          rounded="5">
          {getPartOfSpeech(partOfSpeech)}
        </Badge>
      </HStack>

      <HStack
        space={2}
        flexWrap={'wrap'}
        justifyContent="flex-start"
        width="100%">
        {items
          .sort(
            (a, b) =>
              a.malayalam_definition.length - b.malayalam_definition.length,
          )
          .map(item => (
            <DisplayOlamDBItem item={item} key={item._id} />
          ))}
      </HStack>
    </Box>
  );
}
