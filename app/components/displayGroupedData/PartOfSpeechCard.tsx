import * as React from 'react';
import {Text, HStack, Box, Badge, Flex} from 'native-base';
import {OlamDBItem, typeMap} from '../../utils/DBHelper';
import {getTheme} from '../../utils/getTheme';

const getPartOfSpeech = (key: string) => {
  return typeMap.has(key || '')
    ? typeMap.get(key || '')
    : typeMap.get('unknown');
};

export function DisplayOlamDBItem(props: {item: OlamDBItem}) {
  const {item} = props;
  const theme = getTheme();
  return (
    <Box
      paddingTop={'1'}
      paddingRight={'3'}
      paddingBottom={'1'}
      paddingLeft={'3'}
      key={item._id}
      borderBottomWidth="1"
      margin={1}
      overflow="hidden"
      borderColor={theme.primaryBG}
      borderRadius={'24px'}
      borderWidth="1"
      bg={theme.whiteColor1}>
      <Text fontSize="sm" color={theme.darkColor1} selectable>
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
  const theme = getTheme();
  return (
    <Box
      width="100%"
      borderWidth={1}
      borderColor={theme.secondryBG}
      mt={2}
      mb={4}
      borderTopLeftRadius={10}
      borderTopRightRadius={10}
      borderBottomLeftRadius={10}
      borderBottomRightRadius={10}>
      <HStack mb={1}>
        <Badge
          bgColor={theme.darkColor2}
          _text={{
            color: theme.whiteColor1,
            fontSize: 'sm',
          }}
          variant="solid"
          rounded="5">
          {getPartOfSpeech(partOfSpeech)}
        </Badge>
      </HStack>

      <Flex
        p={1}
        flexDirection={'row'}
        alignItems="center"
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
      </Flex>
    </Box>
  );
}
