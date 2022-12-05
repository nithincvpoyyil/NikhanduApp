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
import {ListRenderItemInfo, StyleSheet, TouchableOpacity} from 'react-native';
import {LoadState} from '../../types';
import {getSuggestions} from '../../utils/DBHelper';
import debounce from '../../utils/debounce';
import {useThemeObject} from '../../utils/getTheme';
import {getStyles} from './AutocompleteStyles';
import SuggestedListItem from './SuggestedListItem';

export default function AutoComplete(props: {
  onSearchTextSelected: (query: string) => void;
  isResultLoading: boolean;
  resultLoadingState: LoadState;
  onQueryInvalid?: () => void;
  onInputFocus?: () => void;
}) {
  const {
    resultLoadingState,
    onSearchTextSelected = () => null,
    onQueryInvalid = () => null,
    onInputFocus = () => null,
  } = props;

  const [query, setQuery] = React.useState('');
  const [suggestions, setSuggestions] = React.useState<Array<string>>([]);
  const [isInputFocused, setIsInputFocused] = React.useState(false);
  const [uuid] = React.useState<number>(Date.now());
  const theme = useThemeObject();

  const isLoading = resultLoadingState === 'loading';

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
  } = getStyles({
    isInputFocused,
    isResultLoading: resultLoadingState,
    ifSuggestionsPresent,
    theme,
  });

  const inputNode = <SearchIcon key={uuid} />;
  const inputRightLogo = (
    <IconButton
      onPress={onSearchKeyPressHandler}
      icon={inputNode}
      isDisabled={isLoading}
      {...inputIconBtnStyles}
    />
  );
  const renderListItem = React.useCallback(
    (listItem: ListRenderItemInfo<string>) => (
      <SuggestedListItem
        listItem={listItem}
        listStyle={suggestionListItemStyles}
        onPressListItem={onPressListItem}
      />
    ),
    [],
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
        InputRightElement={inputRightLogo}
        value={query}
        onFocus={onFocus}
        onBlur={onBlur}
        {...inputStyles}
        isDisabled={isLoading}
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
