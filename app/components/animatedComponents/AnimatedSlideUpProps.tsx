import {Animated} from 'react-native';

export type animDirection = 'forward' | 'reverse';
export type Props = {
  style?: Object;
  duration?: number;
  startWhen?: boolean;
  animDirection?: animDirection;
  outputRange?: number;
  onAnimationFinish?: () => void;
};
export type State = {
  animatedValue: Animated.Value;
  duration: number;
  direction: animDirection;
};


