import * as React from 'react';
import {Box, Flex} from 'native-base';
import {Animated, Easing, StyleSheet} from 'react-native';
import {getTheme} from '../../utils/getTheme';
import {vStack1Props} from '../../NikhanduLandingScreenStyles';
import AutoComplete from '../autoComplete/Autocomplete';

const LogoImage = require('../../assets/images/LandingLogo.png');

export default function AnimatedUpperSection(props: {
  isResultLoadingState: 'init' | 'loading' | 'loaded' | 'error';
  searchDictionaryForWord: (query: string) => void;
  clearResults: () => void;
}) {
  const {isResultLoadingState, clearResults, searchDictionaryForWord} = props;
  const [isAnimationFinished, setIsAnimationFinished] = React.useState(false);
  const [isAnimated, setIsAnimated] = React.useState(false);

  const iconSizeTransition = React.useRef(new Animated.Value(120)).current;
  const inputPaddingTransition = React.useRef(new Animated.Value(5)).current;
  const fromZeroTransition = React.useRef(new Animated.Value(0)).current;
  const heightTransition = React.useRef(new Animated.Value(17)).current;
  const textVisibilityTransition = React.useRef(new Animated.Value(1)).current;

  const theme = getTheme();
  const bgStyle = isAnimationFinished ? {backgroundColor: theme.primaryBG} : {};

  const animatedViewStyles = {
    height: iconSizeTransition,
    width: iconSizeTransition,
    margin: 10,
    transform: [
      {
        scale: fromZeroTransition.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 0.8, 1],
        }),
      },
    ],
  };
  const doAnimation = () => {
    if (!isAnimated) {
      setIsAnimated(true);

      Animated.parallel([
        Animated.timing(inputPaddingTransition, {
          toValue: 5,
          duration: 200,
          easing: Easing.exp,
          useNativeDriver: false,
        }),
        Animated.sequence([
          Animated.timing(textVisibilityTransition, {
            toValue: 0,
            duration: 600,
            easing: Easing.ease,
            useNativeDriver: false,
          }),
          Animated.timing(iconSizeTransition, {
            toValue: 40,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: false,
          }),
        ]),
      ]).start(() => {
        setIsAnimationFinished(true);
        Animated.sequence([
          Animated.timing(heightTransition, {
            toValue: 10,
            duration: 1000,
            easing: Easing.quad,
            useNativeDriver: true,
          }),
          Animated.timing(fromZeroTransition, {
            toValue: 1,
            duration: 500,
            easing: Easing.circle,
            useNativeDriver: false,
          }),
        ]).start();
      });
    }
  };

  const h = heightTransition.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <Flex w={'100%'} zIndex={200}>
      <Box {...bgStyle} safeArea={true} />
      <Animated.View {...vStack1Props} h={h} borderWidth={1} style={[bgStyle]}>
        <Animated.Image
          alt={'image logo'}
          borderRadius={100}
          source={LogoImage}
          resizeMode="contain"
          style={{...animatedViewStyles}}
          borderWidth={1}
        />
        <Animated.Text
          style={{
            opacity: textVisibilityTransition,
            transform: [{scale: textVisibilityTransition}],
            color: theme.primaryText,
          }}>
          Offline English-Malayalam Dictionay
        </Animated.Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.inputContainer,
          {
            paddingTop: inputPaddingTransition.interpolate({
              inputRange: [0, 300],
              outputRange: ['0%', '100%'],
            }),
            paddingBottom: inputPaddingTransition.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
            ...bgStyle,
          },
        ]}>
        <AutoComplete
          onSearchTextSelected={searchDictionaryForWord}
          isResultLoading={isResultLoadingState === 'loading'}
          onQueryInvalid={clearResults}
          onInputFocus={doAnimation}
        />
      </Animated.View>
    </Flex>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginLeft: 0,
    marginRight: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
});
