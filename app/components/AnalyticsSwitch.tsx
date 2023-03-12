import * as React from 'react';
import {Text, HStack, Switch, Flex, VStack} from 'native-base';
import {InterfaceVStackProps} from 'native-base/lib/typescript/components/primitives/Stack/VStack';
import {useThemeObject} from '../utils/getTheme';
import {setData} from '../utils/DataStore';
import {ANALYTICS_FLAG} from '../types';
import {useAnalyticsFlag} from '../utils/useAnalytics';
import {analyticsDeclaration} from '../utils/textConstants';
import TextAnimator from './animatedComponents/TextAnimator';
import {StyleSheet} from 'react-native';

export const vStackProps: InterfaceVStackProps = {
  space: 5,
  alignItems: 'center',
  w: '100%',
  height: '100%',
};

export default function AnalyticsSwitch() {
  const themeObject = useThemeObject();
  const [selected, setSelected] = React.useState(true);
  const blockFlag = useAnalyticsFlag();

  React.useEffect(() => {
    setSelected(blockFlag);
  }, [blockFlag]);

  const onToggle = () => {
    setSelected(!selected);
    setData(ANALYTICS_FLAG, `${!selected}`);
  };

  const theme = useThemeObject();

  return (
    <VStack padding={2}>
      <HStack
        alignItems={'center'}
        justifyContent="flex-start"
        accessibilityHint="Change application theme by setting theme options below"
        flexWrap="wrap"
        width={'100%'}
        paddingBottom={4}
        paddingTop={2}>
        <Text bold color={themeObject.primaryText} fontSize="sm" mr={5}>
          Enable analytics
        </Text>
        <Switch
          value={selected}
          onToggle={onToggle}
          borderWidth={2}
          borderColor={themeObject.primaryText}
          offTrackColor={themeObject.primaryBG}
          onTrackColor={themeObject.primaryText}
          thumbColor={themeObject.custom?.switch.thumbColor}
          size="md"
          minWidth={'10%'}
        />
      </HStack>

      <TextAnimator
        content={analyticsDeclaration}
        duration={200}
        textStyle={{...styles.text, color: theme.primaryText}}
        wrapperStyle={styles.wrapper}
      />
    </VStack>
  );
}

const styles = StyleSheet.create({
  text: {
    paddingTop: 4,
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
