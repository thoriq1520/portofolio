import { cn } from "@/lib/utils";
import { profile } from "@/lib/site";

type SiteFooterProps = { className?: string; showPhone?: boolean };

export function SiteFooter({ className, showPhone = false }: SiteFooterProps) {
  return (
    <footer className={cn("site-footer", className)}>
      <p>© 2026 {profile.name}</p>
      <div><a href={`mailto:${profile.email}`}>{showPhone ? profile.email : "Email me"}</a>
        {showPhone ? <a href={`tel:+62${profile.phone.slice(1)}`}>{profile.phone}</a> : null}
        <a href="#top">Back to top</a>
      </div>
    </footer>
  );
}
