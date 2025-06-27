import { Flex } from "./flex";
import { YouTubeVideo } from "./youtubeVideo";
import {
  MediaGrid,
  MediaGridHeader,
  MediaGridRow,
  MediaGridCell,
} from "./mediaGrid";
import styled from "@emotion/styled";
import { withTags } from "./tagDetector/provider";

type YouTubeVideo = {
  src: string;
  title: string;
};

type YouTubeTableProps = {
  videos?: YouTubeVideo[];
};

const TableContainer = styled(Flex)(({ theme }) => ({
  width: "100%",
  [theme.mediaQueries.down("mobile")]: {
    flexDirection: "column",
  },
}));

export const YouTubeTable = withTags(
  ({ videos }: YouTubeTableProps) => {
    const safeVideos = videos ?? [];
    if (safeVideos.length === 0) {
      return null;
    }

    return (
      <TableContainer>
        {safeVideos.map(({ title, src }) => (
          <MediaGrid key={src} flex={1}>
            <MediaGridRow>
              <MediaGridHeader>{title}</MediaGridHeader>
            </MediaGridRow>
            <MediaGridRow>
              <MediaGridCell>
                <YouTubeVideo src={src} />
              </MediaGridCell>
            </MediaGridRow>
          </MediaGrid>
        ))}
      </TableContainer>
    );
  },
  {
    video_guide: true,
  },
);
