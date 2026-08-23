/**
 * Prevents bugs related to accidentally passing props to the DOM by filtering out any prop that starts with "$".
 */
export const styledPropGuard = {
  shouldForwardProp: (prop: string) => !prop.startsWith("$"),
} as const;
