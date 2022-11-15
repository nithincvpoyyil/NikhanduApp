import * as React from 'react';
import {Text, Spacer, Heading} from 'native-base';
export default function SimilarResultsHeading() {
  return (
    <Heading
      width={'100%'}
      adjustsFontSizeToFit
      marginBottom={'1.5'}
      marginTop={'3'}
      color="info.800"
      padding={'1'}>
      <Text fontSize={'md'}>സമാനമായ മറ്റ് വാക്കുകൾ</Text>
      <Spacer />
    </Heading>
  );
}
