import * as React from 'react';
import {Fab, IconButton, ThreeDotsIcon} from 'native-base';

export const MenuList = (props: {onPress: () => void}) => {
  return (
    <Fab
      bg={'transparent'}
      placement="bottom-right"
      label={
        <IconButton
          accessibilityLabel={'close message and search again'}
          borderWidth={2}
          borderRadius={100}
          borderColor={'coolGray.600'}
          variant="outline"
          rounded="full"
          size="lg"
          shadow={3}
          onPress={props.onPress}
          bg="light.50"
          icon={<ThreeDotsIcon />}
          _icon={{size: 'xl', color: 'coolGray.800'}}
          _pressed={{backgroundColor: '#ffa'}}
          _focus={{backgroundColor: '#ffa'}}
          key="open-close-icon"
        />
      }
    />
  );
};
