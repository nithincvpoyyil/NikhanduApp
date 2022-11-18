import {
  Box,
  Container,
  FlatList,
  IconButton,
  Input,
  PresenceTransition,
  SearchIcon,
  Spinner,
  Text,
} from 'native-base';
import * as React from 'react';
import {ListRenderItemInfo, TouchableOpacity} from 'react-native';
import {getSuggestions} from '../utils/DBHelper';
import debounce from '../utils/debounce';
import {
  inputIconBtnStyles,
  inputStyles,
  suggestionListItemStyles,
  suggestionListStyles,
} from './AutocompleteStyles';

export default function AutoComplete(props: {
  onSearchTextSelected: (query: string) => void;
  isResultLoading: boolean;
  onQueryInvalid?: () => void;
  onInputFocus?: () => void;
}) {
  const [query, setQuery] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState<Array<string>>([]);
  const {
    isResultLoading = false,
    onSearchTextSelected = () => null,
    onQueryInvalid = () => null,
    onInputFocus = () => null,
  } = props;
  const [isInputFocused, setIsInputFocused] = React.useState(false);

  const onFocus = () => {
    onInputFocus();
    setIsInputFocused(true);
  };

  const onBlur = () => {
    setIsInputFocused(false);
  };

  React.useEffect(() => {
    if (query.length < 2) {
      setIsOpen(false);
      onQueryInvalid();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const inputRightEl = !isResultLoading ? (
    <IconButton
      onPress={onSearchKeyPressHandler}
      icon={<SearchIcon />}
      isDisabled={isResultLoading}
      _icon={{
        size: 'xl',
        color: isInputFocused ? 'teal.700' : 'coolGray.500',
      }}
      {...inputIconBtnStyles}
    />
  ) : (
    <Spinner
      size="lg"
      accessibilityLabel="Loading search results"
      color="teal.700"
    />
  );

  const renderListItem = (listItem: ListRenderItemInfo<string>) => (
    <TouchableOpacity
      onPress={() => {
        onPressListItem(listItem.item);
      }}>
      <Box {...suggestionListItemStyles}>
        <SearchIcon marginLeft={1} marginRight={2} />
        <Text>{listItem.item}</Text>
      </Box>
    </TouchableOpacity>
  );
  return (
    <Container width="100%" position={'relative'}>
      <Input
        placeholder="find your word..."
        onChangeText={onSearchHandler}
        variant="unstyled"
        InputRightElement={inputRightEl}
        value={query}
        onFocus={onFocus}
        onBlur={onBlur}
        {...inputStyles}
        isDisabled={isResultLoading}
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
        <Box position={'relative'} w="100%" shadow={5}>
          {suggestions.length ? (
            <FlatList
              data={suggestions}
              renderItem={renderListItem}
              keyExtractor={(item, index) => item + index}
              {...suggestionListStyles}
            />
          ) : null}
        </Box>
      </PresenceTransition>
    </Container>
  );
}
