import * as React from 'react';
import {Fab, IconButton, ThreeDotsIcon} from 'native-base';
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
          shadow={3}
          onPress={props.onPress}
          bg={theme.whiteColor1}
          collapsable={true}
          icon={<ThreeDotsIcon key={uuid} />}
          _icon={{size: 'xl', color: theme.primaryBG}}
          _pressed={{
            backgroundColor: theme.primaryBG,
            _icon: {color: theme.whiteColor1},
          }}
          _focus={{
            backgroundColor: theme.primaryBG,
            _icon: {color: theme.whiteColor1},
          }}
          key="open-close-icon"
        />
      }
    />
  );
};
