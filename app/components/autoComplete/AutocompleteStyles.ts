import {IBoxProps, IIconButtonProps, IInputProps} from 'native-base';
import {IFlatListProps} from 'native-base/lib/typescript/components/basic/FlatList';
import {useThemeObject} from '../../utils/getTheme';

type Args = {
  isInputFocused: boolean;
  isResultLoading: boolean;
  ifSuggestionsPresent: boolean;
};

export function getStyles(args: Args) {
  const {ifSuggestionsPresent} = args;
  const theme = useThemeObject();

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
    borderColor: theme.secondryBG,
    size: '2xl',
    w: '100%',
    variant: 'unstyled',
    bg: theme.secondryBG,
    placeholderTextColor: theme.secondaryText,
    _focus: {
      borderWidth: 1,
      borderColor: theme.primaryBG,
      placeholderTextColor: theme.secondaryText,
      backgroundColor: theme.secondryBG,
    },
    ...inputBorderStyles,
  };

  const inputIconBtnStyles: IIconButtonProps = {
    size: 'md',
    bg: 'transparent',
    borderWidth: 0,
    borderRadius: 100,
    _icon: {
      collapsable: true,
      color: theme.primaryBG,
    },
    _pressed: {
      bg: theme.primaryBG,
      _icon: {
        color: theme.secondryBG,
      },
    },
    _focus: {
      bg: 'transparent',
    },
  };

  const suggestionListStyles: Partial<IFlatListProps<string>> = {
    shadow: 0,
    bg: theme.secondryBG,
    w: '99.9%',
    position: 'absolute',
    borderTopWidth: 0,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.secondryBG,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  };

  const suggestionListItemStyles: IBoxProps = {
    borderBottomWidth: 1,
    borderRadius: 1,
    borderBottomColor: theme.secondryBG,
    paddingLeft: 2,
    paddingRight: 1,
    paddingTop: 2,
    paddingBottom: 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    bg: theme.secondryBG,
  };

  return {
    inputIconBtnStyles,
    inputStyles,
    suggestionListItemStyles,
    suggestionListStyles,
  };
}
