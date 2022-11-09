import * as React from 'react';
import {
  NativeBaseProvider,
  Text,
  Input,
  VStack,
  Center,
  Container,
  Heading,
  Button,
  FlatList,
  Box,
  HStack,
  Spacer,
} from 'native-base';
import {dbPathExists, OlamDBItem, typeMap} from './utils/DBHelper';
import {TouchableOpacity} from 'react-native';

export default function NikhanduLandingScreen() {
  const [query, setQuery] = React.useState('');
  const [values, setVals] = React.useState<Array<OlamDBItem>>([]);
  const onSearchHandler = (queryVal: string) => {
    setQuery(queryVal);
  };

  React.useEffect(() => {
    return () => {};
  }, [query]);

  const onPressHandler = () => {
    dbPathExists(query).then(
      results => {
        if (results) {
          setVals(results);
        }
      },
      () => {
        setVals([]);
      },
    );
  };

  return (
    <NativeBaseProvider>
      <VStack space={0} alignItems="center" w="100%">
        <Center h="20" bg="#fff" rounded="md" />
        <Center h="20" bg="#fff" rounded="md">
          <Container>
            <Heading>
              Malayalam
              <Text color="emerald.500"> Nikhandu</Text>
            </Heading>
            <Text mt="3" fontWeight="medium">
              Malayalam dictionay based on Olam
            </Text>
          </Container>
        </Center>

        <Center h="20" bg="#fff" rounded="md">
          <Input
            size="2xl"
            w="90%"
            placeholder="Type your english keyword"
            onChangeText={e => {
              onSearchHandler(e);
            }}
            variant="underlined"
            InputRightElement={<Button onPress={onPressHandler}>Search</Button>}
          />
        </Center>

        <Center bg="#fff" rounded="md" w="100%">
          {values.length ? (
            <>
              <Container>
                <Heading>
                  Results for
                  <Text color="emerald.500"> {query}</Text>
                </Heading>
              </Container>
              <FlatList
                scrollsToTop={true}
                width={'90%'}
                height={'60%'}
                data={values}
                renderItem={({item}) => {
                  let partofSp = typeMap.has(item.part_of_speech || '')
                    ? typeMap.get(item.part_of_speech || '')
                    : typeMap.get('unknown');

                  return (
                    <TouchableOpacity>
                      <Box
                        borderBottomWidth="1"
                        marginTop={5}
                        height={'50px'}
                        overflow="hidden"
                        borderColor="coolGray.200"
                        borderWidth="1"
                        _dark={{
                          borderColor: 'coolGray.600',
                          backgroundColor: 'gray.700',
                        }}
                        _web={{
                          shadow: 2,
                          borderWidth: 0,
                        }}
                        _light={{
                          backgroundColor: 'gray.50',
                        }}>
                        <HStack justifyContent="space-between">
                          <VStack>
                            <Text fontSize="sm" color="coolGray.800" bold>
                              {item.malayalam_definition}
                            </Text>
                            <Text fontSize="xs" color="coolGray.600">
                              {partofSp}
                            </Text>
                          </VStack>
                          <Spacer />
                        </HStack>
                      </Box>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item, index) =>
                  (index + '' + item?.part_of_speech || '-') +
                  item._id +
                  item.english_word
                }
              />
            </>
          ) : (
            <Container>
              <Heading>
                No results found for
                <Text color="red.500"> {query}</Text>
              </Heading>
            </Container>
          )}
        </Center>
      </VStack>
    </NativeBaseProvider>
  );
}
