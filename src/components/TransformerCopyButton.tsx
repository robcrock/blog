"use client";

import { useState } from "react";

import { Check, Copy } from "lucide-react";

const TransformerCopyButton = ({ children }: { children: any }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const text = children?.props?.children
      .map((line: any) => {
        if (typeof line === "string") return line;
        const content = line?.props?.children;
        if (Array.isArray(content)) {
          return content.map((span: any) => span?.props?.children).join("");
        }
        return content?.props?.children || "";
      })
      .join("");

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="absolute p-2 transition-colors rounded right-4 top-4 hover:bg-gray-800"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : (
        <Copy className="w-4 h-4 text-gray-400" />
      )}
    </button>
  );
};

export default TransformerCopyButton;
