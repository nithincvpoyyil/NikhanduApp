import React from 'react';
import {Mixpanel, MixpanelProperties} from 'mixpanel-react-native';
import uuid from 'react-native-uuid';
import {getData, setData} from './DataStore';
import {ThemeContext} from './getTheme';
import {ANALYTICS_FLAG, USER_ID_KEY} from '../types';

export const useAnalytics = (token: string) => {
  const mixpanelRef = React.useRef<Mixpanel>();
  const [uniqueID, setUniqueID] = React.useState({id: '', done: false});

  React.useEffect(() => {
    getData(USER_ID_KEY).then(
      userIDFromStorage => {
        if (userIDFromStorage) {
          setUniqueID({id: userIDFromStorage, done: true});
        } else {
          const randomUserID = '' + uuid.v4('unique-id');
          setUniqueID({id: randomUserID, done: true});
          setData(USER_ID_KEY, randomUserID);
        }
      },
      () => {
        setUniqueID({id: '', done: true});
      },
    );
  }, []);

  React.useEffect(() => {
    if (uniqueID.done) {
      if (!mixpanelRef.current) {
        mixpanelRef.current = new Mixpanel(token, false);
        mixpanelRef.current.init();
        if (uniqueID.id) {
          mixpanelRef.current.identify(uniqueID.id);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uniqueID.done]);

  function track(
    eventName: string,
    properties?: MixpanelProperties | undefined,
  ): void {
    if (mixpanelRef.current) {
      mixpanelRef.current.track(eventName, properties);
    }
  }
  return [track];
};

export function useTrack() {
  const {analyticsTrack} = React.useContext(ThemeContext);
  return analyticsTrack;
}
export function useAnalyticsFlag() {
  const [flagValue, setFlagValue] = React.useState(false);

  React.useEffect(() => {
    getData(ANALYTICS_FLAG).then(
      flag => {
        if (flag && flag === 'true') {
          setFlagValue(true);
        } else {
          setFlagValue(false);
        }
      },
      () => {
        setFlagValue(false);
      },
    );
  }, []);
  return flagValue;
}
