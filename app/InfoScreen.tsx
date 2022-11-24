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
import AnimatedSlideUp from './components/AnimatedSlideUp';
import {DeviceLightMode} from './types';
import LightMode from './components/LightMode';
import TextAnimator from './components/TextAnimator';

export const vStackProps: InterfaceVStackProps = {
  space: 5,
  alignItems: 'center',
  w: '100%',
  height: '100%',
};

const animatedSlideUpProps = {style: {width: '100%', height: '100%'}};

const malayalamtext =
  'വളരുന്ന, സ്വതന്ത്രവും തുറന്നതുമായ, രണ്ടു ലക്ഷത്തിൽപ്പരം രേഖകളുള്ള ഒരു ഇംഗ്ലീഷ്-മലയാളം നിഘണ്ടു സമുച്ചയം.';
const enText =
  "This app is based on Olam's growing crowd sourced English-Malayalam dictionary dataset with over 125,000 Malayalam definitions for more than 58,000 English words.";

export default function InfoScreen({
  onPressCloseBtn,
  changeAppLightMode,
}: {
  onPressCloseBtn: () => void;
  changeAppLightMode: (mode: DeviceLightMode) => void;
}) {
  const [isCloseClicked, setIsCloseClicked] = React.useState(false);
  const [animDirection, setAnimDirection] = React.useState<
    'forward' | 'reverse'
  >('forward');
  const handleOnPress = () => {
    setAnimDirection('reverse');
    setIsCloseClicked(true);
  };

  const onAnimationFinish = () => {
    if (isCloseClicked) {
      onPressCloseBtn();
    }
  };
  return (
    <Center h={'100%'} w={'100%'} bg="#ffa">
      <AnimatedSlideUp
        {...animatedSlideUpProps}
        animDirection={animDirection}
        onAnimationFinish={onAnimationFinish}>
        <Flex
          bg="#ffa"
          safeArea={true}
          width={'100%'}
          alignItems="center"
          justifyContent={'space-between'}
          flexDir="row">
          <Box m={2} borderBottomWidth={2} pt={2} pl={4} pr={4} pb={1}>
            <Heading>
              <Text fontSize="3xl">Settings</Text>
            </Heading>
          </Box>
          <IconButton
            mr={5}
            borderWidth={2}
            borderColor="coolGray.800"
            borderRadius={100}
            shadow="3"
            accessibilityLabel={'close message and search again'}
            bg="transparent"
            icon={<CloseIcon />}
            onPress={handleOnPress}
            _icon={{size: 'xl', color: 'coolGray.800'}}
            _pressed={{_icon: {color: 'coolGray.900'}, bg: 'white'}}
          />
        </Flex>
        <Flex
          flexGrow={1}
          width={'90%'}
          marginLeft={'5%'}
          pl={1}
          pr={1}
          pt={'3%'}
          pb={'3%'}>
          <Center>
            <ScrollView>
              <VStack {...vStackProps}>
                <LightMode
                  currentMode="device"
                  changeAppLightMode={changeAppLightMode}
                />
                <Box mb={1} mt={5} borderWidth={2} pt={2} pl={4} pr={4} pb={2}>
                  <Text fontSize="2xl">About</Text>
                </Box>

                <TextAnimator
                  content={enText}
                  duration={500}
                  // eslint-disable-next-line react-native/no-inline-styles
                  textStyle={{
                    fontSize: 16,
                    paddingTop: 8,
                  }}
                  // eslint-disable-next-line react-native/no-inline-styles
                  wrapperStyle={{justifyContent: 'flex-start'}}
                />

                <TextAnimator
                  content={malayalamtext}
                  duration={1200}
                  // eslint-disable-next-line react-native/no-inline-styles
                  textStyle={{
                    fontSize: 16,
                    paddingTop: 8,
                  }}
                  // eslint-disable-next-line react-native/no-inline-styles
                  wrapperStyle={{justifyContent: 'flex-start'}}
                />

                <VStack w={'100%'}>
                  <Text fontSize="lg" bold>
                    Links
                  </Text>

                  <Link
                    mb={2}
                    mt={1}
                    pt={1}
                    pl={0}
                    pr={1}
                    pb={1}
                    _text={{fontSize: 'sm', color: 'coolGray.800'}}
                    href="https://olam.in/open/enml/">
                    Olam en-ml dictionary dataset
                  </Link>
                </VStack>
              </VStack>
            </ScrollView>
          </Center>
        </Flex>

        <Flex safeArea={true} bg="#ffa" />
      </AnimatedSlideUp>
    </Center>
  );
}
