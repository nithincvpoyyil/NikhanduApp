import * as React from 'react';
import {Fab, IconButton, ThreeDotsIcon} from 'native-base';
import {StyleSheet} from 'react-native';
import {useThemeObject} from '../utils/getTheme';

export const MenuList = (props: {onPress: () => void}) => {
  const theme = useThemeObject();
  const [uuid] = React.useState<number>(Date.now());

  return (
    <Fab
      bg={'transparent'}
      placement={'bottom-right'}
      _pressed={{bg: 'transparent'}}
      _focus={{bg: 'transparent'}}
      shadow={0}
      label={
        <IconButton
          accessibilityLabel={'open settings'}
          accessibilityHint="tap settings button to see settings screen"
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
              borderColor: `${theme.primaryText}4D`, //0.5 opacity
            },
          ]}
          onPress={props.onPress}
          bg={theme.primaryBG}
          collapsable={true}
          icon={<ThreeDotsIcon key={uuid} />}
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
      }
    />
  );
};

const styles = StyleSheet.create({
  shadowProp: {
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 5,
    borderWidth: 1,
  },
});
