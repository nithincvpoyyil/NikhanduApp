import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {ThemeKey} from '../types';

export function WithSplashScreen({
  children,
  isAppReady,
  theme,
}: {
  isAppReady: boolean;
  children: React.ReactNode;
  theme: {primaryBG: string};
}) {
  return (
    <>
      {isAppReady && children}
      <Splash isAppReady={isAppReady} theme={theme} />
    </>
  );
}

const LOADING_IMAGE = 'Loading image';
const FADE_IN_IMAGE = 'Fade in image';
const WAIT_FOR_APP_TO_BE_READY = 'Wait for app to be ready';
const FADE_OUT = 'Fade out';
const HIDDEN = 'Hidden';
type States =
  | typeof LOADING_IMAGE
  | typeof FADE_IN_IMAGE
  | typeof WAIT_FOR_APP_TO_BE_READY
  | typeof FADE_OUT
  | typeof HIDDEN;

const Splash = ({
  isAppReady,
  theme,
}: {
  isAppReady: boolean;
  theme: {primaryBG: string};
}) => {
  const containerOpacity = useRef(new Animated.Value(1)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const [state, setState] = useState<States>(LOADING_IMAGE);

  useEffect(() => {
    if (state === FADE_IN_IMAGE) {
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 1000, // Fade in duration
        useNativeDriver: true,
      }).start(() => {
        setState(WAIT_FOR_APP_TO_BE_READY);
      });
    }
  }, [imageOpacity, state]);

  useEffect(() => {
    if (state === WAIT_FOR_APP_TO_BE_READY) {
      if (isAppReady) {
        setState(FADE_OUT);
      }
    }
  }, [isAppReady, state]);

  useEffect(() => {
    if (state === FADE_OUT) {
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 1000, // Fade out duration
        delay: 1000, // Minimum time the logo will stay visible
        useNativeDriver: true,
      }).start(() => {
        setState(HIDDEN);
      });
    }
  }, [containerOpacity, state]);

  if (state === HIDDEN) {
    return null;
  }

  return (
    <Animated.View
      collapsable={false}
      style={[
        style.container,
        {opacity: containerOpacity},
        {backgroundColor: theme.primaryBG},
      ]}>
      <Animated.Image
        source={require('../assets/images/LandingLogo.png')}
        fadeDuration={0}
        onLoad={() => {
          setState(FADE_IN_IMAGE);
        }}
        style={[style.image, {opacity: imageOpacity}]}
        resizeMode="contain"
      />
      <Animated.Text style={[{opacity: imageOpacity}]}>
        Made with Love in Kerala
      </Animated.Text>
    </Animated.View>
  );
};

const style = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
});
