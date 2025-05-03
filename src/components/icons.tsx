import React from "react";
import styled from "@emotion/styled";
import { withCss } from "./withCss";
import {
  MdArrowRightAlt,
  MdCheckCircle,
  MdCheck,
  MdClose,
  MdRocketLaunch,
  MdUpdate,
} from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import { FaGithub, FaDiscord, FaCoffee } from "react-icons/fa";
import { IoLanguage, IoSparkles } from "react-icons/io5";
import { PiPersonSimpleWalkBold } from "react-icons/pi";
import { FaHeart, FaPlay, FaFire } from "react-icons/fa6";

const icons = {
  ArrowRightAlt: MdArrowRightAlt,
  Check: MdCheck,
  CheckCircle: MdCheckCircle,
  Close: MdClose,
  Coffee: FaCoffee,
  Discord: FaDiscord,
  Github: FaGithub,
  Heart: FaHeart,
  Language: IoLanguage,
  Menu: AiOutlineMenu,
  PersonSimpleWalkBold: PiPersonSimpleWalkBold,
  RocketLaunch: MdRocketLaunch,
  Sparkles: IoSparkles,
  Update: MdUpdate,
  Play: FaPlay,
  Fire: FaFire,
} as const;

export type IconName = keyof typeof icons;

type Props = Omit<React.ComponentProps<(typeof icons)[IconName]>, "style"> & {
  name?: IconName;
  extraAlignment?: number | string;
  marginRight?: number;
};

const formatAlignment = (extraAlignment: number | string) => {
  if (typeof extraAlignment === "number") {
    return `${extraAlignment}px`;
  }

  return extraAlignment;
};

const IconContainer = styled.span<{
  extraAlignment?: number | string;
  marginRight?: number;
}>(({ extraAlignment, marginRight }) => ({
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  verticalAlign: `calc(-0.125em + ${formatAlignment(extraAlignment ?? 0)})`,
  marginRight,
}));

const BaseIcon = ({
  name = "ArrowRightAlt",
  extraAlignment,
  marginRight,
  ...props
}: Props) => {
  const IconComponent = icons[name] ?? icons["ArrowRightAlt"];
  return (
    <IconContainer extraAlignment={extraAlignment} marginRight={marginRight}>
      <IconComponent {...props} />
    </IconContainer>
  );
};

export const Icon = withCss(BaseIcon);
export const UserIcon = BaseIcon;

export const IconNames = Object.keys(icons) as IconName[];
