import {IBoxProps, IIconButtonProps, IInputProps} from 'native-base';
import {IFlatListProps} from 'native-base/lib/typescript/components/basic/FlatList';
import {Theme} from '../../types';

type Args = {
  isInputFocused: boolean;
  isResultLoading: boolean;
  ifSuggestionsPresent: boolean;
  theme: Theme;
};

export function getStyles(args: Args) {
  const {ifSuggestionsPresent, theme} = args;

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
    size: '2xl',
    w: '100%',
    variant: 'unstyled',
    borderColor: theme.secondryBG,
    bg: theme.secondryBG,
    placeholderTextColor: theme.secondaryText,
    _focus: {
      borderColor: theme.primaryBG,
      placeholderTextColor: theme.secondaryText,
      backgroundColor: theme.secondryBG,
    },
    ...inputBorderStyles,
  };

  const inputIconBtnStyles: IIconButtonProps = {
    size: 'md',
    bg: theme.searchIconBG || theme.secondryBG,
    borderWidth: 0,
    borderRadius: 100,
    _icon: {
      collapsable: true,
      color: theme.searchIconColor || theme.secondaryText,
    },
    _pressed: {
      bg: theme.searchIconColor || theme.secondaryText,
      _icon: {
        color: theme.searchIconBG || theme.secondryBG,
      },
    },
    _focus: {
      bg: theme.searchIconColor || theme.secondaryText,
      _icon: {
        color: theme.searchIconBG || theme.secondryBG,
      },
    },
  };

  const suggestionListStyles: Partial<IFlatListProps<string>> = {
    bg: theme.secondryBG,
    borderColor: theme.secondryBG,
    borderTopWidth: 0,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    position: 'absolute',
    shadow: 0,
    w: '100%',
  };

  const suggestionListItemStyles: IBoxProps = {
    borderBottomWidth: 1,
    borderRadius: 1,
    borderBottomColor: theme.secondryBG,
    bg: theme.secondryBG,
    paddingLeft: 2,
    paddingRight: 1,
    paddingTop: 2,
    paddingBottom: 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  };

  return {
    inputIconBtnStyles,
    inputStyles,
    suggestionListItemStyles,
    suggestionListStyles,
  };
}
