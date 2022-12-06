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
import AnalyticsSwitch from './components/AnalyticsSwitch';
export const vStackProps: InterfaceVStackProps = {
  space: 1,
  alignItems: 'flex-start',
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
            accessibilityLabel={'close settings'}
            accessibilityHint={'close settings goto home screen'}
            borderWidth={2}
            borderRadius={100}
            borderColor={'transparent'}
            variant="outline"
            rounded="full"
            size="lg"
            shadow={0}
            style={[
              styles.shadowProp,
              {
                shadowColor: theme.primaryText,
                borderColor: `${theme.primaryText}4d`, //0.5 opacity
              },
            ]}
            onPress={handleOnPress}
            bg={theme.primaryBG}
            collapsable={true}
            icon={<CloseIcon key={uuid} />}
            _icon={{size: 'xl', color: theme.primaryText}}
            _pressed={{
              backgroundColor: theme.primaryText,
              _icon: {color: theme.primaryBG},
            }}
            _focus={{
              backgroundColor: theme.primaryBG,
              _icon: {color: theme.lightColor1},
            }}
            key="open-close-icon"
          />
        </Flex>
        <Flex flexGrow={1} width={'100%'} pl={'5%'} pr={'5%'}>
          <LightMode />
          <AnalyticsSwitch />
          <ScrollView horizontal={false} width="100%">
            <VStack {...vStackProps}>
              <Box
                mb={2}
                mt={5}
                borderBottomWidth={2}
                pt={2}
                pl={4}
                pr={4}
                pb={1}
                borderColor={theme.primaryText}>
                <Text color={theme.primaryText} fontSize="2xl" bold>
                  About
                </Text>
              </Box>

              <TextAnimator
                content={enText}
                duration={200}
                textStyle={{...styles.text, color: theme.primaryText}}
                wrapperStyle={styles.wrapper}
              />
              <Box
                mb={2}
                mt={3}
                borderBottomWidth={2}
                pt={2}
                pl={4}
                pr={4}
                pb={1}
                borderColor={theme.primaryText}>
                <Text color={theme.primaryText} fontSize="2xl" bold>
                  Links
                </Text>
              </Box>
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
  shadowProp: {
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderWidth: 0.5,
  },
});
