type WhatNextProps = {
    label?: string;
    slugs?: string[];
}

const WhatNext = ({ label, slugs }:WhatNextProps) => {
    // Note: pretty much every step has an example somewhere in the codebase
    // Step 1: Use the RouteSchema to make sure all slugs are valid - filter out any invalid slugs
    // Step 2: import guide metadata
    // Step 3: Iterate over all slugs and get guide metadata for that slug
    // Step 4: Use the guide metadata for each slug to get the title for each slug
    // Step 5: Use our list components to build the list

    return <Alert
  type="info"
  message="What next?"
  description={

<Flex vertical>

{label}

- [Shiny Starter in HeartGold and SoulSilver](/retail-hgss-starter)
- [Shiny Starter in Diamond, Pearl, and Platinum](/retail-dppt-starter)

</Flex>

}
}