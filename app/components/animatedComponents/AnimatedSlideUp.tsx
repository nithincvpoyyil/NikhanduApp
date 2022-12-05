import React, {Component, PropsWithChildren} from 'react';
import {Animated} from 'react-native';
import {Props, State} from './AnimatedSlideUpProps';

export default class AnimatedSlideUp extends Component<
  PropsWithChildren<Props>,
  State
> {
  readonly state: State = {
    animatedValue: new Animated.Value(0),
    duration: this.props?.duration || 2000,
    direction: 'forward',
  };
  static defaultProps = {
    duration: 300,
    onAnimationFinish: () => null,
    outputRange: 1000,
  };

  componentDidMount() {
    if (!this.props.hasOwnProperty('startWhen')) {
      this._start();
    }
  }
  componentDidUpdate(prevProps: Props) {
    let {startWhen, animDirection} = this.props;
    if (
      startWhen !== prevProps.startWhen ||
      animDirection !== prevProps.animDirection
    ) {
      this._start();
    }
  }

  _start = () => {
    Animated.timing(this.state.animatedValue, {
      toValue: this.props.animDirection === 'reverse' ? 0 : 1,
      duration: this.state.duration,
      useNativeDriver: true,
    }).start(() => {
      requestAnimationFrame(() => {
        this.props.onAnimationFinish && this.props.onAnimationFinish();
      });
    });
  };

  render() {
    let {animatedValue} = this.state;
    let {children, style, ...props} = this.props;
    return (
      <Animated.View
        {...props}
        style={{
          ...style,
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [this.props.outputRange || 1000, 0],
              }),
            },
            {
              perspective: 1000,
            },
          ],
        }}>
        {children}
      </Animated.View>
    );
  }
}
