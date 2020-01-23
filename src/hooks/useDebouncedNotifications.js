import React, {useState, useEffect, useRef} from 'react';
import {NotificationManager} from "react-notifications";

function getStatusLabel(status) {
  return status ? "Online" : "Offline"
}

function debouncedNotificationHandler(value, initialValue, intermediaryValues, setIntermediaryValues) {
  const wasOnlineBetweenTimeouts = intermediaryValues.some(status => status);

  if (wasOnlineBetweenTimeouts && !value) {
    NotificationManager.info(getStatusLabel(true));
  }

  if (initialValue.current && value) {
    return;
  }

  NotificationManager.info(getStatusLabel(value));

  initialValue.current = value;
  setIntermediaryValues([]);
}

function useDebouncedNotifications(value, delay) {
  const isMount = useRef(false);
  const initialValue = useRef(value);
  const [intermediaryValues, setIntermediaryValues] = useState([]);

  useEffect(
    () => {
      if (!isMount.current) {
        isMount.current = true;
        return;
      }

      setIntermediaryValues([ ...intermediaryValues, value ]);

      const handler = setTimeout(() =>
        debouncedNotificationHandler(value, initialValue, intermediaryValues, setIntermediaryValues),
        delay
      );

      return () => {
        clearTimeout(handler);
      };
    },
    [value]
  );
}

export default useDebouncedNotifications;
