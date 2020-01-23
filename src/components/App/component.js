import React from 'react';
import { NotificationContainer } from 'react-notifications';

import 'react-notifications/lib/notifications.css';

import OnlineStatusMock from './OnlineStatusMock';
import './App.css';
import useDebouncedNotifications from "./common/hooks/useDebouncedNotifications";

const withOnlineStatus = WrappedComponent =>
  class WithOnlineStatus extends React.Component {
    constructor(props) {
      super(props);
      this.state = { isOnline: false };
    }
    render() {
      const { isOnline } = this.state;
      return (
        <>
          <OnlineStatusMock
            onIsOnlineChange={isOnline => this.setState({ isOnline })}
          />
          <WrappedComponent {...this.props} isOnline={isOnline} />
        </>
      );
    }
  };

const App = ({ isOnline }) => {
  useDebouncedNotifications(isOnline, 1000);

  return (
    <>
      <div className={isOnline ? 'online' : 'offline'}>
        {isOnline ? 'Online' : 'Offline'}
        <NotificationContainer/>
      </div>
    </>
  );
};

export default withOnlineStatus(App);
