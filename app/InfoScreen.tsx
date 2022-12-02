import * as React from 'react';
import {
  VStack,
  Center,
  ScrollView,
  Box,
  Text,
  Heading,
  Flex,
  CloseIcon,
  IconButton,
  Link,
} from 'native-base';
import {InterfaceVStackProps} from 'native-base/lib/typescript/components/primitives/Stack/VStack';
import AnimatedSlideUp from './components/animatedComponents/AnimatedSlideUp';
import {DeviceLightMode} from './types';
import TextAnimator from './components/animatedComponents/TextAnimator';
import {enText, links} from './utils/textConstants';
import {useThemeObject} from './utils/getTheme';
import {StyleSheet} from 'react-native';
import LightMode from './components/LightMode';
export const vStackProps: InterfaceVStackProps = {
  space: 5,
  alignItems: 'center',
  w: '100%',
};

const animatedSlideUpProps = {style: {width: '100%', height: '100%'}};

export default function InfoScreen({
  onPressCloseBtn,
}: {
  onPressCloseBtn: () => void;
  changeAppLightMode: (mode: DeviceLightMode) => void;
}) {
  const [isCloseClicked, setIsCloseClicked] = React.useState(false);
  const [animDirection, setAnimDirection] = React.useState<
    'forward' | 'reverse'
  >('forward');
  const [uuid] = React.useState<number>(Date.now());

  const handleOnPress = () => {
    setAnimDirection('reverse');
    setIsCloseClicked(true);
  };

  const onAnimationFinish = () => {
    if (isCloseClicked) {
      onPressCloseBtn();
    }
  };

  const theme = useThemeObject();

  return (
    <Center bg={theme.primaryBG}>
      <AnimatedSlideUp
        {...animatedSlideUpProps}
        animDirection={animDirection}
        onAnimationFinish={onAnimationFinish}>
        <Flex
          bg={theme.primaryBG}
          safeArea={true}
          width={'100%'}
          alignItems="center"
          justifyContent={'space-between'}
          flexDir="row">
          <Box
            m={2}
            borderBottomWidth={2}
            borderBottomColor={theme.primaryText}
            pt={2}
            pl={4}
            pr={4}
            pb={1}>
            <Heading>
              <Text color={theme.primaryText} fontSize="3xl">
                Settings
              </Text>
            </Heading>
          </Box>
          <IconButton
            mr={5}
            borderWidth={2}
            borderColor={theme.primaryText}
            borderRadius={100}
            collapsable={true}
            accessibilityLabel={'close settings'}
            accessibilityHint={'close settings goto home screen'}
            bg={theme.primaryText}
            icon={<CloseIcon key={uuid} />}
            onPress={handleOnPress}
            _icon={{size: 'md', color: theme.primaryBG}}
            _pressed={{_icon: {color: theme.primaryText}, bg: theme.primaryBG}}
          />
        </Flex>
        <Flex flexGrow={1} width={'100%'} pl={'5%'} pr={'5%'}>
          <LightMode />
          <ScrollView horizontal={false} width="100%">
            <VStack {...vStackProps}>
              <Box
                mb={1}
                mt={5}
                borderWidth={2}
                pt={2}
                pl={4}
                pr={4}
                pb={2}
                borderColor={theme.primaryText}>
                <Text color={theme.primaryText} fontSize="2xl">
                  About
                </Text>
              </Box>

              <TextAnimator
                content={enText}
                duration={200}
                textStyle={{...styles.text, color: theme.primaryText}}
                wrapperStyle={styles.wrapper}
              />
            </VStack>
            <Text fontSize="lg" bold mt={10} color={theme.primaryText}>
              Links
            </Text>
            <VStack>
              {links.map(i => (
                <Link
                  key={i.key}
                  href={`${i.link}`}
                  mb={1}
                  pt={1}
                  pl={0}
                  pr={1}
                  pb={1}
                  _text={{fontSize: 'sm', color: theme.primaryText}}>
                  {i.key}
                </Link>
              ))}
            </VStack>
          </ScrollView>
        </Flex>
        <Flex safeArea={true} height={5} />
      </AnimatedSlideUp>
    </Center>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    paddingTop: 8,
  },
  wrapper: {
    justifyContent: 'flex-start',
  },
});
