import { cn } from "@/lib/utils";
import { profile } from "@/lib/site";

type SiteFooterProps = {
  className?: string;
  showPhone?: boolean;
};

export function SiteFooter({ className, showPhone = false }: SiteFooterProps) {
  return (
    <footer className={cn("flex flex-col gap-4 border-t border-border py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between", className)}>
      <p>© 2026 {profile.name}</p>
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        <a className="transition-colors hover:text-foreground" href={`mailto:${profile.email}`}>
          {showPhone ? profile.email : "Email me"}
        </a>
        {showPhone ? (
          <a className="transition-colors hover:text-foreground" href={`tel:${profile.phone}`}>
            {profile.phone}
          </a>
        ) : null}
      </div>
    </footer>
  );
}
