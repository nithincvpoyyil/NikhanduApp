import {Box, IBoxProps, SearchIcon, Text} from 'native-base';
import * as React from 'react';
import {ListRenderItemInfo, TouchableOpacity} from 'react-native';
import {getTheme} from '../../utils/getTheme';

export default function SuggestedListItem({
  listItem,
  onPressListItem,
  listStyle = {},
}: {
  listItem: ListRenderItemInfo<string>;
  onPressListItem: (item: string) => void;
  listStyle: IBoxProps;
}) {
  const theme = getTheme();

  const onPressItem = () => {
    onPressListItem(listItem.item);
  };
  return (
    <TouchableOpacity onPress={onPressItem}>
      <Box {...listStyle}>
        <SearchIcon marginLeft={1} marginRight={2} color={theme.darkColor1} />
        <Text color={theme.darkColor1}>{listItem.item}</Text>
      </Box>
    </TouchableOpacity>
  );
}
