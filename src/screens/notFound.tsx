import React from "react";
import { MainLayout } from "~/layouts/main";
import { Button, Typography, List, ListItem } from "~/components";
import { settings } from "~/settings";
import { useLocation } from "wouter";
import { track } from "~/analytics";

export const NotFoundScreen = () => {
  const [location] = useLocation();

  React.useEffect(() => {
    track("Page not found", { location });
  }, [location]);

  return (
    <MainLayout trackerName="page_not_found">
      <Typography.Title>404 – Wild MissingNo. Appeared!</Typography.Title>
      <Typography.Text>This page doesn't exist!</Typography.Text>
      <Typography.Title level={3}>What now?</Typography.Title>
      <List pl={40}>
        <ListItem>
          <Typography.Text strong>Double-check the URL</Typography.Text> – Maybe
          a typo snuck in?
        </ListItem>
        <ListItem>
          <Typography.Text strong>Try searching</Typography.Text> – Use the
          navigation drawer to find what you're looking for.
        </ListItem>
        <ListItem>
          <Typography.Text strong>Head back to safety</Typography.Text> –{" "}
          <a href="/">Return to the homepage</a>.
        </ListItem>
      </List>
      <Button
        mt={20}
        href={settings.discordUrl}
        trackerId="page_not_found_join_discord"
        type="primary"
      >
        Or ask on the Discord
      </Button>
    </MainLayout>
  );
};
