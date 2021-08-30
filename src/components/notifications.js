import React, { useEffect } from 'react';
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

function getCookie(name) {
  const regex = new RegExp(`(?:(?:^|.*;*)${name}*=*([^;]*).*$)|^.*$`);
  return document.cookie.replace(regex, '$1');
}

const lastSeen = getCookie('lastSeenNotification');
const lastSeenNotification = lastSeen === '' ? 0 : parseInt(lastSeen, 10);
const messageList = messages.reverse();

export const Notifications = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [badgeCount, setBadgeCount] = React.useState(0);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    setTooltipOpen(false);
    document.cookie = `lastSeenNotification=${messageList[0].id};path=/;max-age=31536000`;
    setBadgeCount(0);
  };

  useEffect(() => {
    const count = messageList.reduce(
      (count, message) =>
        message.id > lastSeenNotification ? count + 1 : count,
      0,
    );

    setBadgeCount(count);
  }, []);

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
          aria-controls={open ? 'notifications-popup' : undefined}
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
        open={open}
        placement="bottom-start"
        transition
        anchorEl={anchorRef.current}
        disablePortal
      >
        {({ TransitionProps }) => (
          <ClickAwayListener
            onClickAway={() => {
              setOpen(false);
            }}
          >
            <Grow in={open} {...TransitionProps}>
              <Paper className={classes.paper}>
                <List className={classes.list}>
                  {messageList.map((message, index) => (
                    <React.Fragment key={message.id}>
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
