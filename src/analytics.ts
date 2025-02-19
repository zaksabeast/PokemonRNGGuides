// This is the only file where using amplitude directly is okay
// eslint-disable-next-line no-restricted-imports
import { track as amplitudeTrack } from "@amplitude/analytics-browser";
import { settings } from "~/settings";

// eslint-disable-next-line no-restricted-imports
export {
  init as initAmplitude,
  getDeviceId,
} from "@amplitude/analytics-browser";

export const track = (
  eventName: string,
  eventProperties: Record<string, string | number | null>,
) => {
  if (settings.isDev) {
    // eslint-disable-next-line no-console
    console.log("[TRACK]", eventName, eventProperties);
  } else {
    amplitudeTrack(eventName, eventProperties);
  }
};
