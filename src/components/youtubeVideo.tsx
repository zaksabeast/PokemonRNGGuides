import styled from "@emotion/styled";
import { withTags } from "./tagDetector/provider";
import { YouTubeEmbed } from "@next/third-parties/google";

const Container = styled.div(({ theme }) => ({
  minHeight: 200,
  width: "100%",
  '& [data-ntpc="YouTubeEmbed"]': {
    display: "flex",
    justifyContent: "center",
    width: "100% !important",
    "& lite-youtube": {
      borderRadius: theme.token.borderRadiusSM,
      boxShadow: theme.token.boxShadow,
      backgroundColor: theme.token.colorFillQuaternary,
      width: "100%",
    },
  },
}));

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
        <YouTubeEmbed videoid={id} />
      </Container>
    );
  },
  {
    video_guide: true,
  },
);
