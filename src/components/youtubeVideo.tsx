import styled from "@emotion/styled";
import { withTags } from "./tagDetector/provider";
import "lite-youtube-embed/src/lite-yt-embed.css";

const Container = styled.div(({ theme }) => ({
  minHeight: 200,
  width: "100%",
  display: "flex",
  justifyContent: "center",
  "& lite-youtube": {
    borderRadius: 4,
    boxShadow: theme.token.boxShadow,
    backgroundColor: theme.token.colorFillQuaternary,
    width: "100%",
  },
}));

// The library registers the custom element on import and needs the DOM,
// so it's loaded after the element mounts in the browser instead of during prerender.
const loadLiteYoutube = () => {
  void import("lite-youtube-embed");
};

type Props = {
  id?: string;
};

export const YouTubeVideo = withTags(
  ({ id }: Props) => {
    if (id == null) {
      return null;
    }

    return (
      <Container>
        {/* The element only reads videoid when it connects, so remount on change */}
        <lite-youtube key={id} videoid={id} ref={loadLiteYoutube} />
      </Container>
    );
  },
  {
    video_guide: true,
  },
);
