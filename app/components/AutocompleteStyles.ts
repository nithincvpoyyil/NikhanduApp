import {IBoxProps, IIconButtonProps, IInputProps} from 'native-base';
import {IFlatListProps} from 'native-base/lib/typescript/components/basic/FlatList';
type Args = {
  isInputFocused: boolean;
  isResultLoading: boolean;
  ifSuggestionsPresent: boolean;
};
export function getStyles(args: Args) {
  const {ifSuggestionsPresent} = args;

  const inputBorderStyles = ifSuggestionsPresent
    ? {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 1,
        borderBottomLeftRadius: 1,
      }
    : {borderRadius: 100};

  const inputStyles: IInputProps = {
    marginTop: '1px',
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 3,
    paddingBottom: 3,
    borderWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'coolGray.500',
    size: '2xl',
    w: '100%',
    variant: 'unstyled',
    bg: 'transparent',
    color: 'coolGray.800',
    placeholderTextColor: 'coolGray.400',
    _focus: {
      borderWidth: 1,
      borderColor: 'coolGray.800',
      placeholderTextColor: 'coolGray.500',
      backgroundColor: '#ffb',
    },
    ...inputBorderStyles,
  };

  const suggestionListStyles: Partial<IFlatListProps<string>> = {
    shadow: '3',
    bg: 'transparent',
    w: '100%',
    position: 'absolute',
    borderTopWidth: 0,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'coolGray.800',
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    borderBottomRightRadius: 2,
    borderBottomLeftRadius: 2,
  };

  const inputIconBtnStyles: IIconButtonProps = {
    size: 'md',
    bg: 'transparent',
    borderWidth: 0,
    borderRadius: 100,
    _pressed: {
      bg: '#ff9',
    },
    _focus: {
      bg: 'transparent',
      borderWidth: 1,
      borderRadius: 100,
      borderColor: 'coolGray.500',
    },
  };

  const suggestionListItemStyles: IBoxProps = {
    borderBottomWidth: '1',
    borderRadius: 1,
    borderBottomColor: 'coolGray.300',
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
    bg: '#ffb',
  };

  return {
    inputIconBtnStyles,
    inputStyles,
    suggestionListItemStyles,
    suggestionListStyles,
  };
}
