import { AnimatedNavigation } from "@/components/ui/navigation-menu";

function SiteHeader({ home = false }: { home?: boolean }) {
  return (
    <>
      <AnimatedNavigation home={home} />
      <div className="h-16" aria-hidden="true" />
    </>
  );
}

export function HomeHeader() {
  return <SiteHeader home />;
}

export function ProjectHeader() {
  return <SiteHeader />;
}
