import {IBoxProps, IIconButtonProps, IInputProps} from 'native-base';
import {IFlatListProps} from 'native-base/lib/typescript/components/basic/FlatList';

export const inputStyles: IInputProps = {
  marginTop: '1px',
  marginBottom: 2,
  marginLeft: 0,
  marginRight: 0,
  paddingLeft: 5,
  paddingRight: 5,
  paddingTop: 3,
  paddingBottom: 3,
  borderWidth: 1,
  borderRadius: 100,
  borderColor: 'coolGray.500',
  size: '2xl',
  w: '100%',
  variant: 'unstyled',
  bg: 'light.50',
  color: 'coolGray.700',
  placeholderTextColor: 'coolGray.300',
  _focus: {background: 'white', borderColor: 'teal.700'},
};

export const suggestionListStyles: Partial<IFlatListProps<string>> = {
  shadow: '3',
  bg: 'white',
  w: '100%',
  position: 'absolute',
  borderTopWidth: 1,
  borderLeftWidth: 1,
  borderRightWidth: 1,
  borderBottomWidth: 1,
  borderColor: 'teal.700',
  borderRadius: 10,
};

export const inputIconBtnStyles: IIconButtonProps = {
  size: 'md',
  bg: 'transparent',
  borderWidth: 0,
  borderRadius: 100,
  _pressed: {
    bg: 'emerald.200',
  },
  _focus: {
    bg: 'transparent',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: 'emerald.500',
  },
};

export const suggestionListItemStyles: IBoxProps = {
  borderBottomWidth: '1',
  borderRadius: 1,
  borderBottomColor: 'teal.100',
  shadow: 0,
  borderColor: 'muted.800',
  paddingLeft: 2,
  paddingRight: 1,
  paddingTop: 2,
  paddingBottom: 2,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
};
