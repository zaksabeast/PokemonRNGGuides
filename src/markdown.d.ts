import React from "react";
import * as tst from "ts-toolbelt";

declare module "@mdx-js/react" {
  type MDXProps = {
    children: React.ReactNode;
    components: {
      [Key in StringComponent]?: tst.O.Overwrite<
        Component<JSX.IntrinsicElements[Key]>,
        { children?: React.ReactNode }
      >;
    };
  };
  export class MDXProvider extends React.Component<MDXProps> {}
}
