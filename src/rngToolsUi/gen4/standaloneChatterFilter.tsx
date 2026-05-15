import { ChatterFilterBase } from "./shared/chatterFilter";

export const StandaloneChatterFilter = () => {
  return (
    <ChatterFilterBase
      mode="standalone"
      submitTrackerId="standalone_chatter_filter"
    />
  );
};
