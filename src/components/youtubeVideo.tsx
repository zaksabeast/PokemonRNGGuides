import { Flex } from "./flex";
import styled from "@emotion/styled";

const IframeContainer = styled(Flex)({
  justify: "center",
  width: "100%",
  position: "relative",
  overflowX: "hidden",
  overflowY: "hidden",
  paddingTop: "56.25%",
});

const StyledIframe = styled.iframe({
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: "100%",
  height: "100%",
});

export const YouTubeVideo = (props: React.ComponentProps<"iframe">) => {
  return (
    <IframeContainer>
      <StyledIframe
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        loading="lazy"
        {...props}
      />
    </IframeContainer>
  );
};
