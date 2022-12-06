import React from 'react';
import {Mixpanel, MixpanelProperties} from 'mixpanel-react-native';
import {useUserID} from './useUserID';

export const useAnalytics = (token: string) => {
  const [userID] = useUserID();
  const trackAutomaticEvents = true;
  const mixpanelRef = React.useRef<Mixpanel>();
  if (!mixpanelRef.current) {
    mixpanelRef.current = new Mixpanel(token, trackAutomaticEvents);
    mixpanelRef.current.init();
    if (userID) {
      mixpanelRef.current.identify(userID);
    }
  }

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
