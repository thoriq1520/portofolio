import { cn } from "@/lib/utils";

type SectionRevealProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export function SectionReveal({
  children,
  className,
  id,
}: SectionRevealProps) {
  return (
    <div id={id} className={cn(className)}>
      {children}
    </div>
  );
}
