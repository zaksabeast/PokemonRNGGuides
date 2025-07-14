import { Flex } from "./flex";
import { YouTubeVideo } from "./youtubeVideo";
import styled from "@emotion/styled";
import { withTags } from "./tagDetector/provider";
import { Typography } from "./typography";

type YouTubeVideo = {
  src: string;
  title: string;
};

type YouTubeTableProps = {
  videos?: YouTubeVideo[];
};

const Container = styled(Flex)(({ theme }) => ({
  width: "100%",
  flexDirection: "row",
  [theme.mediaQueries.down("mobile")]: {
    flexDirection: "column",
  },
}));

const TitleContainer = styled(Flex)(({ theme }) => ({
  backgroundColor: theme.token.colorFillQuaternary,
  padding: 16,
  height: "100%",
  alignContent: "center",
  borderBottom: `1px solid ${theme.token.colorBorderSecondary}`,
}));

export const YouTubeTable = withTags(
  ({ videos }: YouTubeTableProps) => {
    const safeVideos = videos ?? [];
    if (safeVideos.length === 0) {
      return null;
    }

    return (
      <Container>
        {safeVideos.map(({ src, title }) => (
          <Flex
            key={src}
            vertical
            flex={1}
            height="100%"
            justify="space-between"
            gap={16}
          >
            <TitleContainer
              backgroundColor="FillQuaternary"
              p={16}
              height="100%"
              align="center"
              borderColor="BorderSecondary"
            >
              <Typography.Text strong fontSize={14}>
                {title}
              </Typography.Text>
            </TitleContainer>
            <Flex p={2}>
              <YouTubeVideo src={src} />
            </Flex>
          </Flex>
        ))}
      </Container>
    );
  },
  {
    video_guide: true,
  },
);
