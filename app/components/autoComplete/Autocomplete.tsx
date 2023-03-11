import {
  Box,
  Container,
  FlatList,
  IconButton,
  Input,
  PresenceTransition,
  SearchIcon,
} from 'native-base';
import * as React from 'react';
import {
  ActivityIndicator,
  ListRenderItemInfo,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {LoadState} from '../../types';
import {getSuggestions} from '../../utils/DBHelper';
import debounce from '../../utils/debounce';
import {useThemeObject} from '../../utils/getTheme';
import {getStyles} from './AutocompleteStyles';
import SuggestedListItem from './SuggestedListItem';

export type AutoCompleteProps = {
  onSearchTextSelected: (query: string) => void;
  resultLoadingState: LoadState;
  onQueryInvalid?: () => void;
  onInputFocus?: () => void;
};

export default function AutoComplete(props: AutoCompleteProps) {
  const {
    resultLoadingState,
    onSearchTextSelected = () => null,
    onQueryInvalid = () => null,
    onInputFocus = () => null,
  } = props;

  const [query, setQuery] = React.useState('');
  const [suggestions, setSuggestions] = React.useState<Array<string>>([]);
  const [isInputFocused, setIsInputFocused] = React.useState(false);
  const [showLoading, setLoading] = React.useState(false);
  const [uuid, setUUID] = React.useState<number>(Date.now());
  const theme = useThemeObject();

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
  React.useEffect(() => {
    if (resultLoadingState !== 'loading') {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [resultLoadingState]);

  const onSearchKeyPressHandler = () => {
    setSuggestions([]);
    onSearchTextSelected(query);
    setUUID(Date.now());
    setLoading(true);
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
    setLoading(true);
  };
  const ifSuggestionsPresent = !!suggestions.length;

  const {
    inputIconBtnStyles,
    inputStyles,
    suggestionListItemStyles,
    suggestionListStyles,
  } = getStyles({
    isInputFocused,
    isResultLoading: resultLoadingState,
    ifSuggestionsPresent,
    theme,
  });

  const inputRightLogo = (
    <IconButton
      onPress={onSearchKeyPressHandler}
      icon={showLoading ? <ActivityIndicator size="small" /> : <SearchIcon />}
      isDisabled={showLoading}
      {...inputIconBtnStyles}
    />
  );

  const renderListItem = React.useCallback(
    (listItem: ListRenderItemInfo<string>) => {
      return (
        <SuggestedListItem
          listItem={listItem}
          listStyle={suggestionListItemStyles}
          onPressListItem={onPressListItem}
        />
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const onOverlayClick = () => {
    setSuggestions([]);
  };

  return (
    <Container position={'relative'}>
      {ifSuggestionsPresent ? (
        <TouchableOpacity
          style={styles.overlay}
          onPress={onOverlayClick}
          accessibilityRole="none"
          accessibilityHint="overlay button to dismiss auto suggestion of input"
          accessibilityLabel="tap to dismiss auto suggestion"
        />
      ) : null}
      <Input
        key={uuid}
        InputRightElement={inputRightLogo}
        value={query}
        onChangeText={onSearchHandler}
        onFocus={onFocus}
        onBlur={onBlur}
        isDisabled={showLoading}
        variant="unstyled"
        placeholder="find your word..."
        accessibilityLabel="search input for english word"
        accessibilityHint="type search keywords and press search button to find malayalam definition"
        returnKeyType="search"
        returnKeyLabel="search"
        onSubmitEditing={onSearchKeyPressHandler}
        {...inputStyles}
      />

      {ifSuggestionsPresent ? (
        <PresenceTransition
          visible={true}
          initial={{
            opacity: 0,
            translateY: -20,
          }}
          animate={{
            opacity: 1,
            translateY: 0,
            transition: {
              duration: 250,
            },
          }}>
          <Box position={'relative'} w="100%" shadow={0}>
            <FlatList
              accessibilityLabel="list of auto suggested words based on input"
              scrollEnabled={false}
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
    top: -200,
    opacity: 0.3,
    backgroundColor: 'transprent',
    width: '400%',
    height: 5000,
  },
});
