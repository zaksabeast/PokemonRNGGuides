// Dirty redirect
export const redirectUser = address => {
  if (typeof window !== 'undefined') {
    window.location.href = address;
  }
};
