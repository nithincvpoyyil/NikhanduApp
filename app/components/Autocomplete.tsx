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
import {ListRenderItemInfo, StyleSheet, TouchableOpacity} from 'react-native';
import {getSuggestions} from '../utils/DBHelper';
import debounce from '../utils/debounce';
import {getStyles} from './AutocompleteStyles';

export default function AutoComplete(props: {
  onSearchTextSelected: (query: string) => void;
  isResultLoading: boolean;
  onQueryInvalid?: () => void;
  onInputFocus?: () => void;
}) {
  const [query, setQuery] = React.useState('');
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
      onQueryInvalid();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const onSearchKeyPressHandler = () => {
    setSuggestions([]);
    onSearchTextSelected(query);
  };

  const onSearchHandler = (text: string) => {
    if (text.length > 200) {
      return;
    }
    setQuery(text);
    debouncedOnSearchHandler(text);
  };

  const queryBackendDebounced = debounce((queryText: string) => {
    if (queryText.length > 2) {
      getSuggestions(queryText).then(list => {
        let newArrayList = Array.from(list);
        setSuggestions(newArrayList);
      });
    } else {
      setSuggestions([]);
    }
  }, 500);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedOnSearchHandler = React.useCallback(queryBackendDebounced, []);
  const onPressListItem = (suggestion: string) => {
    setSuggestions([]);
    setQuery(suggestion);
    props.onSearchTextSelected(suggestion);
  };
  const ifSuggestionsPresent = !!suggestions.length;

  const {
    inputIconBtnStyles,
    inputStyles,
    suggestionListItemStyles,
    suggestionListStyles,
  } = getStyles({isInputFocused, isResultLoading, ifSuggestionsPresent});

  const inputRightEl = !isResultLoading ? (
    <IconButton
      onPress={onSearchKeyPressHandler}
      icon={<SearchIcon />}
      isDisabled={isResultLoading}
      _icon={{
        size: 'xl',
        color: isInputFocused ? 'coolGray.800' : 'coolGray.600',
      }}
      {...inputIconBtnStyles}
    />
  ) : (
    <Spinner
      size="lg"
      accessibilityLabel="Loading search results"
      color="coolGray.800"
    />
  );

  const renderListItem = (listItem: ListRenderItemInfo<string>) => (
    <TouchableOpacity
      onPress={() => {
        onPressListItem(listItem.item);
      }}>
      <Box {...suggestionListItemStyles}>
        <SearchIcon marginLeft={1} marginRight={2} color="coolGray.800" />
        <Text>{listItem.item}</Text>
      </Box>
    </TouchableOpacity>
  );

  const onOverlayClick = () => {
    setSuggestions([]);
  };

  return (
    <Container position={'relative'}>
      {ifSuggestionsPresent ? (
        <TouchableOpacity style={styles.overlay} onPress={onOverlayClick} />
      ) : null}
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
      {ifSuggestionsPresent ? (
        <PresenceTransition
          visible={true}
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
            <FlatList
              data={suggestions}
              renderItem={renderListItem}
              keyExtractor={(item, index) => item + index}
              {...suggestionListStyles}
            />
          </Box>
        </PresenceTransition>
      ) : null}
    </Container>
  );
}

var styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: '-100%',
    top: -100,
    opacity: 0.3,
    backgroundColor: '#fff',
    width: '400%',
    height: 4000,
  },
});
