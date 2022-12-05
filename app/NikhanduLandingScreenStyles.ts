import {InterfaceBoxProps} from 'native-base/lib/typescript/components/primitives/Box';
import {InterfaceHStackProps} from 'native-base/lib/typescript/components/primitives/Stack/HStack';
import {InterfaceVStackProps} from 'native-base/lib/typescript/components/primitives/Stack/VStack';

export const upperBoxStyleProps: InterfaceBoxProps = {
  h: '15%',
  w: '100%',
  flexBasis: '8%',
  flexShrink: 0,
};

export const vStack1Props: InterfaceVStackProps = {
  alignItems: 'center',
  w: '100%',
  display: 'flex',
  justifyContent: 'center',
};

export const vStack2Props: InterfaceVStackProps = {
  space: 1,
  alignItems: 'center',
  w: '100%',
  flexDirection: 'column-reverse',
  flexGrow: 1,
  flexBasis: '65%',
};
export const hStack1Props: InterfaceHStackProps = {
  space: 5,
  w: '100%',
  alignItems: 'center',
  justifyContent: 'center',
};
