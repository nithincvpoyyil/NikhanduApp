import React from 'react';
import uuid from 'react-native-uuid';
import {getData, setData} from './DataStore';

const USER_ID_KEY = '@userid-info';
export const useUserID = (): [string, boolean] => {
  const [UUID, setUUID] = React.useState<string>('');
  const [done, setDone] = React.useState<boolean>(false);
  if (!UUID) {
    getData(USER_ID_KEY).then(
      userID => {
        if (userID) {
          setUUID(userID);
        } else {
          const randomUserID = '' + uuid.v4('unique-id');
          setUUID(randomUserID);
          setData(USER_ID_KEY, randomUserID);
        }
        setDone(true);
      },
      () => {
        setDone(true);
      },
    );
  } else {
    setDone(true);
  }

  return [UUID, done];
};
