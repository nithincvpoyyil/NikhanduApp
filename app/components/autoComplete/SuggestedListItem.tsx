import {Box, IBoxProps, SearchIcon, Text} from 'native-base';
import * as React from 'react';
import {ListRenderItemInfo, TouchableOpacity} from 'react-native';
import {useThemeObject} from '../../utils/getTheme';

export default function SuggestedListItem({
  listItem,
  onPressListItem,
  listStyle = {},
}: {
  listItem: ListRenderItemInfo<string>;
  onPressListItem: (item: string) => void;
  listStyle: IBoxProps;
}) {
  const theme = useThemeObject();

  const onPressItem = () => {
    onPressListItem(listItem.item);
  };
  return (
    <TouchableOpacity
      onPress={onPressItem}
      accessibilityRole="button"
      accessibilityLabel={`search ${listItem.item}`}>
      <Box {...listStyle}>
        <SearchIcon
          marginLeft={1}
          marginRight={2}
          color={theme.secondaryText}
          accessible={false}
        />
        <Text color={theme.secondaryText}>{listItem.item}</Text>
      </Box>
    </TouchableOpacity>
  );
}
