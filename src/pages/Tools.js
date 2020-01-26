import React from "react";

// Components
import Header from "../components/Header";
import Cards from "../components/Cards";
import cardContents from "../tools";
import GridLayout from "../layouts/Grid";

export default function Tools() {
  return (
    <React.Fragment>
      <Header title="RNG Tools" button={false} />
      <GridLayout>
        <Cards contents={cardContents} />
      </GridLayout>
    </React.Fragment>
  );
}
