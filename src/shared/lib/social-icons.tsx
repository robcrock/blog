import React from "react";
import { SiGithub, SiX } from "@icons-pack/react-simple-icons";
import { LucideLinkedin, Mail } from "lucide-react";
import { SOCIAL_LINKS } from "@/shared/lib/constants";

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
    case "Email":
      return <Mail size={size} />;
    default:
      // TypeScript should prevent this, but just in case
      const _exhaustive: never = iconName;
      return _exhaustive;
  }
}
