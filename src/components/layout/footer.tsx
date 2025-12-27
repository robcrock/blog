import { Button } from "@/components/ui/button";
import { SOCIAL_LINKS } from "@/constants";
import { renderSocialIcon } from "@/lib/social-icons";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-10 border-t border-border">
      <div className="flex justify-between items-center">
        <p className="font-medium uppercase">ROBERT CROCKER</p>
        <div className="flex items-center">
          {SOCIAL_LINKS.map(({ href, icon }) => (
            <Button
              key={href}
              variant="ghost"
              size="icon"
              render={<Link href={href} />}
            >
              {renderSocialIcon({ iconName: icon, size: 20 })}
            </Button>
          ))}
        </div>
      </div>
    </footer>
  );
}
