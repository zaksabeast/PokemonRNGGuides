import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import messages from '../../notifications.json';
import orderBy from 'lodash/orderBy';
import filter from 'lodash/filter';

const useStyles = makeStyles((theme) => ({
  paper: {
    transformOrigin: 'top right',
  },
  list: {
    width: theme.spacing(40),
    maxHeight: theme.spacing(40),
    overflow: 'auto',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'column',
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
}));

const isBrowser = typeof window !== 'undefined';
const storageItem = isBrowser
  ? localStorage.getItem('lastSeenNotification')
  : null;
const lastSeenNotification = storageItem ?? '2000-1-1';
const messageList = orderBy(messages, ['date'], ['desc']);
const count = filter(messageList, (message) => {
  return message.date > lastSeenNotification;
}).length;

export const Notifications = () => {
  const classes = useStyles();

  const [openPopper, setOpenPopper] = React.useState(false);
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [badgeCount, setBadgeCount] = React.useState(count);

  const handleToggle = () => {
    setOpenPopper((prevOpenPopper) => !prevOpenPopper);
    setTooltipOpen(false);
    localStorage.setItem('lastSeenNotification', messageList[0].date);
    setBadgeCount(0);
  };

  return (
    <React.Fragment>
      <Tooltip
        open={tooltipOpen}
        onOpen={() => {
          setTooltipOpen(!open);
        }}
        onClose={() => {
          setTooltipOpen(false);
        }}
        title={'Toggle Notifications'}
        enterDelay={300}
      >
        <IconButton
          color="inherit"
          onClick={handleToggle}
          ref={anchorRef}
          aria-controls={openPopper ? 'notifications-popup' : undefined}
          aria-haspopup="true"
          aria-label={'toggleNotifications'}
        >
          <Badge badgeContent={badgeCount} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Popper
        id="notifications-popup"
        open={openPopper}
        placement="bottom-start"
        transition
        anchorEl={anchorRef.current}
        disablePortal
      >
        {({ TransitionProps }) => (
          <ClickAwayListener
            onClickAway={() => {
              setOpenPopper(false);
            }}
          >
            <Grow in={openPopper} {...TransitionProps}>
              <Paper className={classes.paper}>
                <List className={classes.list}>
                  {messageList.map((message, index) => (
                    <React.Fragment key={message.title}>
                      <ListItem
                        alignItems="flex-start"
                        className={classes.listItem}
                      >
                        <Typography gutterBottom>{message.title}</Typography>
                        <Typography gutterBottom variant="body2">
                          <span
                            id="notification-message"
                            dangerouslySetInnerHTML={{ __html: message.text }}
                          />
                        </Typography>
                        {message.date && (
                          <Typography variant="caption" color="textSecondary">
                            {new Date(message.date).toLocaleDateString(
                              'en-US',
                              {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              },
                            )}
                          </Typography>
                        )}
                      </ListItem>
                      {index < messageList.length - 1 ? (
                        <Divider className={classes.divider} />
                      ) : null}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
    </React.Fragment>
  );
};
