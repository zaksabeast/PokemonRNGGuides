import { Flex, Card, Typography, Grid } from "~/components";
import { Route } from "~/routes/defs";
import styled from "@emotion/styled";
import brilliantDiamondLogoSrc from "~/assets/logos/brilliant_diamond_logo.webp";
import shiningPearlLogoSrc from "~/assets/logos/shining_pearl_logo.webp";
import swordLogoSrc from "~/assets/logos/sword_logo.webp";
import shieldLogoSrc from "~/assets/logos/shield_logo.webp";
import ultraSunLogoSrc from "~/assets/logos/ultra_sun_logo.webp";
import ultraMoonLogoSrc from "~/assets/logos/ultra_moon_logo.webp";
import sunLogoSrc from "~/assets/logos/sun_logo.webp";
import moonLogoSrc from "~/assets/logos/moon_logo.webp";
import omegaRubyLogoSrc from "~/assets/logos/omega_ruby_logo.webp";
import alphaSapphireLogoSrc from "~/assets/logos/alpha_sapphire_logo.webp";
import xLogoSrc from "~/assets/logos/x_logo.webp";
import yLogoSrc from "~/assets/logos/y_logo.webp";
import black2LogoSrc from "~/assets/logos/black_2_logo.webp";
import white2LogoSrc from "~/assets/logos/white_2_logo.webp";
import blackLogoSrc from "~/assets/logos/black_logo.webp";
import whiteLogoSrc from "~/assets/logos/white_logo.webp";
import heartGoldLogoSrc from "~/assets/logos/heart_gold_logo.webp";
import soulSilverLogoSrc from "~/assets/logos/soul_silver_logo.webp";
import platinumLogoSrc from "~/assets/logos/platinum_logo.webp";
import diamondLogoSrc from "~/assets/logos/diamond_logo.webp";
import pearlLogoSrc from "~/assets/logos/pearl_logo.webp";
import fireRedLogoSrc from "~/assets/logos/firered_logo.webp";
import leafGreenLogoSrc from "~/assets/logos/leafgreen_logo.webp";
import emeraldLogoSrc from "~/assets/logos/emerald_logo.webp";
import xdLogoSrc from "~/assets/logos/xd_logo.webp";
import colosseumLogoSrc from "~/assets/logos/colosseum_logo.webp";
import rubyLogoSrc from "~/assets/logos/ruby_logo.webp";
import sapphireLogoSrc from "~/assets/logos/sapphire_logo.webp";
import crystalLogoSrc from "~/assets/logos/crystal.webp";

type Game = {
  name: string;
  images: string[];
  slug: Route;
};

const games = [
  // Temporarily don't show this since we only have one post
  // {
  //   name: "Legends: Arceus",
  //   images: [],
  //   slug: "/legends-arceus",
  // },
  {
    name: "Brilliant Diamond and Shining Pearl",
    images: [brilliantDiamondLogoSrc, shiningPearlLogoSrc],
    slug: "/brilliant-diamond-and-shining-pearl",
  },
  {
    name: "Sword and Shield",
    images: [swordLogoSrc, shieldLogoSrc],
    slug: "/sword-and-shield",
  },
  {
    name: "Ultra Sun and Ultra Moon",
    images: [ultraSunLogoSrc, ultraMoonLogoSrc],
    slug: "/ultra-sun-and-ultra-moon",
  },
  {
    name: "Sun and Moon",
    images: [sunLogoSrc, moonLogoSrc],
    slug: "/sun-and-moon",
  },
  {
    name: "Omega Ruby and Alpha Sapphire",
    images: [omegaRubyLogoSrc, alphaSapphireLogoSrc],
    slug: "/omega-ruby-and-alpha-sapphire",
  },
  {
    name: "X and Y",
    images: [xLogoSrc, yLogoSrc],
    slug: "/x-and-y",
  },
  {
    name: "Black 2 and White 2",
    images: [black2LogoSrc, white2LogoSrc],
    slug: "/black-2-and-white-2",
  },
  {
    name: "Black and White",
    images: [blackLogoSrc, whiteLogoSrc],
    slug: "/black-and-white",
  },
  {
    name: "HeartGold and SoulSilver",
    images: [heartGoldLogoSrc, soulSilverLogoSrc],
    slug: "/heart-gold-and-soul-silver",
  },
  {
    name: "Platinum",
    images: [platinumLogoSrc],
    slug: "/diamond-pearl-and-platinum",
  },
  {
    name: "Diamond and Pearl",
    images: [diamondLogoSrc, pearlLogoSrc],
    slug: "/diamond-pearl-and-platinum",
  },
  {
    name: "FireRed and LeafGreen",
    images: [fireRedLogoSrc, leafGreenLogoSrc],
    slug: "/fire-red-and-leaf-green",
  },
  {
    name: "Emerald",
    images: [emeraldLogoSrc],
    slug: "/emerald",
  },
  {
    name: "Gamecube",
    images: [xdLogoSrc, colosseumLogoSrc],
    slug: "/gamecube",
  },
  {
    name: "Ruby and Sapphire",
    images: [rubyLogoSrc, sapphireLogoSrc],
    slug: "/ruby-and-sapphire",
  },
  {
    name: "Crystal",
    images: [crystalLogoSrc],
    slug: "/crystal",
  },
] satisfies Game[];

const GameCard = styled(Card)(({ theme }) => ({
  transition: "box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out",
  ":hover": {
    boxShadow: theme.token.boxShadow,
    transform: "scale(1.10)",
  },
  ".ant-card-body": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Container = styled(Flex)(({ theme }) => {
  const shadow = theme.token.colorPrimaryBg;
  return {
    backdropFilter: "blur(10px)",
    borderRadius: 10,
    background: shadow,
    boxShadow: `
      0 0 20px ${shadow},
      0 0 40px ${shadow},
      0 0 80px ${shadow}
    `,
  };
});

const FeaturedChallengeContainer = styled(Flex)(({ theme }) => ({
  justifyContent: "space-around",
  alignItems: "center",
  gap: 8,
  height: "100%",
  [theme.mediaQueries.down("mobile")]: {
    flexDirection: "column",
  },
}));

export const HomePageComponent = () => {
  return (
    <Container gap={24} vertical>
      <Flex>
        <GameCard
          id="featured-challenge"
          borderColor="PrimaryBorder"
          border="2px solid"
          href="/challenge-usum-ta"
          fullBody
        >
          <FeaturedChallengeContainer>
            <Typography.Title level={2}>Featured Challenge</Typography.Title>
            <img src={ultraMoonLogoSrc} />
          </FeaturedChallengeContainer>
        </GameCard>
      </Flex>

      <Grid mobile={1} tablet={2} desktop={3}>
        {games.map((game) => (
          <GameCard
            id={`home-game-${game.name}`}
            key={game.name}
            href={game.slug}
            borderColor="PrimaryBorder"
            border="2px solid"
            fullBody
          >
            <Flex justify="center" align="center" gap={8} flex={1}>
              {game.images.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt={`${game.name} logo`}
                  style={{
                    width: "50%",
                    height: "50%",
                    objectFit: "contain",
                  }}
                />
              ))}
            </Flex>
          </GameCard>
        ))}
      </Grid>
    </Container>
  );
};
