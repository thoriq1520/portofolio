import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { navItems } from "@/lib/navigation";

export function AnimatedNavigation({ home = false }: { home?: boolean }) {
  return (
    <header className="site-header">
      <div className="page-shell header-inner">
        <a className="brand-link" href={home ? "#top" : "/"} aria-label={home ? "Back to top" : "Back to homepage"}>
          Thoriq F. Ajiji
        </a>
        <nav aria-label="Primary navigation" className="desktop-navigation">
          {navItems.map(item => <a key={item.href} href={home ? item.href : `/${item.href}`}>{item.label}</a>)}
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <MobileNav home={home} />
        </div>
      </div>
    </header>
  );
}
