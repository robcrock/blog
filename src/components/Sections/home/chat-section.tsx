import { NAVIGATION_ITEMS } from "@/constants";
import Link from "next/link";

export default function ChatSection() {
  const chatNavItem = NAVIGATION_ITEMS.find((item) => item.id === "chat")!;

  return (
    <section id={chatNavItem.id} className="scroll-mt-[72px] mb-20">
      <div className="flex gap-4 items-center mb-6">
        <h2 className="text-lg whitespace-nowrap">{chatNavItem.label}</h2>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <p className="col-span-1 text-foreground">
          I'm currently working at Abbott, but I can free up some time for side
          projects. Feel free to contact me if you want to chat.
        </p>
        <p>
          <Link
            href="mailto:robert@robcrock.com"
            className="font-medium rounded ring-offset-1 transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            robert@robcrock.com
          </Link>
        </p>
      </div>
    </section>
  );
}
