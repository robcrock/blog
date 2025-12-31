// src/components/Sections/home/mentorship-section.tsx
import { Card } from "@/components/ui/card";
import { MENTORSHIP_OFFERINGS, NAVIGATION_ITEMS } from "@/constants";
import { ArrowUpRight, Check, UserCircle, Users } from "lucide-react";

export default function MentorshipSection() {
  const mentorshipNavItem = NAVIGATION_ITEMS.find(
    (item) => item.id === "mentorship"
  )!;

  return (
    <section id={mentorshipNavItem.id} className="scroll-mt-[72px] mb-20">
      {/* Section Header */}
      <div className="flex gap-4 items-center mb-2">
        <h2 className="text-lg whitespace-nowrap pointer-events-none">
          {mentorshipNavItem.label}
        </h2>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Section Description */}
      <p className="mb-6 text-sm text-muted-foreground">
        Level up your frontend skills through mentorship. Clicking any card
        takes you to an external platform.
      </p>

      {/* Mentorship Cards */}
      <div className="grid gap-6 sm:grid-cols-2">
        {MENTORSHIP_OFFERINGS.map((offering, index) => (
          <a
            key={index}
            href={offering.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <Card className="p-6 h-full ring-2 ring-transparent ring-offset-1 transition-all duration-200 hover:ring-primary group-focus-visible:ring-primary">
              {/* Card Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3 items-center">
                  <div className="p-2 rounded-lg bg-muted">
                    {offering.platform === "MentorCruise" ? (
                      <UserCircle className="w-5 h-5" />
                    ) : (
                      <Users className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold transition-colors group-hover:text-primary">
                      {offering.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {offering.platform}
                    </p>
                  </div>
                </div>
                {/* External link indicator */}
                <div className="p-1.5 rounded-full bg-muted opacity-60 group-hover:opacity-100 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Card Description */}
              <p className="mb-4 text-sm text-muted-foreground">
                {offering.description}
              </p>

              {/* Features List */}
              <ul className="space-y-2">
                {offering.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex gap-2 items-center text-sm text-muted-foreground"
                  >
                    <Check className="flex-shrink-0 w-4 h-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* External indicator text */}
              <div className="pt-4 mt-4 border-t border-border">
                <span className="flex gap-1 items-center text-xs text-muted-foreground">
                  Opens on {offering.platform}
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
}
