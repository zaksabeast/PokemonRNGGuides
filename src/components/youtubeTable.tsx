import { Flex } from "./flex";
import { YouTubeVideo } from "./youtubeVideo";
import {
  MediaTable,
  MediaTableBody,
  MediaTableHeader,
  MediaTableRow,
  MediaTableCell,
} from "./mediaTable";
import styled from "@emotion/styled";
import { withTags } from "./tagDetector/provider";

type YouTubeVideo = {
  src: string;
  title: string;
};

type YouTubeTableProps = {
  videos?: YouTubeVideo[];
};

const MobileContainer = styled(Flex)(({ theme }) => ({
  width: "100%",
  display: "none",
  [theme.mediaQueries.down("mobile")]: {
    display: "flex",
    flexDirection: "column",
  },
}));

const DesktopContainer = styled(Flex)(({ theme }) => ({
  width: "100%",
  [theme.mediaQueries.down("mobile")]: {
    display: "none",
  },
}));

export const YouTubeTable = withTags(
  ({ videos }: YouTubeTableProps) => {
    const safeVideos = videos ?? [];
    if (safeVideos.length === 0) {
      return null;
    }

    return (
      <>
        <DesktopContainer>
          <MediaTable flex={1} tableLayout="fixed" width="100%">
            <MediaTableBody>
              <MediaTableRow>
                {safeVideos.map(({ src, title }) => (
                  <MediaTableHeader key={src}>{title}</MediaTableHeader>
                ))}
              </MediaTableRow>
              <MediaTableRow>
                {safeVideos.map(({ src }) => (
                  <MediaTableCell key={src}>
                    <YouTubeVideo src={src} />
                  </MediaTableCell>
                ))}
              </MediaTableRow>
            </MediaTableBody>
          </MediaTable>
        </DesktopContainer>
        <MobileContainer>
          {safeVideos.map(({ title, src }) => (
            <MediaTable key={src} flex={1}>
              <MediaTableBody>
                <MediaTableRow>
                  <MediaTableHeader>{title}</MediaTableHeader>
                </MediaTableRow>
                <MediaTableRow>
                  <MediaTableCell>
                    <YouTubeVideo src={src} />
                  </MediaTableCell>
                </MediaTableRow>
              </MediaTableBody>
            </MediaTable>
          ))}
        </MobileContainer>
      </>
    );
  },
  {
    video_guide: true,
  },
);
