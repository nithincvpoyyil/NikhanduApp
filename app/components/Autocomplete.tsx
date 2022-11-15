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
}) {
  const [query, setQuery] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState<Array<string>>([]);

  React.useEffect(() => {
    if (query.length < 2) {
      setIsOpen(false);
    }
  }, [query]);

  const onSearchKeyPressHandler = () => {
    props.onSearchTextSelected(query);
    setIsOpen(false);
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
    <Button onPress={onSearchKeyPressHandler} bg="tranparent" borderWidth={0}>
      <SearchIcon />
    </Button>
  );

  const renderListItem = (listItem: ListRenderItemInfo<string>) => (
    <TouchableOpacity
      onPress={() => {
        onPressListItem(listItem.item);
      }}>
      <Box bg={'red.900'} borderBottomWidth="1" borderColor="muted.800">
        <Text>{listItem.item}</Text>
      </Box>
    </TouchableOpacity>
  );
  return (
    <Container width="100%" position={'relative'} borderWidth={1}>
      <Input
        marginTop={'5%'}
        marginBottom={'5%'}
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
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 250,
          },
        }}>
        <Box position={'relative'} w="100%">
          <FlatList
            w="100%"
            position={'absolute'}
            data={suggestions}
            renderItem={renderListItem}
            keyExtractor={(item, index) => item + index}
          />
        </Box>
      </PresenceTransition>
    </Container>
  );
}
