import * as React from 'react';
import {Text, Spacer, Heading} from 'native-base';
import {getTheme} from '../utils/getTheme';
export default function SimilarResultsHeading() {
  const theme = getTheme();
  return (
    <Heading
      adjustsFontSizeToFit
      marginBottom={'1.5'}
      marginTop={'3'}
      color={theme.darkColor1}
      padding={'1'}>
      <Text fontSize={'xl'}>സമാനമായ മറ്റ് വാക്കുകൾ</Text>
      <Spacer />
    </Heading>
  );
}
