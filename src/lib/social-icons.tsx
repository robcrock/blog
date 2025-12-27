import React from "react";
import { SiGithub, SiMentorcruise, SiX } from "@icons-pack/react-simple-icons";
import { LucideLinkedin } from "lucide-react";
import SkoolIcon from "@/components/icons/skool-icon";
import { SOCIAL_LINKS } from "@/constants";

type IconName = (typeof SOCIAL_LINKS)[number]["icon"];

interface RenderIconProps {
  iconName: IconName;
  size?: number;
}

export function renderSocialIcon({
  iconName,
  size = 20,
}: RenderIconProps): React.ReactElement {
  switch (iconName) {
    case "LinkedIn":
      return <LucideLinkedin size={size} />;
    case "GitHub":
      return <SiGithub size={size} />;
    case "X":
      return <SiX size={size} />;
    case "MentorCruise":
      return <SiMentorcruise size={size} />;
    case "Skool":
      return <SkoolIcon width={size} height={size} />;
    default:
      // TypeScript should prevent this, but just in case
      const _exhaustive: never = iconName;
      return _exhaustive;
  }
}
