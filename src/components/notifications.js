import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import messages from '../notifications.json';
import orderBy from 'lodash/orderBy';
import filter from 'lodash/filter';
import { NotificationList } from './notification-list';

const isBrowser = typeof window !== 'undefined';
const storageItem = isBrowser
  ? localStorage.getItem('lastSeenNotification')
  : null;
const lastSeenNotification = storageItem ?? '2000-1-1';
const messageList = orderBy(messages, 'date', 'desc');
const count = filter(messageList, message => {
  return message.date > lastSeenNotification;
}).length;

export const Notifications = () => {
  const [isPopperOpen, setPopperOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [badgeCount, setBadgeCount] = React.useState(count);

  const handleToggle = () => {
    setPopperOpen(prevPopperOpen => !prevPopperOpen);
    localStorage.setItem('lastSeenNotification', messageList[0].date);
    setBadgeCount(0);
  };

  return (
    <React.Fragment>
      <IconButton
        color="inherit"
        onClick={handleToggle}
        ref={anchorRef}
        aria-controls={isPopperOpen ? 'notifications-popup' : undefined}
        aria-haspopup="true"
        aria-label="toggleNotifications"
      >
        <Badge badgeContent={badgeCount} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popper
        id="notifications-popup"
        open={isPopperOpen}
        placement="bottom-start"
        transition
        anchorEl={anchorRef.current}
        disablePortal
      >
        {({ TransitionProps }) => (
          <ClickAwayListener
            onClickAway={() => {
              setPopperOpen(false);
            }}
          >
            <Grow in={isPopperOpen} {...TransitionProps}>
              <NotificationList messageList={messageList} />
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
    </React.Fragment>
  );
};
