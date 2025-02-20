const needsUpdateEvent = new EventTarget();

export const dispatchNeedRefresh = () =>
  needsUpdateEvent.dispatchEvent(new Event("needsUpdate"));
export const createRefreshHandler = (callback: () => void) => {
  needsUpdateEvent.addEventListener("needsUpdate", callback);
  return {
    remove: () => needsUpdateEvent.removeEventListener("needsUpdate", callback),
  };
};
