import React from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

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

export const NotificationList = ({messageList}) => {
    const classes = useStyles();
    return (
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
    )
}