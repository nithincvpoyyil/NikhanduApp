import * as React from 'react';
import {
  VStack,
  Center,
  ScrollView,
  HStack,
  Box,
  Text,
  WarningOutlineIcon,
} from 'native-base';
import {
  getEmptyDictGrouped,
  getResultsFromDB,
  GroupByDictWord,
} from './utils/DBHelper';
import DisplayGroupedData from './components/DisplayGroupedData';
import SimilarResultsHeading from './components/SimilarResultsHeading';
import AutoComplete from './components/Autocomplete';
import {
  hStack1Props,
  upperBoxStyleProps,
  vStack1Props,
  vStack2Props,
} from './NikhanduLandingScreenStyles';
import {Animated, Easing} from 'react-native';
const LogoImage = require('../app/assets/images/LandingLogo.png');

export default function DictScreen() {
  const [searchKey, setSearchKey] = React.useState('');
  const [isResultLoading, setIsResultLoading] = React.useState(false);
  const [isFinished, setIsFinished] = React.useState(false);
  const [animationDone, setAnimationDone] = React.useState(false);

  const [exactResults, setExactResults] = React.useState<GroupByDictWord>(
    getEmptyDictGrouped(),
  );
  const [similarResults, setSimilarResults] = React.useState<GroupByDictWord>(
    getEmptyDictGrouped(),
  );

  const sizeTranslation = React.useRef(new Animated.Value(120)).current;
  const transitionFromZero = React.useRef(new Animated.Value(0)).current;
  const hTransition = React.useRef(new Animated.Value(17)).current;
  const textVisibilityTransition = React.useRef(new Animated.Value(1)).current;
  const percentageTransition = hTransition.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  const animatedViewStyles = {
    height: sizeTranslation,
    width: sizeTranslation,
    margin: 10,
    transform: [
      {
        scale: transitionFromZero.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 0.8, 1],
        }),
      },
    ],
  };

  const doAnimation = () => {
    if (!animationDone) {
      setAnimationDone(true);
      Animated.parallel([
        Animated.timing(textVisibilityTransition, {
          toValue: 0,
          duration: 600,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
        Animated.timing(sizeTranslation, {
          toValue: 60,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
      ]).start(({finished}) => {
        setIsFinished(finished);
        Animated.timing(hTransition, {
          toValue: 10,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }).start(() => {
          Animated.timing(transitionFromZero, {
            toValue: 1,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: false,
          }).start(() => {});
        });
      });
    }
  };

  const clearResults = () => {
    setExactResults(getEmptyDictGrouped());
    setSimilarResults(getEmptyDictGrouped());
  };

  const searchDictionaryForWord = (key: string) => {
    setSearchKey(key);
    if (!key || key.length < 2) {
      clearResults();
      return;
    }

    if (searchKey === key) {
      return;
    }
    setIsResultLoading(true);
    getResultsFromDB(key).then(
      results => {
        setExactResults(results.exactResults);
        setSimilarResults(results.similarResults);
        setIsResultLoading(false);
      },
      () => {
        setExactResults(getEmptyDictGrouped());
        setSimilarResults(getEmptyDictGrouped());
        setIsResultLoading(false);
      },
    );
  };

  const resultNode =
    similarResults.enList.size || exactResults.enList.size ? (
      <ScrollView width={'100%'}>
        <Center>
          <DisplayGroupedData
            groupedData={exactResults}
            isExactResults={true}
          />
          <DisplayGroupedData
            groupedData={similarResults}
            isExactResults={false}
            renderHeading={() => <SimilarResultsHeading />}
          />
        </Center>
        <Center>
          <Box w="100%" h={'50%'} />
        </Center>
      </ScrollView>
    ) : (
      <ScrollView width={'100%'}>
        <HStack
          m={5}
          borderWidth={1}
          rounded={10}
          alignItems={'center'}
          borderColor="coolGray.300"
          shadow="3"
          bg="yellow.100"
          p="5">
          <WarningOutlineIcon size="lg" mr={2} color="yellow.600" />
          <Text
            color="coolGray.800"
            mt="0"
            mb="3"
            fontWeight="medium"
            fontSize="xl"
            numberOfLines={2}
            accessibilityLabel="No results found">
              
            നിങ്ങൾ തിരഞ്ഞ വാക്ക് നിഘണ്ടുവിൽ കാണുന്നില്ല
          </Text>
        </HStack>
      </ScrollView>
    );

  return (
    <>
      <Box {...upperBoxStyleProps} />
      <Animated.View {...vStack1Props} h={percentageTransition}>
        <Animated.Image
          alt={'Alternate Text'}
          borderWidth={1}
          borderRadius={100}
          source={LogoImage}
          resizeMode="contain"
          style={{...animatedViewStyles}}
        />
        {!isFinished ? (
          <Animated.Text
            style={{
              opacity: textVisibilityTransition,
              transform: [{scale: textVisibilityTransition}],
            }}>
            Offline English-Malayalam Dictionay
          </Animated.Text>
        ) : null}
      </Animated.View>

      <VStack {...vStack2Props}>
        {resultNode}
        <Center
          w="100%"
          marginTop={'5%'}
          marginBottom={'6%'}
          marginLeft={0}
          marginRight={0}>
          <AutoComplete
            onSearchTextSelected={searchDictionaryForWord}
            isResultLoading={isResultLoading}
            onQueryInvalid={clearResults}
            onInputFocus={doAnimation}
          />
        </Center>
      </VStack>

      <HStack {...hStack1Props} />
    </>
  );
}
