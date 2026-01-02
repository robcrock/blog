import Link from "next/link";

export default function ChatSection() {
  return (
    <section id="chat" className="scroll-mt-[72px] mb-20">
      <div className="flex gap-4 items-center mb-6">
        <h2 className="text-lg whitespace-nowrap">CHAT</h2>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <p className="col-span-1 text-foreground">
          Have an exciting projecct you need help with? Get in touch.
        </p>
        <p className="flex col-start-3 justify-end items-end">
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
