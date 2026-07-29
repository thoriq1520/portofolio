import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 48"
      aria-hidden="true"
      className={cn("h-9 w-12 shrink-0", className)}
    >
      <rect className="fill-card stroke-border" x="0.5" y="0.5" width="63" height="47" rx="14" />
      <path className="fill-foreground" d="M7 11h17v5h-5.5v22h-6V16H7z" />
      <path className="fill-foreground" d="M26 11h16v5H32v6h9v5h-9v11h-6z" />
      <path
        className="fill-primary"
        fillRule="evenodd"
        d="M46 11h6l8 27h-5.5L53 32h-8l-1.5 6H38l8-27Zm.4 16h5.2L49 16.5 46.4 27Z"
      />
    </svg>
  );
}
