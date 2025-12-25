// types/playground.ts

export interface PlaygroundProps {
  title?: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}

// Canvas should respect your grid layout system
export interface PlaygroundCanvasProps {
  children: React.ReactNode;
  className?: string;
  backgroundPattern?: "dots" | "grid" | "none";
  fullWidth?: boolean; // For breaking out of col-start-2 constraint
}

export interface PlaygroundControlsProps {
  children: React.ReactNode;
  className?: string;
}

export interface PlaygroundCodeProps {
  code: string;
  language?: "css" | "javascript" | "typescript";
  className?: string;
}

export interface RangeControlProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  showValue?: boolean;
}

export interface SelectControlProps<T = string> {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: Array<{ label: string; value: T }>;
}

export interface ButtonControlProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}
