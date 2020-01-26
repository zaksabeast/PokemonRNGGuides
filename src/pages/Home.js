import React from "react";

// Components
import Cards from "../components/Cards";
import Header from "../components/Header";
import announcements from "../announcements.js";
import GridLayout from "../layouts/Grid";

export default function Home() {
  return (
    <React.Fragment>
      <Header title="Pokemon RNG" button={true} />
      <GridLayout>
        <Cards contents={announcements} />
      </GridLayout>
    </React.Fragment>
  );
}
