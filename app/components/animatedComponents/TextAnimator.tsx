import * as React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TextProps,
  ViewProps,
  Text,
} from 'react-native';

type Props = {
  content: string;
  duration: number;
  repeat?: boolean;
  onFinish?: () => void;
  wrapperStyle?: ViewProps['style'];
  textStyle?: TextProps['style'];
};

export default class TextAnimator extends React.Component<Props> {
  animatedValues: Array<Animated.Value> = [];
  textArr: Array<string> = [];

  constructor(props: Props) {
    super(props);

    const textArr = props.content.trim().split(' ');
    textArr.forEach((_, i) => {
      this.animatedValues[i] = new Animated.Value(0);
    });
    this.textArr = textArr;
  }

  componentDidMount() {
    this.animated();
  }

  animated = (toValue = 1) => {
    const animations = this.textArr.map((_, i) => {
      return Animated.timing(this.animatedValues[i], {
        toValue,
        duration: this.props.duration,
        useNativeDriver: true,
      });
    });

    Animated.stagger(
      this.props.duration / 5,
      toValue === 0 ? animations.reverse() : animations,
    ).start(() => {
      if (this.props.repeat) {
        setTimeout(() => this.animated(toValue === 0 ? 1 : 0), 1000);
      }
      if (this.props.onFinish) {
        this.props.onFinish();
      }
    });
  };

  render() {
    const {textStyle = {}, wrapperStyle = {}} = this.props;
    return (
      <View style={[styles.textWrapper, wrapperStyle]}>
        <Text accessibilityLabel={this.props.content} />
        {this.textArr.map((word, index) => {
          return (
            <Animated.Text
              accessible={false}
              key={`${word}-${index}`}
              style={[
                textStyle,
                {
                  opacity: this.animatedValues[index],
                  transform: [
                    {
                      translateY: Animated.multiply(
                        this.animatedValues[index],
                        new Animated.Value(-5),
                      ),
                    },
                  ],
                },
              ]}>
              {word}
              {`${index < this.textArr.length ? ' ' : ''}`}
            </Animated.Text>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
