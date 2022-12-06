import * as React from 'react';
import {Text, HStack, Switch} from 'native-base';
import {InterfaceVStackProps} from 'native-base/lib/typescript/components/primitives/Stack/VStack';
import {useThemeObject} from '../utils/getTheme';
import {setData} from '../utils/DataStore';
import {ANALYTICS_FLAG} from '../types';
import {useBlockAnalyticsFlag} from '../utils/useAnalytics';

export const vStackProps: InterfaceVStackProps = {
  space: 5,
  alignItems: 'center',
  w: '100%',
  height: '100%',
};

export default function AnalyticsSwitch() {
  const themeObject = useThemeObject();
  const [selected, setSelected] = React.useState(true);
  const blockFlag = useBlockAnalyticsFlag();

  React.useEffect(() => {
    setSelected(blockFlag);
  }, [blockFlag]);

  const onToggle = () => {
    setSelected(!selected);
    setData(ANALYTICS_FLAG, `${!selected}`);
  };
  return (
    <>
      <HStack
        alignItems={'center'}
        justifyContent="flex-start"
        accessibilityHint="Change application theme by setting theme options below"
        m={2}>
        <Text color={themeObject.primaryText} fontSize="sm" bold mr={5}>
          Turn-{selected ? 'off' : 'on'} analytics
        </Text>
        <Switch
          value={selected}
          onToggle={onToggle}
          ios_backgroundColor={'transparent'}
          background={'transparent'}
          trackColor={{
            true: themeObject.primaryText,
            false: 'transparent',
          }}
          borderColor={themeObject.primaryText}
          borderWidth={1}
        />
      </HStack>
      <Text color={themeObject.primaryText} fontSize="sm" m={2}>
        Please note, we are collecting some information about word searches &
        failures (no personal identifible information) . If you are not okay
        with this, please turn-off.
      </Text>
    </>
  );
}
