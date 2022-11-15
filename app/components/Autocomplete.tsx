import {
  Box,
  Button,
  Container,
  FlatList,
  Input,
  PresenceTransition,
  SearchIcon,
  Text,
} from 'native-base';
import * as React from 'react';
import {ListRenderItemInfo, TouchableOpacity} from 'react-native';
import {getSuggestions} from '../utils/DBHelper';
import debounce from '../utils/debounce';

export default function AutoComplete(props: {
  onSearchTextSelected: (query: string) => void;
  isResultLoading: boolean;
}) {
  const [query, setQuery] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState<Array<string>>([]);
  const {isResultLoading = false, onSearchTextSelected = () => null} = props;

  React.useEffect(() => {
    if (query.length < 2) {
      setIsOpen(false);
    }
  }, [query]);

  const onSearchKeyPressHandler = () => {
    setIsOpen(false);
    onSearchTextSelected(query);
  };

  const onSearchHandler = (text: string) => {
    setQuery(text);
    debouncedOnSearchHandler(text);
  };

  const queryBackendDebounced = debounce((queryText: string) => {
    if (queryText.length > 2) {
      getSuggestions(queryText).then(list => {
        setSuggestions(Array.from(list));
        requestAnimationFrame(() => {
          setIsOpen(true);
        });
      });
    }
  }, 500);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedOnSearchHandler = React.useCallback(queryBackendDebounced, []);
  const onPressListItem = (suggestion: string) => {
    setIsOpen(false);
    props.onSearchTextSelected(suggestion);
    setQuery(suggestion);
  };

  const inputRightEl = (
    <Button
      onPress={onSearchKeyPressHandler}
      bg="transparent"
      borderWidth={0}
      borderRadius={'50%'}
      isLoading={isResultLoading}
      _focus={{
        bg: 'transparent',
        borderWidth: 1,
        borderRadius: '50%',
        borderColor: 'emerald.500',
      }}
      _pressed={{
        bg: 'transparent',
      }}
      _loading={{bg: 'emerald.500'}}>
      {isResultLoading ? null : <SearchIcon />}
    </Button>
  );

  const renderListItem = (listItem: ListRenderItemInfo<string>) => (
    <TouchableOpacity
      onPress={() => {
        onPressListItem(listItem.item);
      }}>
      <Box
        borderBottomWidth="1"
        borderRadius={1}
        borderBottomColor={'blue.300'}
        shadow={'1'}
        borderColor="muted.800"
        paddingLeft={2}
        paddingRight={1}
        paddingTop={2}
        paddingBottom={2}>
        <Text>{listItem.item}</Text>
      </Box>
    </TouchableOpacity>
  );
  return (
    <Container width="100%" position={'relative'}>
      <Input
        marginTop={'1px'}
        marginBottom={'1px'}
        marginLeft={0}
        marginRight={0}
        padding={0}
        size="2xl"
        w="100%"
        placeholder="Type your english keyword"
        onChangeText={onSearchHandler}
        variant="underlined"
        InputRightElement={inputRightEl}
        value={query}
      />

      <PresenceTransition
        visible={isOpen}
        initial={{
          opacity: 0,
          translateY: -10,
        }}
        animate={{
          opacity: 1,
          translateY: 0,
          transition: {
            duration: 250,
          },
        }}>
        <Box position={'relative'} w="100%">
          <FlatList
            shadow={'1'}
            bg={'white'}
            w="100%"
            position={'absolute'}
            borderLeftWidth={1}
            borderRightWidth={1}
            borderColor={'blue.300'}
            data={suggestions}
            renderItem={renderListItem}
            keyExtractor={(item, index) => item + index}
          />
        </Box>
      </PresenceTransition>
    </Container>
  );
}
