import * as React from 'react';
import {Text, Spacer, Heading} from 'native-base';
import {useThemeObject} from '../utils/getTheme';
export default function SimilarResultsHeading() {
  const theme = useThemeObject();
  return (
    <Heading
      adjustsFontSizeToFit
      color={theme.primaryText}
      marginBottom={5}
      marginTop={5}
      padding={1}
      bg={theme.primaryBG}
      textAlign="center">
      <Text>സമാനമായ മറ്റ് വാക്കുകൾ</Text>
      <Spacer />
    </Heading>
  );
}
