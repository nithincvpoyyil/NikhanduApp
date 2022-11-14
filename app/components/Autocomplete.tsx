import {Button, Container, Input, SearchIcon} from 'native-base';
import * as React from 'react';
import debounce from '../utils/debounce';

export default function AutoComplete(props: {
  onSearchBtnPress: (query: string) => void;
}) {
  const [query, setQuery] = React.useState('');
  const onSearchKeyPressHandler = () => {
    props.onSearchBtnPress(query);
  };
  const onSearchHandler = (text: string) => {
    setQuery(text);
    debouncedHandler(text);
  };

  const queryBackendDebounced = debounce((queryText: string) => {
    console.log(queryText);
  }, 500);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedHandler = React.useCallback(queryBackendDebounced, []);

  const inputRightEl = (
    <Button onPress={onSearchKeyPressHandler}>
      <SearchIcon />
    </Button>
  );
  return (
    <Container>
      <Input
        size="2xl"
        w="90%"
        placeholder="Type your english keyword"
        onChangeText={onSearchHandler}
        variant="underlined"
        InputRightElement={inputRightEl}
      />
    </Container>
  );
}
