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
  SunIcon,
  MoonIcon,
  HamburgerIcon,
  HStack,
} from 'native-base';
import {InterfaceVStackProps} from 'native-base/lib/typescript/components/primitives/Stack/VStack';
import AnimatedSlideUp from './components/AnimatedSlideUp';
import {DeviceLightMode} from './types';

export const vStackProps: InterfaceVStackProps = {
  space: 5,
  alignItems: 'center',
  w: '100%',
  height: '100%',
};

const animatedSlideUpProps = {style: {width: '100%', height: '100%'}};

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
    <Center h={'100%'} w={'100%'} borderWidth={5} borderColor={'#e0e'}>
      <AnimatedSlideUp
        {...animatedSlideUpProps}
        animDirection={animDirection}
        onAnimationFinish={onAnimationFinish}>
        <Flex
          bg="#333"
          borderWidth={0}
          safeArea={true}
          width={'100%'}
          alignItems="flex-end"
          justifyContent={'center'}>
          <IconButton
            mr={5}
            borderWidth={1}
            borderColor="light.50"
            borderRadius={100}
            shadow="3"
            accessibilityLabel={'close message and search again'}
            _icon={{size: 'xl', color: 'light.500'}}
            bg="white"
            icon={<CloseIcon />}
            onPress={handleOnPress}
          />
        </Flex>
        <Flex borderWidth={1} flexGrow={1}>
          <ScrollView>
            <VStack {...vStackProps}>
              <HStack>
                <IconButton
                  mr={5}
                  borderColor="light.500"
                  borderRadius={100}
                  shadow="3"
                  _icon={{size: 'xl', color: 'light.500'}}
                  bg="white"
                  icon={<SunIcon color={'darkBlue.500'} key="moon" />}
                  onPress={() => {
                    changeAppLightMode('light');
                  }}
                />

                <IconButton
                  mr={5}
                  borderColor="light.500"
                  borderRadius={100}
                  shadow="3"
                  _icon={{size: 'xl', color: 'light.500'}}
                  bg="white"
                  icon={<MoonIcon color={'darkBlue.500'} key="moon" />}
                  onPress={() => {
                    changeAppLightMode('dark');
                  }}
                />

                <IconButton
                  mr={5}
                  borderColor="light.500"
                  borderRadius={100}
                  shadow="3"
                  _icon={{size: 'xl', color: 'light.500'}}
                  bg="white"
                  icon={<HamburgerIcon color={'darkBlue.500'} key="moon" />}
                  onPress={() => {
                    changeAppLightMode('device');
                  }}
                />
              </HStack>
              <Box mt={5} mb={5} borderWidth={2} >
                <Heading>
                  <Text fontSize="5xl">Extra Large</Text>
                </Heading>
              </Box>
              <Text fontSize="md">
                The quick brown fox jumps over the lazy dog" is an
                English-language pangram—a sentence that contains all of the
                letters of the English alphabet. Owing to its existence, Chakra
                was created. The quick brown fox jumps over the lazy dog" is an
                English-language pangram—a sentence that contains all of the
                letters of the English alphabet. Owing to its existence, Chakra
                was created. The quick brown fox jumps over the lazy dog" is an
                English-language pangram—a sentence that contains all of the
                letters of the English alphabet. Owing to its existence, Chakra
                was created.
                <Text highlight>Highlighted</Text>
              </Text>
            </VStack>
          </ScrollView>
        </Flex>

        <Flex safeArea={true} bg="#333" />
      </AnimatedSlideUp>
    </Center>
  );
}
