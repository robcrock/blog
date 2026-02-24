"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

const TransformerCopyButton = () => {
  const [copied, setCopied] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const copy = async () => {
    if (!buttonRef.current) return;

    // Find the parent div and then the pre element
    const parentDiv = buttonRef.current.parentElement;
    const preElement = parentDiv?.querySelector("pre");

    if (!preElement) return;

    let text = "";

    // Method 1: Try to get raw code from data attribute (most reliable)
    const rawCode = preElement.getAttribute("data-raw-code");
    if (rawCode) {
      text = rawCode;
    } else {
      // Method 2: Fall back to extracting text from DOM (works with any syntax highlighter)
      // This uses textContent which is browser-native and doesn't depend on React structure
      const codeElement = preElement.querySelector("code");
      if (codeElement) {
        text = codeElement.textContent || "";
      } else {
        text = preElement.textContent || "";
      }
    }

    if (!text) return;

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      ref={buttonRef}
      onClick={copy}
      className="absolute top-3 right-4 p-2 group"
      aria-label={copied ? "Copied!" : "Copy code"}
    >
      {copied ? (
        <Check className="w-4 h-4 text-white" />
      ) : (
        <Copy className="w-4 h-4 transition-colors text-primary group-hover:text-white" />
      )}
    </Button>
  );
};

export default TransformerCopyButton;
