import {InterfaceBoxProps} from 'native-base/lib/typescript/components/primitives/Box';
import {InterfaceHStackProps} from 'native-base/lib/typescript/components/primitives/Stack/HStack';
import {InterfaceVStackProps} from 'native-base/lib/typescript/components/primitives/Stack/VStack';

export const upperBoxStyleProps: InterfaceBoxProps = {
  h: '8%',
  w: '100%',
};

export const vStack1Props: InterfaceVStackProps = {
  h: '17%',
  space: 1,
  alignItems: 'center',
  w: '100%',
  display: 'flex',
  justifyContent: 'center',
};
export const vStack2Props: InterfaceVStackProps = {
  space: 1,
  alignItems: 'center',
  w: '100%',
  height: '70%',
  flexDirection: 'column-reverse',
};
export const hStack1Props: InterfaceHStackProps = {
  space: 5,
  w: '100%',
  height: '5%',
  alignItems: 'center',
  justifyContent: 'center',
};
