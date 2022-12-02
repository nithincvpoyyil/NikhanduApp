import * as React from 'react';
import {Box, Flex} from 'native-base';
import {Animated, Easing, StyleSheet} from 'react-native';
import {getTheme} from '../../utils/getTheme';
import {vStack1Props} from '../../NikhanduLandingScreenStyles';
import AutoComplete from '../autoComplete/Autocomplete';
import {LoadState} from '../../types';

const LogoImage = require('../../assets/images/LandingLogo.png');
type Props = {
  isResultLoadingState: LoadState;
  searchDictionaryForWord: (query: string) => void;
  clearResults: () => void;
  onAnimationDidFinish?: () => void;
  onHeightAnimationDidFinish?: () => void;
};
export default function AnimatedUpperSection(props: Props) {
  const {
    isResultLoadingState,
    clearResults,
    searchDictionaryForWord,
    onAnimationDidFinish = () => {},
    onHeightAnimationDidFinish = () => {},
  } = props;
  const [isAnimated, setIsAnimated] = React.useState(false);
  const iconSizeTransition = React.useRef(new Animated.Value(120)).current;
  const inputPaddingTransition = React.useRef(new Animated.Value(5)).current;
  const fromZeroTransition = React.useRef(new Animated.Value(0)).current;
  const textVisibilityTransition = React.useRef(new Animated.Value(1)).current;

  const theme = getTheme();
  const bgStyle = {backgroundColor: theme.primaryBG};

  const animatedViewStyles = {
    height: iconSizeTransition,
    width: iconSizeTransition,
    margin: 1,
    transform: [
      {
        scale: fromZeroTransition.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 1, 1],
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
        onHeightAnimationDidFinish();
        Animated.sequence([
          Animated.timing(fromZeroTransition, {
            toValue: 1,
            duration: 500,
            easing: Easing.circle,
            useNativeDriver: false,
          }),
        ]).start(() => {
          onAnimationDidFinish();
        });
      });
    }
  };

  return (
    <Flex w={'100%'} zIndex={200}>
      <Box {...bgStyle} safeArea={true} />
      <Animated.View {...vStack1Props} style={[bgStyle]}>
        <Animated.Image
          alt={'nikhandu app logo'}
          borderRadius={100}
          source={LogoImage}
          resizeMode="contain"
          style={{...animatedViewStyles}}
          borderWidth={1}
        />
        <Animated.Text
          style={[
            {
              opacity: textVisibilityTransition,
              transform: [{scale: textVisibilityTransition}],
              color: theme.primaryText,
              margin: textVisibilityTransition.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 10],
              }),
            },
          ]}>
          Offline English-Malayalam Dictionary
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
