import * as React from 'react';
import {Fab, IconButton, ThreeDotsIcon} from 'native-base';

export const MenuList = (props: {onPress: () => void}) => {
  return (
    <Fab
      bg={'transparent'}
      placement="bottom-right"
      label={
        <IconButton
          shadow={3}
          variant="outline"
          rounded="full"
          size="lg"
          onPress={props.onPress}
          bg="emerald.500"
          icon={<ThreeDotsIcon color="white" key="dark" />}
          _pressed={{bg: 'emerald.400'}}
          borderWidth={0}
          key="open-close-icon"
        />
      }
      _pressed={{bg: 'transparent'}}
    />
  );
};
